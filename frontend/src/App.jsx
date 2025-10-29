import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";

import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import CartPage from "./pages/CartPage.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: "0.00", itemCount: 0 });

  const fetchProducts = async () => {
    const response = await axios("/api/products");
    const dataWithCart = response.data.map((p) => ({ ...p, inCart: 0 }));
    setProducts(dataWithCart);
  };

  const fetchCart = async () => {
    const { data } = await axios.get("/api/cart");
    setCart(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage products={products} setProducts={setProducts} />} />
        <Route
          path="/cart"
          element={<CartPage cart={cart} fetchCart={fetchCart} products={products} setProducts={setProducts} />}
        />
      </Routes>
    </>
  );
}

export default App;
