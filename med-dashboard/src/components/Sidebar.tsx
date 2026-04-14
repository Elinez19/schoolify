import { useState } from 'react';
import { LayoutDashboard, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { NAV_SECTIONS, BOTTOM_NAV_ITEMS, SCHOOL_INFO } from '../constants';

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

export default function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-white border-r border-gray-100 flex flex-col h-full shrink-0 transition-all duration-300 overflow-hidden ${
        isCollapsed ? 'w-20' : 'w-56'
      }`}
    >
      <div className="px-5 pt-5 pb-4 flex items-center justify-between min-h-16">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-base tracking-tight">Schoolify</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="mx-3 mb-4 px-3 py-2.5 bg-blue-50 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">{SCHOOL_INFO.name}</p>
              <p className="text-[10px] text-gray-400 truncate">{SCHOOL_INFO.address}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 space-y-5 no-scrollbar">
        <div>
          <NavLink
            id="dashboard"
            label="Dashboard"
            Icon={LayoutDashboard}
            active={activeItem === 'dashboard'}
            onClick={() => onNavigate('dashboard')}
            collapsed={isCollapsed}
          />
        </div>

        {!isCollapsed &&
          NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest px-3 mb-1.5 uppercase">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    Icon={item.icon}
                    active={activeItem === item.id}
                    onClick={() => onNavigate(item.id)}
                    collapsed={isCollapsed}
                  />
                ))}
              </div>
            </div>
          ))}

        {isCollapsed && (
          <div className="space-y-0.5 pt-2 border-t border-gray-100">
            {NAV_SECTIONS.flatMap((section) => section.items).map((item) => (
              <NavLink
                key={item.id}
                id={item.id}
                label={item.label}
                Icon={item.icon}
                active={activeItem === item.id}
                onClick={() => onNavigate(item.id)}
                collapsed={isCollapsed}
              />
            ))}
          </div>
        )}

        {!isCollapsed && (
          <div className="space-y-0.5">
            {BOTTOM_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                id={item.id}
                label={item.label}
                Icon={item.icon}
                active={activeItem === item.id}
                onClick={() => onNavigate(item.id)}
                collapsed={isCollapsed}
              />
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
}

interface NavLinkProps {
  id: string;
  label: string;
  Icon: React.ElementType;
  active: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

function NavLink({ label, Icon, active, onClick, collapsed }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : ''}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
        collapsed ? 'justify-center px-1' : 'justify-start'
      } ${
        active
          ? 'bg-blue-50 text-blue-600 font-semibold'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 font-medium'
      }`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}
