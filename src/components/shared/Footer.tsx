"use client";

import { Briefcase } from "lucide-react";
import React from "react";
import Link from "next/link";
import { safeLocalStorage } from "@/lib/utils";

const Footer = () => {
  const user: any = JSON.parse(safeLocalStorage.getItem("user") || "{}");
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Global Recruitment</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Connecting talented professionals with exceptional opportunities
              worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-white transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white transition-colors"
                >
                  Career Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white transition-colors"
                >
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white transition-colors"
                >
                  Salary Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">For Employers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                {user?.role == "admin" && user?.role == "jobPoster" && (
                  <Link
                    href="/post-jobs"
                    className="hover:text-white transition-colors"
                  >
                    Post Jobs
                  </Link>
                )}
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white transition-colors"
                >
                  Find Candidates
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white transition-colors"
                >
                  Recruiting Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Global Recruitment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
