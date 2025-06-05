import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const JobsCategories = ({ featuredCategories, isLoaded }: any) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Career Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover opportunities across various industries and find the
            perfect match for your skills and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories?.map((category: any, index: number) => (
            <Link href={"/coming-soon"} key={category.id}>
              <div
                key={category.id}
                className={`group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.bgColor} p-6 h-full`}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">
                          {category.count}
                        </div>
                        <div className="text-white/80 text-xs">
                          {category.growth}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobsCategories;
