export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  rating: number;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Rajesh Kumar",
    role: "Founder & Physician",
    company: "Kumar Multi-Speciality Clinic, Bangalore",
    text: "Patient bookings went from phone calls only to 70% online within two months. The website is clean, loads fast, and parents trust it immediately. My front desk staff finally has time to focus on patients instead of answering the same questions all day.",
    avatar: "RK",
    rating: 5,
    service: "Business Website",
  },
  {
    id: "t2",
    name: "Priya Kapoor",
    role: "Owner",
    company: "Spice Route Restaurant, Delhi",
    text: "We were losing walk-ins because people couldn't find us online or see our menu properly. After the new website, our table reservations jumped 200% in just 6 weeks. The online menu and Google Maps integration alone paid for the whole project.",
    avatar: "PK",
    rating: 5,
    service: "Business Website",
  },
  {
    id: "t3",
    name: "Amit Verma",
    role: "Founder",
    company: "TrendKart Fashion, Jaipur",
    text: "My Instagram page had thousands of followers but no way to convert them. The e-commerce store changed everything — payment gateway, COD option, WhatsApp integration. Sales crossed ₹8 lakh in the first 3 months. I wish I had done this sooner.",
    avatar: "AV",
    rating: 5,
    service: "E-Commerce",
  },
  {
    id: "t4",
    name: "Neha Singh",
    role: "Studio Director",
    company: "FitLife Studio, Pune",
    text: "Managing 900+ members manually was burning us out. Now batch bookings, fee reminders, and attendance tracking all run automatically. Dropped-out members actually come back when the system follows up on them. This is genuinely life-changing for a small business.",
    avatar: "NS",
    rating: 5,
    service: "Custom Tool",
  },
  {
    id: "t5",
    name: "Vikram Malhotra",
    role: "Principal Broker",
    company: "Malhotra Realty, Mumbai",
    text: "Property listings used to sit on JustDial with zero calls. Our new website with AI chat handles inquiries at 2 AM and qualifies leads before I even wake up. Serious buyers come pre-informed, saving me hours every day. Excellent value for money.",
    avatar: "VM",
    rating: 5,
    service: "AI Application",
  },
  {
    id: "t6",
    name: "Ananya Patel",
    role: "Owner",
    company: "Elara Boutique, Ahmedabad",
    text: "Our customers kept asking for online shopping — I kept delaying because I thought it would be complicated. The whole store was ready in less than 2 weeks with UPI, cards, and WhatsApp order updates. My regulars were shopping online within days of launch.",
    avatar: "AP",
    rating: 5,
    service: "E-Commerce",
  },
  {
    id: "t7",
    name: "Suresh Mehta",
    role: "Managing Director",
    company: "Mehta & Associates CA Firm, Chennai",
    text: "For a CA firm, trust and professionalism are everything. The website redesign brought that credibility we were missing online. New client inquiries from the website increased 3× and the quality of leads is far better than what we got from listings.",
    avatar: "SM",
    rating: 5,
    service: "Business Website",
  },
  {
    id: "t8",
    name: "James Okafor",
    role: "CEO",
    company: "Verdana Organics, UK",
    text: "Professional, fast, and genuinely invested in our success. The e-commerce store launched on time, looks stunning, and the checkout flow is seamless. We made £65K in our first quarter. The best investment our company made this year.",
    avatar: "JO",
    rating: 5,
    service: "E-Commerce",
  },
  {
    id: "t9",
    name: "Dr. Sarah Mitchell",
    role: "Practice Owner",
    company: "MedCare Wellness, Australia",
    text: "Our online appointment rate tripled in the first 3 months. The booking system works flawlessly, patients find it intuitive, and our reception team spends far less time on calls. Couldn't be happier with the outcome.",
    avatar: "SM",
    rating: 5,
    service: "Business Website",
  },
  {
    id: "t10",
    name: "Rohit Joshi",
    role: "Co-Founder",
    company: "Pixel Bridge Agency, Hyderabad",
    text: "We hired to build our own agency website and the result was sharp. Clear service pages, strong portfolio layout, and a contact flow that actually converts. We've onboarded 4 new retainer clients directly from the website since launch.",
    avatar: "RJ",
    rating: 5,
    service: "Business Website",
  },
];
