import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import CartPage from "./pages/CartPage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
