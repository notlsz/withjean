import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

// Mock products data - in a real app this would come from API/context
const allProducts = [
  {
    id: 'kya-zip-through-chocolate',
    name: 'Kya Zip Through | Chocolate',
    price: '$139.00',
    category: 'tops',
    image: 'https://ext.same-assets.com/3297134805/4024151446.jpeg',
  },
  {
    id: 'kya-track-pant-chocolate',
    name: 'Kya Track Pant | Chocolate',
    price: '$129.00',
    category: 'bottoms',
    image: 'https://ext.same-assets.com/1239890666/1963880290.jpeg',
  },
  {
    id: 'tammy-tee-white',
    name: 'Tammy Tee | White',
    price: '$119.00',
    category: 'tops',
    image: 'https://ext.same-assets.com/756872191/2172730456.jpeg',
  },
  {
    id: 'king-jorts-black',
    name: 'King Jorts | Black',
    price: '$139.00',
    category: 'bottoms',
    image: 'https://ext.same-assets.com/3122018651/114844992.jpeg',
  },
  {
    id: 'stella-dress-white',
    name: 'Stella Dress | White',
    price: '$189.00',
    category: 'dresses',
    image: 'https://ext.same-assets.com/2953662866/2211759542.jpeg',
  },
  {
    id: 'lulu-top-black',
    name: 'Lulu Top | Black',
    price: '$129.00',
    category: 'tops',
    image: 'https://ext.same-assets.com/3455677543/1198652468.jpeg',
  },
  {
    id: 'maya-skirt-cream',
    name: 'Maya Skirt | Cream',
    price: '$149.00',
    category: 'bottoms',
    image: 'https://ext.same-assets.com/2349921876/3488765221.jpeg',
  },
  {
    id: 'daisy-mini-dress-blue',
    name: 'Daisy Mini Dress | Blue',
    price: '$179.00',
    category: 'dresses',
    image: 'https://ext.same-assets.com/3866521438/4259871324.jpeg',
  }
];

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter products based on query
  useEffect(() => {
    setLoading(true);

    // Simulate API delay
    const timer = setTimeout(() => {
      if (query) {
        const filtered = allProducts.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } else {
        setResults([]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-akira mb-2 text-center">Search Results</h1>
      <p className="text-center mb-8 text-gray-600">
        {query ? `Showing results for "${query}"` : 'Enter a search term to find products'}
      </p>

      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-10">
        <SearchBar />
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jean-dark"></div>
        </div>
      )}

      {/* No results message */}
      {!loading && query && results.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl mb-4">No products found for "{query}"</h2>
          <p className="mb-8 text-gray-600">
            Try checking your spelling or using more general terms.
          </p>
          <div className="mt-6">
            <Link to="/collections/all" className="bg-jean-dark text-white px-6 py-3 inline-block">
              Browse All Products
            </Link>
          </div>
        </div>
      )}

      {/* Results grid */}
      {!loading && results.length > 0 && (
        <div>
          <p className="mb-6 text-gray-600">
            {results.length} {results.length === 1 ? 'product' : 'products'} found
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <div key={product.id} className="group">
                <div className="relative mb-4">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-[3/4] object-cover"
                    />
                  </Link>
                  <button
                    className="absolute top-2 right-2 p-2"
                    aria-label="Add to wishlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white stroke-current fill-none hover:fill-white transition-colors duration-200" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="text-center">
                  <Link to={`/products/${product.id}`} className="text-md hover:underline">
                    {product.name}
                  </Link>
                  <p className="text-md">{product.price}</p>
                  <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/collections/all" className="text-jean-teal underline">
              Browse All Products
            </Link>
          </div>
        </div>
      )}

      {/* Suggestions for empty search */}
      {!loading && !query && (
        <div className="py-8">
          <h2 className="text-xl font-semibold mb-6 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Dresses', 'Tops', 'Bottoms', 'New Arrivals'].map((category) => (
              <Link
                key={category}
                to={`/collections/${category.toLowerCase().replace(' ', '-')}`}
                className="text-center p-6 border border-gray-200 hover:border-jean-dark transition-colors duration-200"
              >
                <div className="text-lg">{category}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
