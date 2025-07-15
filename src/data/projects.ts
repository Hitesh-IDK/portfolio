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
import talent_discovery_1 from "../public/images/talent-discovery-1.png";
import talent_discovery_2 from "../public/images/talent-discovery-2.png";
import talent_discovery_3 from "../public/images/talent-discovery-3.png";
import talent_discovery_4 from "../public/images/talent-discovery-4.png";
import talent_discovery_5 from "../public/images/talent-discovery-5.png";
import comic_1 from "../public/images/comic-1.jpg";
import comic_2 from "../public/images/comic-2.jpg";
import comic_3 from "../public/images/comic-3.jpg";
import moovie_1 from "../public/images/moovie-1.png";
import moovie_2 from "../public/images/moovie-2.png";

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
    solution: [
      "Designed and implemented core RESTful APIs using Golang to manage real-time parking state transitions.",
      "Built and deployed distributed microservices on AWS EC2 using Docker and CI/CD pipelines.",
      "Optimized caching with Redis to reduce read latency, improving overall system performance by 45%.",
      "Led a team of 4 engineers in agile sprints and code reviews for consistent code quality.",
      "System projected to resolve 70% of parking issues in urban tourist zones.",
    ],
    techStack: ["Go", "Redis", "PostgreSQL", "AWS EC2", "S3", "PhonePe"],
    outcome: "Coming soon...",
    imageUrl: xs_main,
    detailImages: [],
    tags: ["REST", "API", "Freelance", "AWS", "Payment Gateway", "Bookings"],
    // githubUrl: "https://github.com",
    // liveUrl: "https://documenter.getpostman.com/view/31308424/2sAYJ6BzVS",
  },
  {
    id: "atlanta-talent-discovery",
    title: "Atlanta - Talent Discovery Platform",
    year: "JUN 2025",
    description:
      "A dual talent pool platform enabling recruiters and job seekers to connect intelligently. It utilizes natural language search and vector embeddings to surface ideal candidates from both public and private resume pools.",
    problemStatement:
      "Traditional recruitment platforms lack seamless AI-powered discovery mechanisms, especially when combining public candidates with company-specific applicant tracking. Recruiters often struggle to search effectively using natural language or access private candidate data efficiently.",
    solution: [
      "Developed a centralized platform with separate resume pools: a global pool for job seekers and private pools for recruiters.",
      "Integrated Groq LLM to parse and structure resume data automatically into a relational schema.",
      "Implemented semantic search using SentenceTransformer embeddings and cosine similarity to match recruiter queries with resumes.",
      "Enabled Retrieval-Augmented Generation (RAG)-like flow to enhance discovery by combining structured DB lookup with vector search.",
      "Built responsive frontend using React.js, TailwindCSS, TypeScript, and Vite for fast iteration.",
      "Developed scalable backend APIs using FastAPI, PostgreSQL, and SQLAlchemy ORM.",
    ],
    techStack: [
      "Groq LLM",
      "SentenceTransformer",
      "React.js",
      "TailwindCSS",
      "Vite",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
    ],
    outcome:
      "Achieved intelligent candidate discovery with 90%+ semantic match accuracy in internal tests.",
    imageUrl: talent_discovery_2,
    detailImages: [
      talent_discovery_4,
      talent_discovery_5,
      talent_discovery_3,
      talent_discovery_1,
      talent_discovery_2,
    ],
    tags: [
      "AI",
      "RAG",
      "Recruitment",
      "FastAPI",
      "LLM",
      "NLP",
      "Semantic Search",
    ],
    githubUrl: "https://github.com/Hitesh-IDK/talent-discovery-api",
    liveUrl:
      "https://www.loom.com/share/565c0a3c05d94acf8f54446b7c39177b?sid=74d997eb-925e-42b9-9355-ab676d7802fc",
  },
  {
    id: "moovie-recommender",
    title: "Moovie - Smart Movie Recommender",
    year: "MAY 2025 - JUN 2025",
    description:
      "A movie recommendation Android app designed to evolve suggestions based on user interactions and behavioral similarities using a hybrid recommendation engine.",
    problemStatement:
      "New users often receive poor recommendations due to lack of historical data, and existing systems rarely adapt to user behavior or similar user clusters in real time, leading to user drop-offs.",
    solution: [
      "Led the development of a robust backend using Express.js, Node.js, and TypeScript to handle user auth (JWT) and API communication with the Android app.",
      "Built a scalable recommendation engine using FastAPI and Python, featuring content-based, collaborative, and hybrid filtering strategies.",
      "Integrated PostgreSQL for storing user profiles, interactions, and movie metadata with support for dynamic updates.",
      "Implemented secure, isolated access to the recommendation engine via Express.js middleware, ensuring modularity and API control.",
      "Deployed both backend services on Azure with efficient resource separation, and integrated Azure Blob Storage for file management.",
      "Performed spike and soak testing using K6 and Grafana; system benchmarked to handle up to 1000 concurrent users without degradation.",
      "Actively participated in weekly scrums with the Android team, offering backend insight and incorporating frontend feedback.",
    ],
    techStack: [
      "K6",
      "Express.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "FastAPI",
      "Python",
      "Azure",
      "Azure Blob Storage",
      "JWT",
      "Winston",
      "ESLint",
      "Grafana",
    ],
    outcome:
      "Improved recommendation precision over time with hybrid learning, increasing user retention by 40% in testing phase.",
    imageUrl: moovie_1,
    detailImages: [moovie_1, moovie_2],
    tags: [
      "Recommendation System",
      "Hybrid Filtering",
      "FastAPI",
      "Android",
      "Express",
      "Azure",
      "Load Testing",
      "K6",
      "Grafana",
    ],
    // githubUrl: "https://github.com/your-repo",
    // liveUrl: "https://your-live-demo.com",
  },
  {
    id: "comfyui-comic-workflow",
    title: "ComfyUI – AI Comic Generation Workflow",
    year: "JUN 2025 – PRESENT",
    description:
      "Developed advanced generative workflows in ComfyUI to produce consistent multi-panel comics using LoRA-based style and identity preservation techniques.",
    problemStatement:
      "Maintaining consistent character design and artistic style across multiple comic panels is a major challenge in AI-generated storytelling, often resulting in visual discontinuity and poor narrative flow.",
    solution: [
      "Experimented with SD 1.5, SDXL, and Flux models for image generation, comparing output quality and style flexibility.",
      "Researched and integrated IP Adapter techniques with SD models for controlled style transfer.",
      "Trained a personal LoRA on face data for identity consistency, ensuring accurate self-representation across frames.",
      "Combined personal LoRA with a comic-style LoRA to enable stylized yet consistent character generation.",
      "Designed and implemented a ComfyUI workflow to generate 6-panel comics with continuity in character, pose, and visual theme.",
      "Refined prompt structures and node configurations to optimize coherence and storytelling within the panels.",
    ],
    techStack: [
      "ComfyUI",
      "Stable Diffusion 1.5",
      "SDXL",
      "Flux",
      "LoRA",
      "IP Adapters",
      "Python",
    ],
    outcome:
      "Achieved high visual consistency and narrative flow across AI-generated comic panels, demonstrating robust control over identity and style fusion.",
    imageUrl: comic_1,
    detailImages: [comic_1, comic_2, comic_3],
    tags: [
      "ComfyUI",
      "LoRA",
      "SDXL",
      "Flux",
      "Style Transfer",
      "Comics",
      "AI Art",
    ],
    // githubUrl: "https://github.com/your-repo",
    liveUrl: "https://www.loom.com/share/4d44cb578d7245cc8bcd9396309e9a80?",
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
      "Developed scalable backend systems for lab bookings, doctor consults, and pharmacy orders.",
      "Engineered secure file uploads using AWS S3 with automated backups and fault-tolerant services using Systemd.",
      "Automated DB maintenance scripts via cron jobs, reducing manual interventions by 80%.",
    ],
    techStack: [
      "Express.js",
      "TypeScript",
      "PostgreSQL",
      "AWS EC2",
      "S3",
      "daemon",
    ],
    outcome:
      "Enabled seamless coordination between labs, doctors, and medical stores, reducing manual effort, for the client who owns 2-3 labs, a hospital with a good number of doctors and various medical stores.",
    imageUrl: medicause_main,
    detailImages: [medicause_mini2, medicause_mini3],
    tags: ["REST", "API", "Freelance", "AWS", "Bookings"],
    // githubUrl: "https://github.com",
    liveUrl: "https://documenter.getpostman.com/view/31308424/2sAYJ6BzVS",
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
      "Developed a full-stack sentiment analysis application using Django to analyze emotions and risk level in Twitter content.",
      "Automated real-time tweet scraping using Selenium with >90% success rate on active profiles.",
      "Created a risk scoring model based on keyword intensity to flag high-risk content.",
    ],
    techStack: ["Django", "Python", "Selenium"],
    outcome: "Achieved over 85% accuracy in sentiment and risk detection.",
    imageUrl: sentiment_main,
    detailImages: [sentiment_mini1, sentiment_mini2],
    tags: ["Data Analysis", "Web Scrapping", "Fullstack"],
    githubUrl: "https://github.com/Hitesh-IDK/sentiment-analysis",
    // liveUrl: "https://example.com",
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
];
