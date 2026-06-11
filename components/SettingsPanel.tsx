"use client";

import React from "react";
import { VectorizeOptions } from "@/lib/vectorize";

interface SettingsPanelProps {
  mode: "wrapper" | "vectorize";
  setMode: (mode: "wrapper" | "vectorize") => void;
  options: VectorizeOptions;
  setOptions: (options: VectorizeOptions) => void;
}

export default function SettingsPanel({ mode, setMode, options, setOptions }: SettingsPanelProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 animate-in fade-in duration-500">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversion Settings</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={mode === "wrapper"}
              onChange={() => setMode("wrapper")}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-gray-700 font-medium">SVG Wrapper</span>
            <span className="text-xs text-gray-500">(Lossless, Fast)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={mode === "vectorize"}
              onChange={() => setMode("vectorize")}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-gray-700 font-medium">Vectorize</span>
            <span className="text-xs text-gray-500">(Paths, Scalable)</span>
          </label>
        </div>
      </div>

      {mode === "vectorize" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Colors: {options.colors}
            </label>
            <input
              type="range"
              min="2"
              max="32"
              value={options.colors}
              onChange={(e) => setOptions({ ...options, colors: parseInt(e.target.value) })}
              className="w-full accent-blue-600"
            />
            <p className="text-xs text-gray-500 mt-1">Number of colors (2-32)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blur Radius: {options.blurradius}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={options.blurradius}
              onChange={(e) => setOptions({ ...options, blurradius: parseInt(e.target.value) })}
              className="w-full accent-blue-600"
            />
            <p className="text-xs text-gray-500 mt-1">Pre-process blur</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Simplification: {options.simplification}
            </label>
            <input
              type="range"
              min="0"
              max="16"
              step="1"
              value={options.simplification}
              onChange={(e) => setOptions({ ...options, simplification: parseInt(e.target.value) })}
              className="w-full accent-blue-600"
            />
            <p className="text-xs text-gray-500 mt-1">Path omit threshold</p>
          </div>
        </div>
      )}
    </div>
  );
}
