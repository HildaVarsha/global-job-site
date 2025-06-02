"use client";
import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const JobsBanner = ({
  isLoaded,
  searchTerm,
  setSearchTerm,
  totalJobs,
}: {
  isLoaded: boolean;
  searchTerm: string;
  setSearchTerm: any;
  totalJobs: number;
}) => {
  const [location, setLocation] = useState("");
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-32 h-32 bg-purple-300/10 rounded-full animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-300/10 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Launch Your
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Dream Career
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-xl">
              Connect with leading companies and discover opportunities that
              match your skills and aspirations. Your next career milestone
              awaits.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5K+</div>
                <div className="text-blue-200 text-sm">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1K+</div>
                <div className="text-blue-200 text-sm">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1k+</div>
                <div className="text-blue-200 text-sm">Success Stories</div>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                Find Your Perfect Job
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Location (optional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full mb-4 pl-12 pr-4 py-4  text-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:outline-none"
                  />
                </div>
                <Link href={`/jobs?search=${searchTerm}&location=${location}`}>
                  <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
                    Search {totalJobs ? totalJobs : ""} Jobs
                  </button>
                </Link>
              </div>

              <div className="mt-6 text-center">
                <p className="text-white/80 text-sm">Popular searches:</p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {["Remote", "Frontend", "Marketing", "Design"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 text-white text-sm rounded-full hover:bg-white/30 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsBanner;
