import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock product data (in a real app, this would come from an API)
const products = {
  'kya-zip-through-chocolate': {
    id: 'kya-zip-through-chocolate',
    name: 'Kya Zip Through | Chocolate',
    price: '$139.00',
    description: 'The Kya Zip Through is a timeless and versatile piece that can be worn year-round. Made from our premium 100% cotton in a rich chocolate color, it features a zip-through front design with utility pockets and a relaxed fit. Style it with the matching Kya Track Pants for a complete look or wear it with jeans for an effortless everyday outfit.',
    features: [
      '100% cotton',
      'Zip-through front',
      'Front utility pockets',
      'Relaxed fit',
      'Model is 175cm tall and wears a size S'
    ],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
    availableSizes: ['XXS', 'XS', 'S', 'M', 'L'],
    outOfStockSizes: ['XL'],
    gallery: [
      'https://ext.same-assets.com/3297134805/4024151446.jpeg',
      'https://ext.same-assets.com/1452345881/1964622798.jpeg',
      'https://ext.same-assets.com/3882844254/2711532232.jpeg',
      'https://ext.same-assets.com/2166441441/1214022371.jpeg',
      'https://ext.same-assets.com/1782118611/1764166613.jpeg'
    ],
    relatedProducts: [
      {
        id: 'kya-track-pant-chocolate',
        name: 'Kya Track Pant | Chocolate',
        price: '$129.00',
        image: 'https://ext.same-assets.com/1239890666/1963880290.jpeg'
      },
      {
        id: 'tammy-tee-white',
        name: 'Tammy Tee | White',
        price: '$119.00',
        image: 'https://ext.same-assets.com/756872191/2172730456.jpeg'
      },
      {
        id: 'king-jorts-black',
        name: 'King Jorts | Black',
        price: '$139.00',
        image: 'https://ext.same-assets.com/3122018651/114844992.jpeg'
      }
    ]
  },
  'kya-track-pant-chocolate': {
    id: 'kya-track-pant-chocolate',
    name: 'Kya Track Pant | Chocolate',
    price: '$129.00',
    description: 'The Kya Track Pant is a must-have piece for your casual wardrobe. Made from 100% cotton in a rich chocolate color, it features a relaxed fit with a comfortable elasticated waistband and practical side pockets. Pair it with the matching Kya Zip Through or wear it with a simple tee for an easy, everyday look.',
    features: [
      '100% cotton',
      'Elasticated waistband with drawstring',
      'Relaxed fit',
      'Side pockets',
      'Model is 175cm tall and wears a size S'
    ],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
    availableSizes: ['XXS', 'XS', 'S', 'M'],
    outOfStockSizes: ['L', 'XL'],
    gallery: [
      'https://ext.same-assets.com/1239890666/1963880290.jpeg',
      'https://ext.same-assets.com/1744051866/3642358894.jpeg',
      'https://ext.same-assets.com/2366189001/2866662252.jpeg',
      'https://ext.same-assets.com/1252221252/4092453413.jpeg',
      'https://ext.same-assets.com/2481644851/312211552.jpeg'
    ],
    relatedProducts: [
      {
        id: 'kya-zip-through-chocolate',
        name: 'Kya Zip Through | Chocolate',
        price: '$139.00',
        image: 'https://ext.same-assets.com/3297134805/4024151446.jpeg'
      },
      {
        id: 'tammy-tee-white',
        name: 'Tammy Tee | White',
        price: '$119.00',
        image: 'https://ext.same-assets.com/756872191/2172730456.jpeg'
      },
      {
        id: 'king-jorts-black',
        name: 'King Jorts | Black',
        price: '$139.00',
        image: 'https://ext.same-assets.com/3122018651/114844992.jpeg'
      }
    ]
  }
};

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // If productId doesn't exist in our data, show a not found message
  if (!productId || !products[productId as keyof typeof products]) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl mb-6 font-akira">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/collections/all" className="bg-jean-dark text-white px-6 py-2 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const product = products[productId as keyof typeof products];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    // In a real app, we would dispatch to a cart state/context
    alert(`Added to cart: ${product.name} (${selectedSize}) - Quantity: ${quantity}`);
    // You could also redirect to cart page here
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image Gallery */}
        <div>
          <div className="mb-4">
            <img
              src={product.gallery[mainImage]}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(index)}
                className={`${mainImage === index ? 'border-2 border-jean-dark' : 'border border-gray-200'}`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div>
          <h1 className="text-2xl mb-2">{product.name}</h1>
          <p className="text-xl mb-6">{product.price}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <p className="mb-2 font-semibold">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const isOutOfStock = product.outOfStockSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => !isOutOfStock && setSelectedSize(size)}
                    className={`
                      w-12 h-10 flex items-center justify-center border
                      ${selectedSize === size ? 'border-2 border-jean-dark' : 'border-gray-300'}
                      ${isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:border-jean-dark'}
                    `}
                    disabled={isOutOfStock}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between text-sm mt-2">
              <button className="text-jean-teal underline">Size Guide</button>
              {selectedSize && <p>Selected: {selectedSize}</p>}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="mb-2 font-semibold">Quantity</p>
            <div className="flex border border-gray-300 w-32">
              <button
                onClick={decrementQuantity}
                className="w-10 h-10 flex items-center justify-center border-r border-gray-300"
              >
                -
              </button>
              <div className="flex-1 flex items-center justify-center">
                {quantity}
              </div>
              <button
                onClick={incrementQuantity}
                className="w-10 h-10 flex items-center justify-center border-l border-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-jean-dark text-white py-3 px-4 uppercase tracking-wide mb-6 hover:bg-opacity-90 transition-colors duration-300"
          >
            Add to Cart
          </button>

          {/* Wishlist Button */}
          <button className="w-full border border-jean-dark py-3 px-4 uppercase tracking-wide mb-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Add to Wishlist
          </button>

          {/* Product Description */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="mb-4">{product.description}</p>
            <ul className="list-disc pl-5 mb-4">
              {product.features.map((feature, index) => (
                <li key={index} className="mb-2">{feature}</li>
              ))}
            </ul>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Shipping & Returns</h2>
            <p className="mb-2">Free shipping on orders over $50</p>
            <p className="mb-2">Express shipping available</p>
            <p>Easy returns within 14 days</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl text-center font-akira mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="group">
              <div className="relative mb-4">
                <Link to={`/products/${relatedProduct.id}`}>
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
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
                <Link to={`/products/${relatedProduct.id}`} className="text-md hover:underline">
                  {relatedProduct.name}
                </Link>
                <p className="text-md">{relatedProduct.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
