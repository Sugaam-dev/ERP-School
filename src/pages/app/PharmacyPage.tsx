import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { PharmacyItem } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  Pill,
  Search,
  Plus,
  AlertTriangle,
  History,
  ShoppingBag,
  RotateCcw,
  Eye,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export const PharmacyPage: React.FC = () => {
  const {
    pharmacyItems,
    stockMovements,
    addPharmacyItem,
    dispensePharmacyItem,
    patients,
  } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedItem, setSelectedItem] = useState<PharmacyItem | null>(null);

  // Dispense Modal
  const [isDispenseModalOpen, setIsDispenseModalOpen] = useState(false);
  const [dispenseQty, setDispenseQty] = useState(1);
  const [selectedPatientName, setSelectedPatientName] = useState(patients[0]?.name || 'OPD Patient');

  // Add Item Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemData, setNewItemData] = useState<Partial<PharmacyItem>>({
    name: '',
    classicalReference: 'Sharngadhara Samhita',
    category: 'Churna',
    batchNo: '',
    quantity: 100,
    unit: 'Packets (100g)',
    supplier: 'Baidyanath Ayurved Bhawan',
    purchaseCost: 120,
    mrp: 180,
    expiryDate: '2028-12-31',
    reorderLevel: 30,
  });

  // Filtered items
  const filteredItems = pharmacyItems.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'All' || item.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const lowStockCount = pharmacyItems.filter((i) => i.status === 'Low Stock').length;
  const nearExpiryCount = pharmacyItems.filter((i) => i.status === 'Near Expiry').length;
  const totalValue = pharmacyItems.reduce((acc, i) => acc + i.quantity * i.purchaseCost, 0);

  const openDispenseModal = (item: PharmacyItem) => {
    setSelectedItem(item);
    setDispenseQty(1);
    setIsDispenseModalOpen(true);
  };

  const handleDispenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      const ok = dispensePharmacyItem(selectedItem.id, dispenseQty, selectedPatientName);
      if (ok) {
        setIsDispenseModalOpen(false);
        setSelectedItem(null);
      }
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPharmacyItem(newItemData);
    setIsAddModalOpen(false);
    setNewItemData({
      name: '',
      classicalReference: 'Sharngadhara Samhita',
      category: 'Churna',
      batchNo: '',
      quantity: 100,
      unit: 'Packets (100g)',
      supplier: 'Baidyanath Ayurved Bhawan',
      purchaseCost: 120,
      mrp: 180,
      expiryDate: '2028-12-31',
      reorderLevel: 30,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <Pill className="w-5 h-5 text-emerald-600" />
            <span>Ayurvedic Pharmacy & Batch Inventory Traceability</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Batch-tracked classical churnas, asavas, tailas, expiry monitoring, and OPD/IPD dispensing.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-sm flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Stock Item</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Catalogued Items</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{pharmacyItems.length} Formulations</h3>
          <p className="text-[11px] text-slate-400">Classical AFI & Raw Herbs</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Stock Valuation</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            ₹{(totalValue / 100000).toFixed(2)} Lakhs
          </h3>
          <p className="text-[11px] text-slate-400">Purchase cost basis</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Low Stock Threshold</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">{lowStockCount}</h3>
          <p className="text-[11px] text-amber-700">Needs PO requisition</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Near Expiry (60 Days)</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">{nearExpiryCount}</h3>
          <p className="text-[11px] text-rose-500">Fast-track issue or return</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search medicine name, code, batch..."
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
              <option value="All">All Formulations</option>
              <option value="Churna">Churna</option>
              <option value="Asava & Arishta">Asava & Arishta</option>
              <option value="Taila & Ghrita">Taila & Ghrita</option>
              <option value="Vati & Gutika">Vati & Gutika</option>
              <option value="Bhasma & Rasayana">Bhasma & Rasayana</option>
              <option value="Raw Herb / Crude Drug">Raw Herbs</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Stock Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Adequate">Adequate</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Near Expiry">Near Expiry</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Pharmacy Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Item Code</th>
                <th className="py-3 px-4">Formulation Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Batch Number</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Purchase / MRP</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Dispensing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No pharmacy formulations found for your search.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{item.itemCode}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0B263A]">{item.name}</p>
                      <span className="text-[10px] text-slate-400">{item.classicalReference}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-800">{item.batchNo}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900">{item.quantity}</span>{' '}
                      <span className="text-[10px] text-slate-400">{item.unit}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{item.expiryDate}</td>
                    <td className="py-3 px-4 text-slate-700">
                      ₹{item.purchaseCost} <span className="text-slate-400">/ ₹{item.mrp}</span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                        title="View Full Item Traceability"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openDispenseModal(item)}
                        disabled={item.quantity <= 0}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] transition-colors disabled:opacity-40"
                      >
                        Dispense
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Movement History Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-[#0D887E]" />
            <h3 className="font-bold text-sm text-[#0B263A]">
              Recent Inventory Stock Movements (Audit Trail)
            </h3>
          </div>
          <span className="text-xs text-slate-400">{stockMovements.length} logged events</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Item Name</th>
                <th className="py-2.5 px-3">Batch #</th>
                <th className="py-2.5 px-3">Movement Type</th>
                <th className="py-2.5 px-3">Qty</th>
                <th className="py-2.5 px-3">Reference Doc</th>
                <th className="py-2.5 px-3">Patient / Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {stockMovements.slice(0, 6).map((sm) => (
                <tr key={sm.id}>
                  <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{sm.date}</td>
                  <td className="py-2.5 px-3 font-bold text-[#0B263A]">{sm.itemName}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{sm.batchNo}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-800">{sm.type}</span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0D887E]">{sm.quantity}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{sm.referenceDoc}</td>
                  <td className="py-2.5 px-3 text-slate-600">{sm.patientOrSupplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedItem) && !isDispenseModalOpen}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.name || 'Stock Formulation'}
        subtitle={`Code: ${selectedItem?.itemCode} · Batch: ${selectedItem?.batchNo}`}
        badge={selectedItem ? <StatusBadge status={selectedItem.status} size="sm" /> : undefined}
      >
        {selectedItem && (
          <div className="space-y-6 text-xs">
            {/* Quick Dispense Action */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0B263A]">Current Stock Available: {selectedItem.quantity} {selectedItem.unit}</span>
                <p className="text-[10px] text-slate-400">Reorder Threshold: {selectedItem.reorderLevel}</p>
              </div>
              <button
                onClick={() => openDispenseModal(selectedItem)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                Dispense Item
              </button>
            </div>

            {/* Formulation Specs */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2 text-slate-700">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Classical Formulation Specifications
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Ayurvedic Category: <strong>{selectedItem.category}</strong></div>
                <div>Classical Text: <strong>{selectedItem.classicalReference}</strong></div>
                <div>Manufacturing Batch: <strong>{selectedItem.batchNo}</strong></div>
                <div>Expiry Date: <strong>{selectedItem.expiryDate}</strong></div>
                <div>Purchase Unit Cost: <strong>₹{selectedItem.purchaseCost}</strong></div>
                <div>Retail / Bill Price: <strong>₹{selectedItem.mrp}</strong></div>
                <div className="col-span-2">Approved Supplier: <strong>{selectedItem.supplier}</strong></div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500">
              Connected ERP Workflow: Every dispensing deduction automatically updates the central ledger, triggers reorder purchase requisitions at threshold, and attaches to the patient bill.
            </div>
          </div>
        )}
      </DetailsDrawer>

      {/* Dispense Stock Modal Form */}
      <Modal
        isOpen={isDispenseModalOpen}
        onClose={() => setIsDispenseModalOpen(false)}
        title="Dispense Ayurvedic Medicine"
        subtitle={`Item: ${selectedItem?.name} (Batch: ${selectedItem?.batchNo})`}
      >
        <form onSubmit={handleDispenseSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Patient Encounter</label>
            <select
              value={selectedPatientName}
              onChange={(e) => setSelectedPatientName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            >
              {patients.map((p) => (
                <option key={p.id} value={`${p.name} (${p.uhid})`}>
                  {p.name} ({p.uhid})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Dispense Quantity ({selectedItem?.unit})
              </label>
              <input
                type="number"
                required
                min={1}
                max={selectedItem?.quantity || 1}
                value={dispenseQty}
                onChange={(e) => setDispenseQty(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Available in Batch</label>
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-lg font-bold text-slate-800">
                {selectedItem?.quantity} {selectedItem?.unit}
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsDispenseModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
            >
              Confirm Issue & Deduct Stock
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Stock Item Modal Form */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Classical Formulation to Inventory"
        subtitle="Record batch identifier, expiry date, unit price, and reorder levels."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Formulation Name</label>
            <input
              type="text"
              required
              value={newItemData.name}
              onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
              placeholder="e.g. Draksharishta Special"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={newItemData.category}
                onChange={(e) => setNewItemData({ ...newItemData, category: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Churna">Churna</option>
                <option value="Asava & Arishta">Asava & Arishta</option>
                <option value="Taila & Ghrita">Taila & Ghrita</option>
                <option value="Vati & Gutika">Vati & Gutika</option>
                <option value="Bhasma & Rasayana">Bhasma & Rasayana</option>
                <option value="Raw Herb / Crude Drug">Raw Herb / Crude Drug</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Batch Number</label>
              <input
                type="text"
                required
                value={newItemData.batchNo}
                onChange={(e) => setNewItemData({ ...newItemData, batchNo: e.target.value })}
                placeholder="BATCH-DRK-2610"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Initial Quantity</label>
              <input
                type="number"
                required
                min={1}
                value={newItemData.quantity}
                onChange={(e) => setNewItemData({ ...newItemData, quantity: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Packaging Unit</label>
              <select
                value={newItemData.unit}
                onChange={(e) => setNewItemData({ ...newItemData, unit: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              >
                <option value="Packets (100g)">Packets (100g)</option>
                <option value="Bottles (450ml)">Bottles (450ml)</option>
                <option value="Jars (200g)">Jars (200g)</option>
                <option value="Strips (50 tabs)">Strips (50 tabs)</option>
                <option value="Kg">Kg</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Purchase Cost (₹)</label>
              <input
                type="number"
                required
                value={newItemData.purchaseCost}
                onChange={(e) => setNewItemData({ ...newItemData, purchaseCost: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Expiry Date</label>
              <input
                type="date"
                required
                value={newItemData.expiryDate}
                onChange={(e) => setNewItemData({ ...newItemData, expiryDate: e.target.value })}
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
              Save Stock Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
