// components/Modal.jsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HiOutlineX } from "react-icons/hi";

const ensureModalRoot = () => {
  let root = document.getElementById("modal-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "modal-root";
    document.body.appendChild(root);
  }
  return root;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  closeOnOverlay = true,
  className = "",
  overlayClassName = "",
  ariaLabelledBy, // pass an id of your title if you have one
}) {
  const rootRef = useRef(null);
  const previouslyFocused = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    rootRef.current = ensureModalRoot();

    // Save focus, lock scroll
    previouslyFocused.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // ESC to close
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);

    // Focus the close button (simple focus trap entry point)
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      // restore focus
      previouslyFocused.current && previouslyFocused.current.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      aria-labelledby={ariaLabelledBy}
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className={
          `absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${overlayClassName}`
        }
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Panel */}
      <div
        className={
          `relative w-full max-w-lg mx-4 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl
           ring-1 ring-black/5 dark:ring-0 transition-all ${className}`
        }
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 inline-flex items-center justify-center
                     h-9 w-9 rounded-full z-11
                     text-red-600 hover:text-slate-900
                     dark:text-slate-300 dark:hover:text-white
                     bg-white/70 dark:bg-slate-800/70
                     ring-1 ring-black/10 dark:ring-white/10
                     backdrop-blur-md
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-pretty/50"
        >
          <HiOutlineX className="h-5 w-5" />
        </button>

        {/* Body (your content goes here) */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, ensureModalRoot());
}
