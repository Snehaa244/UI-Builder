import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';
import { useDispatch } from 'react-redux';
import { addBlock } from '../features/builder/builderSlice';

const EditorContainer = () => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      tools: {
        header: Header,
        paragraph: Paragraph,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:8008/uploadFile', // replace with your backend
              byUrl: 'http://localhost:8008/fetchUrl',    // replace with your backend
            },
          },
        },
      },
      onReady: () => {
        editorRef.current = editor;
      },
      onChange: async () => {
        const content = await editor.saver.save();
        handleEditorData(content);
      },
    });

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleEditorData = (data) => {
    if (!data.blocks || data.blocks.length === 0) return;

    // Dispatch each block from Editor.js to Redux
    data.blocks.forEach((block) => {
      let type = '';
      let content = {};

      if (block.type === 'header') {
        type = 'header';
        content = { text: block.data.text, level: block.data.level };
      } else if (block.type === 'paragraph') {
        type = 'paragraph';
        content = { paragraph: block.data.text };
      } else if (block.type === 'image') {
        type = 'image';
        content = { url: block.data.file?.url || '', caption: block.data.caption };
      }

      if (type) {
        dispatch(addBlock({ type, content }));
      }
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Editor.js Builder</h2>
      <div id="editorjs" className="border rounded p-4 bg-gray-50" />
    </div>
  );
};

export default EditorContainer;
