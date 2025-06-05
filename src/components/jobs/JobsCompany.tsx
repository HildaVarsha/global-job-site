import { Star } from "lucide-react";
import React from "react";

const JobsCompany = ({ companies, isLoaded }: any) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-xl text-gray-600">
            Join professionals working at world-class organizations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {companies.map((company:any, index:number) => (
            <div
              key={company.name}
              className={`group text-center transform transition-all duration-500 hover:-translate-y-2 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${800 + index * 100}ms` }}
            >
              <div className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="text-4xl mb-3">{company.logo}</div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {company.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {company.employees}
                </p>
                <div className="flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {company.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobsCompany;
