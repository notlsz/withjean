import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShippingStep from './CheckoutPageShipping';
import PaymentStep from './CheckoutPagePayment';

// Checkout steps
enum CheckoutStep {
  Information = 'information',
  Shipping = 'shipping',
  Payment = 'payment',
}

// Mock cart data for checkout
const cartItems = [
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

// Form field interfaces
interface ContactInformation {
  email: string;
  phone: string;
  marketingConsent: boolean;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
}

interface PaymentMethod {
  cardNumber: string;
  nameOnCard: string;
  expirationDate: string;
  securityCode: string;
  sameAsShipping: boolean;
}

const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Standard Shipping',
    price: 10.00,
    estimatedDelivery: '3-5 business days',
  },
  {
    id: 'express',
    name: 'Express',
    description: 'Express Shipping',
    price: 20.00,
    estimatedDelivery: '1-2 business days',
  },
  {
    id: 'free',
    name: 'Free',
    description: 'Free Shipping (Orders over $50)',
    price: 0,
    estimatedDelivery: '5-7 business days',
  },
];

const CheckoutPage = () => {
  // Current checkout step
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.Information);

  // Form state
  const [contactInfo, setContactInfo] = useState<ContactInformation>({
    email: '',
    phone: '',
    marketingConsent: false,
  });

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  });

  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('standard');

  const [paymentInfo, setPaymentInfo] = useState<PaymentMethod>({
    cardNumber: '',
    nameOnCard: '',
    expirationDate: '',
    securityCode: '',
    sameAsShipping: true,
  });

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = selectedShippingMethod === 'free' && subtotal >= 50
    ? 0
    : shippingMethods.find(method => method.id === selectedShippingMethod)?.price || 0;
  const taxes = subtotal * 0.1; // 10% tax rate
  const total = subtotal + shipping + taxes;

  // Format price with 2 decimal places
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Handle form submissions
  const handleContactInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.Shipping);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.Payment);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment and submit order
    alert('Order placed successfully!');
    // Redirect to order confirmation page
    window.location.href = '/order-confirmation';
  };

  // Navigation between steps
  const goToInformation = () => {
    setCurrentStep(CheckoutStep.Information);
  };

  const goToShipping = () => {
    setCurrentStep(CheckoutStep.Shipping);
  };

  // Update form state
  const updateContactInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const updateShippingAddress = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const updatePaymentInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const updateShippingMethod = (methodId: string) => {
    setSelectedShippingMethod(methodId);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-akira mb-8 text-center">Checkout</h1>

      {/* Checkout Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === CheckoutStep.Information ? 'bg-jean-dark text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <div className="text-sm ml-2">Information</div>
        </div>
        <div className="w-12 h-1 bg-gray-200 mx-2"></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === CheckoutStep.Shipping ? 'bg-jean-dark text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <div className="text-sm ml-2">Shipping</div>
        </div>
        <div className="w-12 h-1 bg-gray-200 mx-2"></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === CheckoutStep.Payment ? 'bg-jean-dark text-white' : 'bg-gray-200'}`}>
            3
          </div>
          <div className="text-sm ml-2">Payment</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2">
          {/* Information Step */}
          {currentStep === CheckoutStep.Information && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <form onSubmit={handleContactInfoSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={updateContactInfo}
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone (for delivery updates)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={updateContactInfo}
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="marketingConsent"
                      checked={contactInfo.marketingConsent}
                      onChange={updateContactInfo}
                      className="mr-2"
                    />
                    <span className="text-sm">Email me with news and offers</span>
                  </label>
                </div>

                <h2 className="text-xl font-semibold mb-4 mt-8">Shipping Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingAddress.firstName}
                      onChange={updateShippingAddress}
                      className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingAddress.lastName}
                      onChange={updateShippingAddress}
                      className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="address1" className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    value={shippingAddress.address1}
                    onChange={updateShippingAddress}
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="address2" className="block text-sm font-medium mb-1">Apartment, suite, etc. (optional)</label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    value={shippingAddress.address2}
                    onChange={updateShippingAddress}
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingAddress.city}
                      onChange={updateShippingAddress}
                      className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingAddress.state}
                      onChange={updateShippingAddress}
                      className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium mb-1">ZIP/Postal Code</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={shippingAddress.zip}
                      onChange={updateShippingAddress}
                      className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={shippingAddress.country}
                    onChange={updateShippingAddress}
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                    required
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="GB">United Kingdom</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <Link to="/cart" className="text-jean-teal">← Return to cart</Link>
                  <button
                    type="submit"
                    className="bg-jean-dark text-white py-3 px-6 uppercase tracking-wide hover:bg-opacity-90 transition-colors duration-300"
                  >
                    Continue to shipping
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Shipping Step */}
          {currentStep === CheckoutStep.Shipping && (
            <ShippingStep
              selectedMethod={selectedShippingMethod}
              shippingMethods={shippingMethods}
              subtotal={subtotal}
              onMethodChange={updateShippingMethod}
              onSubmit={handleShippingSubmit}
              onBackToInformation={goToInformation}
            />
          )}

          {/* Payment Step */}
          {currentStep === CheckoutStep.Payment && (
            <PaymentStep
              paymentInfo={paymentInfo}
              shippingAddress={shippingAddress}
              onPaymentInfoChange={updatePaymentInfo}
              onSubmit={handlePaymentSubmit}
              onBackToShipping={goToShipping}
            />
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {/* Cart Items */}
            <div className="mb-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex mb-4">
                  <div className="relative w-16 h-20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">Size: {item.size}</div>
                    <div>{formatPrice(item.price)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Price Calculations */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (estimated)</span>
                <span>{formatPrice(taxes)}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Total */}
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
