"use client";
import {
  ChevronRight,
  Clock,
  GraduationCap,
  MapPin,
  PoundSterling,
  Star,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const JobsList = ({
  isLoaded,
  urlCategory,
  categories,

  jobs,
  hoveredCard,
  setHoveredCard,
}: any) => {
  const router = useRouter();
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Job Opportunities
          </h2>
          <p className="text-xl text-gray-600">
            Handpicked positions from top employers
          </p>
        </div>

        {/* Category Filters */}
        <div
          className={`mb-8 transform transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href={"/jobs"}>
              <button
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  urlCategory === ""
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                }`}
              >
                All Jobs
              </button>
            </Link>
            {categories.map((category: any) => (
              <Link href={`/jobs?category=${category.id}`} key={category.id}>
                <button
                  key={category.id}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    urlCategory === category.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                  }`}
                >
                  {category.name}
                  {/* <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        urlCategory === category.id
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {category.count}
                    </span> */}
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        {jobs?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {jobs?.map((job: any, index: number) => (
              <div
                key={job.id}
                onClick={() => router.push(`/jobs/${job?.id}`)}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100 overflow-hidden ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${800 + index * 100}ms`,
                  background:
                    hoveredCard === job.id
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "",
                }}
                onMouseEnter={() => setHoveredCard(job.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {job.benefits?.length > 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                          hoveredCard === job.id ? "bg-white/20" : "bg-gray-100"
                        } transition-all duration-300`}
                      >
                        <GraduationCap className="text-blue-700 w-12 h-12" />
                      </div>
                      <div className="ml-4">
                        <h3
                          className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            hoveredCard === job.id
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {job.title}
                        </h3>
                        <p
                          className={`font-semibold transition-colors duration-300 ${
                            hoveredCard === job.id
                              ? "text-white/80"
                              : "text-indigo-600"
                          }`}
                        >
                          {job.company}
                        </p>
                        <p
                          className={`text-sm transition-colors duration-300 ${
                            hoveredCard === job.id
                              ? "text-white/70"
                              : "text-gray-500"
                          }`}
                        >
                          {job.companySize}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p
                    className={`mb-4 transition-colors duration-300 ${
                      hoveredCard === job.id ? "text-white/90" : "text-gray-600"
                    }`}
                  >
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job?.skills?.map((skill: any, skillIndex: number) => (
                      <span
                        key={skillIndex}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                          hoveredCard === job.id
                            ? "bg-white/20 text-white"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div
                      className={`flex items-center transition-colors duration-300 ${
                        hoveredCard === job.id
                          ? "text-white/80"
                          : "text-gray-600"
                      }`}
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div
                      className={`flex items-center transition-colors duration-300 ${
                        hoveredCard === job.id
                          ? "text-white/80"
                          : "text-gray-600"
                      }`}
                    >
                      <PoundSterling className="w-4 h-4 mr-1" />
                      {job.minSalary}-{job?.maxSalary}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full font-medium transition-all duration-300 ${
                          hoveredCard === job.id
                            ? "bg-white/20 text-white"
                            : job.type === "Remote"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {job.jobType}
                      </span>
                      <div
                        className={`flex items-center transition-colors duration-300 ${
                          hoveredCard === job.id
                            ? "text-white/80"
                            : "text-gray-500"
                        }`}
                      >
                        <Clock className="w-4 h-4 mr-1" />

                        {moment(job.updatedAt).format("DD/MM/YYYY, HH:mm")}
                      </div>
                    </div>

                    <button
                      className={`flex items-center font-semibold transition-all duration-300 group-hover:translate-x-1 ${
                        hoveredCard === job.id
                          ? "text-white"
                          : "text-indigo-600"
                      }`}
                    >
                      Apply Now
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className="font-semibold text-lg">No Jobs are available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsList;
