"use client";

import React, { useCallback, useState } from "react";
import { UploadCloud } from "lucide-react";

interface UploaderProps {
  onImageSelected: (dataUrl: string, width: number, height: number, filename: string) => void;
}

export default function Uploader({ onImageSelected }: UploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/png") && !file.type.startsWith("image/jpeg")) {
      alert("Please upload a PNG or JPG file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        onImageSelected(dataUrl, img.width, img.height, file.name);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100"
      }`}
      onClick={() => document.getElementById("file-upload")?.click()}
    >
      <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
      <p className="text-sm text-gray-600 text-center font-medium">
        Click or drag and drop to upload
      </p>
      <p className="text-xs text-gray-400 mt-2">PNG or JPG up to 10MB</p>
      <input
        id="file-upload"
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}
