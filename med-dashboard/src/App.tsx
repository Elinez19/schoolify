import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CoursesTable from './components/TreatmentsTable';
import AddCourseModal from './components/AddStudentModal';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import type { Treatment } from './types';
import { APP_MESSAGES, DEMO_CREDENTIALS, SAMPLE_TREATMENTS } from './constants';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [treatments, setTreatments] = useState<Treatment[]>(SAMPLE_TREATMENTS);

  const [showModal, setShowModal] = useState(false);



  const handleTreatmentAdded = (treatment: Treatment) => {
    setTreatments((prev) => [...prev, treatment]);
  };

  const handleLogin = (email: string, password: string) => {
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen w-full bg-white flex overflow-hidden">
      <Sidebar activeItem={activeNav} onNavigate={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onAddTreatment={() => setShowModal(true)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeNav === 'dashboard' ? (
            <Dashboard treatments={treatments} />
          ) : activeNav === 'courses' ? (
            <CoursesTable
              treatments={treatments}
              onAddTreatment={() => setShowModal(true)}
            />
          ) : (
            <PlaceholderPage label={activeNav} />
          )}
        </div>
      </div>

      {showModal && (
        <AddCourseModal
          onClose={() => setShowModal(false)}
          onAdded={handleTreatmentAdded}
        />
      )}
    </div>
  );
}

function PlaceholderPage({ label }: { label: string }) {
  const formatted = label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g, ' ');
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-3">
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-gray-300">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 8h10M7 12h6M7 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-gray-400">{formatted}</p>
      <p className="text-xs text-gray-300">{APP_MESSAGES.UNDER_CONSTRUCTION}</p>
    </div>
  );
}
