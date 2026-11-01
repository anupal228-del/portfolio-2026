export type ProjectCategory = 
  | 'short-content' 
  | 'motion-graphics' 
  | 'graphic-design' 
  | 'photography' 
  | 'commercial';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  subtitle?: string;
  client?: string;
  role: string;
  description: string;
  tools: string[];
  aspectRatio: '9:16' | '16:9' | '1:1' | '4:5';
  mediaType: 'video' | 'image';
  mediaUrl: string; // e.g. /media/ugc/chotu%20ugc.mp4
  thumbnailUrl?: string;
  featured?: boolean;
  metrics?: string;
  badge?: string;
  tags: string[];
  pdfUrl?: string;
}

export interface WorkExperienceItem {
  number: string;
  company: string;
  dateRange: string;
  role: string;
  description: string;
  highlights?: string[];
}

export interface ProfileData {
  name: string;
  tagline: string;
  title: string;
  subHeader: string;
  aboutSectionNumber: string;
  bio: string;
  education: string;
  specialization: string;
  location: string;
  email: string;
  phone: string;
  instagram: string;
  linkedin: string;
  behance: string;
  whatsapp: string;
  status: string;
  photoUrl: string;
}

export interface PortfolioContent {
  profile: ProfileData;
  experiences: WorkExperienceItem[];
  projects: ProjectItem[];
  tools: {
    name: string;
    level: string;
    icon: string;
  }[];
  creativeFields: string[];
  tags: string[];
}
