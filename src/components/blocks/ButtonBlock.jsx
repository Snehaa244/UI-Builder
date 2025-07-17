import React, { useState, useEffect, useRef } from 'react';

const ButtonBlock = ({ id, content, onChange, onDelete }) => {
  const [text, setText] = useState(content?.text || 'Click Me');
  const [bgColor, setBgColor] = useState(content?.bgColor || '#2563eb');
  const [textColor, setTextColor] = useState(content?.textColor || '#ffffff');
  const [borderColor, setBorderColor] = useState(content?.borderColor || '#2563eb');
  const [borderRadius, setBorderRadius] = useState(content?.borderRadius || '6px');
  const [borderWidth, setBorderWidth] = useState(content?.borderWidth || '1px');
  const [showStyle, setShowStyle] = useState(false);

  const editableRef = useRef(null);

  useEffect(() => {
    onChange(id, {
      text,
      bgColor,
      textColor,
      borderColor,
      borderRadius,
      borderWidth,
    });
  }, [text, bgColor, textColor, borderColor, borderRadius, borderWidth]);

  const handleInput = () => {
    const value = editableRef.current.innerText;
    setText(value);
  };

  const handleBlur = () => {
    const value = editableRef.current.innerText;
    setText(value);
  };

  return (
    <div className="relative group my-4 w-fit">
      {/* Editable Button */}
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleBlur}
        className="inline-block px-5 py-2 cursor-text outline-none text-center font-medium transition shadow-sm"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          border: `${borderWidth} solid ${borderColor}`,
          borderRadius,
          minWidth: '100px',
        }}
        spellCheck={false}
      >
        {text}
      </div>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="absolute -top-2 -right-2 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition"
        title="Delete"
      >
        🗑
      </button>

      {/* Style Toggle */}
      <div className="mt-3">
        <button
          onClick={() => setShowStyle(!showStyle)}
          className="text-xs text-purple-600 underline hover:text-purple-800 transition"
        >
          ⚙️ Style
        </button>
      </div>

      {/* Style Panel */}
      {showStyle && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <label className="w-28">Text Color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-8 h-6 border rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-28">Background:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-8 h-6 border rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-28">Border Color:</label>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="w-8 h-6 border rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-28">Border Width:</label>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={parseInt(borderWidth)}
              onChange={(e) => setBorderWidth(`${e.target.value}px`)}
              className="w-full ml-4"
            />
            <span className="ml-2">{borderWidth}</span>
          </div>

          <div className="flex items-center justify-between">
            <label className="w-28">Border Radius:</label>
            <select
              value={borderRadius}
              onChange={(e) => setBorderRadius(e.target.value)}
              className="px-2 py-1 border rounded"
            >
              <option value="0px">0px</option>
              <option value="4px">4px</option>
              <option value="6px">6px</option>
              <option value="8px">8px</option>
              <option value="12px">12px</option>
              <option value="999px">Full (Pill)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonBlock;
