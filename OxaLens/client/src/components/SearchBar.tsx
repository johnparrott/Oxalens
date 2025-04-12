import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

interface SearchSuggestion {
  id: number;
  name: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: suggestions } = useQuery<SearchSuggestion[]>({
    queryKey: [`/api/foods/suggest?query=${searchValue}`],
    enabled: searchValue.length > 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowSuggestions(value.length > 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mb-6" ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a food (e.g. spinach, almond, potato)"
            className="w-full p-4 pl-12 pr-4 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(searchValue.length > 1)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && suggestions && suggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-10 border border-gray-200">
          <ul className="py-2 divide-y divide-gray-100">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(suggestion.name)}
              >
                <div className="flex items-center">
                  <Search className="mr-2 text-gray-400 h-4 w-4" />
                  <span>{suggestion.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
