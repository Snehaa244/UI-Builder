import React from 'react';
import { useSelector } from 'react-redux';

const Preview = () => {
  const blocks = useSelector((state) => state.builder.blocks);

  const renderEditorJsContent = (editorData) => {
    if (!editorData || !editorData.blocks) return null;

    return editorData.blocks.map((block, index) => {
      switch (block.type) {
        case 'header':
          return (
            <h2 key={index} className="text-xl font-semibold mb-2">
              {block.data.text}
            </h2>
          );
        case 'paragraph':
          return (
            <p key={index} className="mb-2 text-gray-700">
              {block.data.text}
            </p>
          );
        case 'list':
          return (
            <ul key={index} className="list-disc pl-5 mb-2 text-gray-700">
              {block.data.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

  const renderBlock = (block) => {
    const {
      textColor = '#000',
      fontSize = '16px',
      fontFamily = 'sans-serif',
      bgColor = '#2563eb',
    } = block.content || {};

    switch (block.type) {
      case 'header':
        return (
          <div className="mb-6 bg-white border rounded-lg shadow p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  UI
                </div>
                <span style={{ color: textColor, fontSize, fontFamily }} className="text-2xl font-bold">
                  {block.content?.title || 'Header Title'}
                </span>
              </div>

              <nav className="flex flex-wrap gap-4 mt-4 md:mt-0">
                {block.content?.links?.map((link, i) => (
                  <a key={i} className="hover:text-purple-600" style={{ color: textColor, fontSize, fontFamily }}>
                    {link}
                  </a>
                ))}
              </nav>

              <button
                className="mt-4 md:mt-0 px-4 py-2 rounded-lg font-medium"
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  fontSize,
                  fontFamily,
                }}
              >
                {block.content?.button || 'Click Me'}
              </button>
            </div>

            {/* ✅ Render Editor.js content entered in Builder */}
            <div className="mt-6">
              {renderEditorJsContent(block.content?.editorData)}
            </div>
          </div>
        );

      case 'paragraph':
        return (
          <div className="mb-6 bg-white border rounded-lg shadow p-5 text-center">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: textColor, fontSize, fontFamily }}
            >
              {block.content?.title || 'Title'}
            </h2>
            <p style={{ color: textColor, fontSize, fontFamily }}>
              {block.content?.paragraph || 'Some text here'}
            </p>
          </div>
        );

      case 'button':
        return (
          <div className="text-center mt-6">
            <button
              className="px-5 py-3 rounded-lg font-semibold"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                fontSize,
                fontFamily,
              }}
            >
              {block.content?.text || 'Click Me'}
            </button>
          </div>
        );

      case 'image':
        return (
          block.content?.url && (
            <div className="my-6 text-center">
              <img
                src={block.content.url}
                alt={block.content.alt || 'Preview Image'}
                className={`mx-auto ${block.content?.showShadow ? 'shadow-lg' : ''}`}
                style={{
                  width: `${block.content?.widthPercent || 100}%`,
                  borderRadius: block.content?.borderRadius || '8px',
                }}
              />
            </div>
          )
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full p-6 overflow-y-auto bg-gray-50 border rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold text-purple-600 mb-6 border-b pb-2">Live Preview</h2>
      <div className="space-y-6">
        {blocks.map((block) => (
          <div key={block.id}>{renderBlock(block)}</div>
        ))}
      </div>
    </div>
  );
};

export default Preview;
