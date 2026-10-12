import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { OpdVisit } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  Stethoscope,
  Search,
  Plus,
  Play,
  CheckCircle2,
  Clock,
  Eye,
  UserCheck,
  Pill,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export const OpdPage: React.FC = () => {
  const { opdVisits, updateOpdStatus, registerOpdVisit, patients, pharmacyItems, showToast } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedVisit, setSelectedVisit] = useState<OpdVisit | null>(null);

  // New Visit Modal
  const [isNewVisitOpen, setIsNewVisitOpen] = useState(false);
  const [newVisitData, setNewVisitData] = useState({
    patientName: '',
    uhid: 'AY-HOSP-26-0101',
    age: 48,
    gender: 'Male',
    department: 'Kaya Chikitsa (General Medicine)',
    practitionerName: 'Prof. (Dr.) Vasant Vaidya',
    chiefComplaint: '',
  });

  // Complete Consultation Modal
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultNotes, setConsultNotes] = useState('');
  const [prescribedMed, setPrescribedMed] = useState('Ashwagandha Churna');

  const filteredVisits = opdVisits.filter((v) => {
    const matchSearch =
      v.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.uhid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = deptFilter === 'All' || v.department.includes(deptFilter);
    const matchStatus = statusFilter === 'All' || v.queueStatus === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const handleStartConsultation = (id: string) => {
    updateOpdStatus(id, 'In Consultation');
    if (selectedVisit?.id === id) {
      setSelectedVisit({ ...selectedVisit, queueStatus: 'In Consultation' });
    }
  };

  const openCompleteModal = (visit: OpdVisit) => {
    setSelectedVisit(visit);
    setConsultNotes(visit.illustrativeNotes || '');
    setIsConsultModalOpen(true);
  };

  const handleFinishConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVisit) {
      updateOpdStatus(selectedVisit.id, 'Completed');
      showToast(`Consultation completed for Token #${selectedVisit.tokenNo} (${selectedVisit.patientName}). Prescription sent to Pharmacy.`, 'success');
      setIsConsultModalOpen(false);
      setSelectedVisit(null);
    }
  };

  const handleNewVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerOpdVisit(newVisitData);
    setIsNewVisitOpen(false);
    setNewVisitData({
      patientName: '',
      uhid: 'AY-HOSP-26-0101',
      age: 48,
      gender: 'Male',
      department: 'Kaya Chikitsa (General Medicine)',
      practitionerName: 'Prof. (Dr.) Vasant Vaidya',
      chiefComplaint: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-[#0D887E]" />
            <span>Outpatient Department (OPD Queue & Consultations)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time departmental token allocation, Vaidya clinical consultations, and prescription issuance.
          </p>
        </div>

        <button
          onClick={() => setIsNewVisitOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-sm flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Issue OPD Token</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tokens Today</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{opdVisits.length}</h3>
          <p className="text-[11px] text-slate-400">Tokens #101 to #{100 + opdVisits.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Waiting in Queue</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">
            {opdVisits.filter((v) => v.queueStatus === 'Waiting').length}
          </h3>
          <p className="text-[11px] text-slate-400">Avg wait time ~14 mins</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Active Consultation</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">
            {opdVisits.filter((v) => v.queueStatus === 'In Consultation').length}
          </h3>
          <p className="text-[11px] text-slate-400">Chambers 1, 2 & 4</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Consultations Finished</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {opdVisits.filter((v) => v.queueStatus === 'Completed').length}
          </h3>
          <p className="text-[11px] text-slate-400">Prescriptions routed</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search patient, token, complaint..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Department:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Departments</option>
              <option value="Kaya Chikitsa">Kaya Chikitsa</option>
              <option value="Panchakarma">Panchakarma</option>
              <option value="Prasuti">Prasuti & Stri Roga</option>
              <option value="Shalya">Shalya Tantra</option>
              <option value="Swasthavritta">Swasthavritta</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Waiting">Waiting</option>
              <option value="In Consultation">In Consultation</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* OPD Queue Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Token #</th>
                <th className="py-3 px-4">Patient (UHID)</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Chief Complaint</th>
                <th className="py-3 px-4">Assigned Vaidya</th>
                <th className="py-3 px-4">Check-In</th>
                <th className="py-3 px-4">Queue Status</th>
                <th className="py-3 px-4 text-right">Consultation Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredVisits.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No active OPD queue entries matched your criteria.
                  </td>
                </tr>
              ) : (
                filteredVisits.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-black text-[#0D887E] text-sm">
                      #{v.tokenNo}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0B263A]">{v.patientName}</p>
                      <span className="text-[10px] font-mono text-slate-400">{v.uhid}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{v.department}</td>
                    <td className="py-3 px-4 max-w-xs truncate text-slate-600">{v.chiefComplaint}</td>
                    <td className="py-3 px-4 text-slate-700">{v.practitionerName}</td>
                    <td className="py-3 px-4 text-slate-500">{v.visitTime}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={v.queueStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedVisit(v)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                        title="View Full Case Encounter"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {v.queueStatus === 'Waiting' && (
                        <button
                          onClick={() => handleStartConsultation(v.id)}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px] transition-colors"
                        >
                          Start Call
                        </button>
                      )}

                      {v.queueStatus === 'In Consultation' && (
                        <button
                          onClick={() => openCompleteModal(v)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                        >
                          Complete
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

      {/* OPD Visit Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedVisit) && !isConsultModalOpen}
        onClose={() => setSelectedVisit(null)}
        title={`Token #${selectedVisit?.tokenNo} — ${selectedVisit?.patientName}`}
        subtitle={`UHID: ${selectedVisit?.uhid} · ${selectedVisit?.department}`}
        badge={selectedVisit ? <StatusBadge status={selectedVisit.queueStatus} size="sm" /> : undefined}
      >
        {selectedVisit && (
          <div className="space-y-6 text-xs">
            {/* Quick Actions */}
            <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-[#0B263A]">Action:</span>
              {selectedVisit.queueStatus === 'Waiting' && (
                <button
                  onClick={() => handleStartConsultation(selectedVisit.id)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Start Consultation
                </button>
              )}
              {selectedVisit.queueStatus === 'In Consultation' && (
                <button
                  onClick={() => openCompleteModal(selectedVisit)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Document & Complete Visit
                </button>
              )}
              {selectedVisit.queueStatus === 'Completed' && (
                <span className="text-emerald-700 font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Consultation record closed
                </span>
              )}
            </div>

            {/* Encounter Summary */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Encounter Details
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div>Consulting Vaidya: <strong>{selectedVisit.practitionerName}</strong></div>
                <div>Check-in Time: <strong>{selectedVisit.visitTime}</strong></div>
                <div>Patient Age/Gender: <strong>{selectedVisit.age} Y / {selectedVisit.gender}</strong></div>
                <div>Department: <strong>{selectedVisit.department}</strong></div>
              </div>
            </div>

            {/* Chief Complaint */}
            <div>
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-1">
                Chief Complaint & Roga Lakshana
              </h4>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-medium text-slate-800">
                {selectedVisit.chiefComplaint}
              </div>
            </div>

            {/* Illustrative Clinical Notes */}
            <div>
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-1">
                Vaidya Clinical Examination Notes (Illustrative)
              </h4>
              <div className="p-3 bg-white rounded-xl border border-slate-200 leading-relaxed text-slate-700 whitespace-pre-wrap">
                {selectedVisit.illustrativeNotes}
              </div>
            </div>

            {/* Prescribed Medicines */}
            {selectedVisit.prescribedMedicines && selectedVisit.prescribedMedicines.length > 0 && (
              <div>
                <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-1 flex items-center space-x-1.5">
                  <Pill className="w-4 h-4 text-emerald-600" />
                  <span>Prescribed Classical Medicines</span>
                </h4>
                <div className="space-y-1">
                  {selectedVisit.prescribedMedicines.map((med, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium">
                      {med}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
              <strong>Clinical Governance Disclaimer:</strong> Clinical notes and prescriptions are demonstration entries only. No automated diagnosis or clinical recommendations are generated by the software; all medical care decisions remain with authorized clinicians.
            </div>
          </div>
        )}
      </DetailsDrawer>

      {/* Complete Consultation Modal Form */}
      <Modal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        title="Complete Clinical Consultation"
        subtitle={`Token #${selectedVisit?.tokenNo} — ${selectedVisit?.patientName}`}
      >
        <form onSubmit={handleFinishConsultation} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Clinical Assessment & Rogi Pariksha Findings
            </label>
            <textarea
              required
              rows={3}
              value={consultNotes}
              onChange={(e) => setConsultNotes(e.target.value)}
              placeholder="e.g. Samyak deepana observed. Pulse indicates Vata-Pitta vitiation..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Prescribe Classical Formulation</label>
            <select
              value={prescribedMed}
              onChange={(e) => setPrescribedMed(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            >
              {pharmacyItems.slice(0, 10).map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name} ({item.category} - Batch: {item.batchNo})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsConsultModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
            >
              Finalize Consultation
            </button>
          </div>
        </form>
      </Modal>

      {/* Issue OPD Token Modal Form */}
      <Modal
        isOpen={isNewVisitOpen}
        onClose={() => setIsNewVisitOpen(false)}
        title="Issue OPD Token & Register Visit"
        subtitle="Queue patient for today's clinical consultation chamber."
      >
        <form onSubmit={handleNewVisitSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Registered Patient</label>
            <select
              value={newVisitData.uhid}
              onChange={(e) => {
                const pat = patients.find((p) => p.uhid === e.target.value);
                setNewVisitData({
                  ...newVisitData,
                  uhid: e.target.value,
                  patientName: pat?.name || '',
                  age: pat?.age || 45,
                  gender: pat?.gender || 'Male',
                });
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.uhid}>
                  {p.name} ({p.uhid} - {p.prakriti})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Department</label>
              <select
                value={newVisitData.department}
                onChange={(e) => setNewVisitData({ ...newVisitData, department: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Kaya Chikitsa (General Medicine)">Kaya Chikitsa</option>
                <option value="Panchakarma Special OPD">Panchakarma Special OPD</option>
                <option value="Prasuti & Stri Roga">Prasuti & Stri Roga</option>
                <option value="Shalya Tantra (Surgery)">Shalya Tantra</option>
                <option value="Swasthavritta & Lifestyle Clinic">Swasthavritta & Lifestyle</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Chamber Doctor</label>
              <input
                type="text"
                value={newVisitData.practitionerName}
                onChange={(e) => setNewVisitData({ ...newVisitData, practitionerName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Chief Complaint</label>
            <input
              type="text"
              required
              value={newVisitData.chiefComplaint}
              onChange={(e) => setNewVisitData({ ...newVisitData, chiefComplaint: e.target.value })}
              placeholder="e.g. Chronic Sandhivata with knee stiffness"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsNewVisitOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0D887E] hover:bg-[#0A7068] text-white rounded-lg font-bold"
            >
              Generate Queue Token
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
