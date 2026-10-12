import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { CampusServiceRequest } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  Home,
  Search,
  Plus,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  Bus,
  Utensils,
  Shield,
  Wrench,
} from 'lucide-react';

export const CampusServicesPage: React.FC = () => {
  const { campusServices, updateCampusTicketStatus, addCampusTicket, currentUser } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedTicket, setSelectedTicket] = useState<CampusServiceRequest | null>(null);

  // Resolution Modal
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState('');

  // Add Ticket Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [ticketFormData, setTicketFormData] = useState<Partial<CampusServiceRequest>>({
    category: 'Hostel Room Maintenance',
    requesterName: currentUser.name,
    requesterRole: 'Student',
    priority: 'Medium',
    assignedDepartment: 'Hostel Maintenance Wing',
    description: '',
  });

  const filteredTickets = campusServices.filter((t) => {
    const matchSearch =
      t.ticketNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'All' || t.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const openTicketsCount = campusServices.filter((t) => t.status === 'Open').length;
  const inProgressCount = campusServices.filter((t) => t.status === 'In Progress').length;
  const resolvedCount = campusServices.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicket) {
      updateCampusTicketStatus(selectedTicket.id, 'Resolved', resolutionNotes);
      setIsResolveModalOpen(false);
      setSelectedTicket(null);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCampusTicket(ticketFormData);
    setIsAddModalOpen(false);
    setTicketFormData({
      category: 'Hostel Room Maintenance',
      requesterName: currentUser.name,
      requesterRole: 'Student',
      priority: 'Medium',
      assignedDepartment: 'Hostel Maintenance Wing',
      description: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <Home className="w-5 h-5 text-[#0D887E]" />
            <span>Campus Services (Hostel, Mess, Transport & Grievances)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Student hostel facilities, Ayurvedic mess nutrition, campus bus routes, and institutional grievance cell.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-sm flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log Service Ticket</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tickets</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{campusServices.length}</h3>
          <p className="text-[11px] text-slate-400">Term 2026-27 requests</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Open Pending</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">{openTicketsCount}</h3>
          <p className="text-[11px] text-rose-500">Awaiting department dispatch</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Progress</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">{inProgressCount}</h3>
          <p className="text-[11px] text-amber-700">Technicians assigned</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resolved Tickets</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">{resolvedCount}</h3>
          <p className="text-[11px] text-slate-400">Satisfactory completion</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search ticket ID, requester, issue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Hostel Room Maintenance">Hostel</option>
              <option value="Mess & Food Quality">Mess & Food</option>
              <option value="Student Transport Route">Transport</option>
              <option value="Campus Security">Security</option>
              <option value="Student Grievance Cell">Grievances</option>
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
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Ticket #</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Requester</th>
                <th className="py-3 px-4">Issue Description</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Assigned Unit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{t.ticketNo}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{t.category}</td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-[#0B263A]">{t.requesterName}</p>
                    <span className="text-[10px] text-slate-400">{t.requesterRole}</span>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-600">{t.description}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.priority === 'Urgent'
                          ? 'bg-rose-100 text-rose-700'
                          : t.priority === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{t.assignedDepartment}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={t.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <button
                      onClick={() => setSelectedTicket(t)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                      title="Inspect Ticket Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {t.status !== 'Resolved' && t.status !== 'Closed' && (
                      <button
                        onClick={() => {
                          setSelectedTicket(t);
                          setResolutionNotes(t.resolutionNotes || '');
                          setIsResolveModalOpen(true);
                        }}
                        className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[10px]"
                      >
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedTicket) && !isResolveModalOpen}
        onClose={() => setSelectedTicket(null)}
        title={selectedTicket?.ticketNo || 'Service Request'}
        subtitle={`Category: ${selectedTicket?.category} · Requester: ${selectedTicket?.requesterName}`}
        badge={selectedTicket ? <StatusBadge status={selectedTicket.status} size="sm" /> : undefined}
      >
        {selectedTicket && (
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2 text-slate-700">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Service Request Metadata
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Logged Date: <strong>{selectedTicket.dateLogged}</strong></div>
                <div>Urgency Priority: <strong>{selectedTicket.priority}</strong></div>
                <div>Assigned Unit: <strong>{selectedTicket.assignedDepartment}</strong></div>
                <div>Requester Role: <strong>{selectedTicket.requesterRole}</strong></div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-1">
                Issue Description
              </h4>
              <div className="p-4 bg-white rounded-xl border border-slate-200 leading-relaxed text-slate-800">
                {selectedTicket.description}
              </div>
            </div>

            {selectedTicket.resolutionNotes && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <span className="font-bold block text-[11px]">Department Resolution Notes:</span>
                <p className="text-xs leading-relaxed">{selectedTicket.resolutionNotes}</p>
              </div>
            )}
          </div>
        )}
      </DetailsDrawer>

      {/* Resolve Ticket Modal Form */}
      <Modal
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
        title="Resolve Campus Service Ticket"
        subtitle={`Ticket: ${selectedTicket?.ticketNo} (${selectedTicket?.category})`}
      >
        <form onSubmit={handleResolveSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Resolution Summary</label>
            <textarea
              required
              rows={4}
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="e.g. Electrician visited room H-104; repaired ceiling fan regulator..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsResolveModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
            >
              Confirm Resolution
            </button>
          </div>
        </form>
      </Modal>

      {/* Log New Ticket Modal Form */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log Campus Service Ticket"
        subtitle="Submit request to Hostel, Mess, Transport, or Grievance committee."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Service Category</label>
              <select
                value={ticketFormData.category}
                onChange={(e) => setTicketFormData({ ...ticketFormData, category: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Hostel Room Maintenance">Hostel Room Maintenance</option>
                <option value="Mess & Food Quality">Mess & Food Quality</option>
                <option value="Student Transport Route">Student Transport Route</option>
                <option value="Campus Security">Campus Security</option>
                <option value="Student Grievance Cell">Student Grievance Cell</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Priority</label>
              <select
                value={ticketFormData.priority}
                onChange={(e) => setTicketFormData({ ...ticketFormData, priority: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Issue Description</label>
            <textarea
              required
              rows={3}
              value={ticketFormData.description}
              onChange={(e) => setTicketFormData({ ...ticketFormData, description: e.target.value })}
              placeholder="Describe maintenance requirement or grievance in detail..."
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
              Log Ticket
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
