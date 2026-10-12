import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Patient } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import { Modal } from '../../components/common/Modal';
import {
  HeartPulse,
  Search,
  Plus,
  Eye,
  Calendar,
  Phone,
  MapPin,
  Activity,
  UserCheck,
} from 'lucide-react';

export const PatientsPage: React.FC = () => {
  const { patients, addPatient, opdVisits, panchakarmaBookings } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [prakritiFilter, setPrakritiFilter] = useState('All');

  // Selected patient for drawer
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // New Patient Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: 45,
    gender: 'Male' as Patient['gender'],
    contact: '+91 99000 00000',
    address: 'Near Old Bus Stand, Kota',
    bloodGroup: 'B+',
    prakriti: 'Vata-Pitta' as Patient['prakriti'],
  });

  const filteredPatients = patients.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.uhid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contact.includes(searchTerm);
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchPrakriti = prakritiFilter === 'All' || p.prakriti === prakritiFilter;
    return matchSearch && matchStatus && matchPrakriti;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addPatient(formData);
    setIsAddModalOpen(false);
    setSelectedPatient(created);
    setFormData({
      name: '',
      age: 45,
      gender: 'Male',
      contact: '+91 99000 00000',
      address: 'Near Old Bus Stand, Kota',
      bloodGroup: 'B+',
      prakriti: 'Vata-Pitta',
    });
  };

  // Associated encounters for selected patient
  const patientOpdHistory = selectedPatient
    ? opdVisits.filter((v) => v.uhid === selectedPatient.uhid)
    : [];

  const patientPkHistory = selectedPatient
    ? panchakarmaBookings.filter((b) => b.patientId === selectedPatient.id)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <HeartPulse className="w-5 h-5 text-rose-500" />
            <span>Hospital Patient Registry & Demographics</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Centrally issued Unique Hospital Identification (UHID), Prakriti profiling, and encounter logs.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-sm flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Patient Registration</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Patients</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{patients.length}</h3>
          <p className="text-[11px] text-slate-400">Unique hospital records</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Hospital Cases</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {patients.filter((p) => p.status === 'Active').length}
          </h3>
          <p className="text-[11px] text-slate-400">Current care episodes</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheduled Follow-ups</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">
            {patients.filter((p) => p.status === 'Follow-up').length}
          </h3>
          <p className="text-[11px] text-slate-400">Review appointments</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prakriti Profiled</p>
          <h3 className="text-2xl font-bold text-[#0D887E] mt-1">100%</h3>
          <p className="text-[11px] text-slate-400">Constitutional analysis logged</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search patient name, UHID, mobile..."
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
              <option value="Active">Active</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Discharged">Discharged</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Prakriti:</span>
            <select
              value={prakritiFilter}
              onChange={(e) => setPrakritiFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Constitutions</option>
              <option value="Vata-Pitta">Vata-Pitta</option>
              <option value="Pitta-Kapha">Pitta-Kapha</option>
              <option value="Vata-Kapha">Vata-Kapha</option>
              <option value="Tridoshic">Tridoshic</option>
              <option value="Pitta Dominant">Pitta Dominant</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">UHID Number</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Age / Gender</th>
                <th className="py-3 px-4">Ayurvedic Prakriti</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Last Visit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">View History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No patient records matched search parameters.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#0D887E]">{p.uhid}</td>
                    <td className="py-3 px-4 font-bold text-[#0B263A]">{p.name}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {p.age} Yrs / {p.gender}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#0D887E] border border-teal-200 font-bold text-[10px]">
                        {p.prakriti}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{p.contact}</td>
                    <td className="py-3 px-4 text-slate-500">{p.lastVisitDate}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={p.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedPatient(p)}
                        className="px-2.5 py-1 rounded-lg bg-teal-50 text-[#0D887E] hover:bg-[#0D887E] hover:text-white transition-colors font-bold text-xs"
                      >
                        Encounter History →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Details & Clinical Encounters Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
        title={selectedPatient?.name || 'Patient Chart'}
        subtitle={`UHID: ${selectedPatient?.uhid} · Prakriti: ${selectedPatient?.prakriti}`}
        badge={selectedPatient ? <StatusBadge status={selectedPatient.status} size="sm" /> : undefined}
      >
        {selectedPatient && (
          <div className="space-y-6 text-xs">
            {/* Demographics Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Patient Demographics & Constitution
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>Age / Gender: <strong className="text-slate-800">{selectedPatient.age} Y / {selectedPatient.gender}</strong></div>
                <div>Blood Group: <strong className="text-slate-800">{selectedPatient.bloodGroup}</strong></div>
                <div>Registered: <strong className="text-slate-800">{selectedPatient.registrationDate}</strong></div>
                <div>Total Lifetime Encounters: <strong className="text-slate-800">{selectedPatient.totalVisits}</strong></div>
                <div className="col-span-2">Contact: <strong className="text-slate-800">{selectedPatient.contact}</strong></div>
                <div className="col-span-2">Residential: <strong className="text-slate-800">{selectedPatient.address}</strong></div>
              </div>
            </div>

            {/* OPD Encounters Linked */}
            <div>
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-2 flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-[#0D887E]" />
                <span>OPD Consultations ({patientOpdHistory.length})</span>
              </h4>
              {patientOpdHistory.length === 0 ? (
                <p className="text-slate-400 p-3 bg-slate-50 rounded-xl text-center">
                  No active OPD queues for this patient.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {patientOpdHistory.map((v) => (
                    <div key={v.id} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0B263A]">Token #{v.tokenNo} · {v.department}</span>
                        <StatusBadge status={v.queueStatus} size="sm" />
                      </div>
                      <p className="text-[11px] text-slate-600">
                        <strong>Chief Complaint:</strong> {v.chiefComplaint}
                      </p>
                      <p className="text-[11px] text-slate-500 italic">
                        <strong>Vaidya Notes:</strong> {v.illustrativeNotes}
                      </p>
                      {v.prescribedMedicines && v.prescribedMedicines.length > 0 && (
                        <div className="pt-1 text-[10px] text-teal-800">
                          Prescribed: {v.prescribedMedicines.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Panchakarma Procedures Linked */}
            <div>
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-2">
                Panchakarma Therapies ({patientPkHistory.length})
              </h4>
              {patientPkHistory.length === 0 ? (
                <p className="text-slate-400 p-3 bg-slate-50 rounded-xl text-center">
                  No Panchakarma bookings recorded for this patient.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {patientPkHistory.map((pk) => (
                    <div key={pk.id} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-700">{pk.therapyType}</span>
                        <StatusBadge status={pk.sessionStatus} size="sm" />
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Date: {pk.date} ({pk.timeSlot}) · Therapist: {pk.therapistName}
                      </p>
                      <p className="text-[10px] text-slate-400">Consumables: {pk.consumables}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </DetailsDrawer>

      {/* New Patient Registration Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register Hospital Patient"
        subtitle="Issue system-generated UHID and record baseline constitution."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Patient Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Surendra Mohan Sharma"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Age</label>
              <input
                type="number"
                required
                min={1}
                max={120}
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="AB+">AB+</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Ayurvedic Prakriti</label>
              <select
                value={formData.prakriti}
                onChange={(e) => setFormData({ ...formData, prakriti: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Vata-Pitta">Vata-Pitta</option>
                <option value="Pitta-Kapha">Pitta-Kapha</option>
                <option value="Vata-Kapha">Vata-Kapha</option>
                <option value="Tridoshic">Tridoshic</option>
                <option value="Pitta Dominant">Pitta Dominant</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Residential Address</label>
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
              Generate UHID & Register
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
