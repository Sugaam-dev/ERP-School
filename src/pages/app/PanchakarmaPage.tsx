import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { PanchakarmaBooking } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  Sparkles,
  Search,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react';

export const PanchakarmaPage: React.FC = () => {
  const {
    panchakarmaBookings,
    bookPanchakarma,
    updatePanchakarmaStatus,
    patients,
  } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [therapyFilter, setTherapyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedBooking, setSelectedBooking] = useState<PanchakarmaBooking | null>(null);

  // Book Modal
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState<Partial<PanchakarmaBooking>>({
    patientId: patients[0]?.id || 'pat-1',
    patientName: patients[0]?.name || 'Rameshwar Lal Gupta',
    fictionalPatientRef: 'PT-ANON-7760',
    therapyType: 'Abhyanga & Swedana',
    therapistName: 'Therapist Somnath',
    roomNo: 'Therapy Suite 1 (Snana)',
    date: '2026-10-12',
    timeSlot: '09:30 AM - 10:45 AM',
    consumables: 'Dhanwantharam Taila 200ml, Dashamoola Kwatha for Swedana',
    charges: 1800,
  });

  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  const filteredBookings = panchakarmaBookings.filter((b) => {
    const matchSearch =
      b.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.therapistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.therapyType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTherapy = therapyFilter === 'All' || b.therapyType.includes(therapyFilter);
    const matchStatus = statusFilter === 'All' || b.sessionStatus === statusFilter;
    return matchSearch && matchTherapy && matchStatus;
  });

  const scheduledCount = panchakarmaBookings.filter((b) => b.sessionStatus === 'Scheduled').length;
  const inProgressCount = panchakarmaBookings.filter((b) => b.sessionStatus === 'In Progress').length;
  const completedCount = panchakarmaBookings.filter((b) => b.sessionStatus === 'Completed').length;
  const totalCharges = panchakarmaBookings.reduce((acc, b) => acc + b.charges, 0);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Conflict check: Check if same room & timeslot is already booked for date
    const conflict = panchakarmaBookings.find(
      (b) =>
        b.date === bookingFormData.date &&
        b.timeSlot === bookingFormData.timeSlot &&
        b.roomNo === bookingFormData.roomNo &&
        b.sessionStatus !== 'Cancelled'
    );

    if (conflict) {
      setConflictWarning(
        `Room Conflict: ${conflict.roomNo} is already booked for ${conflict.therapyType} (${conflict.patientName}) during ${conflict.timeSlot}.`
      );
      return;
    }

    setConflictWarning(null);
    bookPanchakarma(bookingFormData);
    setIsBookModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Panchakarma Center (Scheduling & Resource Allocation)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Abhyanga, Swedana, Shirodhara, and Basti therapy suite reservation, therapist roster, and consumables tracking.
          </p>
        </div>

        <button
          onClick={() => {
            setConflictWarning(null);
            setIsBookModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-sm flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Book Therapy Session</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Bookings</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{panchakarmaBookings.length}</h3>
          <p className="text-[11px] text-slate-400">Classical therapy plans</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheduled Today</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">{scheduledCount}</h3>
          <p className="text-[11px] text-slate-400">Reserved therapy slots</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Progress</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">{inProgressCount}</h3>
          <p className="text-[11px] text-slate-400">Therapy in chambers</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Sessions</p>
          <h3 className="text-2xl font-bold text-purple-600 mt-1">{completedCount}</h3>
          <p className="text-[11px] text-slate-400">₹{totalCharges.toLocaleString('en-IN')} revenue</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search patient, therapy type, therapist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Therapy:</span>
            <select
              value={therapyFilter}
              onChange={(e) => setTherapyFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Therapies</option>
              <option value="Abhyanga">Abhyanga & Swedana</option>
              <option value="Shirodhara">Shirodhara</option>
              <option value="Basti">Basti Procedures</option>
              <option value="Nasya">Nasya Karma</option>
              <option value="Virechana">Virechana Karma</option>
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
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Panchakarma Bookings Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Therapy Type</th>
                <th className="py-3 px-4">Room & Chamber</th>
                <th className="py-3 px-4">Assigned Therapist</th>
                <th className="py-3 px-4">Time Slot</th>
                <th className="py-3 px-4">Consent</th>
                <th className="py-3 px-4">Session Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No Panchakarma appointments match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{b.bookingCode}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0B263A]">{b.patientName}</p>
                      <span className="text-[10px] font-mono text-slate-400">{b.fictionalPatientRef}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-800">{b.therapyType}</td>
                    <td className="py-3 px-4 text-slate-700">{b.roomNo}</td>
                    <td className="py-3 px-4 text-slate-600 font-medium">{b.therapistName}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{b.timeSlot}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={b.consentStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={b.sessionStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                        title="View Consumables & Session Notes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {b.sessionStatus === 'Scheduled' && (
                        <button
                          onClick={() => updatePanchakarmaStatus(b.id, 'In Progress')}
                          className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px]"
                        >
                          Start
                        </button>
                      )}

                      {b.sessionStatus === 'In Progress' && (
                        <button
                          onClick={() => updatePanchakarmaStatus(b.id, 'Completed')}
                          className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
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

      {/* Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        title={selectedBooking?.therapyType || 'Panchakarma Session'}
        subtitle={`Booking: ${selectedBooking?.bookingCode} · Patient: ${selectedBooking?.patientName}`}
        badge={selectedBooking ? <StatusBadge status={selectedBooking.sessionStatus} size="sm" /> : undefined}
      >
        {selectedBooking && (
          <div className="space-y-6 text-xs">
            {/* Action Bar */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="font-bold text-[#0B263A]">Status: {selectedBooking.sessionStatus}</span>
              <div className="space-x-1.5">
                {selectedBooking.sessionStatus !== 'Completed' && (
                  <button
                    onClick={() => {
                      updatePanchakarmaStatus(selectedBooking.id, 'Completed');
                      setSelectedBooking({ ...selectedBooking, sessionStatus: 'Completed' });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    Mark Completed
                  </button>
                )}
                {selectedBooking.sessionStatus !== 'Cancelled' && (
                  <button
                    onClick={() => {
                      updatePanchakarmaStatus(selectedBooking.id, 'Cancelled');
                      setSelectedBooking({ ...selectedBooking, sessionStatus: 'Cancelled' });
                    }}
                    className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold"
                  >
                    Cancel Slot
                  </button>
                )}
              </div>
            </div>

            {/* Session Parameters */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2 text-slate-700">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Session Scheduling Details
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Date & Slot: <strong>{selectedBooking.date} ({selectedBooking.timeSlot})</strong></div>
                <div>Allocated Room: <strong>{selectedBooking.roomNo}</strong></div>
                <div>Therapist In-Charge: <strong>{selectedBooking.therapistName}</strong></div>
                <div>Tariff Charges: <strong>₹{selectedBooking.charges.toLocaleString('en-IN')}</strong></div>
                <div>Informed Consent: <strong>{selectedBooking.consentStatus}</strong></div>
                <div>Clinical Review: <strong>{selectedBooking.clinicalReviewStatus}</strong></div>
              </div>
            </div>

            {/* Consumables Used */}
            <div>
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-1">
                Herbal Oils & Therapy Consumables Used
              </h4>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-semibold text-slate-800">
                {selectedBooking.consumables}
              </div>
            </div>

            {/* Notes */}
            {selectedBooking.notes && (
              <div>
                <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-1">
                  Vaidya Pre-Procedure Special Instructions
                </h4>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 italic">
                  "{selectedBooking.notes}"
                </div>
              </div>
            )}
          </div>
        )}
      </DetailsDrawer>

      {/* Book Therapy Session Modal */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Schedule Panchakarma Therapy Booking"
        subtitle="Reserve therapy suite, assign therapist, and configure consumable items."
      >
        <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
          {conflictWarning && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{conflictWarning}</span>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Patient</label>
            <select
              value={bookingFormData.patientId}
              onChange={(e) => {
                const pat = patients.find((p) => p.id === e.target.value);
                setBookingFormData({
                  ...bookingFormData,
                  patientId: e.target.value,
                  patientName: pat?.name || '',
                });
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.uhid} - {p.prakriti})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Therapy Procedure</label>
              <select
                value={bookingFormData.therapyType}
                onChange={(e) => setBookingFormData({ ...bookingFormData, therapyType: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Abhyanga & Swedana">Abhyanga & Swedana</option>
                <option value="Shirodhara">Shirodhara</option>
                <option value="Janu Basti">Janu Basti</option>
                <option value="Kati Basti">Kati Basti</option>
                <option value="Nasya Karma">Nasya Karma</option>
                <option value="Virechana Karma">Virechana Karma</option>
                <option value="Takradhara">Takradhara</option>
                <option value="Matra Basti">Matra Basti</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Therapy Chamber</label>
              <select
                value={bookingFormData.roomNo}
                onChange={(e) => setBookingFormData({ ...bookingFormData, roomNo: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Therapy Suite 1 (Snana)">Therapy Suite 1 (Snana)</option>
                <option value="Therapy Suite 2 (Dhara)">Therapy Suite 2 (Dhara)</option>
                <option value="Therapy Suite 3 (Shirodhara)">Therapy Suite 3 (Shirodhara)</option>
                <option value="Basti Room 4">Basti Room 4</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                required
                value={bookingFormData.date}
                onChange={(e) => setBookingFormData({ ...bookingFormData, date: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Time Slot</label>
              <select
                value={bookingFormData.timeSlot}
                onChange={(e) => setBookingFormData({ ...bookingFormData, timeSlot: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="08:30 AM - 09:45 AM">08:30 AM - 09:45 AM</option>
                <option value="09:30 AM - 10:45 AM">09:30 AM - 10:45 AM</option>
                <option value="10:00 AM - 11:15 AM">10:00 AM - 11:15 AM</option>
                <option value="11:30 AM - 12:45 PM">11:30 AM - 12:45 PM</option>
                <option value="02:00 PM - 03:15 PM">02:00 PM - 03:15 PM</option>
                <option value="03:30 PM - 04:45 PM">03:30 PM - 04:45 PM</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Assigned Therapist</label>
              <select
                value={bookingFormData.therapistName}
                onChange={(e) => setBookingFormData({ ...bookingFormData, therapistName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Therapist Somnath">Therapist Somnath</option>
                <option value="Therapist Gayatri">Therapist Gayatri</option>
                <option value="Therapist Rajesh">Therapist Rajesh</option>
                <option value="Therapist Ramesh">Therapist Ramesh</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Session Tariff (₹)</label>
              <input
                type="number"
                required
                value={bookingFormData.charges}
                onChange={(e) => setBookingFormData({ ...bookingFormData, charges: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Consumables Required</label>
            <input
              type="text"
              value={bookingFormData.consumables}
              onChange={(e) => setBookingFormData({ ...bookingFormData, consumables: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsBookModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0D887E] hover:bg-[#0A7068] text-white rounded-lg font-bold"
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
