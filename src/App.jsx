import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate , useLocation} from 'react-router-dom';
import ImageUpload from './components/UploadImage';
import Canvas from './components/Canvas';

function App() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageSelect = (imageUrl) => {
    setImage(imageUrl);
    // Redirect to /canvas and pass the image URL via state
    navigate('/canvas', { state: { image: imageUrl } });
  };

  return (
    <div className="bg-darkBlue min-h-screen text-textLight flex flex-col items-center p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-center text-white mb-4">
          Image Inpainting Widget
        </h1>
        <p className="text-sm text-gray-400 text-center max-w-lg">
          Upload an image, draw a mask to highlight areas for inpainting, and export the result. The widget is fully customizable and responsive.
        </p>
      </header>
      <main className="w-full max-w-3xl">
        <ImageUpload onImageSelect={handleImageSelect} />
      </main>
    </div>
  );
}

function CanvasPage() {
  const location = useLocation();
  const image = location.state?.image; // Retrieve the image passed through state

  return image ? <Canvas image={image} /> : <div>No image uploaded</div>;
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/canvas" element={<CanvasPage />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
