import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  User as UserIcon, Mail, Phone, MapPin, Github, Linkedin, GraduationCap, Calendar, 
  Briefcase, Award, Plus, X, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 
} from "lucide-react";

export const ProfileWizard: React.FC = () => {
  const { apiFetch, showToast, user } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form states
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  
  const [education, setEducation] = useState("");
  const [degree, setDegree] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  
  const [company, setCompany] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [certInput, setCertInput] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const data = await apiFetch("/api/profile");
      if (data) {
        setPhone(data.phone || "");
        setLocation(data.location || "");
        setGithubUrl(data.githubUrl || "");
        setLinkedinUrl(data.linkedinUrl || "");
        setEducation(data.education || "");
        setDegree(data.degree || "");
        setGraduationYear(data.graduationYear || "");
        setCompany(data.company || "");
        setRoleTitle(data.roleTitle || "");
        setYearsOfExperience(data.yearsOfExperience?.toString() || "");
        setSkills(data.skills || []);
        setCertifications(data.certifications || []);
      }
    } catch (err) {
      console.error("Failed to fetch wizard profile:", err);
    }
  };

  // Add interactive skill chip tag
  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = skillInput.trim();
    if (!clean) return;
    if (skills.includes(clean)) {
      showToast("Skill tag already registered.", "warning");
      return;
    }
    setSkills([...skills, clean]);
    setSkillInput("");
  };

  const handleRemoveSkill = (tag: string) => {
    setSkills(skills.filter(s => s !== tag));
  };

  // Add interactive certification chip tag
  const handleAddCert = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = certInput.trim();
    if (!clean) return;
    if (certifications.includes(clean)) {
      showToast("Certification tag already registered.", "warning");
      return;
    }
    setCertifications([...certifications, clean]);
    setCertInput("");
  };

  const handleRemoveCert = (tag: string) => {
    setCertifications(certifications.filter(c => c !== tag));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const updated = await apiFetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify({
          phone,
          location,
          githubUrl,
          linkedinUrl,
          education,
          degree,
          graduationYear,
          company,
          roleTitle,
          yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : 0,
          skills,
          certifications
        })
      });
      showToast("Candidate profile setup wizard successfully finalized!", "success");
      navigate("/dashboard");
    } catch (err) {
      showToast("Failed to finalize candidate profile details.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 text-left">
      
      {/* Top Header Panel */}
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-display font-black tracking-tight">Onboard Candidate Credentials</h1>
        <p className="text-xs text-gray-400">Perfect your profile details, outline education metrics, and register key tags to boost AI relevance scores.</p>
      </div>

      {/* Steps Visual Progress Indicator */}
      <div className="flex items-center gap-1.5 mb-8">
        {[
          { num: 1, label: "Personal" },
          { num: 2, label: "Background" },
          { num: 3, label: "Key Tags" }
        ].map((s) => (
          <React.Fragment key={s.num}>
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= s.num ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-900 text-gray-400"
              }`}>
                {s.num}
              </span>
              <span className={`text-xs font-bold ${step >= s.num ? "text-gray-950 dark:text-white" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
            {s.num < 3 && <div className={`h-0.5 flex-1 ${step > s.num ? "bg-emerald-500" : "bg-gray-25"}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Steps Dynamic Area */}
      <div className="p-6 rounded-3xl glass-panel border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-950 shadow-2xl min-h-[350px]">
        
        {/* Step 1: Personal Coordinates */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-900 pb-2 flex items-center gap-1.5">
              <UserIcon className="w-4 h-4 text-emerald-500" />
              <span>Contact Coordinates & Social Matrices</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    disabled
                    value={user?.email || ""}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 text-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="font-bold text-gray-700 dark:text-gray-300">Geographic Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="San Francisco, CA (Hybrid)"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">GitHub Workspace Link</label>
                <div className="relative">
                  <Github className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/irfan"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">LinkedIn Profile Link</label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/irfan"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Education & Background */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-900 pb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span>Background Details & Professional Experience</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">School/University Name</label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="Stanford University"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300 font-mono">Degree & Major</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="M.S. Computer Engineering"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">Graduation Year</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    placeholder="2026"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">Years of Experience</label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  placeholder="2"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">Last/Current Employment Company</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Google Inc."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300">Employment Role Title</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="Junior Software Architect"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Interactive Skills & Badges */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-900 pb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>Interactive Tech Tags & Certification Badges</span>
            </h3>

            {/* Skills chip tag control */}
            <div className="flex flex-col gap-2.5 text-xs">
              <label className="font-bold text-gray-700 dark:text-gray-300">Technical Skills (Type and hit Enter)</label>
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="e.g. Kotlin, Kafka, D3.js"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-gray-900 dark:bg-gray-800 text-white font-bold"
                >
                  Add
                </button>
              </form>

              {/* Skills Area */}
              <div className="flex flex-wrap gap-1.5 mt-2 min-h-12 p-3 rounded-xl border border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/30">
                {skills.length === 0 ? (
                  <span className="text-[10px] text-gray-400">No tags added yet. Include languages, systems or frameworks.</span>
                ) : (
                  skills.map((s) => (
                    <span key={s} className="flex items-center gap-1 text-[11px] font-bold font-mono bg-emerald-50 text-emerald-850 dark:bg-emerald-950/40 dark:text-emerald-400 py-1 px-2.5 rounded-lg border border-emerald-500/10 shadow-sm animate-fade-in">
                      <span>{s}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s)}
                        className="text-emerald-500 hover:text-red-500 transition-colors shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Certifications tags control */}
            <div className="flex flex-col gap-2.5 text-xs mt-2">
              <label className="font-bold text-gray-700 dark:text-gray-300">Industry Certifications</label>
              <form onSubmit={handleAddCert} className="flex gap-2">
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="e.g. AWS Solutions Architect, Oracle Java SE"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-gray-900 dark:bg-gray-800 text-white font-bold"
                >
                  Add
                </button>
              </form>

              {/* Certifications Area */}
              <div className="flex flex-wrap gap-1.5 mt-2 min-h-12 p-3 rounded-xl border border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/30">
                {certifications.length === 0 ? (
                  <span className="text-[10px] text-gray-400">No credentials added. AWS, GCP, Oracle, Scrum, etc.</span>
                ) : (
                  certifications.map((c) => (
                    <span key={c} className="flex items-center gap-1 text-[11px] font-bold bg-sky-50 text-sky-850 dark:bg-sky-950/40 dark:text-sky-400 py-1 px-2.5 rounded-lg border border-sky-500/10 shadow-sm">
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCert(c)}
                        className="text-sky-500 hover:text-red-500 transition-colors shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Buttons Toolbar */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100 dark:border-gray-900">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl border border-gray-200/80 hover:bg-gray-50 dark:border-gray-850 dark:hover:bg-gray-900 text-xs font-bold disabled:opacity-30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 py-2 px-5 rounded-xl text-white bg-gray-900 hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-bold transition-all shadow-md"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleSaveProfile}
              className="flex items-center gap-1.5 py-2.5 px-6 rounded-xl text-white brand-gradient hover:brand-gradient-hover text-xs font-bold transition-all shadow-md shadow-emerald-500/10"
            >
              {loading ? "Finalizing Profile..." : "Save & Finalize Profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileWizard;
