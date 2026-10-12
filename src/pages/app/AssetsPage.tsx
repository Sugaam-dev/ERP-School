import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { AssetRecord } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  Boxes,
  Search,
  Filter,
  Eye,
  Wrench,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Building2,
} from 'lucide-react';

export const AssetsPage: React.FC = () => {
  const { assets, updateAssetStatus, showToast } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);

  // Maintenance Modal
  const [isMaintModalOpen, setIsMaintModalOpen] = useState(false);
  const [maintCondition, setMaintCondition] = useState<AssetRecord['condition']>('Maintenance Due');
  const [maintNotes, setMaintNotes] = useState('');

  const filteredAssets = assets.filter((ast) => {
    const matchSearch =
      ast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ast.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ast.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'All' || ast.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const maintenanceDueCount = assets.filter((a) => a.condition === 'Maintenance Due').length;

  const handleMaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAsset) {
      updateAssetStatus(selectedAsset.id, maintCondition);
      showToast(`Asset ${selectedAsset.assetTag} condition updated to: ${maintCondition}`, 'success');
      setIsMaintModalOpen(false);
      setSelectedAsset(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <Boxes className="w-5 h-5 text-[#0D887E]" />
            <span>Campus Assets & Preventive Maintenance</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Clinical Panchakarma tables, surgical OT apparatus, smart lecture screens, and AMC vendor contracts.
          </p>
        </div>

        <div className="p-2 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 font-semibold flex items-center space-x-2">
          <Wrench className="w-4 h-4 text-amber-600" />
          <span>{maintenanceDueCount} Assets Due for Scheduled Service</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tagged Assets</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{assets.length}</h3>
          <p className="text-[11px] text-slate-400">Barcode tracked equipment</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Optimal Condition</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {assets.filter((a) => a.condition === 'Good').length}
          </h3>
          <p className="text-[11px] text-slate-400">Ready for daily clinical use</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Maintenance Scheduled</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">{maintenanceDueCount}</h3>
          <p className="text-[11px] text-amber-700">Vendor notification sent</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AMC Contracts</p>
          <h3 className="text-2xl font-bold text-[#0D887E] mt-1">100% Active</h3>
          <p className="text-[11px] text-slate-400">Annual maintenance covered</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search asset name, tag, room location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs w-full md:w-auto justify-end">
          <span className="text-slate-400 font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Clinical / Panchakarma Tables">Clinical / Panchakarma Tables</option>
            <option value="Dravyaguna Herbarium / Lab">Dravyaguna Lab Equipment</option>
            <option value="Smart Classroom / AV">Classroom / AV</option>
            <option value="IT Server & Network">IT Infrastructure</option>
            <option value="Campus Generator & Utilities">Power & Utilities</option>
          </select>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Asset Tag</th>
                <th className="py-3 px-4">Equipment Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Department & Location</th>
                <th className="py-3 px-4">Last Service</th>
                <th className="py-3 px-4">Next Due Date</th>
                <th className="py-3 px-4">Condition</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAssets.map((ast) => (
                <tr key={ast.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{ast.assetTag}</td>
                  <td className="py-3 px-4 font-bold text-[#0B263A]">{ast.name}</td>
                  <td className="py-3 px-4 text-slate-600">{ast.category}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-800">{ast.location}</p>
                    <span className="text-[10px] text-slate-400">{ast.department}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{ast.lastMaintenanceDate}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{ast.nextMaintenanceDate}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={ast.condition} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <button
                      onClick={() => setSelectedAsset(ast)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                      title="View Maintenance Dossier"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAsset(ast);
                        setIsMaintModalOpen(true);
                      }}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px]"
                    >
                      Log Service
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedAsset) && !isMaintModalOpen}
        onClose={() => setSelectedAsset(null)}
        title={selectedAsset?.name || 'Asset Record'}
        subtitle={`Tag: ${selectedAsset?.assetTag} · Location: ${selectedAsset?.location}`}
        badge={selectedAsset ? <StatusBadge status={selectedAsset.condition} size="sm" /> : undefined}
      >
        {selectedAsset && (
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2 text-slate-700">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Asset & AMC Specifications
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Purchase Date: <strong>{selectedAsset.purchaseDate}</strong></div>
                <div>Operational Status: <strong>{selectedAsset.condition}</strong></div>
                <div>Last Service: <strong>{selectedAsset.lastMaintenanceDate}</strong></div>
                <div>Next Service Due: <strong>{selectedAsset.nextMaintenanceDate}</strong></div>
                <div className="col-span-2">AMC Vendor: <strong>{selectedAsset.annualMaintenanceVendor}</strong></div>
              </div>
            </div>

            <button
              onClick={() => setIsMaintModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold"
            >
              Update Maintenance Status
            </button>
          </div>
        )}
      </DetailsDrawer>

      {/* Log Service / Condition Modal */}
      <Modal
        isOpen={isMaintModalOpen}
        onClose={() => setIsMaintModalOpen(false)}
        title="Update Asset Maintenance Status"
        subtitle={`Asset: ${selectedAsset?.name} (${selectedAsset?.assetTag})`}
      >
        <form onSubmit={handleMaintSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Equipment Condition</label>
            <select
              value={maintCondition}
              onChange={(e) => setMaintCondition(e.target.value as any)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            >
              <option value="Good">Good (Operational & Tested)</option>
              <option value="Fair / Operational">Fair / Operational</option>
              <option value="Maintenance Due">Maintenance Due</option>
              <option value="Out of Service">Out of Service</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Service Engineer Log Notes</label>
            <textarea
              rows={3}
              value={maintNotes}
              onChange={(e) => setMaintNotes(e.target.value)}
              placeholder="e.g. Ultrasonic cleaning conducted, calibration check signed..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsMaintModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0D887E] hover:bg-[#0A7068] text-white rounded-lg font-bold"
            >
              Update Condition Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
