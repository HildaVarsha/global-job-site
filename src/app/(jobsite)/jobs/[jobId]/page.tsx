"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  BookmarkPlus,
  Share2,
  ArrowLeft,
  Building2,
  Calendar,
  Award,
  Star,
  Heart,
  Briefcase,
  GraduationCap,
  PoundSterling,
} from "lucide-react";
import { useParams } from "next/navigation";
import { getJobById } from "@/services/jobServices";
import Link from "next/link";
import moment from "moment";

const JobPostScreen = () => {
  const { jobId }: any = useParams();
  console.log(jobId, "jobId");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [jobData, setJobData] = useState<any>();
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const getJobDetail = async () => {
    const responseDetail = await getJobById(jobId);
    console.log(responseDetail, "responseDetail");
    setJobData(responseDetail);
  };
  useEffect(() => {
    getJobDetail();
  }, [jobId]);

  // const jobData = {
  //   title: "Senior Frontend Developer",
  //   company: "TechFlow Solutions",
  //   location: "San Francisco, CA",
  //   type: "Full-time",
  //   salary: "$120k - $160k",
  //   postedTime: "2 days ago",
  //   applicants: 47,
  //   logo: "🚀",
  //   tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  //   requirements: [
  //     "5+ years of frontend development experience",
  //     "Expert knowledge of React and TypeScript",
  //     "Experience with modern build tools and CI/CD",
  //     "Strong understanding of responsive design principles",
  //   ],
  //   benefits: [
  //     "Competitive salary and equity package",
  //     "Health, dental, and vision insurance",
  //     "Flexible work arrangements",
  //     "Professional development budget",
  //   ],
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`flex items-center justify-between mb-6 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          <Link href={"/jobs"}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Jobs</span>
            </button>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                isBookmarked
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                  : "bg-white text-gray-600 shadow-sm hover:shadow-md"
              }`}
            >
              <BookmarkPlus className="w-5 h-5" />
            </button>

            <button className="p-3 rounded-full bg-white text-gray-600 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 active:scale-95">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div
          className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-800 delay-200 ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-12 opacity-0 scale-95"
          }`}
        >
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-8 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl animate-pulse">
                    <GraduationCap className="w-12 h-12" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2 animate-fade-in">
                      {jobData?.title}
                    </h1>
                    <div className="flex items-center gap-2 text-blue-100">
                      <Building2 className="w-4 h-4" />
                      <span className="text-lg font-medium">
                        {jobData?.company}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                    isLiked
                      ? "bg-red-500 text-white shadow-lg shadow-red-200"
                      : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: MapPin, label: jobData?.location },
                  { icon: Clock, label: jobData?.jobType },
                  {
                    icon: PoundSterling,
                    label: ` ${jobData?.minSalary}- ${jobData?.maxSalary}`,
                  },
                  { icon: GraduationCap, label: `Job Id- ${jobData?.id}` },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg transform transition-all duration-500 hover:bg-white/20 hover:scale-105 ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <item.icon className="w-4 h-4 text-blue-200" />
                    <span className="text-sm font-medium">{item?.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Tags */}
            <div
              className={`flex flex-wrap gap-2 mb-8 transform transition-all duration-600 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              {jobData?.skills?.map((tag: any, index: any) => (
                <span
                  key={tag}
                  className={`px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 hover:scale-105 cursor-default transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 50}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Tabs */}
            <div
              className={`border-b border-gray-200 mb-8 transform transition-all duration-600 delay-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="flex space-x-8">
                {[
                  { id: "description", label: "Job Description" },
                  { id: "requirements", label: "Requirements" },
                  { id: "benefits", label: "Benefits" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 relative font-medium transition-all duration-200 hover:text-blue-600 ${
                      activeTab === tab.id ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-expand"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div
              className={`transform transition-all duration-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              {activeTab === "description" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                      About This Role
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {jobData?.description}
                    </p>
                  </div>

                  {/* <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                      Key Responsibilities
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Develop and maintain high-quality frontend applications",
                        "Collaborate with design and backend teams",
                        "Optimize applications for maximum speed and scalability",
                        "Mentor junior developers and conduct code reviews",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                        >
                          <CheckCircle
                            className="w-5 h-5 text-green-500 mt-0.5 animate-bounce-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>
              )}

              {activeTab === "requirements" && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    What We&apos;re Looking For
                  </h3>
                  <div className="space-y-4">
                    {jobData?.requirements?.map((req: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border-l-4 border-blue-400 hover:border-blue-500 transition-all duration-200 hover:shadow-md"
                      >
                        <Star
                          className="w-5 h-5 text-blue-500 mt-0.5 animate-bounce-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        />
                        <span className="text-gray-700 font-medium">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "benefits" && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    What We Offer
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {jobData?.benefits?.map((benefit: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl border border-green-100 hover:border-green-200 hover:shadow-md transition-all duration-200 hover:scale-105"
                      >
                        <Award
                          className="w-5 h-5 text-green-500 mt-0.5 animate-bounce-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        />
                        <span className="text-gray-700 font-medium">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Apply Button */}
            <div
              className={`mt-12 transform transition-all duration-700 delay-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <Link href={user ? `/apply/${jobData?.id}` : "/login"}>
                <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group">
                  <Briefcase className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                  Apply for This Position
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl"></div>
                </button>
              </Link>

              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>
                  Posted{" "}
                  {moment(jobData?.createdAt).format("DD/MM/YYYY, HH:mm")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          60% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out backwards;
        }

        .animate-expand {
          animation: expand 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default JobPostScreen;
