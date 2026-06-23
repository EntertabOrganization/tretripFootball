"use client";

import { useEffect, useId, useRef } from "react";
import Quill from "quill";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  dir?: "ltr" | "rtl";
  required?: boolean;
  initialValue?: string;
};

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["blockquote", "link"],
  ["clean"],
];

export function RichTextEditor({
  name,
  label,
  placeholder,
  dir = "ltr",
  required = false,
  initialValue = "",
}: Props) {
  const editorId = useId();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) {
      return;
    }

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder,
      modules: {
        toolbar: toolbarOptions,
      },
    });

    quill.root.setAttribute("dir", dir);
    quill.root.innerHTML = initialValue;
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = quill.root.innerHTML;
    }

    quill.on("text-change", () => {
      if (!hiddenInputRef.current) {
        return;
      }

      const html = quill.root.innerHTML;
      const text = quill.getText().trim();
      hiddenInputRef.current.value = text ? html : "";
    });

    quillRef.current = quill;
  }, [dir, initialValue, placeholder]);

  return (
    <div className="grid gap-2">
      <label htmlFor={editorId} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div id={editorId} ref={editorRef} className="min-h-56 [&_.ql-editor]:min-h-48 [&_.ql-editor]:text-base [&_.ql-editor]:leading-7" />
      </div>
      <input ref={hiddenInputRef} type="hidden" name={name} required={required} />
    </div>
  );
}
