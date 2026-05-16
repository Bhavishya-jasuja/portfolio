export interface TechCategory {
  name: string;
  description: string;
  techs: string[];
}

export const techCategories: TechCategory[] = [
  {
    name: "Frontend",
    description: "Fast, beautiful interfaces",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend",
    description: "Scalable server & APIs",
    techs: ["Node.js", "PostgreSQL", "Supabase", "Prisma", "tRPC"],
  },
  {
    name: "E-Commerce",
    description: "Sell online, earn more",
    techs: ["Shopify", "Stripe", "WooCommerce", "PayPal", "Checkout.com"],
  },
  {
    name: "AI & Automation",
    description: "Smarter business tools",
    techs: ["OpenAI API", "LangChain", "Pinecone", "Vercel AI SDK", "Zapier"],
  },
  {
    name: "Cloud & Hosting",
    description: "Fast, reliable, global",
    techs: ["Vercel", "AWS", "Cloudflare", "Railway", "Docker"],
  },
  {
    name: "Integrations",
    description: "Connect your ecosystem",
    techs: ["Google Analytics", "Mailchimp", "Twilio", "HubSpot", "Notion API"],
  },
];

export const marqueeSkills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion",
  "Node.js", "PostgreSQL", "Supabase", "Shopify", "Stripe",
  "OpenAI", "LangChain", "Vercel", "AWS", "Cloudflare",
  "Prisma", "tRPC", "Docker", "Google Analytics", "Figma",
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We start with a free 30-minute call to understand your business, goals, and exact needs. No jargon, no pressure — just a real conversation about how I can help.",
  },
  {
    number: "02",
    title: "Proposal & Plan",
    description:
      "I put together a clear project plan with scope, timeline, and pricing. Everything is transparent — you know exactly what you're getting and when.",
  },
  {
    number: "03",
    title: "Design & Build",
    description:
      "I build your project with regular check-ins and progress updates. You see every major milestone before it goes live. No surprises.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "After launch, I stay available for revisions, questions, and ongoing support. Your success after go-live matters as much as the build itself.",
  },
];
