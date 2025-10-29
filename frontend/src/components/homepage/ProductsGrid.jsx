import axios from "axios";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";

const ProductsGrid = ({ products, setProducts }) => {
  const [addButtonText, setAddButtonText] = useState("Add to cart");

  const increaseProductInCarthandler = (product) => {
    if (product.stock > 0) {
      setProducts((products) =>
        products.map((p) => (p._id === product._id ? { ...p, inCart: p.inCart + 1, stock: p.stock - 1 } : p)),
      );
    }
  };
  const decreaseProductInCarthandler = (product) => {
    if (product.inCart > 0) {
      setProducts((products) =>
        products.map((p) => (p._id === product._id ? { ...p, inCart: p.inCart - 1, stock: p.stock + 1 } : p)),
      );
    }
  };

  const updateCart = async (product) => {
    if (product.inCart <= 0) {
      return;
    }

    try {
      if (product.inCart > 0) {
        await axios.delete(`/api/cart/${product._id}`);
      }
      const res = await axios.post("/api/cart", { productId: product._id, quantity: product.inCart });
      setProducts((products) => products.map((p) => (p._id === res.data._id ? res.data : p)));
      setAddButtonText("Added!");
      setTimeout(() => setAddButtonText("Add to cart"), 500);
    } catch (error) {
      console.log("Something went wrong, could not update cart");
      console.log(error);
    }
  };

  const disabled = "cursor-not-allowed bg-gray-300 opacity-50";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => {
        return (
          <div key={product._id} className="border rounded-lg shadow-md overflow-hidden bg-white">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="px-4 pt-2">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
              <div className="flex justify-between">
                <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
                <p className="text-gray-600 mt-1">Stock: {product.stock}</p>
              </div>
            </div>

            <div className="flex justify-between items-center px-4 pt-4 py-2">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => decreaseProductInCarthandler(product)}
                  disabled={product.inCart <= 0}
                  className={`cursor-pointer ${product.inCart <= 0 ? disabled : ""}`}
                >
                  <MinusIcon size={20} />
                </button>
                <button
                  onClick={() => increaseProductInCarthandler(product)}
                  disabled={product.stock <= 0}
                  className={`cursor-pointer ${product.stock <= 0 ? disabled : ""}`}
                >
                  <PlusIcon size={20} />
                </button>
              </div>
              <p>In cart: {product.inCart}</p>
            </div>

            <button
              onClick={() => updateCart(product)}
              className="bg-violet-400 p-2 w-full text-center hover:bg-violet-500 active:bg-violet-600 transition-colors duration-300"
              disabled={product.inCart <= 0}
            >
              {addButtonText}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
