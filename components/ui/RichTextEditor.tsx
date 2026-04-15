"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEffect, useCallback, useState } from "react";
import {
  Bold, Italic, UnderlineIcon, Strikethrough,
  Heading2, Heading3,
  List, ListOrdered, Quote, Code, Code2,
  Minus, Link2, Image as ImageIcon, Undo, Redo,
  AlignLeft, AlignCenter, AlignRight,
  X,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active
          ? "bg-[#1F4788] text-white"
          : "text-[#555] hover:bg-[#f0f4ff] hover:text-[#1F4788]"
      } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-[#e0e0e0] mx-0.5" />;
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: { HTMLAttributes: { class: "not-prose" } },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", class: "text-[#4CAF50] underline" },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full mx-auto block" },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Write your post content here…",
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[400px] px-5 py-4 focus:outline-none text-[#333] leading-relaxed",
      },
    },
    immediatelyRender: false,
  });

  // Sync external value changes (e.g. on first load)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  const openLinkModal = useCallback(() => {
    const prev = editor?.getAttributes("link").href || "";
    setLinkUrl(prev);
    setLinkModalOpen(true);
  }, [editor]);

  const applyLink = useCallback(() => {
    if (!editor) return;
    if (!linkUrl.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl.trim() }).run();
    }
    setLinkModalOpen(false);
    setLinkUrl("");
  }, [editor, linkUrl]);

  const applyImage = useCallback(() => {
    if (!editor || !imageUrl.trim()) return;
    editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
    setImageModalOpen(false);
    setImageUrl("");
  }, [editor, imageUrl]);

  if (!editor) return null;

  return (
    <div className="border border-[#ddd] rounded overflow-hidden focus-within:ring-2 focus-within:ring-[#1F4788] focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-[#eee] bg-[#fafafa]">
        {/* History */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
          <Undo size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
          <Redo size={14} />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={14} />
        </ToolbarButton>

        <Divider />

        {/* Inline marks */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          title="Inline code"
        >
          <Code size={14} />
        </ToolbarButton>

        <Divider />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Align left"
        >
          <AlignLeft size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Align center"
        >
          <AlignCenter size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Align right"
        >
          <AlignRight size={14} />
        </ToolbarButton>

        <Divider />

        {/* Lists & blocks */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          <List size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered list"
        >
          <ListOrdered size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          <Quote size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code block"
        >
          <Code2 size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal rule"
        >
          <Minus size={14} />
        </ToolbarButton>

        <Divider />

        {/* Link & image */}
        <ToolbarButton
          onClick={openLinkModal}
          active={editor.isActive("link")}
          title="Insert link"
        >
          <Link2 size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setImageModalOpen(true)}
          title="Insert image"
        >
          <ImageIcon size={14} />
        </ToolbarButton>
      </div>

      {/* Editor body */}
      <EditorContent editor={editor} />

      {/* Word count */}
      <div className="px-4 py-1.5 border-t border-[#f0f0f0] bg-[#fafafa] text-right">
        <span className="text-[11px] text-[#bbb]">
          {editor.storage.characterCount?.words?.() ?? 0} words
        </span>
      </div>

      {/* Link modal */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1F4788] text-sm">Insert Link</h3>
              <button type="button" onClick={() => setLinkModalOpen(false)} className="text-[#999] hover:text-[#333]">
                <X size={16} />
              </button>
            </div>
            <input
              autoFocus
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyLink()}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788] mb-4"
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => setLinkModalOpen(false)}
                className="flex-1 px-4 py-2 border border-[#ddd] rounded text-sm font-medium hover:bg-[#F5F5F5]">
                Cancel
              </button>
              <button type="button" onClick={applyLink}
                className="flex-1 px-4 py-2 bg-[#1F4788] text-white rounded text-sm font-semibold hover:bg-[#163766]">
                {linkUrl.trim() ? "Apply" : "Remove link"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image modal */}
      {imageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1F4788] text-sm">Insert Image URL</h3>
              <button type="button" onClick={() => setImageModalOpen(false)} className="text-[#999] hover:text-[#333]">
                <X size={16} />
              </button>
            </div>
            <input
              autoFocus
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyImage()}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788] mb-4"
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => setImageModalOpen(false)}
                className="flex-1 px-4 py-2 border border-[#ddd] rounded text-sm font-medium hover:bg-[#F5F5F5]">
                Cancel
              </button>
              <button type="button" onClick={applyImage}
                className="flex-1 px-4 py-2 bg-[#1F4788] text-white rounded text-sm font-semibold hover:bg-[#163766]">
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
