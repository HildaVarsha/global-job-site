"use client";
import React, { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Users,
  FileText,
  Award,
  Plus,
  X,
  Eye,
  Save,
  Send,
  ArrowLeft,
  ChevronDown,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { createJob } from "@/services/jobServices";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const JobPostFormScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    jobTitle: "",
    company: "",
    location: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    experience: "",
    description: "",
    requirements: [""],
    benefits: [""],
    skills: [],
    jobCategory: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const jobCategory = [
    {
      id: 1,
      name: "IT",
    },
    {
      id: 2,
      name: "Marketing",
    },
    {
      id: 3,
      name: "Finance",
    },
    {
      id: 4,
      name: "HR",
    },
    {
      id: 5,
      name: "Design",
    },
  ];
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
  ];
  const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Executive",
  ];
  const skillsSuggestions = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "JavaScript",
    "Next.js",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "AWS",
  ];

  const steps = [
    { number: 1, title: "Basic Information", icon: Building2 },
    { number: 2, title: "Job Details", icon: FileText },
    { number: 3, title: "Requirements", icon: Award },
    { number: 4, title: "Review & Publish", icon: Eye },
  ];

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const handleArrayChange = (field: any, index: number, value: any) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev: any) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field: any, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index),
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev: any) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: any) => {
    setFormData((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((s: any) => s !== skill),
    }));
  };

  const validateStep = (step: any) => {
    const newErrors: any = {};

    if (step === 1) {
      if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
      if (!formData.company) newErrors.company = "Company name is required";
      if (!formData.location) newErrors.location = "Location is required";
    }

    if (step === 2) {
      if (!formData.jobType) newErrors.jobType = "Job type is required";
      if (!formData.experience)
        newErrors.experience = "Experience level is required";
      if (!formData.description)
        newErrors.description = "Job description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    const payload = {
      title: formData.jobTitle,
      description: formData.description,
      location: formData?.location,
      company: formData.company,
      jobType: formData.jobType,
      category: formData.jobCategory,
      minSalary: formData.salaryMin,
      maxSalary: formData.salaryMax,
      experienceRequired: formData.experience,
      skills: formData.skills,
      benefits: formData.benefits,
      requirements: formData.requirements,
    };
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      // Simulate API call
      const response = await createJob(payload);
      console.log(response, "response");
      if (response?.status == 201) {
        toast({
          title: "Job created successfully",
        });
        router.push("/jobs");
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong. Please try again later",
        });
      }
    }
  };
  console.log(formData, "formData");
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.jobTitle
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="e.g. Senior Frontend Developer"
                />
                {errors.jobTitle && (
                  <div className="flex items-center gap-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4" />
                    {errors.jobTitle}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Job Category
                </label>
                <div className="relative">
                  <select
                    value={formData.jobCategory}
                    onChange={(e) =>
                      handleInputChange("jobCategory", e.target.value)
                    }
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none ${
                      errors.jobCategory
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">Select job category</option>
                    {jobCategory.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                {errors.jobCategory && (
                  <div className="flex items-center gap-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4" />
                    {errors.jobCategory}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.company
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="e.g. TechFlow Solutions"
                />
                {errors.company && (
                  <div className="flex items-center gap-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4" />
                    {errors.company}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.location
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
                {errors.location && (
                  <div className="flex items-center gap-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4" />
                    {errors.location}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Job Type
                </label>
                <div className="relative">
                  <select
                    value={formData.jobType}
                    onChange={(e) =>
                      handleInputChange("jobType", e.target.value)
                    }
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none ${
                      errors.jobType
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                {errors.jobType && (
                  <div className="flex items-center gap-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4" />
                    {errors.jobType}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Salary Range
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) =>
                        handleInputChange("salaryMin", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300"
                      placeholder="Min"
                    />
                  </div>
                  <span className="flex items-center text-gray-400">-</span>
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) =>
                        handleInputChange("salaryMax", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Experience Level
                </label>
                <div className="relative">
                  <select
                    value={formData.experience}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value)
                    }
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none ${
                      errors.experience
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">Select level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                {errors.experience && (
                  <div className="flex items-center gap-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4" />
                    {errors.experience}
                  </div>
                )}
              </div>

              {/* <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Logo Upload
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors duration-200 cursor-pointer">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-500">Upload Logo</span>
                </div>
              </div> */}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Job Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={6}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.description
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="Describe the role, responsibilities, and what makes this position exciting..."
              />
              {errors.description && (
                <div className="flex items-center gap-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-800">
                Requirements
              </label>
              {formData.requirements.map((req: any, index: number) => (
                <div key={index} className="flex gap-3 items-start">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) =>
                      handleArrayChange("requirements", index, e.target.value)
                    }
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300"
                    placeholder="Add a requirement..."
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      onClick={() => removeArrayItem("requirements", index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem("requirements")}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Requirement
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-800">
                Benefits
              </label>
              {formData.benefits.map((benefit: any, index: number) => (
                <div key={index} className="flex gap-3 items-start">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) =>
                      handleArrayChange("benefits", index, e.target.value)
                    }
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300"
                    placeholder="Add a benefit..."
                  />
                  {formData.benefits.length > 1 && (
                    <button
                      onClick={() => removeArrayItem("benefits", index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem("benefits")}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Benefit
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-800">
                Required Skills
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300"
                  placeholder="Type a skill and press Enter"
                />
                <button
                  onClick={addSkill}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillsSuggestions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      setSkillInput(skill);
                      addSkill();
                    }}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl">
                  {formData.skills.map((skill: any) => (
                    <span
                      key={skill}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Review Your Job Post
              </h3>
              <p className="text-gray-600">
                Please review all information before publishing
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">
                      {formData.jobTitle}
                    </h4>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4" />
                      {formData.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Salary Range</p>
                    <p className="font-semibold text-gray-800">
                      ${formData.salaryMin} - ${formData.salaryMax}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{formData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formData.jobType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{formData.experience}</span>
                  </div>
                </div>

                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill: any) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Ready to publish</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`flex items-center justify-between mb-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div
          className={`mb-8 transform transition-all duration-800 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            ></div>

            {steps.map((step) => (
              <div
                key={step.number}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.number
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    Step {step.number}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{step.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div
          className={`bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-800 delay-400 ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-12 opacity-0 scale-95"
          }`}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {currentStep === 1 &&
                "Let's start with the basic information about your job posting"}
              {currentStep === 2 &&
                "Provide detailed information about the role and responsibilities"}
              {currentStep === 3 &&
                "Define the requirements and benefits for this position"}
              {currentStep === 4 &&
                "Review your job post before publishing it to candidates"}
            </p>
          </div>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100 hover:scale-105 active:scale-95"
              }`}
            >
              Previous
            </button>

            <div className="flex items-center gap-3">
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  Continue
                  <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Publish Job
                    </>
                  )}
                </button>
              )}
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

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default JobPostFormScreen;
