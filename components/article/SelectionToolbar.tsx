"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function SelectionToolbar() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();

      if (
        !selection ||
        selection.isCollapsed ||
        selection.toString().trim().length === 0
      ) {
        setIsVisible(false);
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const selectedText = selection.toString();

      setText(selectedText);
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + window.scrollY - 10,
      });
      setIsVisible(true);
    };

    document.addEventListener("selectionchange", handleSelection);
    return () =>
      document.removeEventListener("selectionchange", handleSelection);
  }, []);

  const handleSelect = () => {
    console.log("Selected text:", text);
    window.getSelection()?.removeAllRanges();
    setIsVisible(false);
  };

  if (!isVisible || !position) return null;

  return createPortal(
    <div
      className="fixed z-50 flex -translate-x-1/2 -translate-y-full flex-col items-center animate-in fade-in zoom-in duration-200"
      style={{ left: position.x, top: position.y }}
    >
      <div className="mb-2 flex items-center gap-3 rounded-lg bg-neutral-900 px-3 py-2 text-white shadow-xl">
        <span className="text-xs font-medium text-neutral-300">
          {text.length} chars
        </span>
        <div className="h-4 w-px bg-neutral-700" />
        <button
          onClick={handleSelect}
          className="text-xs font-bold text-blue-400 hover:text-blue-300"
        >
          Select
        </button>
      </div>
      <div className="h-2 w-2 rotate-45 bg-neutral-900" />
    </div>,
    document.body
  );
}
