import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock user data
const userData = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@example.com',
  phone: '+1 555-123-4567',
  defaultShippingAddress: {
    id: 'addr1',
    name: 'Jane Smith',
    address1: '123 Fashion Street',
    address2: 'Apt 4B',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    country: 'United States',
    isDefault: true,
  },
  addresses: [
    {
      id: 'addr1',
      name: 'Jane Smith',
      address1: '123 Fashion Street',
      address2: 'Apt 4B',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'United States',
      isDefault: true,
    },
    {
      id: 'addr2',
      name: 'Jane Smith',
      address1: '456 Style Avenue',
      address2: '',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      isDefault: false,
    }
  ],
  orders: [
    {
      id: 'WJ-123456',
      date: 'January 15, 2025',
      status: 'Delivered',
      total: '$294.80',
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
      ]
    },
    {
      id: 'WJ-123455',
      date: 'December 10, 2024',
      status: 'Delivered',
      total: '$189.00',
      items: [
        {
          id: 'stella-dress-white',
          name: 'Stella Dress | White',
          price: '$189.00',
          size: 'S',
          quantity: 1,
          image: 'https://ext.same-assets.com/2953662866/2211759542.jpeg',
        }
      ]
    }
  ],
  wishlist: [
    {
      id: 'daisy-mini-dress-blue',
      name: 'Daisy Mini Dress | Blue',
      price: '$179.00',
      image: 'https://ext.same-assets.com/3866521438/4259871324.jpeg',
    },
    {
      id: 'maya-skirt-cream',
      name: 'Maya Skirt | Cream',
      price: '$149.00',
      image: 'https://ext.same-assets.com/2349921876/3488765221.jpeg',
    }
  ]
};

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-akira mb-10 text-center">My Account</h1>

        {/* Account Navigation */}
        <div className="flex flex-wrap mb-8 border-b border-gray-200">
          {[
            { id: 'profile', label: 'Profile' },
            { id: 'orders', label: 'Order History' },
            { id: 'addresses', label: 'Addresses' },
            { id: 'wishlist', label: 'Wishlist' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-jean-dark text-jean-dark'
                  : 'text-gray-600 hover:text-jean-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            className="py-3 px-6 font-medium text-gray-600 hover:text-jean-dark ml-auto"
            onClick={() => alert('Logged out')}
          >
            Log Out
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <div className="bg-white p-8 border border-gray-200 rounded-md mb-8">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={userData.firstName}
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={userData.lastName}
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={userData.email}
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={userData.phone}
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => alert('Edit profile functionality would be here')}
                  className="bg-jean-dark text-white py-2 px-4 hover:bg-opacity-90 transition-colors duration-300"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="bg-white p-8 border border-gray-200 rounded-md">
              <h2 className="text-xl font-semibold mb-6">Password</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                    placeholder="•••••••••"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                    placeholder="•••••••••"
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-jean-dark"
                    placeholder="•••••••••"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => alert('Change password functionality would be here')}
                  className="bg-jean-dark text-white py-2 px-4 hover:bg-opacity-90 transition-colors duration-300"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Order History</h2>

            {userData.orders.length === 0 ? (
              <div className="text-center py-12 bg-white border border-gray-200 rounded-md">
                <p className="mb-4">You haven't placed any orders yet.</p>
                <Link to="/collections/all" className="bg-jean-dark text-white px-6 py-2 inline-block">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {userData.orders.map((order) => (
                  <div key={order.id} className="bg-white p-6 border border-gray-200 rounded-md">
                    <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200">
                      <div>
                        <div className="text-sm text-gray-500">Order Number</div>
                        <div className="font-semibold">{order.id}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Date</div>
                        <div>{order.date}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className="font-semibold">{order.status}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Total</div>
                        <div className="font-semibold">{order.total}</div>
                      </div>
                      <button
                        className="mt-4 sm:mt-0 text-jean-teal underline"
                        onClick={() => alert(`View order details for ${order.id}`)}
                      >
                        View Details
                      </button>
                    </div>

                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={`${item.id}-${item.size}`} className="flex">
                          <div className="w-16 h-20">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <Link to={`/products/${item.id}`} className="hover:underline">
                              {item.name}
                            </Link>
                            <div className="text-sm text-gray-500">Size: {item.size} | Qty: {item.quantity}</div>
                            <div>{item.price}</div>
                            <button
                              className="text-sm text-jean-teal mt-1 hover:underline"
                              onClick={() => alert(`Add to cart: ${item.name}`)}
                            >
                              Buy Again
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Saved Addresses</h2>
              <button
                onClick={() => alert('Add address functionality would be here')}
                className="bg-jean-dark text-white py-2 px-4 hover:bg-opacity-90 transition-colors duration-300"
              >
                Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.addresses.map((address) => (
                <div key={address.id} className="bg-white p-6 border border-gray-200 rounded-md">
                  {address.isDefault && (
                    <div className="bg-jean-teal text-white text-sm py-1 px-2 inline-block mb-3">
                      Default Address
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="font-semibold">{address.name}</p>
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>{address.city}, {address.state} {address.zip}</p>
                    <p>{address.country}</p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => alert(`Edit address: ${address.id}`)}
                      className="text-jean-dark hover:underline"
                    >
                      Edit
                    </button>

                    {!address.isDefault && (
                      <>
                        <button
                          onClick={() => alert(`Set as default: ${address.id}`)}
                          className="text-jean-dark hover:underline"
                        >
                          Set as Default
                        </button>

                        <button
                          onClick={() => alert(`Delete address: ${address.id}`)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Wishlist</h2>

            {userData.wishlist.length === 0 ? (
              <div className="text-center py-12 bg-white border border-gray-200 rounded-md">
                <p className="mb-4">Your wishlist is empty.</p>
                <Link to="/collections/all" className="bg-jean-dark text-white px-6 py-2 inline-block">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userData.wishlist.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-md overflow-hidden">
                    <Link to={`/products/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full aspect-[3/4] object-cover"
                      />
                    </Link>
                    <div className="p-4">
                      <Link to={`/products/${item.id}`} className="hover:underline">
                        <h3 className="font-medium mb-1">{item.name}</h3>
                      </Link>
                      <p className="text-gray-600 mb-4">{item.price}</p>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => alert(`Added to cart: ${item.id}`)}
                          className="bg-jean-dark text-white w-full py-2 hover:bg-opacity-90 transition-colors duration-300"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => alert(`Removed from wishlist: ${item.id}`)}
                          className="border border-gray-300 w-full py-2 hover:bg-gray-50 transition-colors duration-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
