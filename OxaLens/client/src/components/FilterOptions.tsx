import React from "react";
import { FilterOption } from "@/lib/types";

interface FilterOptionsProps {
  selectedFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ selectedFilter, onFilterChange }) => {
  const filters: { label: string; value: FilterOption; color?: string }[] = [
    { label: "All", value: "all" },
    { label: "Low Oxalate", value: "low", color: "#4CAF50" },
    { label: "Medium Oxalate", value: "medium", color: "#FFA000" },
    { label: "High Oxalate", value: "high", color: "#F44336" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`px-4 py-2 rounded-full border transition-colors ${
            selectedFilter === filter.value
              ? "bg-primary/10 border-primary text-primary font-medium"
              : "bg-white border-gray-300 hover:bg-gray-50 text-[#333333]"
          } text-sm font-medium flex items-center space-x-1`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.color && <span className="w-2 h-2 rounded-full inline-block mr-1" style={{ backgroundColor: filter.color }}></span>}
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterOptions;
