export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  highlight: string;
  accent: string;
}

export const services: Service[] = [
  {
    id: "web",
    icon: "Globe",
    title: "Business Websites",
    description:
      "Fast, modern, mobile-first websites that turn visitors into customers. Built for clinics, restaurants, agencies, shops, and any local or online business.",
    features: [
      "Custom responsive design",
      "SEO-optimized structure",
      "Contact forms & booking",
      "Google Analytics setup",
    ],
    highlight: "Most popular",
    accent: "from-blue-500/20 to-blue-600/5",
  },
  {
    id: "ai",
    icon: "Brain",
    title: "AI-Powered Applications",
    description:
      "Smart tools that automate your workflows, handle customer queries 24/7, and give your business a real competitive edge using the latest AI technology.",
    features: [
      "AI chatbots & assistants",
      "Workflow automation",
      "Smart data analysis",
      "Custom AI integrations",
    ],
    highlight: "High demand",
    accent: "from-violet-500/20 to-violet-600/5",
  },
  {
    id: "ecommerce",
    icon: "ShoppingBag",
    title: "E-Commerce Stores",
    description:
      "Full-featured online stores that drive sales. Secure payments, inventory management, and a seamless shopping experience on every device.",
    features: [
      "Product catalog & cart",
      "Stripe / PayPal payments",
      "Inventory management",
      "Order tracking & emails",
    ],
    highlight: "",
    accent: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    id: "custom",
    icon: "Layers",
    title: "Custom Business Tools",
    description:
      "Tailored software built exactly for your needs — booking systems, client portals, internal dashboards, CRMs, and anything your business requires.",
    features: [
      "Online booking systems",
      "Client & admin portals",
      "Custom dashboards & CRM",
      "API & third-party integrations",
    ],
    highlight: "",
    accent: "from-amber-500/20 to-amber-600/5",
  },
];
