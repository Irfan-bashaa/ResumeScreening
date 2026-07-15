export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "recruiter" | "admin";
  profileCompletePercent: number;
  avatarUrl: string;
}

export interface Profile {
  userId: string;
  personalDetails: {
    name: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    bio: string;
  };
  education: Array<{
    school: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
  }>;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications: string[];
  experience: Array<{
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl?: string;
  resumeFilename?: string;
  resumeParsedData?: {
    score: number;
    skills: string[];
    education: string[];
    projects: string[];
    certifications: string[];
    experience: string[];
    missingSkills: string[];
    suggestions: string[];
  };
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  salary: string;
  experience: string;
  location: string;
  deadline: string;
  status: "open" | "closed";
  recruiterId: string;
  recruiterName: string;
  createdAt: string;
  matchScore?: number; // Calculated dynamically on client
  missingSkills?: string[]; // Calculated dynamically on client
  readiness?: string; // Calculated dynamically on client
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  resumeScore: number;
  matchScore: number;
  experienceScore: number;
  status: "applied" | "under_review" | "shortlisted" | "interview_scheduled" | "rejected" | "selected";
  timeline: Array<{
    status: string;
    date: string;
    comment: string;
  }>;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: "info" | "success" | "warning" | "alert";
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}
