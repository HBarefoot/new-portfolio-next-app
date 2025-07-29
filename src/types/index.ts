export interface Experience {
  company: string;
  position?: string;
  period: string;
  responsibilities: string[];
}

export interface Skill {
  category: string;
  technologies: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface GalleryProject {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  features: string[];
  link?: string;
}

export interface Education {
  institution: string;
  program: string;
  period: string;
  details?: string[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  website: string;
  address: string;
}
