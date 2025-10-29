import { useState } from "react";

import Searchbar from "@/components/homepage/Searchbar";
import ProductsGrid from "@/components/homepage/ProductsGrid";

const HomePage = ({ products, setProducts }) => {
  const [query, setQuery] = useState("");

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
