import { SearchIcon } from "lucide-react";

const Searchbar = ({ setQuery }) => {
  return (
    <div className="bg-gray-200 w-full rounded-full px-4 py-2 text-lg">
      <label htmlFor="searchbar" className="flex items-center gap-2">
        <SearchIcon />
        <input
          type="text"
          id="searchbar"
          placeholder="Product name..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none border-b focus:border-b-black"
        />
      </label>
    </div>
  );
};

export default Searchbar;
