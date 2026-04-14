import { Calendar, Users, GraduationCap, Library, BarChart2, Settings, Headphones as HeadphonesIcon, BookOpen } from 'lucide-react';

export const NAV_SECTIONS = [
  {
    label: 'ACADEMICS',
    items: [
      { id: 'schedule', label: 'Schedule', icon: Calendar },
      { id: 'courses', label: 'Courses', icon: BookOpen },
      { id: 'students', label: 'Student List', icon: Users },
    ],
  },
  {
    label: 'ADMINISTRATION',
    items: [
      { id: 'faculty', label: 'Faculty & Staff', icon: GraduationCap },
      { id: 'library', label: 'Library/Resources', icon: Library },
      { id: 'reports', label: 'Analytics & Reports', icon: BarChart2 },
    ],
  },
];

export const BOTTOM_NAV_ITEMS = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'support', label: 'Technical Support', icon: HeadphonesIcon },
];
