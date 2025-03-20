import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock collection data
const collections = {
  'all': {
    title: 'All Products',
    description: 'Shop our complete collection of With Jean products.',
    image: 'https://ext.same-assets.com/3712905662/4138745921.jpeg',
  },
  'new': {
    title: 'New Arrivals',
    description: 'Shop our latest arrivals - fresh styles for the season.',
    image: 'https://ext.same-assets.com/598493245/1231598346.jpeg',
  },
  'tops': {
    title: 'Tops',
    description: 'Shop our collection of tops, from casual to dressy styles.',
    image: 'https://ext.same-assets.com/3712905662/4138745921.jpeg',
  },
  'bottoms': {
    title: 'Bottoms',
    description: 'Shop our collection of bottoms, from jeans to skirts.',
    image: 'https://ext.same-assets.com/4275065108/2932829183.jpeg',
  },
  'dresses': {
    title: 'Dresses',
    description: 'Shop our collection of dresses for every occasion.',
    image: 'https://ext.same-assets.com/2953662866/2211759542.jpeg',
  },
};

// Mock products data
const allProducts = [
  {
    id: 'kya-zip-through-chocolate',
    name: 'Kya Zip Through | Chocolate',
    price: '$139.00',
    image: 'https://ext.same-assets.com/3297134805/4024151446.jpeg',
    category: 'tops',
    isNew: true,
    color: 'brown',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
  },
  {
    id: 'kya-track-pant-chocolate',
    name: 'Kya Track Pant | Chocolate',
    price: '$129.00',
    image: 'https://ext.same-assets.com/1239890666/1963880290.jpeg',
    category: 'bottoms',
    isNew: true,
    color: 'brown',
    sizes: ['XXS', 'XS', 'S', 'M'],
  },
  {
    id: 'tammy-tee-white',
    name: 'Tammy Tee | White',
    price: '$119.00',
    image: 'https://ext.same-assets.com/756872191/2172730456.jpeg',
    category: 'tops',
    isNew: true,
    color: 'white',
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'king-jorts-black',
    name: 'King Jorts | Black',
    price: '$139.00',
    image: 'https://ext.same-assets.com/3122018651/114844992.jpeg',
    category: 'bottoms',
    isNew: true,
    color: 'black',
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'stella-dress-white',
    name: 'Stella Dress | White',
    price: '$189.00',
    image: 'https://ext.same-assets.com/2953662866/2211759542.jpeg',
    category: 'dresses',
    isNew: false,
    color: 'white',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
  },
  {
    id: 'lulu-top-black',
    name: 'Lulu Top | Black',
    price: '$129.00',
    image: 'https://ext.same-assets.com/3455677543/1198652468.jpeg',
    category: 'tops',
    isNew: false,
    color: 'black',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
  },
  {
    id: 'maya-skirt-cream',
    name: 'Maya Skirt | Cream',
    price: '$149.00',
    image: 'https://ext.same-assets.com/2349921876/3488765221.jpeg',
    category: 'bottoms',
    isNew: false,
    color: 'beige',
    sizes: ['XXS', 'XS', 'S', 'M'],
  },
  {
    id: 'daisy-mini-dress-blue',
    name: 'Daisy Mini Dress | Blue',
    price: '$179.00',
    image: 'https://ext.same-assets.com/3866521438/4259871324.jpeg',
    category: 'dresses',
    isNew: false,
    color: 'blue',
    sizes: ['XS', 'S', 'M', 'L'],
  }
];

// Filter options
const filterOptions = {
  categories: ['tops', 'bottoms', 'dresses'],
  colors: ['black', 'white', 'brown', 'beige', 'blue'],
  sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
  sortOptions: ['Newest', 'Price: Low to High', 'Price: High to Low', 'Alphabetical: A-Z', 'Alphabetical: Z-A']
};

const CollectionPage = () => {
  const { collectionId = 'all' } = useParams<{ collectionId?: string }>();
  const collection = collections[collectionId as keyof typeof collections] || collections.all;

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(collectionId !== 'all' ? collectionId : null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Newest');
  const [showFilters, setShowFilters] = useState(false);

  // Filter products
  let filteredProducts = [...allProducts];

  // Apply category filter
  if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== 'new') {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
  } else if (selectedCategory === 'new') {
    filteredProducts = filteredProducts.filter(product => product.isNew);
  }

  // Apply color filter
  if (selectedColors.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      selectedColors.includes(product.color)
    );
  }

  // Apply size filter
  if (selectedSizes.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      product.sizes.some(size => selectedSizes.includes(size))
    );
  }

  // Apply sorting
  switch (sortBy) {
    case 'Price: Low to High':
      filteredProducts.sort((a, b) =>
        parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
      );
      break;
    case 'Price: High to Low':
      filteredProducts.sort((a, b) =>
        parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
      );
      break;
    case 'Alphabetical: A-Z':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'Alphabetical: Z-A':
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'Newest':
    default:
      // Assuming products are already sorted by newest in allProducts
      break;
  }

  const toggleColorFilter = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const toggleSizeFilter = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortBy('Newest');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Collection Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-akira mb-4">{collection.title}</h1>
        <p className="max-w-2xl mx-auto">{collection.description}</p>
      </div>

      {/* Filters and Sort */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-lg mb-4 md:mb-0"
          >
            <span className="mr-2">Filters</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="flex items-center">
            <span className="mr-2">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 px-2 py-1"
            >
              {filterOptions.sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter panels */}
        {showFilters && (
          <div className="border border-gray-200 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      checked={selectedCategory === null}
                      onChange={() => setSelectedCategory(null)}
                      className="mr-2"
                    />
                    <label htmlFor="category-all">All</label>
                  </div>
                  {filterOptions.categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category}`} className="capitalize">
                        {category}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-new"
                      name="category"
                      checked={selectedCategory === 'new'}
                      onChange={() => setSelectedCategory('new')}
                      className="mr-2"
                    />
                    <label htmlFor="category-new">New Arrivals</label>
                  </div>
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h3 className="font-semibold mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleColorFilter(color)}
                      className={`
                        w-8 h-8 rounded-full border
                        ${selectedColors.includes(color) ? 'ring-2 ring-jean-dark' : ''}
                        ${color === 'white' ? 'bg-white' : ''}
                        ${color === 'black' ? 'bg-black' : ''}
                        ${color === 'brown' ? 'bg-amber-800' : ''}
                        ${color === 'beige' ? 'bg-amber-100' : ''}
                        ${color === 'blue' ? 'bg-blue-500' : ''}
                      `}
                      aria-label={`Filter by ${color}`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h3 className="font-semibold mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSizeFilter(size)}
                      className={`
                        border px-3 py-1
                        ${selectedSizes.includes(size)
                          ? 'bg-jean-dark text-white border-jean-dark'
                          : 'border-gray-300 hover:border-jean-dark'}
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-jean-teal underline"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group">
            <div className="relative mb-4">
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-jean-dark text-white text-xs py-1 px-2 uppercase">
                  New
                </span>
              )}
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
              <div className="flex justify-center mt-2 space-x-1">
                {product.sizes.map((size) => (
                  <span key={size} className="text-xs">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl mb-4">No products match your filters</h3>
          <button
            onClick={clearFilters}
            className="bg-jean-dark text-white px-6 py-2 inline-block"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
