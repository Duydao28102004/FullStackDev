import React from "react";

const LeftPanel = ({ images }) => {
    // Display up to 6 images from the array
    const displayedImages = images.slice(0, 6);
    return (
      <section className="py-2 px-4 ml-16 mr-8 w-[30%]">
        <div className="left-panel bg-white p-4 shadow-md rounded-lg w-full">
          <h2 className="text-xl font-bold mb-4">Nearest Posts</h2>
          <div className="grid grid-cols-3 gap-2">
            {displayedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Nearest Post ${index + 1}`}
                className="object-cover w-full h-32 rounded-md"
              />
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default LeftPanel