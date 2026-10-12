import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ProcurementRequest } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  ShoppingCart,
  Search,
  Plus,
  Eye,
  CheckCircle2,
  XCircle,
  Truck,
  Building2,
  FileText,
  Boxes,
} from 'lucide-react';

export const ProcurementPage: React.FC = () => {
  const { procurement, updateProcurementStatus, addProcurementRequest, showToast } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPr, setSelectedPr] = useState<ProcurementRequest | null>(null);

  // New PR Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [prFormData, setPrFormData] = useState({
    department: 'Hospital Administration',
    requestedBy: 'Dr. Sunita Deshmukh',
    itemDescription: '',
    category: 'Medical Supplies & Linen' as ProcurementRequest['category'],
    estimatedAmount: 35000,
    supplierAssigned: 'SurgiMed Healthcare Supplies',
  });

  const filteredPrs = procurement.filter((pr) => {
    const matchSearch =
      pr.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pr.prNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pr.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || pr.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalValue = procurement.reduce((acc, p) => acc + p.estimatedAmount, 0);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProcurementRequest(prFormData);
    setIsAddModalOpen(false);
    setPrFormData({
      department: 'Hospital Administration',
      requestedBy: 'Dr. Sunita Deshmukh',
      itemDescription: '',
      category: 'Medical Supplies & Linen',
      estimatedAmount: 35000,
      supplierAssigned: 'SurgiMed Healthcare Supplies',
    });
  };

  const handleGoodsReceived = (id: string) => {
    updateProcurementStatus(id, 'Goods Received');
    showToast(`Goods Receipt Note (GRN) created for ${id}. Stock inward recorded in warehouse.`, 'success');
    if (selectedPr?.id === id) {
      setSelectedPr({ ...selectedPr, status: 'Goods Received' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-[#0D887E]" />
            <span>Procurement & Material Stores</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Requisitions for classical raw herbs, OT supplies, lab equipment, and purchase order approvals.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-sm flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Purchase Requisition</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Requisitions</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{procurement.length}</h3>
          <p className="text-[11px] text-slate-400">All departments</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Committed Value</p>
          <h3 className="text-2xl font-bold text-[#0D887E] mt-1">₹{(totalValue / 100000).toFixed(2)} L</h3>
          <p className="text-[11px] text-slate-400">Approved budget</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">PO Issued / Transit</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">
            {procurement.filter((p) => p.status === 'PO Issued' || p.status === 'Approved').length}
          </h3>
          <p className="text-[11px] text-slate-400">Supplier delivery pending</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Goods Received (GRN)</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {procurement.filter((p) => p.status === 'Goods Received').length}
          </h3>
          <p className="text-[11px] text-slate-400">Delivered & verified</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search items, PR number, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs w-full sm:w-auto justify-end">
          <span className="text-slate-400 font-medium">Requisition Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
            <option value="PO Issued">PO Issued</option>
            <option value="Goods Received">Goods Received</option>
          </select>
        </div>
      </div>

      {/* PR Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">PR Number</th>
                <th className="py-3 px-4">Department & Requestor</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Item Requisition Summary</th>
                <th className="py-3 px-4">Est. Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPrs.map((pr) => (
                <tr key={pr.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{pr.prNumber}</td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-[#0B263A]">{pr.department}</p>
                    <span className="text-[10px] text-slate-400">{pr.requestedBy}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">
                      {pr.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-sm font-medium text-slate-800 line-clamp-1">
                    {pr.itemDescription}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    ₹{pr.estimatedAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{pr.requestDate}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={pr.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <button
                      onClick={() => setSelectedPr(pr)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                      title="Inspect Requisition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {pr.status === 'Submitted' && (
                      <button
                        onClick={() => updateProcurementStatus(pr.id, 'Approved')}
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                        title="Approve Requisition"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}

                    {pr.status === 'PO Issued' && (
                      <button
                        onClick={() => handleGoodsReceived(pr.id)}
                        className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[10px]"
                        title="Receive Goods & Log Inward"
                      >
                        Record GRN
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
        isOpen={Boolean(selectedPr)}
        onClose={() => setSelectedPr(null)}
        title={selectedPr?.prNumber || 'Requisition'}
        subtitle={`Dept: ${selectedPr?.department} · Amount: ₹${selectedPr?.estimatedAmount.toLocaleString('en-IN')}`}
        badge={selectedPr ? <StatusBadge status={selectedPr.status} size="sm" /> : undefined}
      >
        {selectedPr && (
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2 text-slate-700">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Purchase Request Specifications
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Requested By: <strong>{selectedPr.requestedBy}</strong></div>
                <div>Submission Date: <strong>{selectedPr.requestDate}</strong></div>
                <div>Category: <strong>{selectedPr.category}</strong></div>
                <div>Estimated Budget: <strong>₹{selectedPr.estimatedAmount.toLocaleString('en-IN')}</strong></div>
                <div className="col-span-2">Assigned Supplier: <strong>{selectedPr.supplierAssigned || 'Quotations Under Review'}</strong></div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px] mb-1">
                Requested Item Specifications
              </h4>
              <div className="p-4 bg-white rounded-xl border border-slate-200 leading-relaxed text-slate-800">
                {selectedPr.itemDescription}
              </div>
            </div>

            {selectedPr.approvalRemarks && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 italic">
                Committee Remarks: "{selectedPr.approvalRemarks}"
              </div>
            )}

            <div className="flex space-x-2 pt-2">
              {selectedPr.status !== 'Approved' && selectedPr.status !== 'Goods Received' && (
                <button
                  onClick={() => {
                    updateProcurementStatus(selectedPr.id, 'Approved');
                    setSelectedPr({ ...selectedPr, status: 'Approved' });
                  }}
                  className="flex-1 py-2 bg-[#0D887E] text-white rounded-lg font-bold"
                >
                  Approve Requisition
                </button>
              )}
              {selectedPr.status === 'Approved' && (
                <button
                  onClick={() => {
                    updateProcurementStatus(selectedPr.id, 'PO Issued');
                    setSelectedPr({ ...selectedPr, status: 'PO Issued' });
                  }}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold"
                >
                  Generate Official PO
                </button>
              )}
            </div>
          </div>
        )}
      </DetailsDrawer>

      {/* New PR Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create Purchase Requisition"
        subtitle="Submit materials requisition for dean and finance scrutiny."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Department</label>
              <select
                value={prFormData.department}
                onChange={(e) => setPrFormData({ ...prFormData, department: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Hospital Administration">Hospital Administration</option>
                <option value="Rasa Shastra & Pharmacy">Rasa Shastra & Pharmacy</option>
                <option value="Panchakarma Center">Panchakarma Center</option>
                <option value="Dravyaguna Herbarium & Lab">Dravyaguna Herbarium</option>
                <option value="Hostel Administration">Hostel Administration</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={prFormData.category}
                onChange={(e) => setPrFormData({ ...prFormData, category: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Herbal Raw Materials">Herbal Raw Materials</option>
                <option value="Medical Supplies & Linen">Medical Supplies & Linen</option>
                <option value="Lab Glassware">Lab Glassware</option>
                <option value="IT & Office Hardware">IT & Office Hardware</option>
                <option value="Hostel Amenities">Hostel Amenities</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Detailed Item Specifications & Quantities</label>
            <textarea
              required
              rows={3}
              value={prFormData.itemDescription}
              onChange={(e) => setPrFormData({ ...prFormData, itemDescription: e.target.value })}
              placeholder="e.g. 50kg Ashwagandha dried roots, 20kg Shatavari roots (Grade A)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Estimated Budget Amount (₹)</label>
              <input
                type="number"
                required
                value={prFormData.estimatedAmount}
                onChange={(e) => setPrFormData({ ...prFormData, estimatedAmount: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Preferred Supplier</label>
              <input
                type="text"
                value={prFormData.supplierAssigned}
                onChange={(e) => setPrFormData({ ...prFormData, supplierAssigned: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
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
              Submit Requisition
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
