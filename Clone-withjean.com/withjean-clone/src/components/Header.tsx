import { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearchClick: () => void;
}

const Header = ({ onSearchClick }: HeaderProps) => {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [editsMenuOpen, setEditsMenuOpen] = useState(false);
  const [customerCareOpen, setCustomerCareOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  return (
    <header className="bg-jean-light">
      {/* Announcement bar */}
      <div className="bg-jean-dark text-white py-2 text-center">
        <p className="text-sm tracking-wide">
          DISCOVER OUR NEW COLLECTION 'ESSENTIALLY NEEDED' FREE SHIPPING OVER $50
        </p>
      </div>

      {/* Top Navigation */}
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div className="hidden md:flex space-x-6">
          <Link to="/collections/new" className="hover:underline">New Arrivals</Link>
          <Link to="/collections/all" className="hover:underline">Shop</Link>
          <Link to="/blogs/diaries" className="hover:underline">Diaries</Link>
          <Link to="/pages/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center">
          <Link to="/" className="text-center">
            <img
              src="https://ext.same-assets.com/2862477707/3111715288.png"
              alt="With Jean"
              className="h-8"
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-4">
          <button
            aria-label="Search"
            onClick={onSearchClick}
            className="hover:opacity-70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link to="/pages/wishlist" className="hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>
          <Link to="/account" className="hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          <Link to="/cart" className="hover:opacity-70 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -right-2 -top-2 rounded-full bg-jean-dark text-white text-xs w-4 h-4 flex items-center justify-center">0</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Currency Selector (hidden by default) */}
      {currencyOpen && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-white p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Currency</h3>
            <button onClick={() => setCurrencyOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button className="border border-gray-300 px-4 py-2 w-full text-left mb-4">USD</button>
          <div className="grid grid-cols-3 gap-2">
            {['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'USD'].map(currency => (
              <a key={currency} href="#" className="text-sm py-1 hover:underline">{currency}</a>
            ))}
          </div>
        </div>
      )}

      {/* Desktop navigation dropdown here (would add if needed) */}

      {/* Mobile menu (hidden by default) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="flex justify-end p-4">
            <button onClick={() => setMobileMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <button
              className="flex justify-between items-center w-full border-b border-gray-200 py-3"
              onClick={() => setShopMenuOpen(!shopMenuOpen)}
            >
              <span className="text-xl">Shop</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${shopMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {shopMenuOpen && (
              <div className="pl-4 py-2 space-y-2">
                <Link to="/collections/all" className="block py-1">All</Link>
                <Link to="/collections/new" className="block py-1">New Arrivals</Link>
                <Link to="/collections/dresses" className="block py-1">Dresses</Link>
                <Link to="/collections/tops" className="block py-1">Tops</Link>
                <Link to="/collections/bottoms" className="block py-1">Bottoms</Link>
              </div>
            )}

            <button
              className="flex justify-between items-center w-full border-b border-gray-200 py-3"
              onClick={() => setEditsMenuOpen(!editsMenuOpen)}
            >
              <span className="text-xl">Edits</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${editsMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {editsMenuOpen && (
              <div className="pl-4 py-2 space-y-2">
                <Link to="/collections/best-sellers" className="block py-1">Best Sellers</Link>
                <Link to="/collections/occasionwear" className="block py-1">Occasionwear</Link>
                <Link to="/collections/in-focus-chocolate" className="block py-1">In Focus: Chocolate</Link>
              </div>
            )}

            <Link to="/pages/about-us" className="flex items-center w-full border-b border-gray-200 py-3">
              <span className="text-xl">About Us</span>
            </Link>

            <button
              className="flex justify-between items-center w-full border-b border-gray-200 py-3"
              onClick={() => setCustomerCareOpen(!customerCareOpen)}
            >
              <span className="text-xl">Customer Care</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${customerCareOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {customerCareOpen && (
              <div className="pl-4 py-2 space-y-2">
                <Link to="/pages/size-guide" className="block py-1">Size Guide</Link>
                <Link to="/pages/returns" className="block py-1">Returns</Link>
                <Link to="/pages/shipping-delivery" className="block py-1">Shipping & Delivery</Link>
              </div>
            )}

            <Link to="/pages/contact" className="flex items-center w-full border-b border-gray-200 py-3">
              <span className="text-xl">Contact Us</span>
            </Link>

            <Link to="/blogs/diaries" className="flex items-center w-full border-b border-gray-200 py-3">
              <span className="text-xl">Diaries</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
