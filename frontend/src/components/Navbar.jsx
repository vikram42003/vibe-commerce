import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "./ui/icons/heroicons-shopping-cart"
import { ShoppingBagIcon } from "lucide-react"

const Navbar = () => {
  return (
    <div className="flex px-12 py-4 justify-between border-b border-gray-200 shadow-sm">
      {/* Using text as logo but the actual logo should go here */}
      <Link to="/" className="font-bold text-2xl tracking-tight">
        <span className="text-indigo-500">Vibe</span>
        <span className="text-violet-400">Commerce</span>
      </Link>

      <nav className="flex space-x-12 text-lg font-medium">
        <Link to="/" className="flex items-center gap-2">Products <ShoppingBagIcon /></Link>
        <Link to="/" className="flex items-center gap-2">Cart <ShoppingCartIcon /></Link>
      </nav>
    </div>
  );
};

export default Navbar;
