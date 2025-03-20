import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock wishlist data
const initialWishlistItems = [
  {
    id: 'kya-zip-through-chocolate',
    name: 'Kya Zip Through | Chocolate',
    price: '$139.00',
    image: 'https://ext.same-assets.com/3297134805/4024151446.jpeg',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
    dateAdded: '2025-01-15',
    inStock: true
  },
  {
    id: 'stella-dress-white',
    name: 'Stella Dress | White',
    price: '$189.00',
    image: 'https://ext.same-assets.com/2953662866/2211759542.jpeg',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
    dateAdded: '2025-02-10',
    inStock: true
  },
  {
    id: 'maya-skirt-cream',
    name: 'Maya Skirt | Cream',
    price: '$149.00',
    image: 'https://ext.same-assets.com/2349921876/3488765221.jpeg',
    sizes: ['XXS', 'XS', 'S', 'M'],
    dateAdded: '2025-03-05',
    inStock: true
  },
  {
    id: 'daisy-mini-dress-blue',
    name: 'Daisy Mini Dress | Blue',
    price: '$179.00',
    image: 'https://ext.same-assets.com/3866521438/4259871324.jpeg',
    sizes: ['XS', 'S', 'M', 'L'],
    dateAdded: '2025-02-28',
    inStock: false
  }
];

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleRemoveItem = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    if (!selectedSize && selectedItem === id) {
      alert('Please select a size');
      return;
    }

    const item = wishlistItems.find(item => item.id === id);

    // If a size is selected for this item, use it, otherwise ask for size
    if (selectedItem === id && selectedSize) {
      alert(`Added to cart: ${item?.name} (${selectedSize})`);
      // In a real app, we would dispatch to cart state/context here

      // Clear the selection
      setSelectedItem(null);
      setSelectedSize(null);
    } else {
      // Show size selector
      setSelectedItem(id);
    }
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl mb-4 font-akira">Your Wishlist</h1>
        <p className="mb-8">Your wishlist is currently empty.</p>
        <Link to="/collections/all" className="bg-jean-dark text-white px-6 py-2 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl mb-6 font-akira text-center">Your Wishlist</h1>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="border border-gray-200 p-4">
            <div className="relative mb-4">
              <Link to={`/products/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-[3/4] object-cover"
                />
              </Link>
              {!item.inStock && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                  <span className="bg-jean-dark text-white py-1 px-3 text-sm font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            <div className="text-center mb-4">
              <Link to={`/products/${item.id}`} className="text-md hover:underline">
                {item.name}
              </Link>
              <p className="text-md">{item.price}</p>
              <p className="text-xs text-gray-500 mt-1">
                Added on {new Date(item.dateAdded).toLocaleDateString()}
              </p>
            </div>

            {/* Size selector (visible when item is selected) */}
            {selectedItem === item.id && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Select Size:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {item.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`
                        w-10 h-8 border flex items-center justify-center text-sm
                        ${selectedSize === size ? 'border-2 border-jean-dark' : 'border-gray-300'}
                        ${!item.inStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:border-jean-dark'}
                      `}
                      disabled={!item.inStock}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleAddToCart(item.id)}
                className={`
                  bg-jean-dark text-white py-2 w-full uppercase text-sm tracking-wide
                  ${!item.inStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90 transition-colors duration-300'}
                `}
                disabled={!item.inStock}
              >
                {selectedItem === item.id ? 'Select Size Above' : 'Add to Cart'}
              </button>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="border border-gray-300 py-2 w-full uppercase text-sm tracking-wide hover:bg-gray-50 transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/collections/all" className="bg-jean-dark text-white px-6 py-2 inline-block">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default WishlistPage;
