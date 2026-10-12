import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { TimetableEntry } from '../../types';
import { Modal } from '../../components/common/Modal';
import {
  GraduationCap,
  Calendar,
  Clock,
  Plus,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Users,
  Filter,
} from 'lucide-react';

export const AcademicsPage: React.FC = () => {
  const { timetable, addTimetableEntry, faculty } = useDemo();

  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedBatch, setSelectedBatch] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [formEntry, setFormEntry] = useState<Partial<TimetableEntry>>({
    day: 'Monday',
    timeSlot: '09:00 - 10:00 AM',
    subject: 'Charaka Samhita',
    facultyId: 'fac-1',
    facultyName: 'Prof. (Dr.) Vasant Vaidya',
    batch: '2023-28',
    semester: '2nd Prof',
    room: 'Lecture Hall 1 (Dhanvantari)',
    type: 'Theory',
  });

  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // Filter timetable
  const dayFiltered = timetable.filter((t) => {
    const matchDay = t.day === selectedDay;
    const matchBatch = selectedBatch === 'All' || t.batch === selectedBatch;
    return matchDay && matchBatch;
  });

  const checkConflictAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if room or faculty already booked in same timeslot on same day
    const conflict = timetable.find(
      (t) =>
        t.day === formEntry.day &&
        t.timeSlot === formEntry.timeSlot &&
        (t.room === formEntry.room || t.facultyName === formEntry.facultyName)
    );

    if (conflict) {
      setConflictWarning(
        `Schedule Conflict: ${conflict.room} or ${conflict.facultyName} is already assigned to "${conflict.subject}" at ${conflict.timeSlot} on ${conflict.day}.`
      );
      return;
    }

    setConflictWarning(null);
    addTimetableEntry(formEntry);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-[#0D887E]" />
            <span>Academics & Master Timetable</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Weekly lecture schedules, hospital ward postings, practical labs, and classroom conflict checking.
          </p>
        </div>

        <button
          onClick={() => {
            setConflictWarning(null);
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-sm flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Class</span>
        </button>
      </div>

      {/* Program Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-[#0D887E] uppercase">Undergraduate Program</span>
          <h3 className="text-base font-bold text-[#0B263A] mt-1">BAMS (Bachelor of Ayurvedic Medicine & Surgery)</h3>
          <p className="text-xs text-slate-500 mt-1">4.5 Years + 1 Year Mandatory Rotary Internship (NCISM Norms)</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-blue-600 uppercase">Postgraduate Programs</span>
          <h3 className="text-base font-bold text-[#0B263A] mt-1">MD / MS Ayurveda (3 Specializations)</h3>
          <p className="text-xs text-slate-500 mt-1">Kaya Chikitsa, Panchakarma, and Shalya Tantra (Surgical)</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-purple-600 uppercase">Paramedical & Diplomas</span>
          <h3 className="text-base font-bold text-[#0B263A] mt-1">Diploma in Panchakarma Therapy & Nursing</h3>
          <p className="text-xs text-slate-500 mt-1">1-Year Institutional Clinical Technical Certificate</p>
        </div>
      </div>

      {/* Timetable Controls: Days of Week + Batch Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Day Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedDay === day
                  ? 'bg-[#0B263A] text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Batch Filter */}
        <div className="flex items-center space-x-2 text-xs w-full md:w-auto justify-end">
          <span className="text-slate-400 font-medium">Filter Batch:</span>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B263A] font-semibold focus:outline-none"
          >
            <option value="All">All Batches</option>
            <option value="2023-28">2023-28 (2nd Prof)</option>
            <option value="2022-27">2022-27 (3rd Prof)</option>
            <option value="2021-26">2021-26 (Final Prof)</option>
          </select>
        </div>
      </div>

      {/* Timetable Slots Table / Grid */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#0D887E]" />
            <h3 className="font-bold text-sm text-[#0B263A]">
              Master Schedule for {selectedDay}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {dayFiltered.length} Sessions Scheduled
          </span>
        </div>

        {dayFiltered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No classes scheduled for {selectedDay} with the selected batch filter. Click "Schedule Class" to add one.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {dayFiltered.map((slot) => {
              let typeBadge = 'bg-blue-50 text-blue-700 border-blue-200';
              if (slot.type === 'Practical / Lab') typeBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
              if (slot.type === 'Hospital Ward Round') typeBadge = 'bg-purple-50 text-purple-700 border-purple-200';

              return (
                <div
                  key={slot.id}
                  className="p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-mono font-bold whitespace-nowrap">
                      {slot.timeSlot}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-[#0B263A] text-sm">{slot.subject}</h4>
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${typeBadge}`}>
                          {slot.type}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Faculty: <strong className="text-slate-700">{slot.facultyName}</strong> · Room: <strong className="text-slate-700">{slot.room}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-auto">
                    <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
                      Batch {slot.batch} ({slot.semester})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Class / Timetable Modal with Conflict Check */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule Class Session"
        subtitle="Allocate faculty, batch, room, and timeslot with conflict verification."
      >
        <form onSubmit={checkConflictAndAdd} className="space-y-4 text-xs">
          {conflictWarning && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{conflictWarning}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Day of Week</label>
              <select
                value={formEntry.day}
                onChange={(e) => setFormEntry({ ...formEntry, day: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Time Slot</label>
              <select
                value={formEntry.timeSlot}
                onChange={(e) => setFormEntry({ ...formEntry, timeSlot: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="09:00 - 10:00 AM">09:00 - 10:00 AM</option>
                <option value="10:00 - 11:00 AM">10:00 - 11:00 AM</option>
                <option value="11:15 - 01:15 PM">11:15 - 01:15 PM (Practical)</option>
                <option value="02:00 - 03:00 PM">02:00 - 03:00 PM</option>
                <option value="03:00 - 04:30 PM">03:00 - 04:30 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Subject Title</label>
            <input
              type="text"
              required
              value={formEntry.subject}
              onChange={(e) => setFormEntry({ ...formEntry, subject: e.target.value })}
              placeholder="e.g. Dravyaguna Vijnana Theory"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Assign Faculty</label>
              <select
                value={formEntry.facultyName}
                onChange={(e) => setFormEntry({ ...formEntry, facultyName: e.target.value })}
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
              <label className="block font-bold text-slate-700 mb-1">Class Type</label>
              <select
                value={formEntry.type}
                onChange={(e) => setFormEntry({ ...formEntry, type: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Theory">Theory</option>
                <option value="Practical / Lab">Practical / Lab</option>
                <option value="Hospital Ward Round">Hospital Ward Round</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Batch</label>
              <select
                value={formEntry.batch}
                onChange={(e) => setFormEntry({ ...formEntry, batch: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="2023-28">2023-28 (2nd Prof)</option>
                <option value="2022-27">2022-27 (3rd Prof)</option>
                <option value="2021-26">2021-26 (Final Prof)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Room / Venue</label>
              <select
                value={formEntry.room}
                onChange={(e) => setFormEntry({ ...formEntry, room: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Lecture Hall 1 (Dhanvantari)">Lecture Hall 1 (Dhanvantari)</option>
                <option value="Lecture Hall 2 (Sushruta)">Lecture Hall 2 (Sushruta)</option>
                <option value="Rasa Shastra Lab">Rasa Shastra Lab</option>
                <option value="Dravyaguna Herbarium">Dravyaguna Herbarium</option>
                <option value="Hospital Male / Female Wards">Hospital Wards</option>
              </select>
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
              Confirm Session
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
