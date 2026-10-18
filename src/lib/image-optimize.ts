import { MAX_ATTACHMENT_SIZE_BYTES } from "@/lib/attachments";

/**
 * Client-only photo compression for brief attachments. Runs entirely via <canvas> —
 * no extra dependency. Documents and GIFs never go through this module (see
 * COMPRESSIBLE_IMAGE_EXTENSIONS in lib/attachments.ts).
 */

/**
 * Long-edge cap and quality ladder, tuned so the *first* rung already uses most
 * of the MAX_ATTACHMENT_SIZE_BYTES budget for typical detailed photos instead
 * of leaving it mostly unused. Empirically checked with a libwebp-class encoder
 * against a deliberately noisy/detailed 4000x3000 synthetic photo (worst case):
 * 2600px @ quality 0.92 landed around ~2.2MB — safely under the 3MB ceiling with
 * headroom, while a 2000px @ quality 0.82 (the previous settings) landed under
 * 1MB on the same image, confirming the old ladder was leaving quality on the
 * table. Smooth/low-detail photos naturally end up smaller at these same
 * settings — that's expected, not a bug: there's no benefit to padding a photo
 * that already looks great at a smaller size.
 */
const MAX_DIMENSION = 2600;
/** Below this, further compression isn't worth the CPU cost or quality loss. */
const SKIP_OPTIMIZATION_UNDER_BYTES = 1 * 1024 * 1024;
const DIMENSION_SCALES = [1, 0.85, 0.7, 0.55];
const QUALITY_STEPS = [0.92, 0.85, 0.75, 0.6];

export type ImageOptimizeErrorReason = "decode" | "too-large";

export class ImageOptimizeError extends Error {
  constructor(
    public readonly reason: ImageOptimizeErrorReason,
    public readonly fileName: string,
  ) {
    super(`Could not optimize "${fileName}" (${reason})`);
    this.name = "ImageOptimizeError";
  }
}

let webpSupportPromise: Promise<boolean> | null = null;

function supportsWebpEncoding(): Promise<boolean> {
  webpSupportPromise ??= new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    canvas.toBlob((blob) => resolve(blob?.type === "image/webp"), "image/webp");
  });
  return webpSupportPromise;
}

function encode(
  canvas: HTMLCanvasElement,
  mime: string,
  quality: number | undefined,
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
}

function drawScaled(
  bitmap: ImageBitmap,
  width: number,
  height: number,
  fillWhite: boolean,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas context unavailable");
  if (fillWhite) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  return canvas;
}

/** Samples a small draw of the image to check for any non-opaque pixels. */
function hasAlphaChannel(bitmap: ImageBitmap): boolean {
  const probeSize = 32;
  const canvas = drawScaled(bitmap, probeSize, probeSize, false);
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;
  const { data } = ctx.getImageData(0, 0, probeSize, probeSize);
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true;
  }
  return false;
}

function extensionForMime(mime: string): string {
  if (mime === "image/webp") return ".webp";
  if (mime === "image/png") return ".png";
  return ".jpg";
}

function withExtension(filename: string, extension: string): string {
  const withoutExtension = filename.replace(/\.[^.]+$/, "");
  return `${withoutExtension}${extension}`;
}

/**
 * Compresses a photo down to MAX_ATTACHMENT_SIZE_BYTES by capping resolution and,
 * for lossy formats, reducing quality — stopping at the first setting that fits so
 * quality isn't dropped further than needed. Already-small photos pass through
 * untouched. Throws ImageOptimizeError if the file can't be decoded, or can't be
 * brought under the limit even at the lowest quality/resolution step.
 */
export async function optimizeImageFile(file: File): Promise<File> {
  if (file.size <= SKIP_OPTIMIZATION_UNDER_BYTES) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new ImageOptimizeError("decode", file.name);
  }

  try {
    const hasAlpha = file.type !== "image/jpeg" && hasAlphaChannel(bitmap);
    const webpSupported = await supportsWebpEncoding();
    const preferredMime = webpSupported ? "image/webp" : hasAlpha ? "image/png" : "image/jpeg";

    const longEdge = Math.max(bitmap.width, bitmap.height);
    const baseScale = Math.min(1, MAX_DIMENSION / longEdge);
    const baseWidth = Math.max(1, Math.round(bitmap.width * baseScale));
    const baseHeight = Math.max(1, Math.round(bitmap.height * baseScale));

    const mimesToTry =
      preferredMime === "image/jpeg" ? ["image/jpeg"] : [preferredMime, "image/jpeg"];

    for (const mime of mimesToTry) {
      const qualitySteps = mime === "image/png" ? [undefined] : QUALITY_STEPS;
      const fillWhite = mime === "image/jpeg" && hasAlpha;

      for (const dimensionScale of DIMENSION_SCALES) {
        const width = Math.max(1, Math.round(baseWidth * dimensionScale));
        const height = Math.max(1, Math.round(baseHeight * dimensionScale));
        const canvas = drawScaled(bitmap, width, height, fillWhite);

        for (const quality of qualitySteps) {
          const blob = await encode(canvas, mime, quality);
          if (blob && blob.size <= MAX_ATTACHMENT_SIZE_BYTES) {
            if (blob.size >= file.size) return file;
            return new File([blob], withExtension(file.name, extensionForMime(mime)), {
              type: mime,
            });
          }
        }
      }
    }

    throw new ImageOptimizeError("too-large", file.name);
  } finally {
    bitmap.close();
  }
}
