"use client";

import { useEffect, useState } from "react";
import {
  User,
  Sparkles,
  Mail,
  Lock,
  EyeOff,
  Eye,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FloatingElements } from "@/components/shared";
import { login } from "@/services/authServices";
import { useToast } from "@/hooks/use-toast";

// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const loginUser = async (values: any) => {
    const response = await login(values);
    console.log(response, "loginnn");
    if (response.status == 201) {
      localStorage.setItem("token", response?.token);
      localStorage.setItem("user", JSON.stringify(response?.user));
      toast({
        title: "Logged in successfully",
      });
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.Please try again later",
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginUser(values);
      // console.log("Login submitted", values);
      // Add login API call logic here
      // router.push("/");
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingElements />

      <div
        className={`max-w-lg w-full transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 hover:shadow-3xl transition-all duration-500">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 shadow-xl hover:scale-110 transition-transform duration-300 hover:rotate-12">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-600 text-lg">
                Sign in to unlock amazing opportunities
              </p>
              <div className="flex justify-center mt-4">
                <Sparkles className="h-5 w-5 text-purple-500 animate-pulse mr-2" />
                <span className="text-sm text-purple-600 font-semibold">
                  Secure Login
                </span>
                <Sparkles className="h-5 w-5 text-purple-500 animate-pulse ml-2" />
              </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
                  <input
                    type="email"
                    id="email"
                    {...formik.getFieldProps("email")}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-lg font-medium transition-all duration-300 bg-gray-50/50 hover:bg-white focus:ring-4 focus:ring-purple-500/20 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    id="password"
                    {...formik.getFieldProps("password")}
                    className={`w-full pl-12 pr-14 py-4 border-2 rounded-xl text-lg font-medium transition-all duration-300 bg-gray-50/50 hover:bg-white focus:ring-4 focus:ring-purple-500/20 ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-all duration-300 hover:scale-110"
                  >
                    {showLoginPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm text-purple-600 hover:text-purple-700 font-bold hover:underline transition-all duration-300 hover:scale-105"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-lg">
                Don’t have an account?{" "}
                <button
                  onClick={() => router.push("/register")}
                  className="text-purple-600 hover:text-purple-700 font-bold hover:underline transition-all duration-300 hover:scale-105"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        {/* <div className="text-center mt-8">
          <button
            onClick={() => router.push("/")}
            className="text-gray-600 hover:text-purple-600 font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
          >
            <span>← Back to Home</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default LoginForm;
