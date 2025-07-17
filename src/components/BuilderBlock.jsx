import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import HeaderBlock from './blocks/HeaderBlock';
import ButtonBlock from './blocks/ButtonBlock';
import ImageBlock from './blocks/ImageBlock';
import ParagraphBlock from './blocks/paragraphBlock';


const BuilderBlock = ({ block, index, onChange, onDelete, onMove }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: 'builder-block',
    hover(item) {
      if (item.index === index) return;
      onMove(item.index, index);
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'builder-block',
    item: { id: block.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const blockProps = {
    id: block.id,
    content: block.content,
    onChange,
    onDelete: () => onDelete(block.id),
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-200 ${isDragging ? 'opacity-40' : ''}`}
    >
      {block.type === 'header' && <HeaderBlock {...blockProps} />}
      {block.type === 'paragraph' && <ParagraphBlock {...blockProps} />}
      {block.type === 'button' && <ButtonBlock {...blockProps} />}
      {block.type === 'image' && <ImageBlock {...blockProps} />}
      
    </div>
  );
};

export default BuilderBlock;
