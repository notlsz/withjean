import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Mock products data - in a real app this would come from API/context
const allProducts = [
  {
    id: 'kya-zip-through-chocolate',
    name: 'Kya Zip Through | Chocolate',
    category: 'tops',
    image: 'https://ext.same-assets.com/3297134805/4024151446.jpeg',
  },
  {
    id: 'kya-track-pant-chocolate',
    name: 'Kya Track Pant | Chocolate',
    category: 'bottoms',
    image: 'https://ext.same-assets.com/1239890666/1963880290.jpeg',
  },
  {
    id: 'tammy-tee-white',
    name: 'Tammy Tee | White',
    category: 'tops',
    image: 'https://ext.same-assets.com/756872191/2172730456.jpeg',
  },
  {
    id: 'king-jorts-black',
    name: 'King Jorts | Black',
    category: 'bottoms',
    image: 'https://ext.same-assets.com/3122018651/114844992.jpeg',
  },
  {
    id: 'stella-dress-white',
    name: 'Stella Dress | White',
    category: 'dresses',
    image: 'https://ext.same-assets.com/2953662866/2211759542.jpeg',
  },
  {
    id: 'lulu-top-black',
    name: 'Lulu Top | Black',
    category: 'tops',
    image: 'https://ext.same-assets.com/3455677543/1198652468.jpeg',
  },
  {
    id: 'maya-skirt-cream',
    name: 'Maya Skirt | Cream',
    category: 'bottoms',
    image: 'https://ext.same-assets.com/2349921876/3488765221.jpeg',
  },
  {
    id: 'daisy-mini-dress-blue',
    name: 'Daisy Mini Dress | Blue',
    category: 'dresses',
    image: 'https://ext.same-assets.com/3866521438/4259871324.jpeg',
  }
];

// Interface for search result suggestion items
interface SearchSuggestion {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface SearchBarProps {
  onClose?: () => void;
  isFullScreen?: boolean;
}

const SearchBar = ({ onClose, isFullScreen = false }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when component mounts (for full screen search)
  useEffect(() => {
    if (isFullScreen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFullScreen]);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6)); // Limit to top 6 results
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
      if (onClose) onClose();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (productId: string) => {
    navigate(`/products/${productId}`);
    setShowSuggestions(false);
    if (onClose) onClose();
  };

  // Clear search input
  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      ref={searchRef}
      className={`relative ${isFullScreen ? 'w-full max-w-3xl mx-auto' : 'w-full'}`}
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full py-2 pl-10 pr-12 bg-gray-100 border-none focus:outline-none focus:ring-1 focus:ring-jean-dark"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-10 flex items-center pr-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </form>

      {/* Search suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-sm border border-gray-200">
          <div className="p-2">
            <div className="text-xs text-gray-500 mb-1">Suggestions</div>
            {suggestions.map((product) => (
              <div
                key={product.id}
                className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSuggestionClick(product.id)}
              >
                <div className="w-10 h-12 mr-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{product.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{product.category}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              className="w-full text-center text-jean-teal text-sm py-1 hover:underline"
            >
              View all results for "{searchTerm}"
            </button>
          </div>
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && searchTerm.length > 1 && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-sm border border-gray-200 p-4 text-center">
          <p className="text-gray-500">No results found for "{searchTerm}"</p>
          <p className="text-sm mt-1">Try a different search term or browse our collections</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
