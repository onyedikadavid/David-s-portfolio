import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Project, Skill, ExperienceEntry, Profile, SectionVisibility } from "@/types";

interface PortfolioStore {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experience: ExperienceEntry[];
  sections: SectionVisibility;

  setProfile: (p: Partial<Profile>) => void;
  addSkill: (s: Skill) => void;
  removeSkill: (id: string) => void;
  addProject: (p: Project) => void;
  updateProject: (id: string, p: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addExperience: (e: ExperienceEntry) => void;
  updateExperience: (id: string, e: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;
  toggleSection: (key: keyof SectionVisibility) => void;
}

const defaultProfile: Profile = {
  firstName: "Onyedika",
  lastName: "David",
  title: "Software Engineer & AI/ML Engineer",
  tagline:
    "I build intelligent, full-stack applications at the intersection of software engineering and machine learning — turning data into products and ideas into shipped solutions.",
  location: "Nigeria",
  phone: "+234 xxx xxx xxxx",
  email: "nweneonyedikadavid@gmail.com",
  years: "2+",
  avatarColor: "linear-gradient(135deg,#7C3AED,#6D28D9)",
};

const defaultSkills: Skill[] = [
  // Languages
  { id: "1",  name: "Python",       icon: "🐍" },
  { id: "2",  name: "TypeScript",   icon: "TS" },
  { id: "3",  name: "JavaScript",   icon: "JS" },
  // AI / ML
  { id: "4",  name: "TensorFlow",   icon: "🧠" },
  { id: "5",  name: "PyTorch",      icon: "🔥" },
  { id: "6",  name: "scikit-learn", icon: "SK" },
  { id: "7",  name: "Pandas",       icon: "🐼" },
  { id: "8",  name: "NumPy",        icon: "NP" },
  { id: "9",  name: "Hugging Face", icon: "🤗" },
  { id: "10", name: "LangChain",    icon: "⛓" },
  // Web / Full-stack
  { id: "11", name: "React",        icon: "⚛" },
  { id: "12", name: "Next.js",      icon: "N" },
  { id: "13", name: "Node.js",      icon: "🟢" },
  { id: "14", name: "FastAPI",      icon: "⚡" },
  // Data & Infra
  { id: "15", name: "SQL",          icon: "🗄" },
  { id: "16", name: "MongoDB",      icon: "🍃" },
  { id: "17", name: "Docker",       icon: "🐳" },
  { id: "18", name: "Git",          icon: "G" },
];

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Sentiment Analysis API",
    desc: "Fine-tuned BERT model served via FastAPI — classifies product reviews in real time with 94% accuracy.",
    tags: ["PyTorch", "Hugging Face", "FastAPI"],
    emoji: "🧠",
    color: "rgba(124,58,237,0.25)",
    bg: "#0f0c1a",
    status: "Live",
    badge: "Featured",
  },
  {
    id: "2",
    title: "AI Chatbot Platform",
    desc: "RAG-powered customer support bot built with LangChain, OpenAI, and Pinecone vector store.",
    tags: ["LangChain", "OpenAI", "Pinecone"],
    emoji: "🤖",
    color: "rgba(201,168,76,0.2)",
    bg: "#110e04",
    status: "Live",
    badge: "",
  },
  {
    id: "3",
    title: "Stock Price Predictor",
    desc: "LSTM neural network trained on 10 years of OHLCV data — deployed as an interactive Next.js dashboard.",
    tags: ["TensorFlow", "Python", "Next.js"],
    emoji: "📈",
    color: "rgba(52,211,153,0.15)",
    bg: "#04120a",
    status: "Live",
    badge: "",
  },
  {
    id: "4",
    title: "Data Pipeline Dashboard",
    desc: "End-to-end ETL pipeline with real-time visualisations, anomaly detection, and scheduled reporting.",
    tags: ["Python", "Pandas", "React", "PostgreSQL"],
    emoji: "🗂",
    color: "rgba(59,130,246,0.2)",
    bg: "#04081a",
    status: "Draft",
    badge: "",
  },
];

const defaultExperience: ExperienceEntry[] = [
  {
    id: "1",
    type: "exp",
    years: "2023 – present",
    role: "Software & ML Engineer",
    company: "Freelance / Self-Employed",
    bullets: [
      "Design and deploy ML models (NLP, classification, regression) for client projects",
      "Build full-stack web apps with React, Next.js, and FastAPI backends",
      "Integrate LLM pipelines using LangChain and OpenAI APIs",
    ],
  },
  {
    id: "2",
    type: "exp",
    years: "2022 – 2023",
    role: "Junior Data Analyst",
    company: "Tech Startup — Nigeria",
    bullets: [
      "Cleaned, transformed, and visualised datasets of 1M+ records using Pandas and Matplotlib",
      "Built dashboards in React that surfaced KPIs for non-technical stakeholders",
      "Automated weekly reporting pipelines, saving 8 hours of manual work per week",
    ],
  },
  {
    id: "3",
    type: "edu",
    years: "2018 – 2022",
    role: "B.Sc. Computer Science",
    company: "Nigerian University",
    bullets: [
      "Specialised in Artificial Intelligence and Data Systems",
      "Final project: Deep learning model for Igbo language text classification",
      "Active member, AI & Robotics Club",
    ],
  },
];

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      skills: defaultSkills,
      projects: defaultProjects,
      experience: defaultExperience,
      sections: {
        hero: true,
        skills: true,
        projects: true,
        experience: true,
        contact: true,
      },

      setProfile: (p) =>
        set((s) => ({ profile: { ...s.profile, ...p } })),

      addSkill: (skill) =>
        set((s) => ({ skills: [...s.skills, skill] })),

      removeSkill: (id) =>
        set((s) => ({ skills: s.skills.filter((sk) => sk.id !== id) })),

      addProject: (project) =>
        set((s) => ({ projects: [...s.projects, project] })),

      updateProject: (id, data) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        })),

      removeProject: (id) =>
        set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),

      addExperience: (entry) =>
        set((s) => ({ experience: [...s.experience, entry] })),

      updateExperience: (id, data) =>
        set((s) => ({
          experience: s.experience.map((e) =>
            e.id === id ? { ...e, ...data } : e
          ),
        })),

      removeExperience: (id) =>
        set((s) => ({
          experience: s.experience.filter((e) => e.id !== id),
        })),

      toggleSection: (key) =>
        set((s) => ({
          sections: { ...s.sections, [key]: !s.sections[key] },
        })),
    }),
    { name: "portfolio-store" }
  )
);
