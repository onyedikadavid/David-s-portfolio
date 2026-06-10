export interface Project {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  emoji: string;
  color: string;
  bg: string;
  status: "Live" | "Draft";
  badge?: string;
  link?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
}

export interface ExperienceEntry {
  id: string;
  type: "exp" | "edu";
  years: string;
  role: string;
  company: string;
  bullets: string[];
}

export interface Profile {
  firstName: string;
  lastName: string;
  title: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  years: string;
  avatarColor: string;
}

export interface SectionVisibility {
  hero: boolean;
  skills: boolean;
  projects: boolean;
  experience: boolean;
  contact: boolean;
}
