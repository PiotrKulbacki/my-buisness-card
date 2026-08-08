"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";

type Props = {
  url: string;
  title: string;
};

/**
 * Renders PDF page 1 scaled to fit the container.
 * Native iframe PDF viewers ignore CSS sizing on mobile (especially iOS).
 */
export function PdfPagePreview({ url, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let cancelled = false;
    let pdfDoc: PDFDocumentProxy | null = null;
    let renderTask: RenderTask | null = null;

    async function draw() {
      if (!container || !canvas || cancelled) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width < 32 || height < 32) return;

      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        if (!pdfDoc) {
          pdfDoc = await pdfjs.getDocument({ url }).promise;
        }
        if (cancelled || !pdfDoc) return;

        const page = await pdfDoc.getPage(1);
        const base = page.getViewport({ scale: 1 });
        const scale = Math.min(width / base.width, height / base.height) * 0.98;
        const viewport = page.getViewport({ scale: Math.max(scale, 0.1) });

        const context = canvas.getContext("2d");
        if (!context) {
          setFailed(true);
          return;
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        context.clearRect(0, 0, canvas.width, canvas.height);

        renderTask?.cancel();
        renderTask = page.render({
          canvasContext: context,
          viewport,
          canvas,
        });
        await renderTask.promise;
      } catch (error) {
        const name = error instanceof Error ? error.name : "";
        if (name === "RenderingCancelledException") return;
        if (!cancelled) setFailed(true);
      }
    }

    void draw();

    const observer = new ResizeObserver(() => {
      void draw();
    });
    observer.observe(container);

    return () => {
      cancelled = true;
      renderTask?.cancel();
      observer.disconnect();
      void pdfDoc?.cleanup();
      pdfDoc = null;
    };
  }, [url]);

  if (failed) {
    return (
      <iframe
        title={title}
        src={`${url}#toolbar=0&view=Fit`}
        className="h-full min-h-0 w-full flex-1 border-0 bg-white"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black/40 p-3 md:p-6"
    >
      <canvas ref={canvasRef} aria-label={title} className="max-h-full max-w-full" />
    </div>
  );
}
