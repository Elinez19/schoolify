import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, GraduationCap } from 'lucide-react';
import { DEMO_CREDENTIALS } from '../constants';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 border-l pl-3 border-gray-100">Schoolify Portal</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Staff & Faculty Login</h1>
            <p className="text-sm text-gray-500">Enter your credentials to access the academy dashboard</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm"
                  placeholder="admin@schoolify.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-4 h-4 border-2 border-gray-200 rounded-md bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all" />
                  <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1.5 5.5L4 8L8.5 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors">Keep me signed in</span>
              </label>
              <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                Forgot access?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Access Dashboard
            </button>
          </form>

          <p className="text-[10px] text-gray-400 text-center">
            © {new Date().getFullYear()} Schoolify Academy. All rights reserved Secure Connection.
          </p>
        </div>

        {/* Right Side - Visual Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative flex-col items-center justify-center p-12 text-white text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
          
          <div className="relative space-y-8 max-w-sm">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto border border-white/30 rotate-3">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold leading-tight">Modernizing Academy Management</h2>
              <p className="text-blue-100 text-sm leading-relaxed opacity-90">
                Streamline your school operations, student records, and academic plans in one beautiful interface.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-left">
                <p className="text-2xl font-bold">4.9/5</p>
                <p className="text-[10px] text-blue-200 uppercase tracking-wider font-bold mt-1">Student Performance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-left">
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-[10px] text-blue-200 uppercase tracking-wider font-bold mt-1">Uptime SLA</p>
              </div>
            </div>
          </div>

          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
      </div>

      {/* Demo Credentials Helper */}
      <div className="fixed bottom-6 right-6">
        <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-2xl border border-gray-100 max-w-[200px] border-l-4 border-l-blue-600">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Demo Access</p>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-semibold text-gray-900">{DEMO_CREDENTIALS.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Pass</span>
              <span className="font-semibold text-gray-900">{DEMO_CREDENTIALS.password}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
