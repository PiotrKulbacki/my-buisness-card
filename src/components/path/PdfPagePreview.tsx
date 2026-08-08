"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";

type Props = {
  url: string;
  title: string;
};

/**
 * Renders every PDF page scaled to container width, at devicePixelRatio for sharp text.
 * Native iframe PDF viewers ignore CSS sizing on mobile (especially iOS).
 */
export function PdfPagePreview({ url, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pagesEl = pagesRef.current;
    if (!container || !pagesEl) return;

    let disposed = false;
    let drawGeneration = 0;
    let pdfDoc: PDFDocumentProxy | null = null;
    const renderTasks: RenderTask[] = [];

    async function draw() {
      if (!container || !pagesEl || disposed) return;

      const generation = ++drawGeneration;
      for (const task of renderTasks) task.cancel();
      renderTasks.length = 0;

      const cssWidth = container.clientWidth - 24;
      if (cssWidth < 32) return;

      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        if (!pdfDoc) {
          pdfDoc = await pdfjs.getDocument({ url }).promise;
        }
        if (disposed || generation !== drawGeneration || !pdfDoc) return;

        const numPages = pdfDoc.numPages;
        setPageCount(numPages);

        while (pagesEl.childElementCount < numPages) {
          const wrap = document.createElement("div");
          wrap.className = "flex w-full justify-center";
          const canvas = document.createElement("canvas");
          canvas.className = "h-auto max-w-full rounded-sm bg-white shadow-sm";
          wrap.appendChild(canvas);
          pagesEl.appendChild(wrap);
        }
        while (pagesEl.childElementCount > numPages) {
          pagesEl.lastElementChild?.remove();
        }

        const dpr = Math.min(window.devicePixelRatio || 1, 3);

        for (let pageNumber = 1; pageNumber <= numPages; pageNumber += 1) {
          if (disposed || generation !== drawGeneration) return;

          const page = await pdfDoc.getPage(pageNumber);
          const base = page.getViewport({ scale: 1 });
          const cssScale = (cssWidth / base.width) * 0.98;
          const viewport = page.getViewport({ scale: Math.max(cssScale, 0.1) });

          const wrap = pagesEl.children[pageNumber - 1] as HTMLDivElement | undefined;
          const canvas = wrap?.querySelector("canvas");
          if (!canvas) continue;

          const context = canvas.getContext("2d");
          if (!context) {
            setFailed(true);
            return;
          }

          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;
          canvas.setAttribute("aria-label", `${title} — ${pageNumber}/${numPages}`);

          context.setTransform(dpr, 0, 0, dpr, 0, 0);
          context.clearRect(0, 0, viewport.width, viewport.height);

          const task = page.render({
            canvasContext: context,
            viewport,
            canvas,
          });
          renderTasks.push(task);
          await task.promise;
        }
      } catch (error) {
        const name = error instanceof Error ? error.name : "";
        if (name === "RenderingCancelledException") return;
        if (!disposed && generation === drawGeneration) setFailed(true);
      }
    }

    void draw();

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        void draw();
      }, 120);
    });
    observer.observe(container);

    return () => {
      disposed = true;
      clearTimeout(resizeTimer);
      for (const task of renderTasks) task.cancel();
      observer.disconnect();
      void pdfDoc?.cleanup();
      pdfDoc = null;
    };
  }, [url, title]);

  if (failed) {
    return (
      <iframe
        title={title}
        src={`${url}#toolbar=0&view=FitH`}
        className="h-full min-h-0 w-full flex-1 border-0 bg-white"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-black/40 p-3 md:p-6"
    >
      <div
        ref={pagesRef}
        className="mx-auto flex w-full max-w-full flex-col items-center gap-3"
        data-pages={pageCount || undefined}
      />
    </div>
  );
}
