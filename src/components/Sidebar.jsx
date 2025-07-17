import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addBlock } from '../features/builder/builderSlice'; 
import { v4 as uuidv4 } from 'uuid';

// All available block types
const sidebarItems = [
  { type: 'header', label: 'Header' },
  { type: 'paragraph', label: 'Paragraph' },
  { type: 'button', label: 'Button' },
  { type: 'image', label: 'Image' },
  // { type: 'editor', label: 'Editor' }, 
];

// Default content for each block type
const getDefaultContent = (type) => {
  switch (type) {
    case 'header':
      return {
        title: 'Header Title',
        links: ['Link 1', 'Link 2', 'Link 3'],
        button: 'Click Me',
      };
    case 'paragraph':
      return {
        title: 'Your Title',
        paragraph: 'Your paragraph goes here...',
      };
    case 'button':
      return {
        text: 'Click Me',
        bgColor: '#2563eb',
        textColor: '#ffffff',
        borderColor: '#2563eb',
        borderRadius: '8px',
        borderWidth: '1px',
      };
    case 'image':
      return {
        url: '',
        alt: 'Image',
        showShadow: true,
        borderRadius: '8px',
        widthPercent: 100,
      };
    // case 'editor':
    //   return {
    //     blocks: [],
    //     time: new Date().getTime(),
    //   };
    // default:
    //   return {};
  }
};

// Single draggable item
const SidebarItem = ({ type, label, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={() => onClick(type)}
      className={`cursor-pointer p-3 border border-purple-200 rounded-lg mb-3 bg-white shadow-sm text-center text-sm font-medium text-gray-700 hover:bg-purple-50 hover:shadow transition ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {label}
    </div>
  );
};

// Sidebar component
const Sidebar = () => {
  const dispatch = useDispatch();

  const handleClickAdd = (type) => {
    dispatch(
      addBlock({
        id: uuidv4(),
        type,
        content: getDefaultContent(type),
      })
    );
  };

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden px-4 py-4 bg-white rounded-md shadow-sm">
      <h2 className="text-2xl font-bold text-purple-600 pb-2 mb-1">Components</h2>

      <p className="text-sm text-gray-500 mb-4">
        Drag the components or just{' '}
        <span className="text-purple-600 font-medium">click</span> to add them to the builder 👇
      </p>

      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.type}
          type={item.type}
          label={item.label}
          onClick={handleClickAdd}
        />
      ))}
    </div>
  );
};

export default Sidebar;
