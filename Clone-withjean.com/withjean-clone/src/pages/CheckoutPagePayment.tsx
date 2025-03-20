import { FC } from 'react';

interface PaymentMethod {
  cardNumber: string;
  nameOnCard: string;
  expirationDate: string;
  securityCode: string;
  sameAsShipping: boolean;
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

interface PaymentStepProps {
  paymentInfo: PaymentMethod;
  shippingAddress: ShippingAddress;
  onPaymentInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBackToShipping: () => void;
}

const PaymentStep: FC<PaymentStepProps> = ({
  paymentInfo,
  shippingAddress,
  onPaymentInfoChange,
  onSubmit,
  onBackToShipping
}) => {
  // Format credit card number with spaces
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  // Format expiration date (MM/YY)
  const formatExpirationDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 5);
  };

  // Handle card number input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    e.target.value = formattedValue;
    onPaymentInfoChange(e);
  };

  // Handle expiration date input
  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpirationDate(e.target.value);
    e.target.value = formattedValue;
    onPaymentInfoChange(e);
  };

  // Format shipping address for display
  const formattedShippingAddress = [
    `${shippingAddress.firstName} ${shippingAddress.lastName}`,
    shippingAddress.address1,
    shippingAddress.address2,
    `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}`,
    shippingAddress.country
  ].filter(Boolean).join(', ');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment</h2>
      <form onSubmit={onSubmit}>
        {/* Payment Method */}
        <div className="border border-gray-300 rounded p-4 mb-6">
          <h3 className="font-medium mb-4">Credit Card</h3>

          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">Name on Card</label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              value={paymentInfo.nameOnCard}
              onChange={onPaymentInfoChange}
              className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="expirationDate" className="block text-sm font-medium mb-1">Expiration Date (MM/YY)</label>
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                value={paymentInfo.expirationDate}
                onChange={handleExpirationDateChange}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                required
              />
            </div>

            <div>
              <label htmlFor="securityCode" className="block text-sm font-medium mb-1">Security Code</label>
              <input
                type="password"
                id="securityCode"
                name="securityCode"
                value={paymentInfo.securityCode}
                onChange={onPaymentInfoChange}
                placeholder="CVC"
                maxLength={4}
                className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                required
              />
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="border border-gray-300 rounded p-4 mb-6">
          <h3 className="font-medium mb-4">Billing Address</h3>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sameAsShipping"
                checked={paymentInfo.sameAsShipping}
                onChange={onPaymentInfoChange}
                className="mr-2"
              />
              <span>Same as shipping address</span>
            </label>
          </div>

          {paymentInfo.sameAsShipping && (
            <div className="text-sm bg-gray-50 p-3 rounded">
              <p>{formattedShippingAddress}</p>
            </div>
          )}

          {!paymentInfo.sameAsShipping && (
            <div className="text-sm text-jean-teal">
              To use a different billing address, please contact customer service.
            </div>
          )}
        </div>

        {/* Order Disclaimer */}
        <div className="mb-6 text-sm text-gray-500">
          <p>By clicking "Place Order", you agree to our <a href="#" className="underline">Terms & Conditions</a> and confirm that you have read our <a href="#" className="underline">Privacy Policy</a>.</p>
          <p className="mt-2">All orders are processed in USD.</p>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onBackToShipping}
            className="text-jean-teal"
          >
            ← Return to shipping
          </button>
          <button
            type="submit"
            className="bg-jean-dark text-white py-3 px-6 uppercase tracking-wide hover:bg-opacity-90 transition-colors duration-300"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentStep;
