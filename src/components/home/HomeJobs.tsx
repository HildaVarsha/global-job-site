import React from "react";
import { MapPin, Clock, GraduationCap, PoundSterling } from "lucide-react";
import Link from "next/link";
const HomeJobs = ({ featuredJobs }: any) => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hand-picked positions from top companies looking for exceptional
            talent
          </p>
        </div>
        {featuredJobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs?.map((job: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">
                    <GraduationCap className="w-12 h-12" />
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-700 font-medium mb-4">{job.company}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <PoundSterling className="h-4 w-4 mr-2" />
                    {job.minSalary && job.maxSalary ? (
                      <span>
                        {job.minSalary}-{job.maxSalary}
                      </span>
                    ) : (
                      <span>0</span>
                    )}{" "}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>
                <Link href={`/apply/${job?.id}`}>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
                    Apply Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className="font-semibold text-lg">No Jobs are available</p>
          </div>
        )}
        <Link href={"/jobs"}>
          <div className="text-center mt-12">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold border-2 border-blue-600 hover:bg-blue-600 hover:text-white">
              View All Jobs
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HomeJobs;
