import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { FacultyStaff } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  Briefcase,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  Mail,
  Award,
} from 'lucide-react';

export const HrPage: React.FC = () => {
  const { faculty, showToast } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedStaff, setSelectedStaff] = useState<FacultyStaff | null>(null);

  const filteredFaculty = faculty.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = deptFilter === 'All' || f.department.includes(deptFilter);
    return matchSearch && matchDept;
  });

  const handleSimulateLeave = (f: FacultyStaff) => {
    showToast(`Leave status for ${f.name} updated to "Leave Approved" for upcoming term.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-[#0D887E]" />
            <span>HR, Faculty Roster & Payroll</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Frappe HR foundation: Ayurvedic teaching department staffing, MSR teacher rosters, shifts, and leave records.
          </p>
        </div>

        <div className="p-2 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 font-semibold flex items-center space-x-2">
          <Award className="w-4 h-4 text-[#0D887E]" />
          <span>NCISM Minimum Standard Requirements (MSR): 100% Satisfied</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Teaching Faculty</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{faculty.length}</h3>
          <p className="text-[11px] text-slate-400">14 Statutory Ayush Depts</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active on Duty</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {faculty.filter((f) => f.status === 'Active').length}
          </h3>
          <p className="text-[11px] text-slate-400">Classrooms & Hospital</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">On Authorized Leave</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">
            {faculty.filter((f) => f.status === 'On Leave').length}
          </h3>
          <p className="text-[11px] text-slate-400">Leave balance tracked</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Experience</p>
          <h3 className="text-2xl font-bold text-[#0D887E] mt-1">
            {(faculty.reduce((a, f) => a + f.experienceYears, 0) / faculty.length).toFixed(1)} Yrs
          </h3>
          <p className="text-[11px] text-slate-400">Senior professors & HODs</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search faculty name, department, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs w-full md:w-auto justify-end">
          <span className="text-slate-400 font-medium">Department:</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
          >
            <option value="All">All Departments</option>
            <option value="Kaya Chikitsa">Kaya Chikitsa</option>
            <option value="Panchakarma">Panchakarma</option>
            <option value="Dravyaguna">Dravyaguna</option>
            <option value="Shalya">Shalya Tantra</option>
            <option value="Rasa Shastra">Rasa Shastra</option>
            <option value="Prasuti">Prasuti & Stri Roga</option>
            <option value="Finance">Finance & Admin</option>
          </select>
        </div>
      </div>

      {/* Faculty Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Faculty Member</th>
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4">Assigned Shift</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredFaculty.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={f.avatar}
                        alt={f.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-[#0B263A]">{f.name}</p>
                        <p className="text-[10px] text-slate-400">{f.qualification}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{f.employeeId}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{f.department}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#0D887E]">{f.designation}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{f.experienceYears} Years</td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">{f.shift}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={f.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <button
                      onClick={() => setSelectedStaff(f)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                      title="View Faculty Dossier"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSimulateLeave(f)}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px]"
                    >
                      Leave
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Faculty Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedStaff)}
        onClose={() => setSelectedStaff(null)}
        title={selectedStaff?.name || 'Faculty Profile'}
        subtitle={`ID: ${selectedStaff?.employeeId} · ${selectedStaff?.designation}`}
        badge={selectedStaff ? <StatusBadge status={selectedStaff.status} size="sm" /> : undefined}
      >
        {selectedStaff && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <img
                src={selectedStaff.avatar}
                alt={selectedStaff.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0D887E]"
              />
              <div>
                <h4 className="text-base font-extrabold text-[#0B263A]">{selectedStaff.name}</h4>
                <p className="text-xs text-[#0D887E] font-bold">{selectedStaff.designation}</p>
                <p className="text-xs text-slate-500 mt-0.5">{selectedStaff.department}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2 text-slate-700">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Statutory Qualification & Academic Track
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Degrees: <strong>{selectedStaff.qualification}</strong></div>
                <div>Experience: <strong>{selectedStaff.experienceYears} Years</strong></div>
                <div>Duty Shift: <strong>{selectedStaff.shift}</strong></div>
                <div>System Role: <strong>{selectedStaff.role}</strong></div>
                <div className="col-span-2">Official Email: <strong>{selectedStaff.email}</strong></div>
                <div className="col-span-2">Contact Mobile: <strong>{selectedStaff.phone}</strong></div>
              </div>
            </div>

            {/* Simulated Payroll Snapshot */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Simulated Payroll Summary (Frappe HRMS Format)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>Pay Grade: <strong className="text-slate-800">Professor Level 14</strong></div>
                <div>Basic Scale: <strong className="text-slate-800">₹1,44,200 / Month</strong></div>
                <div>EPF & Gratuity: <strong className="text-slate-800">Compliant (Form 16 Attached)</strong></div>
                <div>Salary Disbursed: <strong className="text-emerald-700">Sep 2026 Settled</strong></div>
              </div>
            </div>
          </div>
        )}
      </DetailsDrawer>
    </div>
  );
};
