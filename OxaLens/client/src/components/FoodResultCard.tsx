import React from "react";
import { Food } from "@/lib/types";
import OxalateMeter from "./OxalateMeter";
import { BookmarkIcon, InfoIcon, CircleAlert, CheckCircleIcon, ToyBrick } from "lucide-react";

interface FoodResultCardProps {
  food: Food;
}

const FoodResultCard: React.FC<FoodResultCardProps> = ({ food }) => {
  const getAlertContent = () => {
    switch (food.oxalateLevel) {
      case "low":
        return {
          bgColor: "bg-primary/10",
          textColor: "text-primary",
          icon: <CheckCircleIcon className="h-4 w-4 mr-1" />,
          message: "Low Oxalate Food - Safe for low-oxalate diets",
        };
      case "medium":
        return {
          bgColor: "bg-[#FFA000]/10",
          textColor: "text-[#FFA000]",
          icon: <InfoIcon className="h-4 w-4 mr-1" />,
          message: "Medium Oxalate Food - Consume in moderation if you have oxalate sensitivity",
        };
      case "high":
        return {
          bgColor: "bg-[#F44336]/10",
          textColor: "text-[#F44336]",
          icon: <CircleAlert className="h-4 w-4 mr-1" />,
          message: "High Oxalate Food - Consider limiting intake if you're sensitive to oxalates",
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          icon: <InfoIcon className="h-4 w-4 mr-1" />,
          message: "Unknown Oxalate Level",
        };
    }
  };

  const alertContent = getAlertContent();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Food Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{food.name}</h3>
          <p className="text-sm text-[#666666]">{food.category}</p>
        </div>
        <button className="ml-2 p-2 rounded-full hover:bg-[#F5F7FA] transition-colors">
          <BookmarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Food Content */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center mb-6">
          {/* Oxalate Meter */}
          <OxalateMeter level={food.oxalateLevel} content={food.oxalateContent} />

          {/* Oxalate Details */}
          <div className="flex-1">
            <div className="text-sm text-[#666666] mb-3">
              <span className="font-medium">Oxalate Content:</span> {food.oxalateContent} mg per 100g
            </div>
            <div className={`${alertContent.bgColor} rounded-lg p-3 text-sm ${alertContent.textColor}`}>
              {alertContent.icon}
              <span className="font-medium">{alertContent.message.split(" - ")[0]}</span> - {alertContent.message.split(" - ")[1]}
            </div>
          </div>
        </div>

        {/* AI Description */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <ToyBrick className="h-4 w-4 mr-1" />
            AI Description
          </h4>
          <p className="text-sm text-[#666666]">
            {food.description}
          </p>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 gap-2">
          <div className="text-xs bg-gray-50 p-2 rounded">
            <span className="font-medium block">Serving Size</span>
            {food.servingSize}
          </div>
          <div className="text-xs bg-gray-50 p-2 rounded">
            <span className="font-medium block">
              {food.oxalateLevel === "low" ? "Benefits" : "Alternative/Tip"}
            </span>
            {food.alternativeTip}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodResultCard;
