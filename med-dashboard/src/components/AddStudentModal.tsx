import { useState } from 'react';
import { X } from 'lucide-react';

import type { Treatment } from '../types';
import { VISIT_TYPES } from '../constants';

interface AddStudentModalProps {
  onClose: () => void;
  onAdded: (treatment: Treatment) => void;
}

export default function AddStudentModal({ onClose, onAdded }: AddStudentModalProps) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    estimate_duration: '30 mins',
    description: '',
    visit_type: 'single' as 'single' | 'multiple',
    is_active: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) {
      setError('Name and price are required.');
      return;
    }
    setSaving(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      const newTreatment: Treatment = {
        id: Math.random().toString(36).substr(2, 9),
        name: form.name.trim(),
        price: parseFloat(form.price),
        estimate_duration: form.estimate_duration,
        description: form.description || null,
        visit_type: form.visit_type,
        is_active: form.is_active,
        review_count: 0,
        is_sample: false,
        duration_note: null,
        rating: 5,
        created_at: new Date().toISOString(),
      };

      setSaving(false);
      onAdded(newTreatment);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Add Course</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          )}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Course Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Introduction to Science"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Price (USD)</label>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="e.g. 150"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Estimated Duration</label>
            <select
              value={form.estimate_duration}
              onChange={(e) => setForm({ ...form, estimate_duration: e.target.value })}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-white"
            >
              <option value="15 mins">15 mins</option>
              <option value="30 mins">30 mins</option>
              <option value="45 mins">45 mins</option>
              <option value="1 hr">1 hr</option>
              <option value="1.5 hrs">1.5 hrs</option>
              <option value="2 hrs">2 hrs</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Visit Type</label>
            <div className="flex gap-3">
              {VISIT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm({ ...form, visit_type: type })}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-all capitalize ${
                    form.visit_type === type
                      ? type === 'single'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-teal-500 text-white border-teal-500'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {type} Visit
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <label className="text-xs font-semibold text-gray-600">Active Status</label>
            <button
              type="button"
              onClick={() => setForm({ ...form, is_active: !form.is_active })}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                form.is_active ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                  form.is_active ? 'translate-x-4.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
