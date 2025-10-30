import { Link } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react"; // Ensure lucide-react is installed: npm install lucide-react

interface NavbarProps {
  onSearch: (query: string) => void; // Prop to handle search
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(search); // Pass search query to parent (App.tsx)
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch(); // Allow Enter key to trigger search
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Highway Delite"
            className="h-14 w-auto object-contain"
          />
          
        </Link>

        {/* Search bar */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-1/2">
          <input
            type="text"
            placeholder="Search experiences"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress} // Added for Enter key support
            className="flex-1 px-3 py-2 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 text-gray-900 px-4 py-2 font-medium hover:bg-yellow-500 flex items-center gap-2"
          >
            <Search size={16} />
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
