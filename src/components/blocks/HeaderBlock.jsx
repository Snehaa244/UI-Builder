import React, { useState, useEffect, useRef } from 'react';

const HeaderBlock = ({ id, content, onChange, onDelete }) => {
  const [title, setTitle] = useState(content?.title || 'Title');
  const [links, setLinks] = useState(content?.links || ['First Link', 'Second Link', 'Third Link', 'Fourth Link']);
  const [buttonText, setButtonText] = useState(content?.button || 'Button');
  const [textColor, setTextColor] = useState(content?.textColor || '#000000');
  const [fontSize, setFontSize] = useState(content?.fontSize || '14px');
  const [fontFamily, setFontFamily] = useState(content?.fontFamily || 'sans-serif');
  const [showStyle, setShowStyle] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onChange(id, {
      title,
      links,
      button: buttonText,
      textColor,
      fontSize,
      fontFamily,
    });
  }, [title, links, buttonText, textColor, fontSize, fontFamily]);

  const handleLinkChange = (index, value) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
  };

  return (
    <header className="body-font border border-gray-200 rounded-lg p-5 bg-white shadow-md relative group">
      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition"
        title="Delete"
      >
        🗑
      </button>

      {/* Header Content */}
      <div className="container mx-auto flex flex-col md:flex-row flex-wrap items-center gap-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <input
            className="text-2xl font-semibold outline-none border-b border-transparent focus:border-purple-500 transition bg-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              color: textColor,
              fontFamily,
              fontSize,
            }}
          />
        </div>

        {/* Links */}
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center gap-3 mt-2 md:mt-0">
          {links.map((link, index) => (
            <input
              key={index}
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              className="bg-transparent border-b border-gray-300 focus:border-purple-500 px-1 text-sm outline-none transition"
              style={{
                color: textColor,
                fontFamily,
                fontSize,
              }}
            />
          ))}
        </nav>

        {/* Button */}
        <button className="inline-flex items-center bg-gray-100 hover:bg-purple-100 transition border-0 py-2 px-4 rounded-lg mt-2 md:mt-0">
          <input
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="bg-transparent outline-none text-center w-auto"
            style={{
              color: textColor,
              fontFamily,
              fontSize,
            }}
          />
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Style Toggle */}
      <button
        onClick={() => setShowStyle(!showStyle)}
        className="text-xs text-purple-600 mt-4 underline hover:text-purple-800 transition"
      >
        ⚙️ Style
      </button>

      {/* Style Controls */}
      {showStyle && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md space-y-4 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-32">Text Color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-6 border rounded"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-32">Font Size:</label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="px-2 py-1 rounded border border-gray-300"
            >
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="32px">32px</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-32">Font Family:</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="px-2 py-1 rounded border border-gray-300"
            >
              <option value="sans-serif">Sans</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
              <option value="cursive">Cursive</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderBlock;
