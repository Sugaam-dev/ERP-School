import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Building2,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';

export const DemoLoginPage: React.FC = () => {
  const { login, loginAsPersona, personas } = useDemo();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (res.success) {
        navigate('/app/dashboard');
      } else {
        setErrorMessage(res.error || 'Invalid credentials');
      }
    }, 450);
  };

  const handleQuickAdminLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('admin', 'Admin@123');
      setIsLoading(false);
      navigate('/app/dashboard');
    }, 300);
  };

  const handlePersonaSelect = (personaId: string) => {
    loginAsPersona(personaId);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] flex flex-col justify-between font-sans">
      {/* Top Simple Bar */}
      <div className="bg-[#0B263A] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-slate-800">
        <Link to="/" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0D887E] flex items-center justify-center font-black text-white text-xs">
            PMRG
          </div>
          <span className="font-bold text-sm tracking-tight">Ayurveda College ERP</span>
        </Link>
        <Link
          to="/"
          className="text-xs text-[#79D4BD] hover:text-white font-medium flex items-center space-x-1"
        >
          <span>← Back to Pitch Presentation</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Left Column: Form */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0D887E] text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Client Demonstration</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B263A] tracking-tight">
                Demo ERP Login
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore the connected academic, hospital, and Panchakarma workflows.
              </p>

              {/* Error notice if any */}
              {errorMessage && (
                <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Demo Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. admin"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B263A] focus:outline-none focus:border-[#0D887E] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B263A] focus:outline-none focus:border-[#0D887E] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#0B263A] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickAdminLogin}
                    disabled={isLoading}
                    className="py-3 px-4 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Continue as Demo Admin</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Demo Notice footer */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                Pre-configured for evaluation
              </span>
              <span>Client POC v1.0</span>
            </div>
          </div>

          {/* Right Column: Predefined Credentials & Persona Selector */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#0B263A] to-[#133954] p-6 sm:p-8 text-white flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800">
            <div>
              {/* Box 1: Credentials card */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#79D4BD] mb-1">
                  Default Demo Credentials
                </h4>
                <div className="text-xs space-y-1 font-mono text-slate-200 mt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Username:</span>
                    <strong className="text-white">admin</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Password:</span>
                    <strong className="text-white">Admin@123</strong>
                  </div>
                </div>
                <p className="text-[10px] text-slate-300 mt-2.5 pt-2 border-t border-white/10">
                  Predefined administrator credentials for full demonstration access.
                </p>
              </div>

              {/* Box 2: Instant Persona Switcher */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Or Test via Role Personas:
                </h4>
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  {personas.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handlePersonaSelect(p.id)}
                      className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-left transition-all flex items-center justify-between group"
                    >
                      <div className="truncate">
                        <p className="text-xs font-bold text-white group-hover:text-[#79D4BD] truncate">
                          {p.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">{p.roleTitle}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#79D4BD] transition-all flex-shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 text-[11px] text-slate-400 leading-tight">
              All credentials and medical patient data are fictitious and intended strictly for proof of concept demonstration.
            </div>
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="py-4 text-center text-xs text-slate-400 border-t border-slate-200">
        PMRG Solution LLP — Confidential Client Pitch Demonstration
      </div>
    </div>
  );
};
