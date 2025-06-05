"use client";
import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { applyJob } from "@/services/jobApplication";
import { useParams, useRouter } from "next/navigation";
import { getJobById } from "@/services/jobServices";

const JobApplicationForm = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [jobData, setJobData] = useState<any>(null);
  const router = useRouter();
  const [resume, setResume] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getJobDetail = async () => {
    try {
      const responseDetail = await getJobById(jobId);
      console.log(responseDetail, "responseDetail");
      setJobData(responseDetail);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    if (jobId) getJobDetail();
  }, [jobId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      toast({
        title: "Missing Resume",
        description: "Please upload your resume before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("message", formData.message);
      form.append("jobId", jobId);
      form.append("jobTitle", jobData?.title || "");
      form.append("resume", resume);

      const response = await applyJob(form);

      if (response?.status === 201) {
        toast({
          title: "Application Submitted",
          description: "We've received your application.",
        });
        setFormData({ name: "", email: "", message: "" });
        setResume(null);
        router.push("/jobs");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Job application failed:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl mx-auto my-12">
      <h2 className="text-2xl font-bold mb-4">Apply for this Job</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          required
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full px-4 py-3 border rounded-xl"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full px-4 py-3 border rounded-xl"
        />
        <textarea
          name="message"
          value={formData.message}
          required
          onChange={handleChange}
          placeholder="Your Message"
          rows={4}
          className="w-full px-4 py-3 border rounded-xl"
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
          className="w-full"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl"
        >
          {isLoading ? (
            <span>Sending...</span>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Application
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
