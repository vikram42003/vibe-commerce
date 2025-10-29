import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "./ui/icons/heroicons-shopping-cart"
import { ShoppingBagIcon } from "lucide-react"

const Navbar = () => {
  return (
    <div className="flex px-4 md:px-12 md:py-4 py-2 justify-between border-b border-gray-200 shadow-sm">
      {/* Using text as logo but the actual logo should go here */}
      <Link to="/" className="font-bold text-lg md:text-2xl tracking-tight">
        <span className="text-indigo-500">Vibe</span>
        <span className="text-violet-400">Commerce</span>
      </Link>

      <nav className="flex gap-4 md:gap-12 text-lg font-medium">
        <Link to="/" className="flex items-center gap-2 hover:text-violet-500 transition-colors duration-300">
          <span className="hidden md:inline">Products</span>
          <ShoppingBagIcon />
        </Link>
        <Link to="/cart" className="flex items-center gap-2 hover:text-violet-500 transition-colors duration-300">
          <div className="hidden md:inline">Cart</div>
          <ShoppingCartIcon />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
