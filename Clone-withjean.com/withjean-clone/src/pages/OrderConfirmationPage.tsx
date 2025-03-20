import { Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  // Mock order data
  const orderData = {
    orderNumber: 'WJ-' + Math.floor(100000 + Math.random() * 900000),
    orderDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    shippingAddress: {
      name: 'Jane Smith',
      street: '123 Fashion Street',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'United States',
    },
    items: [
      {
        id: 'kya-zip-through-chocolate',
        name: 'Kya Zip Through | Chocolate',
        price: '$139.00',
        size: 'S',
        quantity: 1,
        image: 'https://ext.same-assets.com/3297134805/4024151446.jpeg',
      },
      {
        id: 'kya-track-pant-chocolate',
        name: 'Kya Track Pant | Chocolate',
        price: '$129.00',
        size: 'M',
        quantity: 1,
        image: 'https://ext.same-assets.com/1239890666/1963880290.jpeg',
      }
    ],
    subtotal: '$268.00',
    shipping: 'Free',
    tax: '$26.80',
    total: '$294.80',
    paymentMethod: 'Visa ending in 4242',
    shippingMethod: 'Free Shipping (5-7 business days)',
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <h1 className="text-3xl font-akira mb-2">Thank You For Your Order!</h1>
          <p className="text-lg text-gray-600">
            A confirmation email has been sent to jane@example.com
          </p>
        </div>

        {/* Order Info */}
        <div className="bg-gray-50 p-6 mb-8">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div>
              <div className="text-sm text-gray-500">Order Number</div>
              <div className="font-semibold">{orderData.orderNumber}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Order Date</div>
              <div>{orderData.orderDate}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Estimated Delivery</div>
              <div>{orderData.estimatedDelivery}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipping Address */}
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p>{orderData.shippingAddress.name}</p>
              <p>{orderData.shippingAddress.street}</p>
              <p>
                {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
              </p>
              <p>{orderData.shippingAddress.country}</p>
            </div>

            {/* Payment & Shipping Method */}
            <div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <p>{orderData.paymentMethod}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Shipping Method</h3>
                <p>{orderData.shippingMethod}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>

          {/* Order Item Headers - Desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 text-sm font-medium">
            <div className="col-span-6">Item</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Items */}
          {orderData.items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-200">
              {/* Item */}
              <div className="col-span-12 md:col-span-6">
                <div className="flex">
                  <div className="w-20 h-20 mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">Size: {item.size}</div>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-4 md:col-span-2 flex md:block items-center">
                <div className="md:hidden text-sm font-medium mr-2">Price:</div>
                <div className="md:text-center">{item.price}</div>
              </div>

              {/* Quantity */}
              <div className="col-span-4 md:col-span-2 flex md:block items-center">
                <div className="md:hidden text-sm font-medium mr-2">Qty:</div>
                <div className="md:text-center">{item.quantity}</div>
              </div>

              {/* Total */}
              <div className="col-span-4 md:col-span-2 flex md:block items-center justify-end">
                <div className="md:hidden text-sm font-medium mr-2">Total:</div>
                <div className="md:text-right">{item.price}</div>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="mt-6 flex justify-end">
            <div className="w-full md:w-1/3">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>{orderData.subtotal}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Shipping</span>
                <span>{orderData.shipping}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Tax</span>
                <span>{orderData.tax}</span>
              </div>
              <div className="flex justify-between py-2 font-semibold text-lg border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>{orderData.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-jean-light p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          <p className="mb-4">
            You'll receive an email confirmation shortly at <span className="font-medium">jane@example.com</span>.
            We'll notify you once your order ships.
          </p>
          <p>
            Have a question? Visit our <Link to="/pages/help" className="text-jean-teal underline">Help Center</Link> or <Link to="/pages/contact" className="text-jean-teal underline">Contact Us</Link>.
          </p>
        </div>

        {/* Continue Shopping Button */}
        <div className="text-center">
          <Link to="/" className="bg-jean-dark text-white py-3 px-8 inline-block uppercase tracking-wide hover:bg-opacity-90 transition-colors duration-300">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
