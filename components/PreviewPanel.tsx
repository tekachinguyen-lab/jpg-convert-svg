"use client";

import React from "react";
import { Download } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface PreviewPanelProps {
  originalImage: string | null;
  svgOutput: string | null;
  filename: string;
}

export default function PreviewPanel({ originalImage, svgOutput, filename }: PreviewPanelProps) {
  const { t } = useLanguage();

  const handleDownload = () => {
    if (!svgOutput) return;
    const blob = new Blob([svgOutput], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.replace(/\.[^/.]+$/, "") + ".svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!originalImage) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{t("preview.original")}</h3>
          <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 flex items-center justify-center min-h-[300px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={originalImage} alt="Original" className="max-w-full max-h-[400px] object-contain" />
          </div>
        </div>

        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{t("preview.svg")}</h3>
          <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 flex items-center justify-center min-h-[300px] overflow-hidden">
            {svgOutput ? (
              <div
                className="max-w-full max-h-[400px] flex items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-[400px]"
                dangerouslySetInnerHTML={{ __html: svgOutput }}
              />
            ) : (
              <p className="text-gray-400 text-sm">{t("preview.processing")}</p>
            )}
          </div>
        </div>
      </div>

      {svgOutput && (
        <div className="flex justify-end">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            <Download className="w-5 h-5" />
            {t("preview.download")}
          </button>
        </div>
      )}
    </div>
  );
}
