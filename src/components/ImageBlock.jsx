import React, { useRef, useState } from 'react';

const ImageBlock = ({ block, onChange }) => {
  const [imageUrl, setImageUrl] = useState(block.content?.url || '');
  const fileInputRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
      onChange({
        ...block,
        content: {
          url: reader.result,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="max-w-full max-h-96 rounded shadow-md object-contain"
        />
      ) : (
        <div
          className="border border-dashed border-gray-400 p-8 rounded cursor-pointer text-center"
          onClick={() => fileInputRef.current.click()}
        >
          <p className="text-gray-600">Click to upload an image</p>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageBlock;
