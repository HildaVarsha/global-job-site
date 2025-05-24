"use client";
import React, { useState, useEffect } from "react";
import {
  Bell,
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { TopNavbar } from "@/components/shared";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date (3 months from now)
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 3);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const features = [
    {
      icon: Briefcase,
      title: "Smart Job Matching",
      description:
        "AI-powered algorithms to connect the right talent with the perfect opportunities",
    },
    {
      icon: Users,
      title: "Talent Network",
      description:
        "Build meaningful connections between employers and top-tier professionals",
    },
    {
      icon: TrendingUp,
      title: "Career Analytics",
      description:
        "Advanced insights and market trends to guide career and hiring decisions",
    },
  ];

  const stats = [
    { value: "10K+", label: "Pre-registered Users" },
    { value: "500+", label: "Partner Companies" },
    { value: "50+", label: "Industry Categories" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <TopNavbar />

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <div className="my-12 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
                The Future of
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  Talent Connection
                </span>
                is Coming Soon
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200">
                Revolutionary job matching platform that transforms how
                companies discover talent and professionals find their perfect
                career opportunities.
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="mb-12 animate-slide-up delay-400">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center justify-center">
                <Clock className="w-6 h-6 mr-2" />
                Launch Countdown
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div
                    key={unit}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-white/60 text-sm uppercase tracking-wider font-medium">
                      {unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Subscription */}
            <div className="mb-16 animate-slide-up delay-600">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Be the First to Know
              </h3>
              {!isSubscribed ? (
                <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Bell className="w-5 h-5" />
                      <span>Notify Me</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="max-w-md mx-auto animate-bounce">
                  <div className="bg-green-500/20 backdrop-blur-lg border border-green-400/30 rounded-xl p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-green-300 font-medium">
                      Successfully subscribed! You&apos;ll be notified when we
                      launch.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="mb-16 animate-slide-up delay-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/70 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-6">
                What&apos;s Coming
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Innovative features designed to revolutionize the recruitment
                landscape and career development journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10 animate-slide-up delay-1000">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 mb-4 md:mb-0">
              © 2025 JobPortal Pro. All rights reserved.
            </div>
            <div className="flex space-x-6 text-white/60">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }

        .delay-600 {
          animation-delay: 600ms;
        }

        .delay-800 {
          animation-delay: 800ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }

        .delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
};

export default ComingSoonPage;
