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
    id: "medcare-clinic",
    title: "MedCare Clinic Website",
    client: "Medical Practice",
    description:
      "Complete website redesign with online appointment booking, doctor profiles, and patient portal for a multi-specialty clinic.",
    result: "+340% online appointments in 3 months",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    category: "Business Website",
    categoryLabel: "Healthcare",
    liveUrl: "https://medcare.demo",
    year: "2026",
    featured: true,
    accentColor: "from-blue-500/15 to-transparent",
  },
  {
    id: "verdana-shop",
    title: "Verdana Organic Store",
    client: "Retail / E-Commerce",
    description:
      "Full e-commerce platform for an organic food brand — product catalog, subscriptions, loyalty program, and integrated delivery tracking.",
    result: "$85K revenue in first quarter post-launch",
    tech: ["Next.js", "Shopify", "Stripe", "Tailwind CSS"],
    category: "E-Commerce",
    categoryLabel: "Retail",
    liveUrl: "https://verdana.demo",
    year: "2026",
    featured: true,
    accentColor: "from-emerald-500/15 to-transparent",
  },
  {
    id: "lexai-assistant",
    title: "LexAI Business Assistant",
    client: "Legal Services Firm",
    description:
      "AI-powered client intake assistant that qualifies leads, answers FAQs, schedules consultations, and routes cases to the right attorney — 24/7.",
    result: "Saved 20 hours/week in admin work",
    tech: ["Next.js", "OpenAI API", "Supabase", "Vercel"],
    category: "AI Application",
    categoryLabel: "Legal Tech",
    liveUrl: "https://lexai.demo",
    year: "2025",
    featured: true,
    accentColor: "from-violet-500/15 to-transparent",
  },
  {
    id: "bellacuisine-restaurant",
    title: "Bella Cuisine Restaurant",
    client: "Fine Dining Restaurant",
    description:
      "Elegant restaurant website with online table reservations, digital menu management, event bookings, and Google review integration.",
    result: "+180% table bookings vs. phone-only",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Framer Motion"],
    category: "Business Website",
    categoryLabel: "Restaurant",
    liveUrl: "https://bellacuisine.demo",
    year: "2025",
    featured: false,
    accentColor: "from-amber-500/15 to-transparent",
  },
  {
    id: "fitpulse-booking",
    title: "FitPulse Studio",
    client: "Fitness & Wellness",
    description:
      "Class booking platform for a fitness studio with member management, instructor scheduling, payment processing, and automated reminders.",
    result: "1,200+ active members managed seamlessly",
    tech: ["React", "Node.js", "Stripe", "PostgreSQL"],
    category: "Custom Tool",
    categoryLabel: "Fitness",
    liveUrl: "https://fitpulse.demo",
    year: "2025",
    featured: false,
    accentColor: "from-rose-500/15 to-transparent",
  },
  {
    id: "propverse-realestate",
    title: "PropVerse Real Estate",
    client: "Real Estate Agency",
    description:
      "Property listing platform with AI-powered search, virtual tours, mortgage calculator, and automated lead follow-up system for a regional agency.",
    result: "3× faster lead-to-showing conversion",
    tech: ["Next.js", "OpenAI", "Mapbox", "Supabase"],
    category: "AI Application",
    categoryLabel: "Real Estate",
    liveUrl: "https://propverse.demo",
    year: "2024",
    featured: false,
    accentColor: "from-cyan-500/15 to-transparent",
  },
];

export const projectCategories = ["All", "Business Website", "E-Commerce", "AI Application", "Custom Tool"];
