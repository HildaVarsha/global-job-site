"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Download,
  MoreHorizontal,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  User,
  Mail,
  Phone,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface JobApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  appliedDate: string;
  status: "pending" | "reviewing" | "interviewed" | "accepted" | "rejected";
  experience: string;
  salary: string;
  location: string;
  rating: number;
  resume: string;
}

const mockApplications: JobApplication[] = [
  {
    id: "1",
    applicantName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Frontend Developer",
    department: "Engineering",
    appliedDate: "2024-05-20",
    status: "reviewing",
    experience: "5+ years",
    salary: "$85,000 - $95,000",
    location: "New York, NY",
    rating: 4.8,
    resume: "sarah_johnson_resume.pdf",
  },
  {
    id: "2",
    applicantName: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    position: "UX/UI Designer",
    department: "Design",
    appliedDate: "2024-05-19",
    status: "interviewed",
    experience: "3+ years",
    salary: "$70,000 - $80,000",
    location: "San Francisco, CA",
    rating: 4.6,
    resume: "michael_chen_resume.pdf",
  },
  {
    id: "3",
    applicantName: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    position: "Product Manager",
    department: "Product",
    appliedDate: "2024-05-18",
    status: "accepted",
    experience: "7+ years",
    salary: "$95,000 - $110,000",
    location: "Austin, TX",
    rating: 4.9,
    resume: "emily_rodriguez_resume.pdf",
  },
  {
    id: "4",
    applicantName: "David Thompson",
    email: "david.thompson@email.com",
    phone: "+1 (555) 456-7890",
    position: "Backend Developer",
    department: "Engineering",
    appliedDate: "2024-05-17",
    status: "pending",
    experience: "4+ years",
    salary: "$80,000 - $90,000",
    location: "Remote",
    rating: 4.4,
    resume: "david_thompson_resume.pdf",
  },
  {
    id: "5",
    applicantName: "Lisa Wang",
    email: "lisa.wang@email.com",
    phone: "+1 (555) 567-8901",
    position: "Data Scientist",
    department: "Analytics",
    appliedDate: "2024-05-16",
    status: "rejected",
    experience: "6+ years",
    salary: "$90,000 - $105,000",
    location: "Seattle, WA",
    rating: 4.2,
    resume: "lisa_wang_resume.pdf",
  },
];

const StatusBadge: React.FC<{ status: JobApplication["status"] }> = ({
  status,
}) => {
  const statusConfig = {
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      ring: "ring-yellow-600/20",
    },
    reviewing: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      ring: "ring-blue-600/20",
    },
    interviewed: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      ring: "ring-purple-600/20",
    },
    accepted: {
      bg: "bg-green-100",
      text: "text-green-800",
      ring: "ring-green-600/20",
    },
    rejected: {
      bg: "bg-red-100",
      text: "text-red-800",
      ring: "ring-red-600/20",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-all duration-200 ${config.bg} ${config.text} ${config.ring}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 transition-colors duration-200 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600 font-medium">{rating}</span>
    </div>
  );
};

const JobApplicationTable: React.FC = () => {
  const [applications, setApplications] =
    useState<JobApplication[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] =
    useState<keyof JobApplication>("appliedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === "asc" ? 1 : -1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * direction;
    }

    return ((aValue as any) - (bValue as any)) * direction;
  });

  const handleSort = (field: keyof JobApplication) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortButton: React.FC<{
    field: keyof JobApplication;
    children: React.ReactNode;
  }> = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 hover:text-gray-900 transition-colors duration-200 group"
    >
      <span>{children}</span>
      {sortField === field && (
        <div className="transition-transform duration-200">
          {sortDirection === "asc" ? (
            <ChevronUp className="h-4 w-4 text-blue-600" />
          ) : (
            <ChevronDown className="h-4 w-4 text-blue-600" />
          )}
        </div>
      )}
    </button>
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Job Applications
          </h1>
          <p className="text-gray-600">
            Manage and review candidate applications
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-up">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search applicants, positions, or emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="interviewed">Interviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="applicantName">Applicant</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="position">Position</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="appliedDate">Applied Date</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="status">Status</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="rating">Rating</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedApplications.map((application, index) => (
                  <React.Fragment key={application.id}>
                    <tr
                      className="hover:bg-gray-50 transition-all duration-200 cursor-pointer group animate-fade-in-row"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === application.id ? null : application.id
                        )
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold transition-transform duration-200 group-hover:scale-105">
                              {application.applicantName.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                              {application.applicantName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {application.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {application.position}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(application.appliedDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={application.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <RatingStars rating={application.rating} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-105">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:scale-105">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 transform hover:scale-105">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRow === application.id && (
                      <tr className="bg-blue-50 animate-expand">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">Phone:</span>
                              <span className="font-medium">
                                {application.phone}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">Experience:</span>
                              <span className="font-medium">
                                {application.experience}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">Salary:</span>
                              <span className="font-medium">
                                {application.salary}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">Location:</span>
                              <span className="font-medium">
                                {application.location}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Download className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">Resume:</span>
                              <a
                                href="#"
                                className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                              >
                                {application.resume}
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 animate-fade-in">
          <div>
            Showing {sortedApplications.length} of {applications.length}{" "}
            applications
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
              Next
            </button>
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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-row {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expand {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 200px;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.7s ease-out;
        }

        .animate-fade-in-row {
          animation: fade-in-row 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-expand {
          animation: expand 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default JobApplicationTable;
