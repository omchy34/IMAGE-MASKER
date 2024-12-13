import React from 'react';

function ImageUpload({ onImageSelect }) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PNG or JPEG image.');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center border-2 border-dashed border-lightBlue p-6 rounded-lg bg-darkBlue">
      <label
        htmlFor="file-input"
        className="text-lg text-lightBlue font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-8 rounded-md shadow-lg cursor-pointer hover:opacity-80 transition duration-300"
      >
        Open Image
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
        className="hidden"
      />
      <p className="text-gray-400 text-xs mt-3">Drag or upload your own images</p>
    </div>
  );
}

export default ImageUpload;
