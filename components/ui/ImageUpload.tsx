"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Link as LinkIcon, ImageIcon } from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

type Mode = "upload" | "url";

export default function ImageUpload({ value, onChange, folder = "uploads", label = "Image" }: Props) {
  const [mode, setMode] = useState<Mode>("upload");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      // 1. Get presigned URL
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: file.type, size: file.size, folder }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Failed to get upload URL");
      }

      const { uploadUrl, publicUrl } = await res.json();

      // 2. PUT directly to S3
      const put = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!put.ok) throw new Error("Upload to storage failed");

      onChange(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    uploadFile(files[0]);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="space-y-3">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border font-medium transition-colors ${
            mode === "upload"
              ? "bg-[#1F4788] text-white border-[#1F4788]"
              : "bg-white text-[#555] border-[#ddd] hover:border-[#1F4788]"
          }`}
        >
          <Upload size={12} /> Upload file
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border font-medium transition-colors ${
            mode === "url"
              ? "bg-[#1F4788] text-white border-[#1F4788]"
              : "bg-white text-[#555] border-[#ddd] hover:border-[#1F4788]"
          }`}
        >
          <LinkIcon size={12} /> Paste URL
        </button>
      </div>

      {mode === "upload" ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
            dragging
              ? "border-[#1F4788] bg-[#1F4788]/5"
              : "border-[#ddd] hover:border-[#1F4788] hover:bg-[#1F4788]/3"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="w-10 h-10 rounded-full bg-[#1F4788]/10 flex items-center justify-center">
            {uploading ? (
              <div className="w-5 h-5 border-2 border-[#1F4788] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload size={18} className="text-[#1F4788]" />
            )}
          </div>
          <p className="text-sm text-[#555] font-medium">
            {uploading ? "Uploading…" : "Click or drag & drop"}
          </p>
          <p className="text-xs text-[#999]">JPEG, PNG, WebP, GIF — max 5 MB</p>
        </div>
      ) : (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788]"
        />
      )}

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X size={12} /> {error}
        </p>
      )}

      {/* Preview */}
      {value && (
        <div className="relative group">
          <div className="relative h-32 w-full rounded overflow-hidden bg-[#F5F5F5] border border-[#eee]">
            <Image
              src={value}
              alt={label}
              fill
              className="object-cover"
              onError={() => {/* invalid URL — just hide */}}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onChange(""); }}
                className="bg-white rounded-full p-1.5 shadow-md hover:bg-red-50"
              >
                <X size={14} className="text-red-500" />
              </button>
            </div>
          </div>
          <p className="text-xs text-[#999] mt-1 truncate">{value}</p>
        </div>
      )}

      {!value && mode === "upload" && (
        <div className="h-32 w-full rounded bg-[#F5F5F5] border border-dashed border-[#ddd] flex flex-col items-center justify-center gap-1">
          <ImageIcon size={22} className="text-[#ccc]" />
          <p className="text-xs text-[#bbb]">No image selected</p>
        </div>
      )}
    </div>
  );
}
