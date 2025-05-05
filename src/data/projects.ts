import medicause_main from "../public/images/medicause-main.png";
import medicause_mini2 from "../public/images/medicause-mini2.png";
import medicause_mini3 from "../public/images/medicause-mini3.png";
import xs_main from "../public/images/xs-main.png";
import flow_ui_main from "../public/images/flow-ui-main.png";
import flow_ui_mini1 from "../public/images/flow-ui-mini1.png";
import flow_ui_mini2 from "../public/images/flow-ui-mini2.png";
import sentiment_main from "../public/images/sentiment-main.png";
import sentiment_mini1 from "../public/images/sentiment-mini1.png";
import sentiment_mini2 from "../public/images/sentiment-mini2.png";

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  problemStatement: string;
  solution: string[];
  techStack: string[];
  outcome: string;
  imageUrl: string;
  detailImages: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "xs-parking",
    title: "XS Parking Spaces",
    year: "MAR 2025 - PRESENT",
    description:
      "REST API built using Go to address the issue of parking around the hot spots of India, the project is still under development",
    problemStatement:
      "Tourist areas often face severe parking congestion due to high visitor inflow and lack of real-time availability data, leading to traffic bottlenecks, wasted time, and visitor dissatisfaction.",
    solution: ["In Progress....", "Under Development...."],
    techStack: ["Go", "Redis", "PostgreSQL", "AWS EC2", "S3", "PhonePe"],
    outcome: "Coming soon...",
    imageUrl: xs_main,
    detailImages: [],
    tags: ["REST", "API", "Freelance", "AWS", "Payment Gateway", "Bookings"],
    // githubUrl: "https://github.com",
    // liveUrl: "https://documenter.getpostman.com/view/31308424/2sAYJ6BzVS",
  },
  {
    id: "medicause",
    title: "Medicause API",
    year: "OCT 2024 - JAN 2025",
    description:
      "Digitalize the operations of a health care industry, targeting sectors like laboratories, medicals and doctors as a whole on a single platform.",
    problemStatement:
      "Lack of a centralized system to manage and synchronize operations across the client’s hospitals, labs, and medical stores, leading to fragmented and inefficient workflows.",
    solution: [
      "Built a scalable REST API using ExpressJS and PostgreSQL",
      "Hosted on AWS EC2 with S3 integration, to unify and automate appointments, inventory, and service coordination across hospitals, labs, and medical stores",
    ],
    techStack: ["Express.js", "TypeScript", "PostgreSQL", "AWS EC2", "S3"],
    outcome:
      "Enabled seamless coordination between labs, doctors, and medical stores, reducing manual effort, for the client who owns 2-3 labs, a hospital with a good number of doctors and various medical stores.",
    imageUrl: medicause_main,
    detailImages: [medicause_mini2, medicause_mini3],
    tags: ["REST", "API", "Freelance", "AWS", "Bookings"],
    // githubUrl: "https://github.com",
    liveUrl: "https://documenter.getpostman.com/view/31308424/2sAYJ6BzVS",
  },
  {
    id: "flow-ui",
    title: "Flow UI",
    year: "OCT 2023",
    description:
      "Developed and optimized a robust user interface (UI) and API system for seamless workflow management.",
    problemStatement:
      "Lack of a cohesive and scalable system for managing and visualizing complex workflows",
    solution: [
      "Designed and implemented Flow UI and Flow API using Next.js and Express.js",
      "To provide a robust, scalable workflow management interface with seamless API-driven component communication.",
      "Built a multilayer context hierarchy to optimize state management and ensure efficient data flow between components.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "MongoDB",
      "NextJs",
      "Google OAuth",
    ],
    outcome:
      "Enabled efficient workflow management with a responsive UI and reliable API layer, reducing integration issues and improving system scalability and user experience across multiple modules.",
    imageUrl: flow_ui_main,
    detailImages: [flow_ui_mini1, flow_ui_mini2],
    tags: ["SSR", "Fullstack", "API", "UI"],
    githubUrl: "https://github.com/Hitesh-IDK/flow-ui",
    liveUrl: "https://www.youtube.com/watch?v=ue3dl5l7cXw",
  },
  {
    id: "sentiment-ananlysis",
    title: "Twitter (X) Sentiment Analysis",
    year: "MAR 2024",
    description:
      "Selenium-based scraper to collect real-time social media data; used NLP techniques for sentiment classification",
    problemStatement:
      "Organizations struggle to monitor and interpret real-time public sentiment on social media platforms like Twitter, making it difficult to detect potential risks or reputational threats promptly.",
    solution: [
      "Built a sentiment analysis system with a Selenium-based scraper to collect real-time social media data",
      "Used NLP techniques for sentiment classification and visualized results with risk scores on a dashboard. ",
      "Web Scrapping real time to get real time analysis",
    ],
    techStack: ["Django", "Python", "Selenium"],
    outcome: "Achieved over 85% accuracy in sentiment and risk detection.",
    imageUrl: sentiment_main,
    detailImages: [sentiment_mini1, sentiment_mini2],
    tags: ["Data Analysis", "Web Scrapping", "Fullstack"],
    githubUrl: "https://github.com/Hitesh-IDK/sentiment-analysis",
    // liveUrl: "https://example.com",
  },
];
