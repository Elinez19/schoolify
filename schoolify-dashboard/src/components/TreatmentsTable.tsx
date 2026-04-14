import { useState } from 'react';
import { Filter, Plus, Star, MoreVertical, ArrowUpDown, ChevronDown } from 'lucide-react';
import type { Treatment } from '../types';
import { APP_MESSAGES, TREATMENT_TABLE_COLUMNS } from '../constants';

interface TreatmentsTableProps {
  treatments: Treatment[];

  onAddTreatment: () => void;
}

export default function TreatmentsTable({ treatments, onAddTreatment }: TreatmentsTableProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const filtered = treatments.filter((t) => (activeTab === 'active' ? t.is_active : !t.is_active));

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === filtered.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filtered.map((t) => t.id)));
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 pt-5 pb-0 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900">{APP_MESSAGES.TREATMENTS_TITLE}</h1>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'active'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {APP_MESSAGES.ACTIVE_TAB}
          </button>
          <button
            onClick={() => setActiveTab('inactive')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'inactive'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {APP_MESSAGES.INACTIVE_TAB}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-5 h-5 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-gray-400">
              <path d="M2 5h16M5 10h10M8 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-800">{filtered.length}</span>
          <span className="text-sm text-gray-400">courses</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5 text-blue-500" />
            Filters
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>
          <button
            onClick={onAddTreatment}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Course
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white no-scrollbar">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.size === filtered.length && filtered.length > 0}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>
              {TREATMENT_TABLE_COLUMNS.map((col) => (
                <th key={col} className="px-3 py-3 text-left">
                  <SortableHeader label={col} />
                </th>
              ))}
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((treatment) => (
              <TreatmentRow
                key={treatment.id}
                treatment={treatment}
                selected={selectedRows.has(treatment.id)}
                onToggle={() => toggleRow(treatment.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortableHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 tracking-wide uppercase cursor-pointer hover:text-gray-600 select-none">
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </div>
  );
}

interface TreatmentRowProps {
  treatment: Treatment;
  selected: boolean;
  onToggle: () => void;
}

function TreatmentRow({ treatment, selected, onToggle }: TreatmentRowProps) {
  return (
    <tr
      className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${selected ? 'bg-blue-50/40' : ''}`}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">{treatment.name}</span>
          {treatment.is_sample && (
            <span className="text-[10px] font-bold text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 tracking-wide">
              SAMPLE
            </span>
          )}
        </div>
      </td>
      <td className="px-3 py-3 text-gray-500">
        <span className="font-semibold text-gray-800">${treatment.price.toLocaleString()}</span>
      </td>
      <td className="px-3 py-3 text-gray-500">
        {treatment.estimate_duration}
      </td>
      <td className="px-3 py-3">
        <VisitTypeBadge type={treatment.visit_type} />
      </td>
      <td className="px-3 py-3">
        {treatment.rating !== null ? (
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-700">{treatment.rating.toFixed(1)}</span>
          </div>
        ) : (
          <span className="text-gray-400 text-xs">No Rating</span>
        )}
      </td>
      <td className="px-3 py-3 text-gray-500">
        {treatment.review_count} Review{treatment.review_count !== 1 ? 's' : ''}
      </td>
      <td className="px-4 py-3">
        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

function VisitTypeBadge({ type }: { type: 'single' | 'multiple' }) {
  if (type === 'single') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-100 text-blue-600 tracking-wide uppercase">
        Single Visit
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-teal-100 text-teal-600 tracking-wide uppercase">
      Multiple Visits
    </span>
  );
}
