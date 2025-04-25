import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  validUntil: Date;
  discountPercentage?: number;
  discountAmount?: number;
  code?: string;
}

// Mock promotions data - In a real app, this would come from the backend
const mockPromotions: Promotion[] = [
  {
    id: 'promo1',
    title: 'Happy Hours',
    description: 'Get 20% off on all beverages between 3 PM - 6 PM',
    image: 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800',
    validUntil: new Date('2024-12-31'),
    discountPercentage: 20,
    code: 'HAPPY20'
  },
  {
    id: 'promo2',
    title: 'Weekend Special',
    description: 'Family combo meals at $49.99',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
    validUntil: new Date('2024-12-31'),
    discountAmount: 49.99,
  },
  {
    id: 'promo3',
    title: 'Student Discount',
    description: '15% off on presentation of valid student ID',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    validUntil: new Date('2024-12-31'),
    discountPercentage: 15,
    code: 'STUDENT15'
  }
];

const PromotionalBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollRef = useRef<NodeJS.Timeout>();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === mockPromotions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? mockPromotions.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isHovered) {
      autoScrollRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isHovered]);

  return (
    <div 
      className="relative mb-6 bg-white rounded-lg shadow-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        {mockPromotions.map((promo, index) => (
          <div
            key={promo.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="relative h-full">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="p-6 text-white max-w-lg">
                  <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                  <p className="mb-3">{promo.description}</p>
                  {promo.code && (
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm">Use code: </span>
                      <span className="font-mono font-bold">{promo.code}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {mockPromotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;