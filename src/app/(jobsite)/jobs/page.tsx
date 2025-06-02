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
  PoundSterling,
  GraduationCap,
} from "lucide-react";
import {
  JobsBanner,
  JobsCategories,
  JobsCompany,
  JobsList,
} from "@/components/jobs";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllJobs } from "@/services/jobServices";
import moment from "moment";
import Link from "next/link";
import { WhyChooseUs } from "@/components/shared";

const AnimatedJobSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams: any = useSearchParams();
  console.log(searchParams, "searchParam");
  const urlSearch = searchParams.get("search");
  const urllocation = searchParams.get("location");
  const urlCategory = searchParams.get("category");
  console.log(urlSearch, "urlSearch", urllocation);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [jobs, setJobs] = useState<any>([]);

  const getJobList = async () => {
    const params = {
      search: urlSearch,
      location: urllocation,
      category: urlCategory,
    };
    const jobs = await getAllJobs(params);
    setJobs(jobs);
  };
  useEffect(() => {
    getJobList();
  }, [searchParams]);

  const categories = [
    {
      id: "IT",
      name: "IT",
    },
    {
      id: "finance",
      name: "Finance",
    },
    {
      id: "marketing",
      name: "Marketing",
    },
    {
      id: "hr",
      name: "HR",
    },
    {
      id: "design",
      name: "Design",
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
        totalJobs={jobs?.length}
      />
      {/* Featured Categories Section */}
      <JobsCategories
        featuredCategories={featuredCategories}
        isLoaded={isLoaded}
      />

      {/* Company Showcase Section */}
      <JobsCompany companies={companies} isLoaded={isLoaded} />

      {/* Job Listings Section */}
      <JobsList
        isLoaded={isLoaded}
        urlCategory={urlCategory}
        categories={categories}
        jobs={jobs}
        hoveredCard={hoveredCard}
        setHoveredCard={setHoveredCard}
      />

      {/* Why Choose Us Section */}
      <WhyChooseUs isLoaded={isLoaded} />
    </div>
  );
};
export default AnimatedJobSearch;
