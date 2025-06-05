"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Shield,
  User,
  ChevronDown,
  ChevronUp,
  Clock,
  Briefcase,
} from "lucide-react";
import { getAllUsers } from "@/services/userServices";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "admin" | "recruiter" | "candidate" | "hr_manager";
  status: "active" | "inactive" | "suspended" | "pending";
  joinedDate: string;
  lastLogin: string;
  location: string;
  department?: string;
  profileImage?: string;
  applicationsCount?: number;
  jobsPosted?: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    role: "admin",
    status: "active",
    joinedDate: "2024-01-15",
    lastLogin: "2024-05-23",
    location: "New York, NY",
    department: "IT",
    applicationsCount: 0,
    jobsPosted: 25,
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 234-5678",
    role: "candidate",
    status: "active",
    joinedDate: "2024-03-10",
    lastLogin: "2024-05-24",
    location: "San Francisco, CA",
    applicationsCount: 12,
    jobsPosted: 0,
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@company.com",
    phone: "+1 (555) 345-6789",
    role: "recruiter",
    status: "active",
    joinedDate: "2024-02-20",
    lastLogin: "2024-05-23",
    location: "Austin, TX",
    department: "HR",
    applicationsCount: 0,
    jobsPosted: 18,
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    role: "candidate",
    status: "inactive",
    joinedDate: "2024-04-05",
    lastLogin: "2024-05-15",
    location: "Chicago, IL",
    applicationsCount: 8,
    jobsPosted: 0,
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Thompson",
    email: "david.thompson@company.com",
    phone: "+1 (555) 567-8901",
    role: "hr_manager",
    status: "active",
    joinedDate: "2023-12-01",
    lastLogin: "2024-05-24",
    location: "Remote",
    department: "HR",
    applicationsCount: 0,
    jobsPosted: 32,
  },
  {
    id: "6",
    firstName: "Lisa",
    lastName: "Wang",
    email: "lisa.wang@email.com",
    phone: "+1 (555) 678-9012",
    role: "candidate",
    status: "suspended",
    joinedDate: "2024-01-30",
    lastLogin: "2024-05-10",
    location: "Seattle, WA",
    applicationsCount: 15,
    jobsPosted: 0,
  },
  {
    id: "7",
    firstName: "Robert",
    lastName: "Miller",
    email: "robert.miller@email.com",
    phone: "+1 (555) 789-0123",
    role: "candidate",
    status: "pending",
    joinedDate: "2024-05-20",
    lastLogin: "2024-05-20",
    location: "Boston, MA",
    applicationsCount: 3,
    jobsPosted: 0,
  },
];

const StatusBadge: React.FC<{ status: User["status"] }> = ({ status }) => {
  const statusConfig = {
    active: {
      bg: "bg-green-100",
      text: "text-green-800",
      ring: "ring-green-600/20",
      dot: "bg-green-500",
    },
    inactive: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      ring: "ring-gray-600/20",
      dot: "bg-gray-500",
    },
    suspended: {
      bg: "bg-red-100",
      text: "text-red-800",
      ring: "ring-red-600/20",
      dot: "bg-red-500",
    },
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      ring: "ring-yellow-600/20",
      dot: "bg-yellow-500",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-all duration-200 ${config.bg} ${config.text} ${config.ring}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${config.dot}`}></div>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const RoleBadge: React.FC<{ role: User["role"] }> = ({ role }) => {
  const roleConfig: Record<
    string,
    {
      bg: string;
      text: string;
      ring: string;
      icon: React.ElementType;
    }
  > = {
    admin: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      ring: "ring-purple-600/20",
      icon: Shield,
    },
    employee: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      ring: "ring-blue-600/20",
      icon: Briefcase,
    },
    jobPoster: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      ring: "ring-orange-600/20",
      icon: User,
    },
    hr_manager: {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      ring: "ring-indigo-600/20",
      icon: Shield,
    },
  };

  const config = roleConfig[role];

  if (!config) {
    return (
      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-300">
        Unknown
      </span>
    );
  }

  const Icon = config.icon;
  const displayName = role?.charAt(0).toUpperCase() + role.slice(1);

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-all duration-200 ${config.bg} ${config.text} ${config.ring}`}
    >
      <Icon className="w-3 h-3 mr-1" />
      {displayName}
    </span>
  );
};

