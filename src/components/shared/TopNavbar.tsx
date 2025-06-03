"use client";

import { ArrowRight, Briefcase, Menu, Sparkles, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui";

const adminMenuItems = [
  { label: "Home", path: "/" },
  { label: "Jobs", path: "/jobs" },
  //   { label: "Companies", path: "/companies" },
  { label: "Post a Job", path: "/post-jobs" },
  { label: "Job Applications", path: "/job-applications" },
  { label: "User", path: "/users" },
  { label: "Contact us", path: "/contact-us" },
];
const jobPosterMenuItems = [
  { label: "Home", path: "/" },
  { label: "Jobs", path: "/jobs" },
  //   { label: "Companies", path: "/companies" },
  { label: "Post a Job", path: "/post-jobs" },
  { label: "Job Applications", path: "/job-applications" },
  // { label: "User", path: "/users" },
  { label: "Contact us", path: "/contact-us" },
];

const userMenuItems = [
  { label: "Home", path: "/" },
  { label: "Jobs", path: "/jobs" },
  { label: "Contact us", path: "/contact-us" },
];
const Navbar = () => {
  const pathname = usePathname();
  const user: any = JSON.parse(localStorage.getItem("user") || "{}");
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePath, setActivePath] = useState(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const menuArray =
    user?.role == "admin"
      ? adminMenuItems
      : user == "jobPoster"
      ? jobPosterMenuItems
      : userMenuItems;
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);
  return (
    <nav
      className={`bg-white/90 backdrop-blur-xl shadow-2xl border-b border-purple-100/50 sticky top-0 z-50 transition-all duration-700 ${
        isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 animate-pulse">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Global Recruitment
            </span>
            <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {menuArray?.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item?.path)}
                className={`font-medium transition-all duration-300 hover:scale-105 relative group ${
                  activePath === item.path
                    ? "text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>
          {/* Auth Buttons */}
          {!user?.role ? (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-2 text-purple-600 font-medium hover:text-purple-700 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </button>
              <button
                onClick={() => router.push("/register")}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Sign Up</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          ) : (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{user?.name}</AvatarFallback>
            </Avatar>
          )}
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 hover:scale-110"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          } overflow-hidden border-t border-purple-100/50`}
        >
          <div className="flex flex-col space-y-3">
            {menuArray?.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item?.path)}
                className="text-left px-4 py-3 text-gray-600 hover:text-purple-600 font-medium transition-all duration-300 hover:bg-purple-50 rounded-lg hover:translate-x-2"
              >
                {item.label}
              </button>
            ))}
            <div className="flex flex-col space-y-3 px-4 pt-3 border-t border-purple-100">
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-3 text-purple-600 font-medium hover:text-purple-700 transition-all duration-300 text-left hover:bg-purple-50 rounded-lg"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
