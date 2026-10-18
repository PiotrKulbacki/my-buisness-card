/**
 * Shared client/server rules for brief attachments. Limits are kept low enough to
 * stay well under Vercel's hard 4.5MB request body limit for Serverless Functions
 * (see https://vercel.com/docs/functions/limitations#request-body-size) — files are
 * relayed as email attachments (Brevo), not stored, so that limit is the real ceiling.
 */

export const ACCEPTED_ATTACHMENT_EXTENSIONS = [
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".docx",
  ".xlsx",
  ".pptx",
] as const;

export type AttachmentExtension = (typeof ACCEPTED_ATTACHMENT_EXTENSIONS)[number];

/**
 * MIME types matching ACCEPTED_ATTACHMENT_EXTENSIONS, used only to widen the
 * <input accept> hint (see ATTACHMENT_ACCEPT_ATTRIBUTE) — actual validation
 * never trusts a MIME type, only the magic-byte check in matchesFileSignature.
 */
const ACCEPTED_ATTACHMENT_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
] as const;

/**
 * Extensions alone leave the OS's "Open" button disabled when picking a photo
 * from macOS's Photos-library integration in the native file dialog — that
 * picker matches selections by MIME/UTI, not by file extension. Including both
 * fixes it without loosening what we actually accept server-side.
 */
export const ATTACHMENT_ACCEPT_ATTRIBUTE = [
  ...ACCEPTED_ATTACHMENT_EXTENSIONS,
  ...ACCEPTED_ATTACHMENT_MIME_TYPES,
].join(",");

export const MAX_ATTACHMENTS = 3;
/**
 * Ceiling for any attachment as it's actually uploaded: documents and GIFs
 * unchanged (never compressed), photos AFTER client-side optimization.
 */
export const MAX_ATTACHMENT_SIZE_BYTES = 3 * 1024 * 1024;
export const MAX_TOTAL_ATTACHMENT_SIZE_BYTES = 4 * 1024 * 1024;

/**
 * Photos (not GIFs — see COMPRESSIBLE_IMAGE_EXTENSIONS) may be selected up to this
 * size and are then compressed client-side down to MAX_ATTACHMENT_SIZE_BYTES before
 * upload. This only bounds what the browser is asked to decode/compress — it is not
 * itself sent anywhere, so it doesn't need to respect the Vercel request-body limit.
 */
export const MAX_ORIGINAL_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

/**
 * Raster formats safe to re-encode via <canvas> without losing anything that
 * matters for a review photo. GIF is excluded: re-encoding would flatten
 * animation to a single frame, so GIFs are treated like documents instead
 * (sent as-is, capped at MAX_ATTACHMENT_SIZE_BYTES).
 */
export const COMPRESSIBLE_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"] as const;

export function isCompressibleImageExtension(filename: string): boolean {
  return (COMPRESSIBLE_IMAGE_EXTENSIONS as readonly string[]).includes(getExtension(filename));
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function getExtension(filename: string): string {
  const match = /\.[^.]+$/.exec(filename.toLowerCase());
  return match ? match[0] : "";
}

function isAcceptedExtension(filename: string): boolean {
  return (ACCEPTED_ATTACHMENT_EXTENSIONS as readonly string[]).includes(getExtension(filename));
}

export type AttachmentRejectionReason = "count" | "type" | "size" | "total";

/**
 * Metadata-only check (name + size), safe to run before reading file bytes.
 * Used both for instant client-side feedback and as a cheap first server-side gate.
 */
export function validateAttachmentSelection(
  files: readonly { name: string; size: number }[],
): { ok: true } | { ok: false; reason: AttachmentRejectionReason } {
  if (files.length > MAX_ATTACHMENTS) return { ok: false, reason: "count" };

  let total = 0;
  for (const file of files) {
    if (!isAcceptedExtension(file.name)) return { ok: false, reason: "type" };
    if (file.size > MAX_ATTACHMENT_SIZE_BYTES) return { ok: false, reason: "size" };
    total += file.size;
  }
  if (total > MAX_TOTAL_ATTACHMENT_SIZE_BYTES) return { ok: false, reason: "total" };

  return { ok: true };
}

function matchesBytes(bytes: Uint8Array, offset: number, expected: readonly number[]): boolean {
  if (bytes.length < offset + expected.length) return false;
  return expected.every((value, index) => bytes[offset + index] === value);
}

const SIGNATURES: Record<AttachmentExtension, (bytes: Uint8Array) => boolean> = {
  ".pdf": (b) => matchesBytes(b, 0, [0x25, 0x50, 0x44, 0x46]),
  ".png": (b) => matchesBytes(b, 0, [0x89, 0x50, 0x4e, 0x47]),
  ".jpg": (b) => matchesBytes(b, 0, [0xff, 0xd8, 0xff]),
  ".jpeg": (b) => matchesBytes(b, 0, [0xff, 0xd8, 0xff]),
  ".gif": (b) => matchesBytes(b, 0, [0x47, 0x49, 0x46, 0x38]),
  ".webp": (b) =>
    matchesBytes(b, 0, [0x52, 0x49, 0x46, 0x46]) && matchesBytes(b, 8, [0x57, 0x45, 0x42, 0x50]),
  // .docx/.xlsx/.pptx are all zip containers (OOXML) — the local file header signature
  // can't distinguish between them, so it only rules out non-zip files impersonating one.
  ".docx": (b) => matchesBytes(b, 0, [0x50, 0x4b, 0x03, 0x04]),
  ".xlsx": (b) => matchesBytes(b, 0, [0x50, 0x4b, 0x03, 0x04]),
  ".pptx": (b) => matchesBytes(b, 0, [0x50, 0x4b, 0x03, 0x04]),
};

/** Verifies the file's real content matches its claimed extension (magic-byte sniff). */
export function matchesFileSignature(filename: string, bytes: Uint8Array): boolean {
  const extension = getExtension(filename) as AttachmentExtension;
  const check = SIGNATURES[extension];
  return check ? check(bytes) : false;
}

/** Strips path separators/control characters from a filename before it reaches an email. */
export function sanitizeAttachmentFilename(filename: string): string {
  const extension = getExtension(filename);
  const base = filename.slice(0, filename.length - extension.length);
  const cleanedBase = base
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}\-_. ]+/gu, "_")
    .trim()
    .slice(0, 80);
  return `${cleanedBase || "attachment"}${extension}`;
}