const UsersListingTable: React.FC = () => {
  const [users, setUsers] = useState<any>();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof User>("joinedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const filteredUsers = users?.filter((user: any) => {
    const fullName = `${user.name}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });
  // const sortedUsers = [...filteredUsers]?.sort((a, b) => {
  //   const aValue = a[sortField];
  //   const bValue = b[sortField];
  //   const direction = sortDirection === "asc" ? 1 : -1;

  //   if (typeof aValue === "string" && typeof bValue === "string") {
  //     return aValue.localeCompare(bValue) * direction;
  //   }

  //   return ((aValue as any) - (bValue as any)) * direction;
  // });

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortButton: React.FC<{
    field: keyof User;
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

  const getInitials = (firstName: string) => {
    return `${firstName.charAt(0)}`;
  };

  const generateGradient = (name: string) => {
    const gradients = [
      "from-blue-500 to-purple-600",
      "from-green-500 to-teal-600",
      "from-orange-500 to-red-600",
      "from-purple-500 to-pink-600",
      "from-indigo-500 to-blue-600",
      "from-teal-500 to-cyan-600",
    ];
    const index = name?.length % gradients.length;
    return gradients[index];
  };
  const getUsers = async () => {
    const response = await getAllUsers();
    setUsers(response);
    console.log(response, "response");
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Users Management
          </h1>
          <p className="text-gray-600">
            Manage platform users and their permissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-up">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users?.length}
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {users?.filter((u: any) => u.status === "active").length}
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Candidates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users?.filter((u: any) => u.role === "employee").length}
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Staff Members
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {users?.filter((u: any) => u.role == "admin")?.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search users by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="hr_manager">HR Manager</option>
                  <option value="candidate">Candidate</option>
                </select>
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
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
                    <SortButton field="firstName">User</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="role">Role</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="status">Email</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="joinedDate">Joined Date</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="lastLogin">Last Login</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users?.map((user: any, index: number) => (
                  <React.Fragment key={user.id}>
                    <tr
                      className="hover:bg-gray-50 transition-all duration-200 cursor-pointer group animate-fade-in-row"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() =>
                        setExpandedRow(expandedRow === user.id ? null : user.id)
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div
                              className={`h-10 w-10 rounded-full bg-gradient-to-r ${generateGradient(
                                user.name
                              )} flex items-center justify-center text-white font-semibold transition-transform duration-200 group-hover:scale-105`}
                            >
                              {getInitials(user.name)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <RoleBadge role={user.role} />
                        {user.department && (
                          <div className="text-xs text-gray-500 mt-1">
                            {user.department}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge
                          status={user.status ? user.status : "active"}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDate(user.updatedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-105">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:scale-105">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-105">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 transform hover:scale-105">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRow === user.id && (
                      <tr className="bg-indigo-50 animate-expand">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">Phone:</span>
                              <span className="font-medium">{user.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">Location:</span>
                              <span className="font-medium">
                                {user.location}
                              </span>
                            </div>
                            {user.applicationsCount !== undefined && (
                              <div className="flex items-center space-x-2">
                                <Briefcase className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600">
                                  Applications:
                                </span>
                                <span className="font-medium">
                                  {user.applicationsCount}
                                </span>
                              </div>
                            )}
                            {user.jobsPosted !== undefined && (
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600">
                                  Jobs Posted:
                                </span>
                                <span className="font-medium">
                                  {user.jobsPosted}
                                </span>
                              </div>
                            )}
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
        {/* <div className="mt-6 flex items-center justify-between text-sm text-gray-500 animate-fade-in">
          <div>
            Showing {sortedUsers.length} of {users.length} users
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
        </div> */}
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

export default UsersListingTable;
