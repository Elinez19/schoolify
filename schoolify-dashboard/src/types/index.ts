export interface Treatment {
  id: string;
  name: string;
  price: number;
  estimate_duration: string;
  duration_note: string | null;
  visit_type: 'single' | 'multiple';
  description: string | null;
  rating: number | null;
  review_count: number;
  is_sample: boolean;
  is_active: boolean;
  created_at: string;
}

export type NavSection = {
  label: string;
  items: NavItem[];
};

export type NavItem = {
  id: string;
  label: string;
  icon: string;
};
