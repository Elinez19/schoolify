import { Users, Calendar, ClipboardList, TrendingUp } from 'lucide-react';
import type { Treatment } from '../types';

export const SAMPLE_TREATMENTS: Treatment[] = [
  {
    id: '1',
    name: 'Introduction to Science',
    price: 1500,
    estimate_duration: '1 Semester',
    duration_note: 'Standard',
    visit_type: 'single',
    description: 'Foundational science course',
    rating: 4.8,
    review_count: 124,
    is_sample: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Advanced Mathematics',
    price: 2500,
    estimate_duration: '1 Year',
    duration_note: null,
    visit_type: 'single',
    description: 'Higher level mathematical concepts',
    rating: 4.9,
    review_count: 89,
    is_sample: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'English Literature',
    price: 1800,
    estimate_duration: '1 Semester',
    duration_note: 'Includes books',
    visit_type: 'single',
    description: 'Classic and modern literature analysis',
    rating: 4.7,
    review_count: 56,
    is_sample: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'World History',
    price: 1200,
    estimate_duration: '1 Semester',
    duration_note: null,
    visit_type: 'single',
    description: 'Comprehensive study of world events',
    rating: 4.5,
    review_count: 42,
    is_sample: true,
    is_active: true,
    created_at: new Date().toISOString()
  }
];

export const DASHBOARD_STATS_CONFIG = [
  { id: 'students', label: 'Total Students', value: '3,284', change: '+12.5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'classes', label: 'Today\'s Classes', value: '42', change: '+18.2%', icon: Calendar, color: 'text-teal-600', bg: 'bg-teal-50' },
  { id: 'records', label: 'Academic Records', value: '0', change: '+5.4%', icon: ClipboardList, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'revenue', label: 'Total Enrollment', value: '1,245', change: '+14.1%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
];

export const CHART_DATA = [
  { x: 0, y: 180 }, 
  { x: 100, y: 170 }, 
  { x: 200, y: 120 }, 
  { x: 300, y: 150 }, 
  { x: 400, y: 100 }
];

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const VISIT_TYPES = ['single', 'multiple'] as const;

export const TREATMENT_TABLE_COLUMNS = [
  'COURSE NAME',
  'FEES',
  'DURATION',
  'TYPE',
  'RATING',
  'REVIEWS',
];
