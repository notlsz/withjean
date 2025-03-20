import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You would implement newsletter signup functionality here
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className="bg-jean-light pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Instagram section */}
        <div className="mb-12">
          <h2 className="text-center text-xl font-bold mb-8">SHOP OUR INSTAGRAM | @WITHJEAN</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Instagram images would go here - using placeholder images */}
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="aspect-square bg-jean-beige"></div>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img
              src="https://ext.same-assets.com/3079934445/3139743509.png"
              alt="With Jean"
              className="h-10"
            />
          </Link>
        </div>

        {/* Footer links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold mb-4 uppercase">With Jean</h3>
            <ul className="space-y-2">
              <li><Link to="/collections/all" className="hover:underline">Shop All</Link></li>
              <li><Link to="/collections/new" className="hover:underline">New Arrivals</Link></li>
              <li><Link to="/products/gift-card" className="hover:underline">Gift Cards</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 uppercase">Our World</h3>
            <ul className="space-y-2">
              <li><Link to="/pages/about-us" className="hover:underline">About Us</Link></li>
              <li><Link to="/pages/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/pages/terms-conditions" className="hover:underline">Terms</Link></li>
              <li><Link to="/pages/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 uppercase">Customer Care</h3>
            <ul className="space-y-2">
              <li><Link to="/pages/shipping-delivery" className="hover:underline">Shipping</Link></li>
              <li><Link to="/pages/returns" className="hover:underline">Returns</Link></li>
              <li><Link to="/pages/new-size-guide" className="hover:underline">Size Guide</Link></li>
              <li><Link to="/pages/faqs" className="hover:underline">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 uppercase">Come join us</h3>
            <form onSubmit={handleEmailSubmit} className="mb-4">
              <div className="flex border-b border-jean-dark">
                <input
                  type="email"
                  placeholder="enter email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="flex-grow bg-transparent py-2 focus:outline-none"
                  required
                />
                <button type="submit" className="px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Social links */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/WithJean" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/withjean/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.pinterest.com.au/withjean/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@with_jean" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>© 2025 With Jean</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
