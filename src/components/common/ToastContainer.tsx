import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useDemo();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = 'bg-white border-slate-200 text-slate-800';
        let Icon = Info;
        let iconColor = 'text-pmrg-teal';

        if (toast.type === 'success') {
          bgColor = 'bg-[#0B263A] text-white border-pmrg-teal/40';
          Icon = CheckCircle2;
          iconColor = 'text-pmrg-mint';
        } else if (toast.type === 'error') {
          bgColor = 'bg-red-900 text-white border-red-700';
          Icon = AlertCircle;
          iconColor = 'text-red-300';
        } else if (toast.type === 'warning') {
          bgColor = 'bg-amber-900 text-white border-amber-700';
          Icon = AlertTriangle;
          iconColor = 'text-amber-300';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-lg border shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${bgColor}`}
          >
            <div className="flex items-center space-x-3 mr-2">
              <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-white/60 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
