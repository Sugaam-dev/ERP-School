import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const norm = status.toLowerCase();

  let style = 'bg-slate-100 text-slate-700 border-slate-200';

  if (
    norm.includes('approved') ||
    norm.includes('paid') ||
    norm.includes('present') ||
    norm.includes('active') ||
    norm.includes('verified') ||
    norm.includes('completed') ||
    norm.includes('adequate') ||
    norm.includes('passed') ||
    norm.includes('good') ||
    norm.includes('signed')
  ) {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
  } else if (
    norm.includes('under review') ||
    norm.includes('in consultation') ||
    norm.includes('in progress') ||
    norm.includes('scheduled') ||
    norm.includes('partial') ||
    norm.includes('fair') ||
    norm.includes('operational') ||
    norm.includes('submitted') ||
    norm.includes('pending')
  ) {
    style = 'bg-amber-50 text-amber-800 border-amber-200/80';
  } else if (
    norm.includes('rejected') ||
    norm.includes('overdue') ||
    norm.includes('absent') ||
    norm.includes('failed') ||
    norm.includes('expired') ||
    norm.includes('low stock') ||
    norm.includes('near expiry') ||
    norm.includes('out of service') ||
    norm.includes('urgent') ||
    norm.includes('needs update')
  ) {
    style = 'bg-rose-50 text-rose-700 border-rose-200/80';
  } else if (
    norm.includes('discharged') ||
    norm.includes('resolved') ||
    norm.includes('closed') ||
    norm.includes('on leave')
  ) {
    style = 'bg-blue-50 text-blue-700 border-blue-200/80';
  }

  const px = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${style} ${px}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {status}
    </span>
  );
};
