"use client";

import React, { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { User, Mail, Phone, TrendingUp, Lock, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui";
import { FloatingElements } from "@/components/shared";
import { useRouter } from "next/navigation";

// Validation schema
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "sdfsd",
      email: "sdfsdf@gmail.com",
      phone: "dsfsdf",
      password: "password",
      confirmPassword: "password",
    },
    validationSchema,
    onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => {
      console.log("Form Submitted", values);
      actions.setSubmitting(false);
      router.push("/login");
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const renderField = (
    id: keyof FormValues,
    label: string,
    type: string,
    Icon: LucideIcon
  ) => (
    <div className="group w-full">
      <label
        htmlFor={id}
        className="block text-sm font-bold text-gray-700 mb-3"
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
        <input
          type={type}
          id={id}
          {...formik.getFieldProps(id)}
          placeholder={`Enter your ${label.toLowerCase()}`}
          className={`w-full py-3 pl-12 pr-4 rounded-xl border ${
            formik.touched[id] && formik.errors[id]
              ? "border-red-500"
              : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
        />
      </div>
      {formik.touched[id] && formik.errors[id] && (
        <div className="text-red-500 text-sm mt-1">{formik.errors[id]}</div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingElements />
      <div
        className={`max-w-xl w-full transition-all duration-1000 ${
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
                Create Account
              </h2>
              <p className="text-gray-600 text-lg">
                Join thousands of successful job seekers
              </p>
              <div className="flex justify-center mt-4">
                <TrendingUp className="h-5 w-5 text-green-500 animate-pulse mr-2" />
                <span className="text-sm text-green-600 font-semibold">
                  Free Registration
                </span>
                <TrendingUp className="h-5 w-5 text-green-500 animate-pulse ml-2" />
              </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {renderField("fullName", "Full Name", "text", User)}
              {renderField("email", "Email", "email", Mail)}
              {renderField("phone", "Phone Number", "tel", Phone)}

              <div className="flex flex-col md:flex-row gap-6">
                {renderField("password", "Password", "password", Lock)}
                {renderField(
                  "confirmPassword",
                  "Confirm Password",
                  "password",
                  Lock
                )}
              </div>

              <Button
                type="submit"
                className="w-full mt-6 p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                disabled={formik.isSubmitting}
              >
                Register Now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
