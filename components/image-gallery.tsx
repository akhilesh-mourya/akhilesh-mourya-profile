"use client";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";

type Props = {
  images: string[];
  project: string;
  variant?: "pair" | "compact";
  className?: string;
  caption?: string;
};
export function ImageGallery({
  images,
  project,
  variant = "pair",
  className = "",
  caption = "Mobile application",
}: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const open = index !== null;
  useEffect(() => {
    const element = dialog.current;
    if (!element || !open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!element.open) element.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (element.open) element.close();
    };
  }, [open]);
  const change = (delta: number) =>
    setIndex((current) =>
      current === null
        ? null
        : (current + delta + images.length) % images.length,
    );
  return (
    <>
      <figure
        className={
          variant === "compact"
            ? `compact-gallery ${className}`
            : `project-art ${className}`
        }
        aria-label={`${project} App Store screenshots`}
      >
        {images.map((src, number) => (
          <button
            className="gallery-trigger"
            type="button"
            key={src}
            onClick={() => setIndex(number)}
            aria-label={`Enlarge ${project} screenshot ${number + 1} of ${images.length}`}
          >
            <Image
              src={src}
              alt={`${project} official product preview ${number + 1}`}
              width={392}
              height={696}
              sizes={
                variant === "compact"
                  ? "(max-width:599px) 100px, 150px"
                  : "(max-width:599px) 140px, (max-width:899px) 210px, 240px"
              }
            />
            <span className="image-zoom-hint" aria-hidden="true">
              <Expand size={15} />
            </span>
          </button>
        ))}
        <figcaption className={variant === "compact" ? "visually-hidden" : ""}>
          App Store previews<span>{caption} · Select to enlarge</span>
        </figcaption>
      </figure>
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-labelledby={titleId}
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            change(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            change(-1);
          }
        }}
      >
        <div className="image-dialog-header">
          <h2 id={titleId}>
            {project}
            <span>
              Screenshot {(index ?? 0) + 1} of {images.length}
            </span>
          </h2>
          <button
            type="button"
            className="icon-button"
            aria-label="Close image viewer"
            onClick={() => dialog.current?.close()}
          >
            <X size={21} aria-hidden="true" />
          </button>
        </div>
        <div className="image-dialog-body">
          {index !== null && (
            <Image
              key={images[index]}
              src={images[index]}
              alt={`${project} screenshot ${index + 1}, enlarged`}
              fill
              sizes="(max-width:599px) calc(100vw - 64px), 600px"
              style={{ objectFit: "contain" }}
            />
          )}
        </div>
        <div className="image-dialog-footer">
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="text-link"
                onClick={() => change(-1)}
              >
                <ArrowLeft size={18} aria-hidden="true" />
                Previous
              </button>
              <button
                type="button"
                className="text-link"
                onClick={() => change(1)}
              >
                Next
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </>
          )}
          <p>
            Escape to close{images.length > 1 ? " · Arrow keys to browse" : ""}
          </p>
        </div>
      </dialog>
    </>
  );
}
