import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterOptions from "@/components/FilterOptions";
import FoodResultCard from "@/components/FoodResultCard";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import { Food, FilterOption } from "@/lib/types";
import { Loader2 } from "lucide-react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("all");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const {
    data: foods,
    isLoading,
    refetch,
  } = useQuery<Food[]>({
    queryKey: [`/api/foods/search?query=${searchTerm}&filter=${selectedFilter}`],
    enabled: false,
  });

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setSearchTerm(query);
    setHasSearched(true);
    await refetch();
  };

  const handleFilterChange = async (filter: FilterOption) => {
    setSelectedFilter(filter);
    if (hasSearched) {
      await refetch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Search Section */}
        <section className="mb-10">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Check Food Oxalate Levels</h2>
            <p className="text-[#666666] mb-6">
              Search for any food to instantly see its oxalate content and get AI-generated insights
            </p>
            
            <SearchBar onSearch={handleSearch} />
            
            <FilterOptions 
              selectedFilter={selectedFilter} 
              onFilterChange={handleFilterChange} 
            />
          </div>
        </section>

        {/* Results Section */}
        <section>
          {/* No Results State (initial) */}
          {!hasSearched && !isLoading && (
            <div className="text-center py-12">
              <span className="inline-block text-6xl text-gray-300 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-16 h-16">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </span>
              <h3 className="text-xl font-medium text-[#666666] mb-2">Search for a food to get started</h3>
              <p className="text-gray-500">We'll show you oxalate levels and detailed information</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-[#666666]">Analyzing food data...</p>
            </div>
          )}

          {/* Results Display */}
          {hasSearched && !isLoading && foods && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.length > 0 ? (
                foods.map((food) => (
                  <FoodResultCard key={food.id} food={food} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium text-[#666666] mb-2">No foods found</h3>
                  <p className="text-gray-500">Try a different search term or filter</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Info Section */}
        <InfoSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
