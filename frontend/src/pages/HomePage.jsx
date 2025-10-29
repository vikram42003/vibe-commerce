import { useEffect, useState } from "react";
import axios from "axios";

import Searchbar from "@/components/homepage/Searchbar";
import ProductsGrid from "@/components/homepage/ProductsGrid";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios("/api/products");
      const dataWithCart = response.data.map((p) => ({ ...p, inCart: 0 }));
      setProducts(dataWithCart);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mx-4 md:mx-auto max-w-xl my-6 md:my-8">
        <Searchbar setQuery={setQuery} />
      </div>

      <p className="text-center text-xl font-medium">Displaying {filteredProducts.length} products</p>

      <ProductsGrid products={filteredProducts} setProducts={setProducts} />
    </div>
  );
};

export default HomePage;
