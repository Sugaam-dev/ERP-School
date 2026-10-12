import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ShieldAlert, RotateCcw, UserCheck, CheckCircle2 } from 'lucide-react';

export const DemoEnvironmentBanner: React.FC = () => {
  const { currentUser, resetDemoData, personas, loginAsPersona } = useDemo();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="bg-[#0B263A] text-slate-200 text-xs px-4 py-2 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-2 z-40 select-none">
      <div className="flex items-center space-x-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-emerald-500/20 text-[#79D4BD] border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#79D4BD] mr-1.5 animate-pulse" />
          Interactive POC
        </span>
        <span className="text-slate-300 hidden sm:inline">
          Demo Environment — <span className="text-slate-400">Sample Data Only (Simulated Offline ERPNext + Marley Health Ecosystem)</span>
        </span>
      </div>

      <div className="flex items-center space-x-3">
        {/* Switch Persona Quick Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowPersonaMenu(!showPersonaMenu)}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors text-[11px]"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#79D4BD]" />
            <span>Role: <strong className="text-white font-semibold">{currentUser.roleTitle}</strong></span>
          </button>

          {showPersonaMenu && (
            <div
              className="absolute right-0 mt-1 w-64 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 text-xs"
              onClick={() => setShowPersonaMenu(false)}
            >
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                Simulate Role Personas
              </div>
              {personas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => loginAsPersona(p.id)}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    currentUser.id === p.id ? 'bg-teal-50 text-[#0D887E] font-semibold' : ''
                  }`}
                >
                  <div>
                    <p className="text-xs text-[#0B263A]">{p.name}</p>
                    <p className="text-[10px] text-slate-500">{p.roleTitle}</p>
                  </div>
                  {currentUser.id === p.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#0D887E]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={() => setShowResetConfirm(true)}
          className="flex items-center space-x-1 text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors text-[11px]"
          title="Restore original sample records"
        >
          <RotateCcw className="w-3 h-3 text-slate-400" />
          <span className="hidden md:inline">Reset Data</span>
        </button>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 text-slate-800 shadow-2xl border border-slate-200">
            <div className="flex items-center space-x-3 text-amber-600 mb-3">
              <ShieldAlert className="w-6 h-6" />
              <h4 className="font-bold text-[#0B263A] text-base">Reset Demo Data?</h4>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              This will restore all 40 students, hospital encounters, pharmacy stocks, and Panchakarma schedules back to default seed records.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#0B263A] hover:bg-slate-800 text-white text-xs font-semibold"
              >
                Yes, Restore Seed Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
