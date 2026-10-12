import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { LibraryBook } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  BookMarked,
  Search,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Bookmark,
  Layers,
} from 'lucide-react';

export const LibraryPage: React.FC = () => {
  const { library, issueReturnBook, showToast } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredBooks = library.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.accessionNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'All' || b.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const totalCopiesCount = library.reduce((acc, b) => acc + b.totalCopies, 0);
  const availableCopiesCount = library.reduce((acc, b) => acc + b.availableCopies, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <BookMarked className="w-5 h-5 text-[#0D887E]" />
            <span>Library, Classical Samhitas & Learning Resources</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Classical commentaries, Dravyaguna pharmacognosy atlases, modern medical textbooks, and book circulation.
          </p>
        </div>

        <div className="p-2 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 font-semibold flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-[#0D887E]" />
          <span>Integration: Koha / Open LMS Circulation Connector (Simulated)</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Catalogued Titles</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{library.length}</h3>
          <p className="text-[11px] text-slate-400">Classical & Reference</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Volume Copies</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalCopiesCount}</h3>
          <p className="text-[11px] text-slate-400">Physical accessions</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available on Shelf</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">{availableCopiesCount}</h3>
          <p className="text-[11px] text-slate-400">Ready for issue</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Circulation</p>
          <h3 className="text-2xl font-bold text-[#0D887E] mt-1">{totalCopiesCount - availableCopiesCount}</h3>
          <p className="text-[11px] text-slate-400">Borrowed by scholars</p>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search book title, author, Samhita..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs w-full md:w-auto justify-end">
          <span className="text-slate-400 font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
          >
            <option value="All">All Classifications</option>
            <option value="Ayurveda Samhita & Commentaries">Ayurveda Samhitas</option>
            <option value="Dravyaguna & Pharmacognosy">Dravyaguna & Herbs</option>
            <option value="Anatomy & Modern Physiology">Modern Medicine</option>
            <option value="Research Methodology">Research & Stats</option>
            <option value="Journals & Rare Manuscripts">Journals & Rare</option>
          </select>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Accession #</th>
                <th className="py-3 px-4">Title & Edition</th>
                <th className="py-3 px-4">Author / Commentator</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Shelf Location</th>
                <th className="py-3 px-4">Copies (Avail / Total)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Circulation Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBooks.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{b.accessionNo}</td>
                  <td className="py-3 px-4 max-w-sm">
                    <p className="font-bold text-[#0B263A] line-clamp-1">{b.title}</p>
                    <span className="text-[10px] text-slate-400 font-mono">ISBN: {b.isbn}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">{b.author}</td>
                  <td className="py-3 px-4 text-slate-600">{b.category}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{b.shelfLocation}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#0D887E]">{b.availableCopies}</span>
                    <span className="text-slate-400"> / {b.totalCopies}</span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={b.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => issueReturnBook(b.id, 'issue')}
                      disabled={b.availableCopies === 0}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 text-[#0D887E] hover:bg-[#0D887E] hover:text-white font-bold text-[11px] transition-colors disabled:opacity-40"
                      title="Issue book to student card"
                    >
                      Issue
                    </button>
                    <button
                      onClick={() => issueReturnBook(b.id, 'return')}
                      disabled={b.availableCopies === b.totalCopies}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] transition-colors disabled:opacity-40"
                      title="Record returned book"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
