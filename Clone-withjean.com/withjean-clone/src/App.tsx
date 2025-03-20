import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import NewsletterPopup from './components/NewsletterPopup';
import FullScreenSearch from './components/FullScreenSearch';

// Pages
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CollectionPage from './pages/CollectionPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import SearchResultsPage from './pages/SearchResultsPage';
import SizeGuidePage from './pages/SizeGuidePage';
import AccountPage from './pages/AccountPage';

function App() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Function to open search overlay
  const openSearch = () => {
    setShowSearch(true);
  };

  // Function to close search overlay
  const closeSearch = () => {
    setShowSearch(false);
  };

  useEffect(() => {
    // Show newsletter popup after 2 seconds
    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app min-h-screen flex flex-col">
        <Header onSearchClick={openSearch} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/collections/:collectionId" element={<CollectionPage />} />
            <Route path="/collections" element={<CollectionPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/pages/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/pages/size-guide" element={<SizeGuidePage />} />
            <Route path="/account" element={<AccountPage />} />

            {/* Fallback route - redirect to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        {showNewsletter && <NewsletterPopup onClose={() => setShowNewsletter(false)} />}
        <FullScreenSearch isOpen={showSearch} onClose={closeSearch} />
      </div>
    </Router>
  );
}

export default App;
