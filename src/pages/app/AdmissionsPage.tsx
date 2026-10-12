import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { AdmissionApplication } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Plus,
  FileText,
  Phone,
  Mail,
  Award,
} from 'lucide-react';

export const AdmissionsPage: React.FC = () => {
  const { admissions, updateAdmissionStatus, addAdmission } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [programFilter, setProgramFilter] = useState<string>('All');

  // Selected for drawer
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);

  // New Application Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: '',
    neetRollNo: '',
    neetScore: 500,
    program: 'BAMS (UG)' as AdmissionApplication['program'],
    category: 'General' as AdmissionApplication['category'],
    phone: '',
    email: '',
    hscPercentage: 85,
    remarks: '',
  });

  // Filtered applications
  const filteredApps = admissions.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.neetRollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesProgram = programFilter === 'All' || app.program === programFilter;
    return matchesSearch && matchesStatus && matchesProgram;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAdmission(formData);
    setIsAddModalOpen(false);
    setFormData({
      applicantName: '',
      neetRollNo: '',
      neetScore: 500,
      program: 'BAMS (UG)',
      category: 'General',
      phone: '',
      email: '',
      hscPercentage: 85,
      remarks: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-[#0D887E]" />
            <span>Admissions & Enrolment Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            NEET UG/PG counselling verification, merit lists, document scrutiny, and seat allotment.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Received</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{admissions.length}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Round 1 & 2 Counselling</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Approved Seats</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {admissions.filter((a) => a.status === 'Approved').length}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Ready for Enrolment</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Under Review</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">
            {admissions.filter((a) => a.status === 'Under Review' || a.status === 'Submitted').length}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Scrutiny Committee</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rejected</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">
            {admissions.filter((a) => a.status === 'Rejected').length}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Cut-off not satisfied</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search applicant name, NEET roll, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Under Review">Under Review</option>
              <option value="Submitted">Submitted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Program:</span>
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Programs</option>
              <option value="BAMS (UG)">BAMS (UG)</option>
              <option value="MD/MS Ayurveda (PG)">MD/MS Ayurveda (PG)</option>
              <option value="Diploma in Panchakarma">Diploma</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-4">Program</th>
                <th className="py-3 px-4">NEET Roll & Score</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No admission applications matched your search criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#0B263A]">{app.id}</td>
                    <td className="py-3 px-4 font-bold text-[#0B263A]">{app.applicantName}</td>
                    <td className="py-3 px-4 font-medium">{app.program}</td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-slate-800">{app.neetRollNo}</div>
                      <span className="text-[10px] text-[#0D887E] font-bold">{app.neetScore} Marks</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {app.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{app.submissionDate}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={app.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                        title="View Application Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {app.status !== 'Approved' && (
                        <button
                          onClick={() => updateAdmissionStatus(app.id, 'Approved', 'Seat confirmed by Admission Committee.')}
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Approve Admission"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      {app.status !== 'Rejected' && (
                        <button
                          onClick={() => updateAdmissionStatus(app.id, 'Rejected', 'Did not qualify category cut-off criteria.')}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Reject Admission"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedApp)}
        onClose={() => setSelectedApp(null)}
        title={selectedApp?.applicantName || 'Application File'}
        subtitle={`ID: ${selectedApp?.id} · Program: ${selectedApp?.program}`}
        badge={selectedApp ? <StatusBadge status={selectedApp.status} size="sm" /> : undefined}
      >
        {selectedApp && (
          <div className="space-y-6 text-xs">
            {/* Quick Actions */}
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-[#0B263A]">Status Decisions:</span>
              <button
                onClick={() => {
                  updateAdmissionStatus(selectedApp.id, 'Approved', 'Confirmed by Dean of Admissions');
                  setSelectedApp({ ...selectedApp, status: 'Approved' });
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve Seat</span>
              </button>
              <button
                onClick={() => {
                  updateAdmissionStatus(selectedApp.id, 'Rejected', 'Rejected by Scrutiny');
                  setSelectedApp({ ...selectedApp, status: 'Rejected' });
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center space-x-1"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
            </div>

            {/* Scorecard Box */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-[#0D887E]" />
                <span>Counselling Merit Breakdown</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">NEET Score:</span>
                  <p className="font-bold text-[#0B263A] text-sm">{selectedApp.neetScore} / 720</p>
                </div>
                <div>
                  <span className="text-slate-500">HSC (12th PCB %):</span>
                  <p className="font-bold text-[#0B263A] text-sm">{selectedApp.hscPercentage}%</p>
                </div>
                <div>
                  <span className="text-slate-500">NEET Roll No:</span>
                  <p className="font-mono font-bold text-slate-700">{selectedApp.neetRollNo}</p>
                </div>
                <div>
                  <span className="text-slate-500">Quota Category:</span>
                  <p className="font-bold text-slate-700">{selectedApp.category}</p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Applicant Contact Information
              </h4>
              <div className="p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedApp.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedApp.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Documents Status: {selectedApp.documentsVerified ? 'Originals Verified' : 'Scrutiny Pending'}</span>
                </div>
              </div>
            </div>

            {/* Committee Remarks */}
            <div>
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-1">
                Scrutiny Committee Remarks
              </h4>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 italic">
                "{selectedApp.remarks || 'No specific remarks filed yet.'}"
              </div>
            </div>

            {/* Connected ERP Workflow Note */}
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500">
              <strong>Connected Workflow Note:</strong> Approving this application automatically generates an enrolment draft and initializes the candidate's first-year student fee ledger in the Finance module.
            </div>
          </div>
        )}
      </DetailsDrawer>

      {/* New Application Modal Form */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Admission Application"
        subtitle="Log candidate allotment details for NEET Round 1/2 scrutiny."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Applicant Full Name</label>
            <input
              type="text"
              required
              value={formData.applicantName}
              onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
              placeholder="e.g. Radhika S. Verma"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">NEET Roll Number</label>
              <input
                type="text"
                required
                value={formData.neetRollNo}
                onChange={(e) => setFormData({ ...formData, neetRollNo: e.target.value })}
                placeholder="NEET-UG-26-XXXX"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">NEET Score (out of 720)</label>
              <input
                type="number"
                required
                min={100}
                max={720}
                value={formData.neetScore}
                onChange={(e) => setFormData({ ...formData, neetScore: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Program</label>
              <select
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="BAMS (UG)">BAMS (UG)</option>
                <option value="MD/MS Ayurveda (PG)">MD/MS Ayurveda (PG)</option>
                <option value="Diploma in Panchakarma">Diploma in Panchakarma</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category Quota</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
                <option value="Management Quota">Management Quota</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98000 00000"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="applicant@mail.com"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Admission Committee Remarks</label>
            <textarea
              rows={2}
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="State quota round allotment notes..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
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
              Submit Application
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
