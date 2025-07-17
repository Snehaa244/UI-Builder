import React, { useEffect, useRef, useState } from 'react';

const ImageBlock = ({ id, content, onChange, onDelete }) => {
  const [url, setUrl] = useState(content?.url || '');
  const [alt, setAlt] = useState(content?.alt || '');
  const [borderRadius, setBorderRadius] = useState(content?.borderRadius || '8px');
  const [showShadow, setShowShadow] = useState(content?.showShadow ?? true);
  const [widthPercent, setWidthPercent] = useState(content?.widthPercent || 100);
  const [showStylePanel, setShowStylePanel] = useState(false);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    onChange(id, {
      url,
      alt,
      borderRadius,
      showShadow,
      widthPercent,
    });
  }, [url, alt, borderRadius, showShadow, widthPercent]);

  return (
    <div className="relative group bg-white p-4 border rounded-lg shadow-sm space-y-4">
      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition"
        title="Delete"
      >
        🗑
      </button>

      {/* URL Input */}
      <input
        type="text"
        placeholder="Paste Image URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-200"
      />

      {/* Alt Text Input */}
      <input
        type="text"
        placeholder="Alt text (for accessibility)"
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        className="w-full p-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-200"
      />

      {/* Image Preview */}
      {url && (
        <img
          src={url}
          alt={alt || 'Preview image'}
          className={`mx-auto ${showShadow ? 'shadow-md' : ''}`}
          style={{
            width: `${widthPercent}%`,
            borderRadius: borderRadius,
            transition: 'all 0.3s ease',
          }}
        />
      )}

      {/* Toggle Style Panel */}
      <button
        onClick={() => setShowStylePanel((prev) => !prev)}
        className="text-sm text-purple-600 underline hover:text-purple-800 transition"
      >
        ⚙️ Style
      </button>

      {/* Style Controls */}
      {showStylePanel && (
        <div className="p-4 mt-2 bg-gray-50 border border-gray-200 rounded-lg space-y-4 text-sm">
          {/* Radius Control */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              🟦 Border Radius: <span className="text-gray-500">{borderRadius}</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={parseInt(borderRadius)}
              onChange={(e) => setBorderRadius(`${e.target.value}px`)}
              className="w-full"
            />
          </div>

          {/* Width Control */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              📏 Width: <span className="text-gray-500">{widthPercent}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={widthPercent}
              onChange={(e) => setWidthPercent(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Shadow Toggle */}
          <div className="flex items-center gap-2">
            <input
              id={`shadow-${id}`}
              type="checkbox"
              checked={showShadow}
              onChange={(e) => setShowShadow(e.target.checked)}
              className="cursor-pointer"
            />
            <label htmlFor={`shadow-${id}`} className="text-gray-700 cursor-pointer">
              Show Shadow
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
