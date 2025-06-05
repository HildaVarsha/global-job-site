import { Heart, Target, Zap } from "lucide-react";
import React from "react";

const WhyChooseUs = ({ isLoaded }:any) => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-gray-600">
            Experience the difference with our comprehensive career platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Lightning Fast Matching",
              description:
                "Our AI-powered algorithm matches you with relevant opportunities in seconds, not days.",
              color: "text-yellow-600",
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: "Precision Targeting",
              description:
                "Find roles that match your exact skills, experience level, and career aspirations.",
              color: "text-blue-600",
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Personal Support",
              description:
                "Get dedicated career guidance and support throughout your job search journey.",
              color: "text-red-600",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`text-center group transform transition-all duration-500 hover:-translate-y-2 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${1000 + index * 200}ms` }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
