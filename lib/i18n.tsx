"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "vi";

type Dictionary = {
  [key: string]: string;
};

const dictionaries: Record<Language, Dictionary> = {
  en: {
    "app.title": "Image to SVG Converter",
    "app.description": "Convert your PNG or JPG images to SVG formats instantly entirely in your browser. Choose between a fast wrapper or deep vectorization.",
    "uploader.instruction": "Click or drag and drop to upload",
    "uploader.subtext": "PNG or JPG up to 10MB",
    "uploader.error": "Please upload a PNG or JPG file.",
    "settings.title": "Conversion Settings",
    "settings.mode": "Mode",
    "settings.wrapper.label": "SVG Wrapper",
    "settings.wrapper.desc": "(Lossless, Fast)",
    "settings.vectorize.label": "Vectorize",
    "settings.vectorize.desc": "(Paths, Scalable)",
    "settings.guide.title": "Which mode should I choose?",
    "settings.guide.wrapper": "🖼️ SVG Wrapper: Embeds the original image inside an SVG file. Keeps 100% original quality but is NOT a true vector. Best for photographs or when you just need an .svg extension quickly.",
    "settings.guide.vectorize": "✨ Vectorize: Traces your image into real mathematical paths. It can be scaled infinitely without losing quality and can be edited in Illustrator. Best for logos, icons, and line art.",
    "settings.colors": "Colors",
    "settings.colors.desc": "Number of colors (2-32)",
    "settings.blur": "Blur Radius",
    "settings.blur.desc": "Pre-process blur",
    "settings.simplify": "Simplification",
    "settings.simplify.desc": "Path omit threshold",
    "preview.original": "Original",
    "preview.svg": "SVG Preview",
    "preview.processing": "Processing...",
    "preview.download": "Download SVG",
    "button.processing": "Processing...",
    "button.convert": "Convert to SVG",
    "alert.error": "Failed to convert image. Check console for details.",
  },
  vi: {
    "app.title": "Chuyển Đổi Ảnh Sang SVG",
    "app.description": "Chuyển đổi tức thì hình ảnh PNG hoặc JPG sang định dạng SVG hoàn toàn trên trình duyệt của bạn. Chọn giữa trình bọc nhanh hoặc vector hóa sâu.",
    "uploader.instruction": "Nhấp hoặc kéo thả để tải lên",
    "uploader.subtext": "PNG hoặc JPG tối đa 10MB",
    "uploader.error": "Vui lòng tải lên file PNG hoặc JPG.",
    "settings.title": "Cài đặt chuyển đổi",
    "settings.mode": "Chế độ",
    "settings.wrapper.label": "Bọc SVG (Wrapper)",
    "settings.wrapper.desc": "(Giữ nguyên chất lượng, Nhanh)",
    "settings.vectorize.label": "Vector Hóa",
    "settings.vectorize.desc": "(Đường dẫn, Có thể thu phóng)",
    "settings.guide.title": "Tôi nên chọn chế độ nào?",
    "settings.guide.wrapper": "🖼️ Bọc SVG: Chỉ đóng gói ảnh gốc của bạn vào trong 1 file SVG. Giữ nguyên 100% chất lượng ảnh nhưng KHÔNG phải là vector thật. Phù hợp cho ảnh chụp hoặc khi chỉ cần đuôi .svg.",
    "settings.guide.vectorize": "✨ Vector Hóa: Đồ lại ảnh thành các đường nét toán học (Vector thực sự). Có thể phóng to vô hạn không mờ và mở ra sửa được từng nét trong Illustrator. Phù hợp cho Logo, Icon, nét vẽ.",
    "settings.colors": "Số màu",
    "settings.colors.desc": "Số lượng màu (2-32)",
    "settings.blur": "Độ mờ (Blur Radius)",
    "settings.blur.desc": "Làm mờ trước khi xử lý",
    "settings.simplify": "Đơn giản hóa",
    "settings.simplify.desc": "Ngưỡng bỏ qua đường dẫn",
    "preview.original": "Ảnh gốc",
    "preview.svg": "Bản xem trước SVG",
    "preview.processing": "Đang xử lý...",
    "preview.download": "Tải SVG",
    "button.processing": "Đang xử lý...",
    "button.convert": "Chuyển đổi sang SVG",
    "alert.error": "Chuyển đổi ảnh thất bại. Xem chi tiết trong console.",
  },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return dictionaries[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
