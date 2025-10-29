import React, { useState, useEffect } from "react";
import axios from "axios";
import Receipt from "../components/Receipt";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], total: "0.00", itemCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/cart");
      setCart(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch cart items. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.email) {
      alert("Please enter your name and email.");
      return;
    }
    try {
      const { data } = await axios.post("/api/checkout", customer);
      setReceipt(data.receipt);
      setCustomer({ name: "", email: "" });
    } catch (err) {
      alert(`Checkout failed: ${err.response?.data?.message || "Server error"}`);
      console.error(err);
    }
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
    fetchCart();
  };

  if (loading) return <div className="p-8 text-center">Loading your cart...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">
      {/* If a receipt exists, show it. Otherwise, show the cart. */}
      {receipt ? (
        <Receipt receipt={receipt} onClose={handleCloseReceipt} />
      ) : (
        <>
          <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h1>
          {cart.items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item._id} className="flex items-center bg-white p-4 rounded-lg shadow">
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className="w-20 h-20 object-contain mr-4 rounded"
                      />
                      <div className="flex-grow">
                        <h2 className="font-semibold text-gray-800">{item.productId.name}</h2>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          ${(item.productId.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">(${item.productId.price.toFixed(2)} each)</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4 border-b pb-4">Order Summary</h2>
                  <div className="flex justify-between mb-4 text-lg">
                    <span>Total ({cart.itemCount} items)</span>
                    <span className="font-bold">${cart.total}</span>
                  </div>

                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customer.name}
                        placeholder="It should be mock_user"
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-violet-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={customer.email}
                        placeholder="You can use any email"
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-violet-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-violet-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-violet-600 active:bg-violet-700"
                    >
                      Place Order
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
