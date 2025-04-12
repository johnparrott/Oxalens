import React from "react";
import { AlertCircle } from "lucide-react";

const InfoSection: React.FC = () => {
  return (
    <section className="mt-12 bg-white rounded-lg shadow-sm p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-4">About Oxalates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">What are Oxalates?</h3>
          <p className="text-[#666666] mb-4">
            Oxalates are naturally-occurring compounds found in many plant foods. When consumed, they can bind to calcium in the digestive tract and be excreted in stool or urine. For some people, high oxalate intake may contribute to kidney stone formation or other health issues.
          </p>

          <h3 className="text-lg font-semibold mb-3">Oxalate Levels Guide</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-primary mr-2"></span>
              <span className="font-medium">Low:</span>
              <span className="ml-1 text-[#666666]">Less than 10 mg per serving</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-[#FFA000] mr-2"></span>
              <span className="font-medium">Medium:</span>
              <span className="ml-1 text-[#666666]">10-50 mg per serving</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-[#F44336] mr-2"></span>
              <span className="font-medium">High:</span>
              <span className="ml-1 text-[#666666]">Over 50 mg per serving</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Who Should Monitor Oxalates?</h3>
          <ul className="list-disc pl-5 text-[#666666] space-y-2 mb-4">
            <li>People with a history of calcium oxalate kidney stones</li>
            <li>Those with hyperoxaluria (excess urinary oxalate)</li>
            <li>Individuals with certain digestive disorders that affect nutrient absorption</li>
            <li>People following physician-recommended low-oxalate diets</li>
          </ul>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-700 mb-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Important Note
            </h4>
            <p className="text-sm text-blue-700">
              This app provides general information and is not a substitute for medical advice. Always consult with a healthcare provider before making significant dietary changes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
