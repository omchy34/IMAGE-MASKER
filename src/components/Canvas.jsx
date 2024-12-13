import React, { useRef, useState, useEffect } from 'react';

function Canvas({ image }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [imageScale, setImageScale] = useState(5); 
  const maskRef = useRef(null); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = image;
    img.onload = () => {
      const width = (img.width * imageScale) / 100;
      const height = (img.height * imageScale) / 100;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      if (maskRef.current) {
        const mask = new Image();
        mask.src = maskRef.current;
        mask.onload = () => {
          ctx.globalCompositeOperation = 'source-over';
          ctx.drawImage(mask, 0, 0, width, height);
        };
      }
    };
  }, [image, imageScale]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();

    maskRef.current = canvas.toDataURL();
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const width = (img.width * imageScale) / 100;
      const height = (img.height * imageScale) / 100;
      ctx.drawImage(img, 0, 0, width, height);
    };

    maskRef.current = null;
  };

  const exportImages = () => {
    if (!maskRef.current) {
      alert('No mask drawn to export!');
      return;
    }

    const maskImage = new Image();
    maskImage.src = maskRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const originalImage = new Image();
    originalImage.src = image;
    originalImage.onload = () => {

      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = canvas.width;
      exportCanvas.height = canvas.height;

      const exportCtx = exportCanvas.getContext('2d');
      exportCtx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
      const originalDataURL = exportCanvas.toDataURL('image/png');
      exportCtx.clearRect(0, 0, exportCanvas.width, exportCanvas.height);
      exportCtx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);
      const maskDataURL = exportCanvas.toDataURL('image/png');

      downloadImage(originalDataURL, 'original-image.png');
      downloadImage(maskDataURL, 'mask-image.png');
    };
  };

  const downloadImage = (dataURL, filename) => {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    link.click();
  };

  return (
    <div className="flex h-screen bg-darkBlue">
 
      <div className="flex flex-col w-64 p-6 bg-gray-900 text-white shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">Image Masker</h1>
          <p className="text-sm text-gray-400">Edit and scale your images</p>
        </div>
        <div className="flex flex-col gap-6">
          <button 
            onClick={clearCanvas} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition"
          >
            Clear Canvas
          </button>
          <button 
            onClick={exportImages} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition"
          >
            Export Images
          </button>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Brush Size</label>
            <input
              type="range"
              min="5"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image Scale (%)</label>
            <input
              type="range"
              min="10"
              max="100"
              value={imageScale}
              onChange={(e) => setImageScale(e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="border border-gray-700 bg-black cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
}

export default Canvas;
