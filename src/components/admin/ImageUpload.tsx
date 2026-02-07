"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder: string;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE = 4 * 1024 * 1024; // 4 MB

export default function ImageUpload({ value, onChange, folder }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Допустимые форматы: JPEG, PNG, WebP, AVIF");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("Максимальный размер файла — 4 МБ");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ошибка загрузки");
      }

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  }, [folder, onChange]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleRemove = () => {
    onChange("");
  };

  if (value) {
    return (
      <div className="space-y-2">
        <div className="relative inline-block">
          <img
            src={value}
            alt="Uploaded"
            className="w-40 h-28 rounded-xl object-cover border border-slate-200"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
            title="Удалить изображение"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-colors
          ${dragOver
            ? "border-[#5838a8] bg-[#5838a8]/5"
            : "border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100"
          }
          ${uploading ? "pointer-events-none opacity-70" : ""}
        `}
      >
        {uploading ? (
          <>
            <Loader2 className="w-8 h-8 text-[#5838a8] animate-spin" />
            <span className="text-sm text-slate-500">Загрузка...</span>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
              {dragOver ? (
                <ImageIcon className="w-5 h-5 text-[#5838a8]" />
              ) : (
                <Upload className="w-5 h-5 text-slate-500" />
              )}
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-slate-700">
                Перетащите файл сюда
              </span>
              <span className="text-sm text-slate-400 block">
                или нажмите для выбора
              </span>
            </div>
            <span className="text-xs text-slate-400">
              JPEG, PNG, WebP, AVIF — до 4 МБ
            </span>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
