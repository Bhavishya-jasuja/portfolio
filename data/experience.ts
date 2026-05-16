export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  current: boolean;
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Senior Frontend Engineer",
    company: "Vercel",
    period: "2025 — Present",
    location: "Remote",
    description:
      "Leading frontend architecture for core dashboard products serving 500K+ developers globally.",
    achievements: [
      "Reduced initial bundle size by 42% through strategic code splitting",
      "Architected real-time deployment log viewer handling 10K+ concurrent connections",
      "Mentored 4 junior engineers across 2 time zones",
    ],
    current: true,
  },
  {
    id: "exp-2",
    role: "Full-Stack Engineer",
    company: "Linear",
    period: "2023 — 2025",
    location: "San Francisco",
    description:
      "Built performance-critical features for the project management platform used by top engineering teams.",
    achievements: [
      "Shipped the Cycles feature from 0 to GA in 3 months",
      "Improved issue list render performance by 3× using virtualization",
      "Designed and implemented the public API v2 SDK",
    ],
    current: false,
  },
  {
    id: "exp-3",
    role: "Frontend Engineer",
    company: "Framer",
    period: "2021 — 2023",
    location: "Amsterdam",
    description:
      "Developed interactive animation tools and the visual canvas editor used by designers worldwide.",
    achievements: [
      "Built constraint-based layout engine for responsive canvas components",
      "Created motion timeline editor with 60fps scrubbing",
      "Contributed to open-source Framer Motion library",
    ],
    current: false,
  },
  {
    id: "exp-4",
    role: "Junior Developer",
    company: "Studio Agency",
    period: "2019 — 2021",
    location: "London",
    description:
      "Crafted award-winning digital experiences for global brands including Nike, Spotify, and Airbnb.",
    achievements: [
      "Delivered 12 Awwwards-nominated projects",
      "Led WebGL shader development for immersive brand campaigns",
      "Reduced average project delivery time by 30%",
    ],
    current: false,
  },
];
