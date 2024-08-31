// ImageGallery.js
import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]?.url); // Default to the first image

  return (
    <div className="flex flex-col gap-6 lg:w-1/3 lg:h-2/4 lg:mx-2 lg:px-2">
      <img
        src={activeImage}
        alt="activeImage"
        className="w-full h-full rounded-xl aspect-square"
      />
      <div className="flex flex-row justify-start gap-2 h-24">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`image-${index}`}
            onClick={() => setActiveImage(image.url)}
            className={`w-24 h-24 rounded-md cursor-pointer ${
              activeImage === image.url ? 'border-2 border-orange-500' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
