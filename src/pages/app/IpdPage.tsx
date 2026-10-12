import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { IpdAdmission } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  BedDouble,
  Search,
  Plus,
  Eye,
  CheckCircle2,
  Calendar,
  Building2,
  FileText,
  UserCheck,
  Stethoscope,
  Clock,
  Printer,
} from 'lucide-react';

export const IpdPage: React.FC = () => {
  const { ipdAdmissions, dischargeIpd, admitIpd, patients, showToast } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [wardFilter, setWardFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedAdm, setSelectedAdm] = useState<IpdAdmission | null>(null);

  // Admit Modal
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
  const [newAdmitData, setNewAdmitData] = useState({
    uhid: 'AY-HOSP-26-0103',
    patientName: 'Dilip Kumar Verma',
    department: 'Kaya Chikitsa',
    doctorInCharge: 'Prof. (Dr.) Vasant Vaidya',
    ward: 'Male Ward' as IpdAdmission['ward'],
    bedNo: 'M-BED-10',
    primaryDiagnosis: 'Amlapitta with Chronic Gastritis',
    dailyRoundsNote: 'Admission vitals logged. Vata-Pitta Shamana diet initiated.',
  });

  // Discharge Modal
  const [isDischargeModalOpen, setIsDischargeModalOpen] = useState(false);
  const [dischargeSummaryText, setDischargeSummaryText] = useState('');

  const filteredAdmissions = ipdAdmissions.filter((adm) => {
    const matchSearch =
      adm.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adm.ipdNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adm.bedNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchWard = wardFilter === 'All' || adm.ward === wardFilter;
    const matchStatus = statusFilter === 'All' || adm.admissionStatus === statusFilter;
    return matchSearch && matchWard && matchStatus;
  });

  const occupiedBedsCount = ipdAdmissions.filter((a) => a.admissionStatus === 'Admitted').length;
  const totalHospitalBeds = 8; // POC ward capacity
  const availableBeds = Math.max(0, totalHospitalBeds - occupiedBedsCount);

  const openDischargeModal = (adm: IpdAdmission) => {
    setSelectedAdm(adm);
    setDischargeSummaryText(
      `Patient ${adm.patientName} admitted on ${adm.admissionDate} for ${adm.primaryDiagnosis}. Completed regulated clinical and Ayurvedic regimen under ${adm.doctorInCharge}. Patient afebrile, vitals stable, and ambulatory. Advised oral classical medications and follow-up after 14 days in OPD.`
    );
    setIsDischargeModalOpen(true);
  };

  const handleDischargeConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAdm) {
      dischargeIpd(selectedAdm.id, dischargeSummaryText);
      setIsDischargeModalOpen(false);
      setSelectedAdm(null);
    }
  };

  const handleAdmitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    admitIpd(newAdmitData);
    setIsAdmitModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <BedDouble className="w-5 h-5 text-[#0D887E]" />
            <span>Inpatient Department (IPD Wards & Bed Management)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ward allocations, inpatient clinical rounds, daily Vaidya monitoring, and discharge summaries.
          </p>
        </div>

        <button
          onClick={() => setIsAdmitModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-sm flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Bed Admission</span>
        </button>
      </div>

      {/* Bed Occupancy Capacity Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Ward Beds</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{totalHospitalBeds} Beds</h3>
          <p className="text-[11px] text-slate-400">PMRG hospital block</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Occupied Beds</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">{occupiedBedsCount}</h3>
          <p className="text-[11px] text-slate-400">87.5% occupancy today</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available Beds</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">{availableBeds}</h3>
          <p className="text-[11px] text-slate-400">Ready for admission</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Discharges Today</p>
          <h3 className="text-2xl font-bold text-purple-600 mt-1">
            {ipdAdmissions.filter((a) => a.admissionStatus === 'Discharged').length}
          </h3>
          <p className="text-[11px] text-slate-400">Completed care</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search patient, bed number, IPD..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Ward:</span>
            <select
              value={wardFilter}
              onChange={(e) => setWardFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Wards</option>
              <option value="Male Ward">Male Ward</option>
              <option value="Female Ward">Female Ward</option>
              <option value="Panchakarma Cottage">Panchakarma Cottage</option>
              <option value="Special Suite">Special Suite</option>
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
              <option value="Admitted">Admitted</option>
              <option value="Discharge Planned">Discharge Planned</option>
              <option value="Discharged">Discharged</option>
            </select>
          </div>
        </div>
      </div>

      {/* IPD Admissions Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Bed & Ward</th>
                <th className="py-3 px-4">IPD Register #</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Primary Diagnosis</th>
                <th className="py-3 px-4">Doctor In-Charge</th>
                <th className="py-3 px-4">Admit Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Care Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAdmissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No inpatient admissions match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredAdmissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-[#0B263A] text-white font-mono font-bold text-xs">
                        {adm.bedNo}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">{adm.ward}</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{adm.ipdNo}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0B263A]">{adm.patientName}</p>
                      <span className="text-[10px] text-slate-400">{adm.uhid}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800 max-w-xs truncate">
                      {adm.primaryDiagnosis}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{adm.doctorInCharge}</td>
                    <td className="py-3 px-4 text-slate-500">{adm.admissionDate}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={adm.admissionStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedAdm(adm)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                        title="View Daily Clinical Rounds"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {adm.admissionStatus !== 'Discharged' && (
                        <button
                          onClick={() => openDischargeModal(adm)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] transition-colors"
                        >
                          Discharge
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

      {/* IPD Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedAdm) && !isDischargeModalOpen}
        onClose={() => setSelectedAdm(null)}
        title={`Bed ${selectedAdm?.bedNo} — ${selectedAdm?.patientName}`}
        subtitle={`IPD No: ${selectedAdm?.ipdNo} · Ward: ${selectedAdm?.ward}`}
        badge={selectedAdm ? <StatusBadge status={selectedAdm.admissionStatus} size="sm" /> : undefined}
      >
        {selectedAdm && (
          <div className="space-y-6 text-xs">
            {/* Quick Action Button */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0B263A]">Admission Status: {selectedAdm.admissionStatus}</span>
                <p className="text-[10px] text-slate-400">Doctor in Charge: {selectedAdm.doctorInCharge}</p>
              </div>
              {selectedAdm.admissionStatus !== 'Discharged' && (
                <button
                  onClick={() => openDischargeModal(selectedAdm)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Generate Discharge Summary
                </button>
              )}
            </div>

            {/* Admission Snapshot */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2 text-slate-700">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Admission Parameters
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Admitted On: <strong>{selectedAdm.admissionDate}</strong></div>
                <div>Expected Discharge: <strong>{selectedAdm.expectedDischargeDate}</strong></div>
                <div>Allocated Bed: <strong>{selectedAdm.bedNo}</strong></div>
                <div>Department Ward: <strong>{selectedAdm.ward}</strong></div>
              </div>
            </div>

            {/* Diagnosis */}
            <div>
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-1">
                Primary Ayurvedic Diagnosis
              </h4>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-semibold text-slate-800">
                {selectedAdm.primaryDiagnosis}
              </div>
            </div>

            {/* Daily Rounds Note */}
            <div>
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-1">
                Vaidya Daily Ward Rounds Note
              </h4>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedAdm.dailyRoundsNote}
              </div>
            </div>

            {/* Discharge Summary if available */}
            {selectedAdm.dischargeSummary && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[11px] block">
                  Official Discharge Summary Preview
                </span>
                <p className="text-xs leading-relaxed">{selectedAdm.dischargeSummary}</p>
              </div>
            )}
          </div>
        )}
      </DetailsDrawer>

      {/* Discharge Simulation Modal Form */}
      <Modal
        isOpen={isDischargeModalOpen}
        onClose={() => setIsDischargeModalOpen(false)}
        title="Process Patient Discharge"
        subtitle={`Generate formal discharge summary for ${selectedAdm?.patientName} (Bed ${selectedAdm?.bedNo})`}
      >
        <form onSubmit={handleDischargeConfirm} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Discharge Summary & Home Regimen (Pathya / Apathya)
            </label>
            <textarea
              required
              rows={5}
              value={dischargeSummaryText}
              onChange={(e) => setDischargeSummaryText(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E] leading-relaxed"
            />
          </div>

          <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-[11px]">
            Confirming discharge will mark Bed {selectedAdm?.bedNo} as vacant in the ward register and finalize the patient encounter ledger.
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsDischargeModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
            >
              Complete Discharge
            </button>
          </div>
        </form>
      </Modal>

      {/* New Bed Admission Modal Form */}
      <Modal
        isOpen={isAdmitModalOpen}
        onClose={() => setIsAdmitModalOpen(false)}
        title="Admit Inpatient to Ward"
        subtitle="Allocate available bed and assign responsible clinician."
      >
        <form onSubmit={handleAdmitSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Registered Patient</label>
            <select
              value={newAdmitData.uhid}
              onChange={(e) => {
                const p = patients.find((pat) => pat.uhid === e.target.value);
                setNewAdmitData({
                  ...newAdmitData,
                  uhid: e.target.value,
                  patientName: p?.name || '',
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
              <label className="block font-bold text-slate-700 mb-1">Select Ward</label>
              <select
                value={newAdmitData.ward}
                onChange={(e) => setNewAdmitData({ ...newAdmitData, ward: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Male Ward">Male Ward</option>
                <option value="Female Ward">Female Ward</option>
                <option value="Panchakarma Cottage">Panchakarma Cottage</option>
                <option value="Special Suite">Special Suite</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Bed Number Tag</label>
              <input
                type="text"
                required
                value={newAdmitData.bedNo}
                onChange={(e) => setNewAdmitData({ ...newAdmitData, bedNo: e.target.value })}
                placeholder="e.g. M-BED-10"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Primary Diagnosis</label>
            <input
              type="text"
              required
              value={newAdmitData.primaryDiagnosis}
              onChange={(e) => setNewAdmitData({ ...newAdmitData, primaryDiagnosis: e.target.value })}
              placeholder="e.g. Severe Amavata with Polyarthritis"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Admission Clinical Notes</label>
            <textarea
              rows={2}
              value={newAdmitData.dailyRoundsNote}
              onChange={(e) => setNewAdmitData({ ...newAdmitData, dailyRoundsNote: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAdmitModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0D887E] hover:bg-[#0A7068] text-white rounded-lg font-bold"
            >
              Allocate Bed & Admit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
