export const personalInfo = {
  name: "Komron Sharifov",
  brandName: "Komron",
  brandSuffix: ".dev",
  title: "Full-Stack Developer",
  tagline: "Building modern web platforms with clean code, high speed, and reliable security.",
  email: "komron.sharifov@email.com",
  location: "Tashkent, Uzbekistan",
  availability: "Available for Freelance & Full-Time Projects",
  social: {
    github: "https://github.com/komronsharifov",
    linkedin: "https://linkedin.com/in/komronsharifov",
    twitter: "https://twitter.com/komronsharifov",
    telegram: "https://t.me/komronsharifov",
  },
  profilePhoto: "/profile.png",
  logo: "/logo.png",
  stats: [
    { key: "years" as const, value: 5, suffix: "+" },
    { key: "projects" as const, value: 40, suffix: "+" },
    { key: "clients" as const, value: 25, suffix: "+" },
    { key: "technologies" as const, value: 20, suffix: "+" },
  ],
};

export const navLinks = [
  { href: "#home", key: "home" as const },
  { href: "#about", key: "about" as const },
  { href: "#skills", key: "skills" as const },
  { href: "#projects", key: "projects" as const },
  { href: "#services", key: "services" as const },
  { href: "#process", key: "process" as const },
  { href: "#testimonials", key: "testimonials" as const },
  { href: "#contact", key: "contact" as const },
];

export const sectionNavLinks = [
  { href: "#home", key: "hero" as const },
  { href: "#stats", key: "stats" as const },
  { href: "#about", key: "about" as const },
  { href: "#skills", key: "skills" as const },
  { href: "#projects", key: "projects" as const },
  { href: "#services", key: "services" as const },
  { href: "#process", key: "process" as const },
  { href: "#testimonials", key: "testimonials" as const },
  { href: "#contact", key: "contact" as const },
];

export const skills = [
  {
    categoryKey: "frontend" as const,
    items: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    categoryKey: "backend" as const,
    items: [
      { name: "PHP 8", level: 90 },
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    categoryKey: "tools" as const,
    items: [
      { name: "WordPress", level: 90 },
      { name: "Elementor", level: 85 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "InovaAuto",
    tKey: "inovaauto" as const,
    tags: ["PHP", "MySQL", "JavaScript"],
    image: "/projects/inovaauto.svg",
    link: "https://inovaauto.com",
  },
  {
    id: 2,
    title: "HyperMarket",
    tKey: "hypermarket" as const,
    tags: ["WordPress", "WooCommerce", "Elementor"],
    image: "/projects/hypermarket.svg",
    link: "#",
  },
  {
    id: 3,
    title: "Business Landing Page",
    tKey: "business" as const,
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/projects/business-landing.svg",
    link: "#",
  },
];

export const services = [
  { id: 1, tKey: "web" as const, icon: "code" },
  { id: 2, tKey: "design" as const, icon: "design" },
  { id: 3, tKey: "mobile" as const, icon: "mobile" },
  { id: 4, tKey: "backend" as const, icon: "server" },
  { id: 5, tKey: "perf" as const, icon: "speed" },
  { id: 6, tKey: "consult" as const, icon: "consult" },
];

export const workProcess = [
  { id: 1, step: "01", tKey: "discovery" as const },
  { id: 2, step: "02", tKey: "design" as const },
  { id: 3, step: "03", tKey: "development" as const },
  { id: 4, step: "04", tKey: "launch" as const },
];

export const testimonials = [
  { id: 1, name: "Sarah Chen", rating: 5 },
  { id: 2, name: "Alex Rivera", rating: 5 },
  { id: 3, name: "Maria Santos", rating: 5 },
  { id: 4, name: "James Wilson", rating: 5 },
];
