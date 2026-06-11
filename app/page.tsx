"use client";

import React, { useState } from "react";
import Uploader from "@/components/Uploader";
import SettingsPanel from "@/components/SettingsPanel";
import ConvertButton from "@/components/ConvertButton";
import PreviewPanel from "@/components/PreviewPanel";
import { createSvgWrapper } from "@/lib/svgWrapper";
import { vectorizeImage, VectorizeOptions } from "@/lib/vectorize";
import { LanguageProvider, useLanguage } from "@/lib/i18n";

function HomeContent() {
  const { t, language, setLanguage } = useLanguage();
  
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [filename, setFilename] = useState<string>("");
  
  const [svgOutput, setSvgOutput] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const [mode, setMode] = useState<"wrapper" | "vectorize">("wrapper");
  const [options, setOptions] = useState<VectorizeOptions>({
    colors: 16,
    blurradius: 0,
    simplification: 8,
  });

  const handleImageSelected = (dataUrl: string, width: number, height: number, name: string) => {
    setOriginalImage(dataUrl);
    setImageWidth(width);
    setImageHeight(height);
    setFilename(name);
    setSvgOutput(null);
  };

  const handleConvert = async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    // Add a tiny delay to allow the UI to update to the processing state
    await new Promise(resolve => setTimeout(resolve, 50));
    setSvgOutput(null);
    
    try {
      if (mode === "wrapper") {
        const result = createSvgWrapper(originalImage, imageWidth, imageHeight);
        setSvgOutput(result);
      } else {
        const result = await vectorizeImage(originalImage, options);
        setSvgOutput(result);
      }
    } catch (error) {
      console.error("Conversion failed:", error);
      alert(t("alert.error"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 right-4 flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${language === "en" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("vi")}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${language === "vi" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}
        >
          VI
        </button>
      </div>

      <div className="max-w-5xl mx-auto mt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            {t("app.title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("app.description")}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <Uploader onImageSelected={handleImageSelected} />

            {originalImage && (
              <div className="mt-8 animate-in fade-in duration-500">
                <SettingsPanel
                  mode={mode}
                  setMode={setMode}
                  options={options}
                  setOptions={setOptions}
                />
                
                <ConvertButton
                  onClick={handleConvert}
                  disabled={!originalImage}
                  isProcessing={isProcessing}
                />

                <PreviewPanel
                  originalImage={originalImage}
                  svgOutput={svgOutput}
                  filename={filename}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
