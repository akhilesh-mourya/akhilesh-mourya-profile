export const profile = {
  name: "Akhilesh Mourya",
  role: "Mobile lead & full-stack engineer",
  location: "Indore, India",
  email: "mouryaakhilesh62@gmail.com",
  github: "https://github.com/akhilesh-mourya",
  linkedin: "https://www.linkedin.com/in/akhilesh-mourya-54705232/",
  upwork: "https://www.upwork.com/freelancers/~01f740a150fb7f0201",
  resume: "/resume.pdf",
  portrait: "/profile/akhilesh-mourya.png",
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  role: string;
  summary: string;
  contribution: string;
  stack: string[];
  href: string;
  linkLabel: string;
  images?: [string, string];
  links?: { label: string; href: string }[];
};

// Roles and contributions are drawn from the supplied resume, not inferred from screenshots.
export const projects: Project[] = [
  {
    slug: "natty-hatty",
    name: "Natty Hatty",
    category: "Youth sports · iOS & Android",
    role: "Mobile Team Lead",
    summary: "Making youth sports easier for families.",
    contribution:
      "I led the mobile team from technical planning through release. My work covered architecture decisions, code reviews, feature delivery, debugging, and getting the iOS and Android apps ready for production.",
    stack: ["React Native", "TypeScript", "Redux", "Firebase"],
    href: "https://apps.apple.com/us/app/natty-hatty/id1671750048",
    linkLabel: "View on the App Store",
    images: ["/projects/natty-hatty-1.jpg", "/projects/natty-hatty-2.jpg"],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/natty-hatty/id1671750048",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.nhcustomermobileapp&hl=en_US",
      },
    ],
  },
  {
    slug: "amori",
    name: "Amori",
    category: "AI-powered relationship coaching",
    role: "React Native Developer",
    summary: "A personal dating coach, on your phone.",
    contribution:
      "I developed mobile features, connected backend APIs and AI functionality, and worked on the experience, performance, and production delivery of the app.",
    stack: ["React Native", "REST APIs", "AI integration"],
    href: "https://apps.apple.com/us/app/amori-personal-dating-coach/id1552334356",
    linkLabel: "View on the App Store",
    images: ["/projects/amori-1.png", "/projects/amori-2.png"],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/amori-personal-dating-coach/id1552334356",
      },
      { label: "Website", href: "https://amori.app/" },
    ],
  },
  {
    slug: "swiftsku",
    name: "SwiftSku",
    category: "Retail operations · Mobile",
    role: "Mobile Application Developer",
    summary: "Everyday retail operations, within reach.",
    contribution:
      "I contributed mobile features and backend integrations to a production retail management app, with ongoing work on performance and maintenance.",
    stack: ["React Native", "Mobile integrations"],
    href: "https://apps.apple.com/us/app/swiftsku/id1515815242",
    linkLabel: "View on the App Store",
    images: ["/projects/swiftsku-1.png", "/projects/swiftsku-2.png"],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/swiftsku/id1515815242",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.swiftsku&hl=en_US",
      },
    ],
  },
  {
    slug: "arzooo",
    name: "Arzooo",
    category: "B2B commerce",
    role: "React Native Developer",
    summary: "A marketplace for electronics retailers.",
    contribution:
      "I developed mobile features for product listings and business workflows, integrated backend APIs, and supported application reliability and maintenance.",
    stack: ["React Native", "REST APIs"],
    href: "https://apps.apple.com/in/app/arzooo-b2b-for-retail-stores/id1497133088",
    linkLabel: "View on the App Store",
    images: ["/projects/arzooo-1.png", "/projects/arzooo-2.png"],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/in/app/arzooo-b2b-for-retail-stores/id1497133088",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.arzooonative&hl=en_US",
      },
    ],
  },
  {
    slug: "openpath-ai",
    name: "OpenPath AI",
    category: "Sales enablement · Web",
    role: "React.js Frontend Developer",
    summary: "Interfaces for AI-assisted sales workflows.",
    contribution:
      "I built React dashboards and API-driven interfaces, implemented dynamic content and AI-assisted workflows, and improved component architecture and frontend performance.",
    stack: ["React.js", "Dashboards", "API integration"],
    href: "https://openpath.ai/",
    linkLabel: "Visit OpenPath AI",
  },
];

export const experience = [
  {
    company: "Natty Hatty",
    role: "Mobile Team Lead / Senior React Native Developer",
    dates: "Nov 2021 — Oct 2026",
    text: "Led the mobile team, owned architecture and feature delivery, reviewed code, mentored developers, and managed iOS and Android release readiness.",
  },
  {
    company: "Systango Technology",
    role: "Technical Architect",
    dates: "May 2016 — Sep 2021",
    text: "Directed cross-platform mobile development with React Native, Flutter, and Ionic. Worked with international clients, guided teams, and implemented delivery pipelines.",
  },
  {
    company: "Codiant",
    role: "Software Engineer — iOS",
    dates: "Apr 2015 — Apr 2016",
    text: "Built native iOS features in Swift and Objective-C, worked with MVC architecture, and contributed to automated releases using Fastlane.",
  },
  {
    company: "Ypsilon IT Solution",
    role: "Junior Software Engineer",
    dates: "Jan 2013 — Mar 2015",
    text: "Developed and maintained native iOS and Android features, with hands-on work in testing, debugging, and application performance.",
  },
];

export const capabilities = [
  {
    title: "Build the mobile product",
    text: "Native iOS and cross-platform applications, including authentication, push notifications, deep links, payments, and native modules.",
    tools: "React Native · Expo · Swift · Objective-C · Kotlin",
  },
  {
    title: "Connect the whole system",
    text: "Web interfaces, backend APIs, databases, and AI integrations that support the way a product is actually used.",
    tools: "React · Next.js · Node.js · Firebase · PostgreSQL · OpenAI API",
  },
  {
    title: "Help the team ship",
    text: "Architecture, technical planning, code reviews, mentoring, client discussions, and build pipelines that support reliable releases.",
    tools: "MVVM · CI/CD · GitHub Actions · Fastlane · Expo EAS",
  },
];
