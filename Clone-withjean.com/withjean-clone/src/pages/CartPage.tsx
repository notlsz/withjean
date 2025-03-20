import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock cart data
const initialCartItems = [
  {
    id: 'kya-zip-through-chocolate',
    name: 'Kya Zip Through | Chocolate',
    price: 139.00,
    size: 'S',
    quantity: 1,
    image: 'https://ext.same-assets.com/3297134805/4024151446.jpeg',
  },
  {
    id: 'kya-track-pant-chocolate',
    name: 'Kya Track Pant | Chocolate',
    price: 129.00,
    size: 'M',
    quantity: 1,
    image: 'https://ext.same-assets.com/1239890666/1963880290.jpeg',
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Calculate shipping (free over $50)
  const shipping = subtotal >= 50 ? 0 : 10;

  // Calculate total
  const total = subtotal - promoDiscount + shipping;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleApplyPromo = () => {
    // Simple promo code logic - in a real app, this would check against valid codes
    if (promoCode.toUpperCase() === 'WELCOME10') {
      const discount = subtotal * 0.1; // 10% discount
      setPromoDiscount(discount);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    // In a real app, this would redirect to a checkout page or process
    alert('Proceeding to checkout');
  };

  // Format price with 2 decimal places
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl mb-4 font-akira">Your Cart</h1>
        <p className="mb-8">Your cart is currently empty.</p>
        <Link to="/collections/all" className="bg-jean-dark text-white px-6 py-2 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl mb-6 font-akira text-center">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 font-semibold">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="grid grid-cols-12 gap-4 py-6 border-b border-gray-200">
              {/* Product */}
              <div className="col-span-12 md:col-span-6">
                <div className="flex">
                  <div className="w-20 mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-auto"
                    />
                  </div>
                  <div>
                    <Link to={`/products/${item.id}`} className="hover:underline font-medium">
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-sm text-jean-teal underline mt-2 md:hidden"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-4 md:col-span-2 flex items-center">
                <div className="md:hidden font-medium">Price:</div>
                <div className="md:text-center md:w-full">{formatPrice(item.price)}</div>
              </div>

              {/* Quantity */}
              <div className="col-span-4 md:col-span-2 flex items-center">
                <div className="md:hidden font-medium mr-2">Qty:</div>
                <div className="flex border border-gray-300 w-20 md:mx-auto">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-6 flex items-center justify-center"
                  >
                    -
                  </button>
                  <div className="flex-1 flex items-center justify-center">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-6 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="col-span-4 md:col-span-2 flex items-center justify-end">
                <div className="md:hidden font-medium mr-2">Total:</div>
                <div>{formatPrice(item.price * item.quantity)}</div>
              </div>

              {/* Remove button (desktop) */}
              <div className="hidden md:flex col-span-12 justify-end">
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-sm text-jean-teal underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <div className="mt-6">
            <Link to="/collections/all" className="text-jean-teal underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {/* Subtotal */}
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>

            {/* Promo Code */}
            {promoApplied && (
              <div className="flex justify-between mb-2 text-jean-teal">
                <span>Discount</span>
                <span>-{formatPrice(promoDiscount)}</span>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between font-semibold text-lg border-t border-gray-300 pt-2 mt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            {/* Promo Code Input */}
            {!promoApplied ? (
              <div className="mt-4">
                <label htmlFor="promo" className="block text-sm mb-1">Promo Code</label>
                <div className="flex">
                  <input
                    type="text"
                    id="promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border border-gray-300 px-2 py-1"
                    placeholder="Enter code"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-jean-dark text-white px-3 ml-2"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Try "WELCOME10" for 10% off</p>
              </div>
            ) : (
              <div className="mt-4 text-jean-teal text-sm">
                Promo code applied: WELCOME10 (10% off)
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-jean-dark text-white py-3 mt-6 uppercase tracking-wide hover:bg-opacity-90 transition-colors duration-300"
            >
              Proceed to Checkout
            </button>

            {/* Payment Methods */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p className="mb-2">We accept:</p>
              <div className="flex justify-center space-x-2">
                <div className="w-8 h-5 bg-gray-300 rounded"></div>
                <div className="w-8 h-5 bg-gray-300 rounded"></div>
                <div className="w-8 h-5 bg-gray-300 rounded"></div>
                <div className="w-8 h-5 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
