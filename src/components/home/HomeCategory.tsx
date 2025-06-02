import React from "react";
import { TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";
const HomeCategory = () => {
  const categories = [
    { name: "IT", id: "IT", jobs: "15,430", icon: "💻", trend: "+12%" },
    { name: "Finance", id: "finance", jobs: "6,740", icon: "💼", trend: "+8%" },
    { name: "HR", id: "hr", jobs: "4,520", icon: "🎓", trend: "+15%" },
    {
      name: "Marketing",
      id: "marketing",
      jobs: "7,680",
      icon: "📊",
      trend: "+22%",
    },
    { name: "Design", id: "design", jobs: "3,290", icon: "🎨", trend: "+25%" },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover opportunities across diverse industries and find the
            perfect match for your expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link href={`/jobs?category=${category.id}`} key={category?.id}>
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <div className="flex items-center space-x-1 text-green-600 font-semibold">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">{category.trend}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.jobs} open positions
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                  <span>Explore jobs</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategory;
