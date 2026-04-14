import { Search, Bell, ChevronDown, Plus } from 'lucide-react';
import { USER_PROFILE } from '../constants';

interface HeaderProps {
  onAddTreatment: () => void;
}

export default function Header({ onAddTreatment }: HeaderProps) {
  return (
    <header className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-6 shrink-0">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search students, courses, records..."
            className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/10 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onAddTreatment}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
        >
          <Plus className="w-3.5 h-3.5" />
          New Course
        </button>

        <div className="h-8 w-px bg-gray-100 mx-1" />

        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors text-gray-500">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-gray-100 mx-1" />

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-gray-900 leading-none">{USER_PROFILE.name}</span>
            <span className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">{USER_PROFILE.role}</span>
          </div>
          <div className="relative">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform">
              {USER_PROFILE.initials}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </header>
  );
}
