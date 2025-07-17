import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import {
  addBlock,
  updateBlockContent,
  deleteBlock,
  moveBlock,
} from '../features/builder/builderSlice';
import BuilderBlock from './BuilderBlock';

const Builder = () => {
  const dispatch = useDispatch();
  const blocks = useSelector((state) => state.builder.blocks);

  const [, dropRef] = useDrop({
    accept: 'component',
    drop: (item) => {
      const id = uuidv4();
      let defaultContent;

      switch (item.type) {
        case 'image':
          defaultContent = { url: '', alt: 'Image' };
          break;
        case 'button':
          defaultContent = 'Click Me';
          break;
        case 'header':
          defaultContent = {
            title: 'Title',
            links: ['First Link', 'Second Link', 'Third Link'],
            button: 'Button',
          };
          break;
        case 'paragraph':
        default:
          defaultContent = {
            title: 'Default Title',
            paragraph: 'Default paragraph',
          };
          break;
      }

      dispatch(addBlock({ id, type: item.type, content: defaultContent }));
    },
  });

  const handleContentChange = (id, newContent) => {
    dispatch(updateBlockContent({ id, content: newContent }));
  };

  const handleDelete = (id) => {
    dispatch(deleteBlock(id));
  };

  const handleMove = (fromIndex, toIndex) => {
    dispatch(moveBlock({ fromIndex, toIndex }));
  };

  return (
    <div
      ref={dropRef}
      className="w-full min-h-[80vh] p-6 bg-white border border-purple-200 rounded-lg shadow-md flex flex-col gap-5"
    >
      <h2 className="text-2xl font-bold text-purple-600 border-b pb-2 mb-4">🎨 Builder Area</h2>

      {blocks.length === 0 ? (
        <p className="text-gray-400 italic text-center mt-10">
          Drag components from the sidebar to build your UI...
        </p>
      ) : (
        blocks.map((block, index) => (
          <BuilderBlock
            key={block.id}
            index={index}
            block={block}
            onChange={handleContentChange}
            onDelete={handleDelete}
            onMove={handleMove}
          />
        ))
      )}
    </div>
  );
};

export default Builder;
