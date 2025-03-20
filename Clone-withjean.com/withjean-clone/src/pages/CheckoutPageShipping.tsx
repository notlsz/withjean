import { FC } from 'react';
import { Link } from 'react-router-dom';

// Shipping method interface
interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
}

interface ShippingStepProps {
  selectedMethod: string;
  shippingMethods: ShippingMethod[];
  subtotal: number;
  onMethodChange: (methodId: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBackToInformation: () => void;
}

const ShippingStep: FC<ShippingStepProps> = ({
  selectedMethod,
  shippingMethods,
  subtotal,
  onMethodChange,
  onSubmit,
  onBackToInformation
}) => {
  // Format price with 2 decimal places
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Determine if free shipping is available
  const isFreeShippingAvailable = subtotal >= 50;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          {shippingMethods.map((method) => {
            // Skip free shipping if order doesn't qualify
            if (method.id === 'free' && !isFreeShippingAvailable) {
              return null;
            }

            return (
              <div
                key={method.id}
                className={`
                  border p-4 mb-2 cursor-pointer
                  ${selectedMethod === method.id ? 'border-jean-dark' : 'border-gray-300'}
                `}
                onClick={() => onMethodChange(method.id)}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`shipping-${method.id}`}
                    name="shippingMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => onMethodChange(method.id)}
                    className="mr-3"
                  />
                  <label htmlFor={`shipping-${method.id}`} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-gray-500">{method.description}</div>
                        <div className="text-sm text-gray-500">Estimated delivery: {method.estimatedDelivery}</div>
                      </div>
                      <div className="font-medium">
                        {method.price === 0 ? 'Free' : formatPrice(method.price)}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            );
          })}

          {!isFreeShippingAvailable && (
            <div className="text-sm text-gray-500 mt-2">
              Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping.
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onBackToInformation}
            className="text-jean-teal"
          >
            ← Return to information
          </button>
          <button
            type="submit"
            className="bg-jean-dark text-white py-3 px-6 uppercase tracking-wide hover:bg-opacity-90 transition-colors duration-300"
          >
            Continue to payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingStep;
