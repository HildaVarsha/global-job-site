"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  TrendingUp,
  ChevronRight,
  Play,
  Award,
  Building2,
  Clock,
  DollarSign,
} from "lucide-react";
import { Footer, TopNavbar } from "@/components/shared";
import Image from "next/image";

const JobPortalHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      title: "Find Your Dream Career",
      subtitle:
        "Connect with leading companies and discover opportunities that match your ambitions",
      gradient: "from-blue-600 via-purple-600 to-indigo-600",
      backgroundImage:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    },
    {
      title: "Advance Your Professional Journey",
      subtitle:
        "Access exclusive job openings and build meaningful connections with industry leaders",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      backgroundImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    },
    {
      title: "Shape Your Future Today",
      subtitle:
        "Join thousands of professionals who have transformed their careers through our platform",
      gradient: "from-orange-600 via-pink-600 to-rose-600",
      backgroundImage:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    },
  ];

  const stats = [
    {
      icon: Briefcase,
      value: "50K+",
      label: "Active Jobs",
      color: "text-blue-600",
    },
    {
      icon: Building2,
      value: "10K+",
      label: "Companies",
      color: "text-emerald-600",
    },
    {
      icon: Users,
      value: "500K+",
      label: "Job Seekers",
      color: "text-purple-600",
    },
    {
      icon: Award,
      value: "95%",
      label: "Success Rate",
      color: "text-orange-600",
    },
  ];

  const categories = [
    { name: "Technology", jobs: "15,430", icon: "💻", trend: "+12%" },
    { name: "Healthcare", jobs: "8,920", icon: "🏥", trend: "+18%" },
    { name: "Finance", jobs: "6,740", icon: "💼", trend: "+8%" },
    { name: "Education", jobs: "4,520", icon: "🎓", trend: "+15%" },
    { name: "Marketing", jobs: "7,680", icon: "📊", trend: "+22%" },
    { name: "Design", jobs: "3,290", icon: "🎨", trend: "+25%" },
  ];

  const featuredJobs = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      salary: "$120K - $160K",
      type: "Full-time",
      posted: "2 days ago",
      logo: "🚀",
    },
    {
      title: "Product Manager",
      company: "Innovation Labs",
      location: "New York, NY",
      salary: "$100K - $140K",
      type: "Full-time",
      posted: "1 day ago",
      logo: "💡",
    },
    {
      title: "UX Designer",
      company: "Creative Studio",
      location: "Remote",
      salary: "$80K - $110K",
      type: "Full-time",
      posted: "3 days ago",
      logo: "🎯",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <TopNavbar />
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={heroSlides[currentSlide].backgroundImage}
            alt="Professional background"
            width={100}
            height={100}
            className="w-full h-full object-cover transition-all duration-1000 transform scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].gradient} opacity-20 transition-all duration-1000`}
          />
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div
              className={`transition-all duration-1000 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                <span className="block">{heroSlides[currentSlide].title}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>

            {/* Search Bar */}
            <div
              className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-300 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Job title, keywords, or company"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="City, state, or remote"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold text-lg">
                    Search Jobs
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-500 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <stat.icon
                      className={`h-12 w-12 mx-auto mb-4 ${stat.color}`}
                    />
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce" />
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse" />
      </section>

      {/* Categories Section */}
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
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{job.logo}</div>
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
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold border-2 border-blue-600 hover:bg-blue-600 hover:text-white">
              View All Jobs
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join our community of professionals and discover opportunities that
            align with your goals and aspirations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold text-lg">
              Create Your Profile
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all font-semibold text-lg flex items-center justify-center">
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JobPortalHomepage;
