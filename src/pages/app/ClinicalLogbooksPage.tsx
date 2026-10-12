import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ClinicalLogbookEntry } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  BookOpenCheck,
  Search,
  Plus,
  CheckCircle2,
  RotateCcw,
  Eye,
  Stethoscope,
  Building2,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const ClinicalLogbooksPage: React.FC = () => {
  const { logbooks, updateLogbookStatus, addLogbookEntry, faculty, students } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLogbook, setSelectedLogbook] = useState<ClinicalLogbookEntry | null>(null);

  // Revision modal
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisionFeedback, setRevisionFeedback] = useState('');

  // Add Logbook Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLogData, setNewLogData] = useState<Partial<ClinicalLogbookEntry>>({
    studentName: 'Aditya Kulkarni',
    batch: '2022-27',
    postingDepartment: 'Kaya Chikitsa OPD & IPD',
    facultySupervisor: 'Prof. (Dr.) Vasant Vaidya',
    caseTitle: '',
    fictionalPatientRef: 'PT-ANON-7755',
    procedureType: 'Rogi Pariksha (Ashtavidha)',
    clinicalNotes: '',
  });

  const filteredLogbooks = logbooks.filter((log) => {
    const matchSearch =
      log.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.postingDepartment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || log.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleApprove = (id: string) => {
    updateLogbookStatus(id, 'Approved', 'Case evaluation signed and approved into student competency register.');
    if (selectedLogbook?.id === id) {
      setSelectedLogbook({ ...selectedLogbook, status: 'Approved' });
    }
  };

  const handleReturnRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLogbook) {
      updateLogbookStatus(selectedLogbook.id, 'Returned for Revision', revisionFeedback);
      setSelectedLogbook({ ...selectedLogbook, status: 'Returned for Revision', supervisorFeedback: revisionFeedback });
      setIsRevisionModalOpen(false);
      setRevisionFeedback('');
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLogbookEntry(newLogData);
    setIsAddModalOpen(false);
    setNewLogData({
      studentName: 'Aditya Kulkarni',
      batch: '2022-27',
      postingDepartment: 'Kaya Chikitsa OPD & IPD',
      facultySupervisor: 'Prof. (Dr.) Vasant Vaidya',
      caseTitle: '',
      fictionalPatientRef: 'PT-ANON-7755',
      procedureType: 'Rogi Pariksha (Ashtavidha)',
      clinicalNotes: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <BookOpenCheck className="w-5 h-5 text-[#0D887E]" />
            <span>Supervised Clinical Logbooks (Interns & BAMS Scholars)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Faculty verified case exposures, Ayurvedic Rogi Pariksha documentation, and clinical sign-off.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-sm flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Entry</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Supervised Cases</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{logbooks.length}</h3>
          <p className="text-[11px] text-slate-400">Hospital OPD/IPD rotations</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Faculty Approved</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {logbooks.filter((l) => l.status === 'Approved').length}
          </h3>
          <p className="text-[11px] text-slate-400">Competency validated</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Review</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">
            {logbooks.filter((l) => l.status === 'Pending Review').length}
          </h3>
          <p className="text-[11px] text-amber-700">Awaiting faculty sign-off</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search student, case title, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs w-full sm:w-auto justify-end">
          <span className="text-slate-400 font-medium">Review Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B263A] font-semibold focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Returned for Revision">Needs Revision</option>
          </select>
        </div>
      </div>

      {/* Logbooks Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Student & Cohort</th>
                <th className="py-3 px-4">Department Posting</th>
                <th className="py-3 px-4">Case Title & Procedure</th>
                <th className="py-3 px-4">Patient Ref</th>
                <th className="py-3 px-4">Faculty Supervisor</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogbooks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No clinical logbook entries found.
                  </td>
                </tr>
              ) : (
                filteredLogbooks.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0B263A]">{log.studentName}</p>
                      <span className="text-[10px] text-slate-400">Batch {log.batch}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{log.postingDepartment}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0B263A] line-clamp-1">{log.caseTitle}</p>
                      <span className="text-[10px] text-[#0D887E] font-medium">{log.procedureType}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                      {log.fictionalPatientRef}
                    </td>
                    <td className="py-3 px-4 text-slate-700">{log.facultySupervisor}</td>
                    <td className="py-3 px-4 text-slate-500">{log.date}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={log.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedLogbook(log)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                        title="View Full Case Notes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {log.status !== 'Approved' && (
                        <button
                          onClick={() => handleApprove(log.id)}
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Approve Entry"
                        >
                          <CheckCircle2 className="w-4 h-4" />
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

      {/* Logbook Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedLogbook)}
        onClose={() => setSelectedLogbook(null)}
        title={selectedLogbook?.caseTitle || 'Clinical Case Entry'}
        subtitle={`Student: ${selectedLogbook?.studentName} · Dept: ${selectedLogbook?.postingDepartment}`}
        badge={selectedLogbook ? <StatusBadge status={selectedLogbook.status} size="sm" /> : undefined}
      >
        {selectedLogbook && (
          <div className="space-y-6 text-xs">
            {/* Faculty Decision Bar */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0B263A] block">Faculty Supervisor Action</span>
                <span className="text-[11px] text-slate-500">Responsible: {selectedLogbook.facultySupervisor}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleApprove(selectedLogbook.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve Entry</span>
                </button>
                <button
                  onClick={() => setIsRevisionModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 font-bold flex items-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return for Revision</span>
                </button>
              </div>
            </div>

            {/* Case Details */}
            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Procedure Type</span>
                  <p className="font-bold text-[#0B263A]">{selectedLogbook.procedureType}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Anonymized Patient Reference</span>
                  <p className="font-mono font-bold text-slate-700">{selectedLogbook.fictionalPatientRef}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Date of Clinical Exposure</span>
                  <p className="font-bold text-slate-700">{selectedLogbook.date}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Posting Rotation</span>
                  <p className="font-bold text-slate-700">{selectedLogbook.postingDepartment}</p>
                </div>
              </div>
            </div>

            {/* Clinical Observations Note */}
            <div>
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-1.5">
                Clinical Examination & Ayurvedic Observations
              </h4>
              <div className="p-4 rounded-xl bg-white border border-slate-200 leading-relaxed text-slate-700 whitespace-pre-wrap">
                {selectedLogbook.clinicalNotes}
              </div>
            </div>

            {/* Feedback section */}
            {selectedLogbook.supervisorFeedback && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                <span className="font-bold block text-[11px]">Supervisor Feedback Logged:</span>
                <p className="text-xs mt-0.5">{selectedLogbook.supervisorFeedback}</p>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500">
              * Note: In alignment with patient confidentiality protocols, student learning logbooks reference anonymized patient IDs without revealing personal identifiers.
            </div>
          </div>
        )}
      </DetailsDrawer>

      {/* Return for Revision Modal */}
      <Modal
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
        title="Return Case for Student Revision"
        subtitle="Provide specific feedback on clinical notes or dosha examination."
      >
        <form onSubmit={handleReturnRevision} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Supervisor Clinical Feedback</label>
            <textarea
              required
              rows={4}
              value={revisionFeedback}
              onChange={(e) => setRevisionFeedback(e.target.value)}
              placeholder="e.g. Please document the specific measurements of external fistulous opening from the previous session..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsRevisionModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg"
            >
              Confirm Return for Revision
            </button>
          </div>
        </form>
      </Modal>

      {/* Add New Case Entry Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log Supervised Clinical Case"
        subtitle="Submit bedside case exposure for faculty supervisor approval."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Case Title</label>
            <input
              type="text"
              required
              value={newLogData.caseTitle}
              onChange={(e) => setNewLogData({ ...newLogData, caseTitle: e.target.value })}
              placeholder="e.g. Janu Sandhigata Vata with Crepitus - Janu Basti Observation"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Posting Department</label>
              <select
                value={newLogData.postingDepartment}
                onChange={(e) => setNewLogData({ ...newLogData, postingDepartment: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Kaya Chikitsa OPD & IPD">Kaya Chikitsa</option>
                <option value="Panchakarma Center">Panchakarma Center</option>
                <option value="Shalya Tantra Minor OT">Shalya Tantra Minor OT</option>
                <option value="Prasuti & Stri Roga">Prasuti & Stri Roga</option>
                <option value="Kaumarbhritya Ward">Kaumarbhritya</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Procedure Type</label>
              <select
                value={newLogData.procedureType}
                onChange={(e) => setNewLogData({ ...newLogData, procedureType: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Rogi Pariksha (Ashtavidha)">Rogi Pariksha (Ashtavidha)</option>
                <option value="Panchakarma Protocol">Panchakarma Protocol</option>
                <option value="Nadi Pariksha">Nadi Pariksha</option>
                <option value="Shalya Minor Procedure">Shalya Minor Procedure</option>
                <option value="Kaya Chikitsa Case">Kaya Chikitsa Case</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Faculty Supervisor</label>
              <select
                value={newLogData.facultySupervisor}
                onChange={(e) => setNewLogData({ ...newLogData, facultySupervisor: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                {faculty.map((f) => (
                  <option key={f.id} value={f.name}>
                    {f.name} ({f.department})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Anonymized Patient Ref</label>
              <input
                type="text"
                value={newLogData.fictionalPatientRef}
                onChange={(e) => setNewLogData({ ...newLogData, fictionalPatientRef: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Clinical Notes & Ayurvedic Assessment</label>
            <textarea
              required
              rows={3}
              value={newLogData.clinicalNotes}
              onChange={(e) => setNewLogData({ ...newLogData, clinicalNotes: e.target.value })}
              placeholder="Document Rogi Pariksha findings, Srotodushti, and supervised intervention..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0D887E] hover:bg-[#0A7068] text-white rounded-lg font-bold"
            >
              Submit to Supervisor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
