"use client";
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Footer, TopNavbar } from "@/components/shared";
import { getAllJobs } from "@/services/jobServices";

import { HomeCategory, HomeHeroSection, HomeJobs } from "@/components/home";
import Link from "next/link";
import { safeLocalStorage } from "@/lib/utils";

const JobPortalHomepage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [latestJob, setLatestJob] = useState([]);
  const user = JSON.parse(safeLocalStorage.getItem("user") || "{}");
  const getJobList = async () => {
    const response = await getAllJobs();
    console.log(response, "response");
    const latestThree = response.slice(0, 3);
    setLatestJob(latestThree);
  };
  useEffect(() => {
    getJobList();
  }, []);
  console.log(user, "user");
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <TopNavbar />
      {/* Hero Section */}
      <HomeHeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Categories Section */}
      <HomeCategory />
      {/* Featured Jobs */}
      <HomeJobs featuredJobs={latestJob} />
      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join our community of professionals and discover opportunities
              that align with your goals and aspirations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"/register"}>
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold text-lg">
                  Create Your Profile
                </button>
              </Link>
              <Link href={"/coming-soon"}>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all font-semibold text-lg flex items-center justify-center">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default JobPortalHomepage;
