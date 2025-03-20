import { Link } from 'react-router-dom';

const HomePage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Kya Zip Through | Chocolate',
      price: '$139.00',
      image: 'https://ext.same-assets.com/3297134805/4024151446.jpeg',
      link: '/products/kya-zip-through-chocolate',
      isNew: true,
    },
    {
      id: 2,
      name: 'Kya Track Pant | Chocolate',
      price: '$129.00',
      image: 'https://ext.same-assets.com/1239890666/1963880290.jpeg',
      link: '/products/kya-track-pant-chocolate',
      isNew: true,
    },
    {
      id: 3,
      name: 'Tammy Tee | White',
      price: '$119.00',
      image: 'https://ext.same-assets.com/756872191/2172730456.jpeg',
      link: '/products/tammy-tee-white',
      isNew: true,
    },
    {
      id: 4,
      name: 'King Jorts | Black',
      price: '$139.00',
      image: 'https://ext.same-assets.com/3122018651/114844992.jpeg',
      link: '/products/king-jorts-black',
      isNew: true,
    },
  ];

  const categoryLinks = [
    {
      title: 'SHOP TOPS',
      image: 'https://ext.same-assets.com/3712905662/4138745921.jpeg',
      link: '/collections/tops',
    },
    {
      title: 'SHOP DRESSES',
      image: 'https://ext.same-assets.com/2953662866/2211759542.jpeg',
      link: '/collections/dresses',
    },
    {
      title: 'SHOP TRACKSUITS',
      image: 'https://ext.same-assets.com/4275065108/2932829183.jpeg',
      link: '/collections/sets',
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-jean-light overflow-hidden">
        <img
          src="https://ext.same-assets.com/3611412215/225522784.png"
          alt="Essentially Needed"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Link to="/collections/new" className="mt-8 bg-jean-dark text-white px-8 py-3 uppercase tracking-wider hover:bg-opacity-90 transition-all duration-300">
            Shop New Arrivals
          </Link>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl text-center font-akira mb-8">SHOP NEW ARRIVALS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative mb-4">
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-jean-dark text-white text-xs py-1 px-2 uppercase">
                    New
                  </span>
                )}
                <Link to={product.link}>
                  <img
                    src={product.image}
                    alt={product.name}
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
                <Link to={product.link} className="text-md hover:underline">
                  {product.name}
                </Link>
                <p className="text-md">{product.price}</p>
                <div className="flex justify-center mt-2 space-x-1">
                  {['XXS', 'XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <span key={size} className="text-xs">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            className="w-10 h-10 border border-jean-dark flex items-center justify-center"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="w-10 h-10 border border-jean-dark flex items-center justify-center"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Category Links */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryLinks.map((category, index) => (
            <Link key={index} to={category.link} className="relative group">
              <img
                src={category.image}
                alt={category.title}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl text-white font-akira bg-jean-dark bg-opacity-60 px-4 py-2 group-hover:bg-opacity-80 transition-all duration-300">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
