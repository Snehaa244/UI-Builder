import React, { useRef, useState } from 'react';

const ParagraphBlock = ({ id, content, onChange, onDelete }) => {
  const titleRef = useRef(null);
  const paraRef = useRef(null);

  const [textColor, setTextColor] = useState(content?.textColor || '#000000');
  const [fontFamily, setFontFamily] = useState(content?.fontFamily || 'sans-serif');
  const [fontSize, setFontSize] = useState(content?.fontSize || '16px');
  const [showStyle, setShowStyle] = useState(false);

  const handleBlur = () => {
    const title = titleRef.current?.innerText;
    const paragraph = paraRef.current?.innerText;

    onChange(id, {
      title,
      paragraph,
      textColor,
      fontFamily,
      fontSize,
    });
  };

  return (
    <section
      className="bg-white p-5 rounded-lg shadow-md border border-gray-200 relative group transition-all"
      onBlur={handleBlur}
    >
      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition"
        title="Delete"
      >
        🗑️
      </button>

      {/* Style Toggle */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowStyle(!showStyle)}
          className="text-xs text-purple-600 underline hover:text-purple-800 transition"
        >
          ⚙️ Style
        </button>
      </div>

      {/* Style Controls */}
      {showStyle && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
          <label className="flex items-center gap-2">
             Color
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-6 h-6 border rounded"
            />
          </label>

          <label className="flex items-center gap-2">
             Font
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="px-2 py-1 border rounded"
            >
              <option value="sans-serif">Sans</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
              <option value="cursive">Cursive</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
             Size
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="px-2 py-1 border rounded"
            >
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
            </select>
          </label>
        </div>
      )}

      {/* Editable Content */}
      <div className="text-center">
        <h2
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          className="text-2xl font-semibold mb-2 outline-none cursor-text"
          style={{ color: textColor, fontFamily, fontSize }}
        >
          {content?.title || 'Your Title'}
        </h2>

        <p
          ref={paraRef}
          contentEditable
          suppressContentEditableWarning
          className="text-base leading-relaxed outline-none cursor-text"
          style={{ color: textColor, fontFamily, fontSize }}
        >
          {content?.paragraph || 'Your paragraph goes here...'}
        </p>
      </div>
    </section>
  );
};

export default ParagraphBlock;
