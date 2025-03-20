import { useState } from 'react';

interface NewsletterPopupProps {
  onClose: () => void;
}

const NewsletterPopup = ({ onClose }: NewsletterPopupProps) => {
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would implement the actual newsletter signup here
    alert('Thank you for subscribing!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white max-w-md w-full">
        <div className="flex">
          <div className="w-1/2 p-8">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-4">
              <h3 className="text-lg uppercase font-akira tracking-wide">Join our world</h3>
              <p className="text-xl uppercase font-akira my-2">Receive 10% off<br />your first order</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border border-gray-300 p-2 focus:outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={birthdate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthdate(e.target.value)}
                  placeholder="Date Of Birth"
                  className="w-full border border-gray-300 p-2 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-gray-300 p-2 uppercase hover:bg-jean-dark hover:text-white transition-colors duration-300"
              >
                Continue
              </button>
            </form>
          </div>
          <div className="w-1/2">
            <img
              src="https://ext.same-assets.com/871092079/698306954.png"
              alt="Newsletter signup"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
