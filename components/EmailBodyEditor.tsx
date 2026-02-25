"use client";

import { useRef, useEffect, useCallback } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function EmailBodyEditor({ value, onChange, placeholder = "E-Mail-Text eingeben..." }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedSelectionRef = useRef<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

  const restoreSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && savedSelectionRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    }
  }, []);

  const execCommand = useCallback((command: string, value: string | undefined = undefined) => {
    restoreSelection();
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  }, [restoreSelection]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleLink = () => {
    const url = prompt("URL eingeben:", "https://");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const ToolbarBtn = ({ onClick, title, children, className = "" }: { onClick: () => void; title: string; children: React.ReactNode; className?: string }) => (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
      title={title}
      className={`px-2 py-1.5 text-sm hover:bg-slate-200 rounded transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar Row 1 */}
      <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
        {/* Format Dropdown */}
        <select
          onChange={(e) => {
            restoreSelection();
            document.execCommand("formatBlock", false, `<${e.target.value}>`);
            editorRef.current?.focus();
            handleInput();
          }}
          onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
          onFocus={saveSelection}
          className="px-2 py-1 rounded border border-slate-300 text-sm bg-white cursor-pointer"
          defaultValue="p"
        >
          <option value="p">Paragraph</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
        </select>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        {/* Text Formatting */}
        <ToolbarBtn onClick={() => execCommand("bold")} title="Bold" className="font-bold">B</ToolbarBtn>
        <ToolbarBtn onClick={() => execCommand("italic")} title="Italic" className="italic">I</ToolbarBtn>
        <ToolbarBtn onClick={() => execCommand("underline")} title="Underline" className="underline">U</ToolbarBtn>
        <ToolbarBtn onClick={() => execCommand("strikeThrough")} title="Strikethrough" className="line-through">S</ToolbarBtn>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        {/* Font Size */}
        <select
          onChange={(e) => {
            restoreSelection();
            document.execCommand("fontSize", false, e.target.value);
            editorRef.current?.focus();
            handleInput();
          }}
          onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
          onFocus={saveSelection}
          className="px-2 py-1 rounded border border-slate-300 text-sm bg-white cursor-pointer"
          defaultValue="3"
        >
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">XL</option>
        </select>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        {/* Colors */}
        <input
          type="color"
          onChange={(e) => {
            restoreSelection();
            document.execCommand("foreColor", false, e.target.value);
            editorRef.current?.focus();
            handleInput();
          }}
          onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
          className="w-7 h-7 cursor-pointer rounded border border-slate-300"
          title="Text Color"
          defaultValue="#000000"
        />
        <input
          type="color"
          onChange={(e) => {
            restoreSelection();
            document.execCommand("hiliteColor", false, e.target.value);
            editorRef.current?.focus();
            handleInput();
          }}
          onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
          className="w-7 h-7 cursor-pointer rounded border border-slate-300"
          title="Highlight"
          defaultValue="#ffff00"
        />

        <div className="w-px h-5 bg-slate-300 mx-1" />

        {/* Alignment */}
        <ToolbarBtn onClick={() => execCommand("justifyLeft")} title="Left">L</ToolbarBtn>
        <ToolbarBtn onClick={() => execCommand("justifyCenter")} title="Center">C</ToolbarBtn>
        <ToolbarBtn onClick={() => execCommand("justifyRight")} title="Right">R</ToolbarBtn>
        <ToolbarBtn onClick={() => execCommand("justifyFull")} title="Justify">J</ToolbarBtn>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        {/* Lists */}
        <ToolbarBtn onClick={() => execCommand("insertUnorderedList")} title="Bullet List">• List</ToolbarBtn>
        <ToolbarBtn onClick={() => execCommand("insertOrderedList")} title="Numbered List">1. List</ToolbarBtn>
      </div>

      {/* Toolbar Row 2 */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
        {/* Indent */}
        <ToolbarBtn onClick={() => execCommand("outdent")} title="Outdent">←</ToolbarBtn>
        <ToolbarBtn onClick={() => execCommand("indent")} title="Indent">→</ToolbarBtn>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        {/* Link */}
        <ToolbarBtn onClick={handleLink} title="Insert Link" className="text-blue-600">Link</ToolbarBtn>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        {/* Remove Link / Format */}
        <ToolbarBtn onClick={() => execCommand("unlink")} title="Remove Link" className="text-red-500">✕</ToolbarBtn>
        <ToolbarBtn onClick={() => execCommand("removeFormat")} title="Clear Formatting">Clear</ToolbarBtn>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={saveSelection}
        className="min-h-[280px] p-4 focus:outline-none text-sm leading-relaxed"
        data-placeholder={placeholder}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
