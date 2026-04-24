
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

export interface ServiceCardProps {
  title: string;
  description: string;
  link: string;
  icon?: LucideIcon;
}

export interface TalkProps {
  title: string;
  description: string;
  tags: string[];
  audience?: string;
  duration?: string;
  link?: string;
}

export interface ArticleProps {
  title: string;
  summary: string;
  tag: string;
  link: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  location: string;
  imgId?: string; // For Unsplash
  src?: string;   // For local files
}

export interface ValueProp {
  title: string;
  icon: LucideIcon;
}

export interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface FinOpsChartData {
  name: string;
  cost: number;
  savings: number;
}

export interface SpeakingAppearance {
  event: string;
  topic: string;
  year: string;
  location: string;
  type: 'Conference' | 'Webinar' | 'Workshop' | 'Panel' | 'Internal';
  audience?: string;   // e.g. "20 attendees"
  recordingUrl?: string;
  photoUrl?: string;   // real event/session photo
  flyerUrl?: string;   // event promotional flier
}
