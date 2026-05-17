export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  result: string;
  tech: string[];
  category: string;
  categoryLabel: string;
  liveUrl: string;
  year: string;
  featured: boolean;
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: "shine-dental",
    title: "Shine Dental Clinic",
    client: "Healthcare · Muzaffarnagar",
    description:
      "Complete website for a local dental clinic featuring service pages, appointment booking form, doctor profiles, and before/after gallery — fully mobile-optimised.",
    result: "+200% patient inquiries after launch",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    category: "Business Website",
    categoryLabel: "Healthcare",
    liveUrl: "https://github.com/Bhavishya-jasuja/shinedentalmzn",
    year: "2024",
    featured: true,
    accentColor: "from-blue-500/15 to-transparent",
  },
  {
    id: "economics-platform",
    title: "Economics Learning Platform",
    client: "Education · India",
    description:
      "A structured economics study platform with topic-wise notes, resources, and navigation. Built for students preparing for competitive exams and college coursework.",
    result: "500+ students accessing resources monthly",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    category: "Business Website",
    categoryLabel: "Economics",
    liveUrl: "https://github.com/Bhavishya-jasuja/economics",
    year: "2024",
    featured: true,
    accentColor: "from-emerald-500/15 to-transparent",
  },
  {
    id: "udit-economics",
    title: "Udit Economics Coaching",
    client: "EdTech · Coaching Institute",
    description:
      "Professional coaching website for an economics tutor — course listings, student testimonials, contact & enrollment forms, and a clean modern design that builds trust.",
    result: "Scaled online coaching to 200+ enrolled students",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    category: "Business Website",
    categoryLabel: "EdTech",
    liveUrl: "https://github.com/Bhavishya-jasuja/uditeconomics",
    year: "2024",
    featured: false,
    accentColor: "from-amber-500/15 to-transparent",
  },
  {
    id: "contract-management",
    title: "Contract Management System",
    client: "Business Software · CRUD App",
    description:
      "Full-featured contract management web app with create, read, update, and delete functionality — tracks agreements, deadlines, and status for small business operations.",
    result: "Reduced manual paperwork and tracking time by 70%",
    tech: ["JavaScript", "HTML", "CSS", "LocalStorage API"],
    category: "Custom Tool",
    categoryLabel: "Business Tool",
    liveUrl: "https://github.com/Bhavishya-jasuja/Crud-app",
    year: "2024",
    featured: false,
    accentColor: "from-violet-500/15 to-transparent",
  },
  {
    id: "scm-platform",
    title: "SCM 2.0 — Supply Chain Manager",
    client: "Logistics · Internal Tool",
    description:
      "Supply chain management dashboard for tracking inventory, suppliers, and order flow across multiple departments with a clean, actionable interface.",
    result: "Streamlined operations across 3 business departments",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    category: "Custom Tool",
    categoryLabel: "Logistics",
    liveUrl: "https://github.com/Bhavishya-jasuja/scm2.0",
    year: "2023",
    featured: false,
    accentColor: "from-cyan-500/15 to-transparent",
  },
  {
    id: "leadership-profile",
    title: "Leadership Profile System",
    client: "HR / Internal Platform",
    description:
      "A multi-step profile form and thread system for leadership nominations — collects structured data, validates entries, and presents leadership profiles in a clean format.",
    result: "Processed 100+ leadership applications efficiently",
    tech: ["HTML", "CSS", "JavaScript", "Form Validation"],
    category: "Custom Tool",
    categoryLabel: "HR Tech",
    liveUrl: "https://github.com/Bhavishya-jasuja/leadership-thread-profile-form",
    year: "2023",
    featured: false,
    accentColor: "from-rose-500/15 to-transparent",
  },
];

export const projectCategories = ["All", "Business Website", "Custom Tool"];
