import { Star, MoreVertical } from 'lucide-react';
import type { Treatment } from '../types';
import { DASHBOARD_STATS_CONFIG, CHART_DATA, WEEK_DAYS } from '../constants';

interface DashboardProps {
  treatments: Treatment[];
}

export default function Dashboard({ treatments }: DashboardProps) {
  const stats = DASHBOARD_STATS_CONFIG.map(stat => {
    if (stat.id === 'records') {
      return { ...stat, value: treatments.length.toString() };
    }
    return stat;
  });

  const recentCourses = treatments.slice(-5).reverse();

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 no-scrollbar">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Welcome back, Prof. John Smith. Here's a summary of today's activities.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Card */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Student Enrollment Trends</h3>
                <p className="text-xs text-gray-400">Total enrollments over the last 7 days</p>
              </div>
              <select className="text-xs font-semibold text-gray-500 bg-gray-50 border-none rounded-lg focus:ring-0 px-2 py-1">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            
            {/* Custom SVG Chart */}
            <div className="h-64 w-full relative group">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                {[0, 50, 100, 150].map((y) => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#f3f4f6" strokeWidth="1" />
                ))}
                {/* Area */}
                <path
                  d="M0 180 Q 50 160, 100 170 T 200 120 T 300 150 T 400 100 V 200 H 0 Z"
                  fill="url(#chartGradient)"
                />
                {/* Line */}
                <path
                  d="M0 180 Q 50 160, 100 170 T 200 120 T 300 150 T 400 100"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="drop-shadow-sm"
                />
                {/* Data Points */}
                {CHART_DATA.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="white"
                    stroke="#2563eb"
                    strokeWidth="2"
                    className="cursor-pointer hover:r-6 transition-all"
                  />
                ))}
              </svg>
              {/* X-Axis Labels */}
              <div className="flex justify-between mt-4">
                {WEEK_DAYS.map((day) => (
                  <span key={day} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{day}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Recent Activity / Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Student Feedback</h3>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                      strokeDasharray="85, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">4.9</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i <= 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Based on 124 reviews</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Action Center</h3>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Check-in New Student
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Create Academic Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Academic Courses Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Academic Courses</h3>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View History</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Course Name</th>
                  <th className="px-6 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Course Type</th>
                  <th className="px-6 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Base Fees</th>
                  <th className="px-6 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Student Rating</th>
                  <th className="px-6 py-3 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentCourses.length > 0 ? (
                  recentCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{course.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                          course.visit_type === 'single' ? 'bg-blue-100 text-blue-600' : 'bg-teal-100 text-teal-600'
                        }`}>
                          {course.visit_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">${course.price.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-900">{course.rating?.toFixed(1) || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">No academic records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
