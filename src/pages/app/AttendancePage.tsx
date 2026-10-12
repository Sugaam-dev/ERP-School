import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  CalendarCheck,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Users,
  Calendar,
  Filter,
} from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { attendance, markAttendance, students } = useDemo();

  const [selectedBatch, setSelectedBatch] = useState<string>('2023-28');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered attendance records
  const filteredAttendance = attendance.filter((rec) => {
    const matchBatch = rec.batch === selectedBatch;
    const matchSubject = selectedSubject === 'All' || rec.subject.includes(selectedSubject);
    const matchSearch = rec.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchBatch && matchSubject && matchSearch;
  });

  // Calculate live stats
  const totalInBatch = filteredAttendance.length;
  const presentCount = filteredAttendance.filter((r) => r.status === 'Present').length;
  const absentCount = filteredAttendance.filter((r) => r.status === 'Absent').length;
  const leaveCount = filteredAttendance.filter((r) => r.status === 'On Leave').length;
  const attendanceRate = totalInBatch > 0 ? ((presentCount / totalInBatch) * 100).toFixed(1) : '0';

  // Find students in this batch with low overall attendance (<75%)
  const lowAttendanceStudents = students.filter(
    (s) => s.batch === selectedBatch && s.attendancePercent < 75
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <CalendarCheck className="w-5 h-5 text-[#0D887E]" />
            <span>Daily Attendance Register & Statutory Compliance</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time biometric & faculty session registers, NCISM 75% minimum threshold monitoring.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 shadow-xs">
          <Calendar className="w-4 h-4 text-[#0D887E]" />
          <span>Date: 12 Oct 2026</span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Batch Rate</p>
          <h3 className="text-2xl font-bold text-[#0D887E] mt-1">{attendanceRate}%</h3>
          <p className="text-[11px] text-slate-400">Current session mark</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Present Today</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">{presentCount}</h3>
          <p className="text-[11px] text-slate-400">Marked in register</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Absent</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">{absentCount}</h3>
          <p className="text-[11px] text-slate-400">Unexcused absentees</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">On Medical Leave</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">{leaveCount}</h3>
          <p className="text-[11px] text-slate-400">Approved by Warden</p>
        </div>
      </div>

      {/* Low Attendance Warning Banner if applicable */}
      {lowAttendanceStudents.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-rose-900">
          <div className="flex items-center space-x-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <div>
              <span className="font-bold">Statutory Alert:</span> {lowAttendanceStudents.length} student(s) in batch {selectedBatch} are currently below the university 75% attendance threshold:
              <span className="font-bold ml-1">
                {lowAttendanceStudents.map((s) => `${s.name} (${s.attendancePercent}%)`).join(', ')}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-rose-700 bg-white px-2.5 py-1 rounded-lg border border-rose-200 whitespace-nowrap self-start sm:self-auto">
            Dean Warning Logged
          </span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search student name in register..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Cohort Batch:</span>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B263A] font-bold focus:outline-none"
            >
              <option value="2023-28">Batch 2023-28 (2nd Prof)</option>
              <option value="2022-27">Batch 2022-27 (3rd Prof)</option>
              <option value="2021-26">Batch 2021-26 (Final Prof)</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Subject Session:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Subjects Scheduled</option>
              <option value="Dravyaguna">Dravyaguna Vijnana</option>
              <option value="Kaya Chikitsa">Kaya Chikitsa Ward Rounds</option>
              <option value="Panchakarma">Panchakarma Vidhana</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Register Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-[#0B263A]">{filteredAttendance.length}</strong> students for Batch {selectedBatch}
          </div>
          <span className="text-[11px] text-slate-400">Click actions below to change live attendance status</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Batch / Semester</th>
                <th className="py-3 px-4">Subject Scheduled</th>
                <th className="py-3 px-4">Marked By</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Interactive Mark Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No attendance records for the selected batch.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#0B263A]">
                      {rec.studentName}
                    </td>
                    <td className="py-3 px-4">
                      {rec.batch} <span className="text-slate-400">({rec.semester})</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{rec.subject}</td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">{rec.markedBy}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={rec.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => markAttendance(rec.id, 'Present')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                          rec.status === 'Present'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => markAttendance(rec.id, 'Absent')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                          rec.status === 'Absent'
                            ? 'bg-rose-600 text-white'
                            : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => markAttendance(rec.id, 'On Leave')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                          rec.status === 'On Leave'
                            ? 'bg-amber-600 text-white'
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        }`}
                      >
                        On Leave
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
