"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  DollarSign,
  Star,
  ChevronRight,
  Clock,
  ArrowRight,
  Zap,
  Target,
  Heart,
} from "lucide-react";
import { JobsBanner } from "@/components/jobs";

const AnimatedJobSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      type: "Full-time",
      posted: "2 days ago",
      category: "technology",
      featured: true,
      logo: "🚀",
      skills: ["React", "TypeScript", "Next.js"],
      description:
        "Join our innovative team building cutting-edge web applications.",
      companySize: "500+ employees",
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Design Studio",
      location: "New York, NY",
      salary: "$90k - $130k",
      type: "Full-time",
      posted: "1 day ago",
      category: "design",
      featured: false,
      logo: "🎨",
      skills: ["Figma", "Sketch", "Prototyping"],
      description:
        "Create beautiful and intuitive user experiences for our products.",
      companySize: "50-200 employees",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Remote",
      salary: "$110k - $150k",
      type: "Remote",
      posted: "3 days ago",
      category: "technology",
      featured: true,
      logo: "☁️",
      skills: ["AWS", "Docker", "Kubernetes"],
      description:
        "Build and maintain scalable cloud infrastructure solutions.",
      companySize: "200-500 employees",
    },
    {
      id: 4,
      title: "Marketing Manager",
      company: "Growth Marketing Co.",
      location: "Austin, TX",
      salary: "$80k - $110k",
      type: "Full-time",
      posted: "5 days ago",
      category: "marketing",
      featured: false,
      logo: "📈",
      skills: ["SEO", "Analytics", "Content Strategy"],
      description: "Lead marketing campaigns and drive customer acquisition.",
      companySize: "100-500 employees",
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "AI Innovations Lab",
      location: "Boston, MA",
      salary: "$130k - $170k",
      type: "Full-time",
      posted: "1 week ago",
      category: "technology",
      featured: true,
      logo: "🤖",
      skills: ["Python", "Machine Learning", "SQL"],
      description: "Analyze complex datasets and build predictive models.",
      companySize: "50-200 employees",
    },
    {
      id: 6,
      title: "UX Researcher",
      company: "User First Design",
      location: "Seattle, WA",
      salary: "$95k - $125k",
      type: "Full-time",
      posted: "4 days ago",
      category: "design",
      featured: false,
      logo: "🔍",
      skills: ["User Research", "Usability Testing", "Analytics"],
      description: "Conduct user research to inform product design decisions.",
      companySize: "200-500 employees",
    },
  ];

  const categories = [
    { id: "all", name: "All Jobs", count: jobs.length },
    {
      id: "technology",
      name: "Technology",
      count: jobs.filter((j) => j.category === "technology").length,
    },
    {
      id: "design",
      name: "Design",
      count: jobs.filter((j) => j.category === "design").length,
    },
    {
      id: "marketing",
      name: "Marketing",
      count: jobs.filter((j) => j.category === "marketing").length,
    },
  ];

  const featuredCategories = [
    {
      id: "tech",
      name: "Technology",
      icon: "💻",
      count: "2,847 jobs",
      growth: "+12% this month",
      description: "Software development, AI, cybersecurity, and more",
      bgColor: "from-blue-600 to-purple-600",
    },
    {
      id: "design",
      name: "Design & Creative",
      icon: "🎨",
      count: "1,243 jobs",
      growth: "+8% this month",
      description: "UI/UX design, graphic design, branding",
      bgColor: "from-pink-500 to-rose-500",
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: "📊",
      count: "1,687 jobs",
      growth: "+15% this month",
      description: "Digital marketing, content, social media",
      bgColor: "from-green-500 to-emerald-600",
    },
    {
      id: "finance",
      name: "Finance",
      icon: "💰",
      count: "923 jobs",
      growth: "+6% this month",
      description: "Investment banking, fintech, accounting",
      bgColor: "from-amber-500 to-orange-600",
    },
  ];

  const companies = [
    { name: "Google", logo: "🔍", employees: "139,000+", rating: 4.4 },
    { name: "Microsoft", logo: "🪟", employees: "221,000+", rating: 4.5 },
    { name: "Apple", logo: "🍎", employees: "164,000+", rating: 4.3 },
    { name: "Meta", logo: "📘", employees: "77,000+", rating: 4.2 },
    { name: "Amazon", logo: "📦", employees: "1.5M+", rating: 4.1 },
    { name: "Netflix", logo: "🎬", employees: "12,000+", rating: 4.3 },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <JobsBanner
        isLoaded={isLoaded}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* Featured Categories Section */}
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
            {featuredCategories.map((category, index) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Company Showcase Section */}
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
            {companies.map((company, index) => (
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

      {/* Job Listings Section */}
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
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                  }`}
                >
                  {category.name}
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedCategory === category.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {filteredJobs?.map((job: any, index) => (
              <div
                key={job.id}
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
                {job.featured && (
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
                        {job.logo}
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
                    {job.skills.map((skill: any, skillIndex: number) => (
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
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
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
                        {job.type}
                      </span>
                      <div
                        className={`flex items-center transition-colors duration-300 ${
                          hoveredCard === job.id
                            ? "text-white/80"
                            : "text-gray-500"
                        }`}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        {job.posted}
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

          <div className="text-center">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              View All Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
    </div>
  );
};
export default AnimatedJobSearch;
