import { useEffect } from 'react';
import SearchBar from './SearchBar';

interface FullScreenSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenSearch = ({ isOpen, onClose }: FullScreenSearchProps) => {
  // Prevent body scrolling when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close search
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Search WithJean</h2>
          <button onClick={onClose} className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <SearchBar onClose={onClose} isFullScreen={true} />

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {['Dresses', 'Tops', 'Jeans', 'Skirts', 'New Arrivals', 'Sale'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  window.location.href = `/search?q=${encodeURIComponent(term)}`;
                  onClose();
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Dresses', url: '/collections/dresses', image: 'https://ext.same-assets.com/2953662866/2211759542.jpeg' },
              { name: 'Tops', url: '/collections/tops', image: 'https://ext.same-assets.com/3297134805/4024151446.jpeg' },
              { name: 'Bottoms', url: '/collections/bottoms', image: 'https://ext.same-assets.com/1239890666/1963880290.jpeg' },
              { name: 'New Arrivals', url: '/collections/new', image: 'https://ext.same-assets.com/756872191/2172730456.jpeg' },
            ].map((category) => (
              <div
                key={category.name}
                onClick={() => {
                  window.location.href = category.url;
                  onClose();
                }}
                className="cursor-pointer group"
              >
                <div className="relative aspect-square overflow-hidden mb-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="font-medium text-center">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenSearch;
