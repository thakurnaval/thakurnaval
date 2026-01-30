
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

export interface FinOpsChartData {
  name: string;
  cost: number;
  savings: number;
}
