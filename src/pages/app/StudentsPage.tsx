import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Student } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  Search,
  Filter,
  Eye,
  Plus,
  Mail,
  Phone,
  GraduationCap,
  CalendarCheck,
  CircleDollarSign,
  BookOpenCheck,
  Award,
  FileText,
  UserCheck,
} from 'lucide-react';

export const StudentsPage: React.FC = () => {
  const { students, addStudent, fees, attendance, logbooks, results } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'rollNo' | 'attendance'>('rollNo');

  // Drawer & Tab state
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'academics' | 'attendance' | 'fees' | 'exams' | 'logbooks'>('overview');

  // Add Student modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    program: 'BAMS (UG)' as Student['program'],
    batch: '2023-28',
    currentSemester: '2nd Prof' as Student['currentSemester'],
    mentorName: 'Prof. (Dr.) Vasant Vaidya',
    email: '',
    phone: '',
    bloodGroup: 'B+',
    hostelRoom: 'Hostel Block A-105',
    clinicalPostingDept: 'Dravyaguna Lab',
  });

  // Filter & sort
  const filteredStudents = students
    .filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchBatch = batchFilter === 'All' || s.batch === batchFilter;
      const matchFee = feeFilter === 'All' || s.feeStatus === feeFilter;
      return matchSearch && matchBatch && matchFee;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'attendance') return b.attendancePercent - a.attendancePercent;
      return a.rollNo.localeCompare(b.rollNo);
    });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent(newStudentData);
    setIsAddModalOpen(false);
    setNewStudentData({
      name: '',
      program: 'BAMS (UG)',
      batch: '2023-28',
      currentSemester: '2nd Prof',
      mentorName: 'Prof. (Dr.) Vasant Vaidya',
      email: '',
      phone: '',
      bloodGroup: 'B+',
      hostelRoom: 'Hostel Block A-105',
      clinicalPostingDept: 'Dravyaguna Lab',
    });
  };

  // Associated records for selected student
  const studentFeeLedger = selectedStudent
    ? fees.filter((f) => f.studentId === selectedStudent.id)
    : [];
  const studentAttendanceList = selectedStudent
    ? attendance.filter((a) => a.studentId === selectedStudent.id)
    : [];
  const studentLogbooksList = selectedStudent
    ? logbooks.filter((l) => l.studentId === selectedStudent.id)
    : [];
  const studentResultsList = selectedStudent
    ? results.filter((r) => r.studentId === selectedStudent.id)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#0D887E]" />
            <span>Unified Student Directory (Single 360 View)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Complete institutional profile linking academics, attendance, clinical rotations, and fee ledgers.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-sm flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{students.length}</h3>
          <p className="text-[11px] text-slate-400">4 BAMS & PG cohorts</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Attendance</p>
          <h3 className="text-2xl font-bold text-[#0D887E] mt-1">
            {(students.reduce((a, s) => a + s.attendancePercent, 0) / students.length).toFixed(1)}%
          </h3>
          <p className="text-[11px] text-emerald-600 font-semibold">Statutory threshold &gt;75%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance Below 75%</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">
            {students.filter((s) => s.attendancePercent < 75).length}
          </h3>
          <p className="text-[11px] text-rose-500">Requires Dean notice</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fee Clearance</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {students.filter((s) => s.feeStatus === 'Paid').length} / {students.length}
          </h3>
          <p className="text-[11px] text-slate-400">100% dues cleared</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search student name, roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Batch:</span>
            <select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Batches</option>
              <option value="2023-28">2023-28 (2nd Prof)</option>
              <option value="2022-27">2022-27 (3rd Prof)</option>
              <option value="2021-26">2021-26 (Final Prof)</option>
              <option value="2020-25">2020-25 (Internship)</option>
              <option value="2024-27">2024-27 (PG)</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Fee Status:</span>
            <select
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Fees</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="rollNo">Roll Number</option>
              <option value="name">Student Name</option>
              <option value="attendance">Attendance %</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Batch / Prof</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Fee Status</th>
                <th className="py-3 px-4">Clinical Posting</th>
                <th className="py-3 px-4">Faculty Mentor</th>
                <th className="py-3 px-4 text-right">360 View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No student records matched your filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-[#0B263A]">{s.name}</p>
                          <p className="text-[10px] text-slate-400">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-700">{s.rollNo}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">{s.currentSemester}</span>
                      <span className="text-[10px] text-slate-400 block">{s.batch}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`font-bold ${
                            s.attendancePercent < 75 ? 'text-rose-600' : 'text-emerald-700'
                          }`}
                        >
                          {s.attendancePercent}%
                        </span>
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              s.attendancePercent < 75 ? 'bg-rose-500' : 'bg-[#0D887E]'
                            }`}
                            style={{ width: `${s.attendancePercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={s.feeStatus} size="sm" />
                      {s.balanceFee > 0 && (
                        <span className="text-[10px] text-rose-600 block mt-0.5">
                          ₹{s.balanceFee.toLocaleString('en-IN')} due
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">
                      {s.clinicalPostingDept || 'General Rotations'}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{s.mentorName}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedStudent(s);
                          setActiveTab('overview');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-teal-50 text-[#0D887E] hover:bg-[#0D887E] hover:text-white transition-colors font-bold text-xs"
                      >
                        Profile →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student 360 Details Drawer with Tabs */}
      <DetailsDrawer
        isOpen={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
        title={selectedStudent?.name || 'Student Profile'}
        subtitle={`Roll: ${selectedStudent?.rollNo} · ${selectedStudent?.batch}`}
        badge={selectedStudent ? <StatusBadge status={selectedStudent.feeStatus} size="sm" /> : undefined}
        width="xl"
      >
        {selectedStudent && (
          <div className="space-y-6 text-xs">
            {/* Drawer Tabs */}
            <div className="flex border-b border-slate-200 overflow-x-auto space-x-4">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'academics', label: 'Academics & Mentor' },
                { id: 'attendance', label: 'Attendance' },
                { id: 'fees', label: 'Fee Ledger' },
                { id: 'exams', label: 'Exam Results' },
                { id: 'logbooks', label: 'Clinical Logbooks' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2 text-xs font-bold whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-[#0D887E] text-[#0D887E]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#0D887E]"
                  />
                  <div>
                    <h4 className="text-base font-extrabold text-[#0B263A]">{selectedStudent.name}</h4>
                    <p className="text-xs text-slate-500">{selectedStudent.program} · {selectedStudent.currentSemester}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Hostel Room: {selectedStudent.hostelRoom || 'Day Scholar'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Attendance Record</span>
                    <p className="text-lg font-bold text-[#0B263A] mt-1">{selectedStudent.attendancePercent}%</p>
                    <p className="text-[10px] text-slate-500">Calculated from 30 recent batch sessions</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Fee Settlement</span>
                    <p className="text-lg font-bold text-[#0B263A] mt-1">
                      {selectedStudent.balanceFee === 0 ? 'Clear (₹0 Due)' : `₹${selectedStudent.balanceFee.toLocaleString('en-IN')} Due`}
                    </p>
                    <p className="text-[10px] text-slate-500">Current annual term</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                  <h5 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">Personal & Contact Info</h5>
                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div>Email: <strong className="text-slate-800">{selectedStudent.email}</strong></div>
                    <div>Phone: <strong className="text-slate-800">{selectedStudent.phone}</strong></div>
                    <div>Blood Group: <strong className="text-slate-800">{selectedStudent.bloodGroup}</strong></div>
                    <div>Assigned Mentor: <strong className="text-slate-800">{selectedStudent.mentorName}</strong></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academics' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                  <h4 className="font-bold text-[#0B263A]">Faculty Mentor Allocation</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Mentor: <strong>{selectedStudent.mentorName}</strong>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Monthly academic progress review, counseling on Charaka Samhita shloka recitation, and clinical posting evaluations.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-[#0B263A] mb-2">Current Clinical Ward Posting</h4>
                  <p className="text-xs text-slate-700">
                    Department: <strong>{selectedStudent.clinicalPostingDept || 'Kaya Chikitsa Ward'}</strong>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Rotational clinical ward duties under Senior Medical Officer supervision as per NCISM regulations.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#0B263A]">Recent Daily Attendance Records</h4>
                  <span className="font-bold text-[#0D887E]">{selectedStudent.attendancePercent}% Cumulative</span>
                </div>
                {studentAttendanceList.length === 0 ? (
                  <p className="text-slate-400 py-4 text-center">Batch session records sync with daily register.</p>
                ) : (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    {studentAttendanceList.map((a) => (
                      <div key={a.id} className="p-3 flex items-center justify-between bg-white">
                        <div>
                          <p className="font-bold text-[#0B263A]">{a.subject}</p>
                          <p className="text-[10px] text-slate-400">{a.date} · Marked by {a.markedBy}</p>
                        </div>
                        <StatusBadge status={a.status} size="sm" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'fees' && (
              <div className="space-y-3">
                <h4 className="font-bold text-[#0B263A]">Linked Financial Ledger</h4>
                {studentFeeLedger.length === 0 ? (
                  <p className="text-slate-400 py-4 text-center">No fee ledgers generated.</p>
                ) : (
                  <div className="space-y-3">
                    {studentFeeLedger.map((f) => (
                      <div key={f.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[#0B263A]">{f.invoiceNo}</span>
                          <StatusBadge status={f.status} size="sm" />
                        </div>
                        <p className="text-xs font-semibold text-slate-700">{f.termDescription}</p>
                        <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-100">
                          <div>Total Due: <strong>₹{f.totalDue.toLocaleString('en-IN')}</strong></div>
                          <div>Paid: <strong className="text-emerald-700">₹{f.amountPaid.toLocaleString('en-IN')}</strong></div>
                          <div>Balance: <strong className="text-rose-600">₹{f.balanceDue.toLocaleString('en-IN')}</strong></div>
                        </div>
                        {f.receiptNo && (
                          <div className="text-[10px] text-slate-400 pt-1">
                            Last Receipt: {f.receiptNo} (Paid on {f.lastPaymentDate})
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'exams' && (
              <div className="space-y-3">
                <h4 className="font-bold text-[#0B263A]">Internal & Practical Exam Results</h4>
                {studentResultsList.length === 0 ? (
                  <p className="text-slate-400 py-4 text-center">No examination score entries published.</p>
                ) : (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    {studentResultsList.map((r) => (
                      <div key={r.id} className="p-3 bg-white flex items-center justify-between">
                        <div>
                          <p className="font-bold text-[#0B263A]">Exam ID: {r.examId}</p>
                          <p className="text-[10px] text-slate-500">
                            Marks: {r.marksObtained} / {r.maxMarks} (Grade: {r.grade})
                          </p>
                        </div>
                        <StatusBadge status={r.status} size="sm" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'logbooks' && (
              <div className="space-y-3">
                <h4 className="font-bold text-[#0B263A]">Supervised Clinical Logbook Entries</h4>
                {studentLogbooksList.length === 0 ? (
                  <p className="text-slate-400 py-4 text-center">No clinical cases logged yet for this student.</p>
                ) : (
                  <div className="space-y-3">
                    {studentLogbooksList.map((l) => (
                      <div key={l.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0B263A]">{l.caseTitle}</span>
                          <StatusBadge status={l.status} size="sm" />
                        </div>
                        <p className="text-[11px] text-[#0D887E] font-medium">{l.postingDepartment} · {l.procedureType}</p>
                        <p className="text-[11px] text-slate-600 italic">"{l.clinicalNotes}"</p>
                        {l.supervisorFeedback && (
                          <div className="p-2 rounded bg-teal-50 text-[10px] text-teal-900 mt-2">
                            Supervisor Feedback: {l.supervisorFeedback}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </DetailsDrawer>

      {/* Add Student Modal Form */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Student Record"
        subtitle="Enrol student into BAMS academic program and allocate faculty mentor."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Student Full Name</label>
            <input
              type="text"
              required
              value={newStudentData.name}
              onChange={(e) => setNewStudentData({ ...newStudentData, name: e.target.value })}
              placeholder="e.g. Varun K. Sharma"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Academic Program</label>
              <select
                value={newStudentData.program}
                onChange={(e) => setNewStudentData({ ...newStudentData, program: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="BAMS (UG)">BAMS (UG)</option>
                <option value="MD/MS Ayurveda (PG)">MD/MS Ayurveda (PG)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Batch</label>
              <select
                value={newStudentData.batch}
                onChange={(e) => setNewStudentData({ ...newStudentData, batch: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="2023-28">2023-28</option>
                <option value="2022-27">2022-27</option>
                <option value="2021-26">2021-26</option>
                <option value="2024-27">2024-27 (PG)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Semester / Prof</label>
              <select
                value={newStudentData.currentSemester}
                onChange={(e) => setNewStudentData({ ...newStudentData, currentSemester: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="1st Prof">1st Prof</option>
                <option value="2nd Prof">2nd Prof</option>
                <option value="3rd Prof">3rd Prof</option>
                <option value="Final Prof">Final Prof</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Faculty Mentor</label>
              <input
                type="text"
                value={newStudentData.mentorName}
                onChange={(e) => setNewStudentData({ ...newStudentData, mentorName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={newStudentData.email}
                onChange={(e) => setNewStudentData({ ...newStudentData, email: e.target.value })}
                placeholder="student@ayustudent.in"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone</label>
              <input
                type="text"
                required
                value={newStudentData.phone}
                onChange={(e) => setNewStudentData({ ...newStudentData, phone: e.target.value })}
                placeholder="+91 98000 00000"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0D887E] hover:bg-[#0A7068] text-white rounded-lg font-bold shadow-xs"
            >
              Save Student
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
