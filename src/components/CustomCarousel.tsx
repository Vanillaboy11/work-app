import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface CustomCarouselProps {
  children: React.ReactElement[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ children }) => {
  const arrowStyles = `
    absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
    rounded-full bg-blue-500/80 hover:bg-blue-500 transition-colors duration-200
    text-white cursor-pointer z-10
  `;

  return (
    <div className="relative px-8">
      <Carousel
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <button
            onClick={clickHandler}
            className={`${arrowStyles} left-0`}
            style={{ display: hasPrev ? 'flex' : 'none' }}
          >
            ‹
          </button>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <button
            onClick={clickHandler}
            className={`${arrowStyles} right-0`}
            style={{ display: hasNext ? 'flex' : 'none' }}
          >
            ›
          </button>
        )}
        className="pb-8"
        renderIndicator={(clickHandler, isSelected, index) => (
          <li
            className={`inline-block mx-1 w-2 h-2 rounded-full cursor-pointer transition-colors duration-200
              ${isSelected ? 'bg-blue-500' : 'bg-blue-300'}`}
            onClick={clickHandler}
            role="button"
            tabIndex={0}
            aria-label={`Slide ${index + 1}`}
          />
        )}
      >
        {children}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;