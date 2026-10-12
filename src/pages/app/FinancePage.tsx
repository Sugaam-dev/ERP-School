import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { FeeLedgerItem } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  CircleDollarSign,
  Search,
  Filter,
  CreditCard,
  Receipt,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  Eye,
} from 'lucide-react';

export const FinancePage: React.FC = () => {
  const { fees, recordFeePayment, showToast } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [batchFilter, setBatchFilter] = useState('All');

  const [selectedFee, setSelectedFee] = useState<FeeLedgerItem | null>(null);

  // Pay Modal
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [payAmount, setPayAmount] = useState<number>(0);

  // Receipt Modal
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const filteredFees = fees.filter((f) => {
    const matchSearch =
      f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || f.status === statusFilter;
    const matchBatch = batchFilter === 'All' || f.batch === batchFilter;
    return matchSearch && matchStatus && matchBatch;
  });

  const totalInvoiced = fees.reduce((acc, f) => acc + f.totalDue, 0);
  const totalCollected = fees.reduce((acc, f) => acc + f.amountPaid, 0);
  const totalOutstanding = fees.reduce((acc, f) => acc + f.balanceDue, 0);
  const overdueCount = fees.filter((f) => f.status === 'Overdue').length;

  const openPayModal = (f: FeeLedgerItem) => {
    setSelectedFee(f);
    setPayAmount(f.balanceDue);
    setIsPayModalOpen(true);
  };

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFee) {
      recordFeePayment(selectedFee.id, payAmount);
      setIsPayModalOpen(false);
      setIsReceiptModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <CircleDollarSign className="w-5 h-5 text-[#0D887E]" />
            <span>Finance, Fee Ledgers & Collections</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Student tuition ledgers, installment tracking, simulated payment receipts, and bank reconciliation.
          </p>
        </div>

        <div className="p-2 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 font-semibold flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Accounting Engine: Simulated ERPNext General Ledger</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Invoiced</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">₹{(totalInvoiced / 100000).toFixed(2)} L</h3>
          <p className="text-[11px] text-slate-400">Annual tuition + hostel</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Collected</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">₹{(totalCollected / 100000).toFixed(2)} L</h3>
          <p className="text-[11px] text-slate-400">92.8% collection efficiency</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Outstanding Dues</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">₹{(totalOutstanding / 100000).toFixed(2)} L</h3>
          <p className="text-[11px] text-rose-500">Total receivable balance</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overdue Accounts</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">{overdueCount}</h3>
          <p className="text-[11px] text-amber-700">Past statutory grace date</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search student, roll number, invoice..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Payment Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Batch:</span>
            <select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0B263A] font-medium focus:outline-none"
            >
              <option value="All">All Batches</option>
              <option value="2023-28">2023-28</option>
              <option value="2022-27">2022-27</option>
              <option value="2021-26">2021-26</option>
              <option value="2024-27">2024-27 (PG)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fee Ledgers Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Student Name (Roll No)</th>
                <th className="py-3 px-4">Batch / Prof</th>
                <th className="py-3 px-4">Total Due</th>
                <th className="py-3 px-4">Amount Paid</th>
                <th className="py-3 px-4">Balance Receivable</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredFees.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No fee ledger accounts match your filters.
                  </td>
                </tr>
              ) : (
                filteredFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{fee.invoiceNo}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0B263A]">{fee.studentName}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{fee.rollNo}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{fee.batch}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      ₹{fee.totalDue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-700">
                      ₹{fee.amountPaid.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-bold text-rose-600">
                      {fee.balanceDue === 0 ? '—' : `₹${fee.balanceDue.toLocaleString('en-IN')}`}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono">{fee.dueDate}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={fee.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedFee(fee)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                        title="View Detailed Fee Breakdown"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {fee.balanceDue > 0 && (
                        <button
                          onClick={() => openPayModal(fee)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                        >
                          Record Payment
                        </button>
                      )}

                      {fee.receiptNo && (
                        <button
                          onClick={() => {
                            setSelectedFee(fee);
                            setIsReceiptModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="View Official Receipt"
                        >
                          <Receipt className="w-4 h-4" />
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

      {/* Record Payment Simulation Modal */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title="Record Fee Collection (Simulated)"
        subtitle={`Invoice: ${selectedFee?.invoiceNo} — ${selectedFee?.studentName}`}
      >
        <form onSubmit={handlePaySubmit} className="space-y-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span>Total Billable Amount:</span>
              <strong>₹{selectedFee?.totalDue.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between text-slate-600 mt-1">
              <span>Already Paid:</span>
              <strong className="text-emerald-700">₹{selectedFee?.amountPaid.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between text-slate-800 font-bold border-t border-slate-200 pt-2 mt-2">
              <span>Remaining Balance:</span>
              <strong className="text-rose-600">₹{selectedFee?.balanceDue.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Payment Amount to Record (₹)
            </label>
            <input
              type="number"
              required
              min={100}
              max={selectedFee?.balanceDue || 100000}
              value={payAmount}
              onChange={(e) => setPayAmount(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Payment Instrument</label>
            <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D887E]">
              <option>Bank NEFT / RTGS Transfer</option>
              <option>UPI Portal Transaction</option>
              <option>Demand Draft / Cheque</option>
              <option>Cash Receipt at Accounts Window</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsPayModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
            >
              Confirm & Generate Receipt
            </button>
          </div>
        </form>
      </Modal>

      {/* Official Receipt Preview Modal */}
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        title="Official Fee Collection Receipt"
        subtitle="Simulated institutional accounts receipt voucher."
      >
        <div className="space-y-4 text-xs font-sans">
          <div className="p-5 border-2 border-slate-200 rounded-2xl bg-white space-y-4">
            {/* Receipt Header */}
            <div className="flex items-start justify-between border-b pb-3 border-slate-200">
              <div>
                <h4 className="font-extrabold text-[#0B263A] text-sm">PMRG AYURVEDA COLLEGE</h4>
                <p className="text-[10px] text-slate-500">Affiliated to State Ayush University</p>
                <p className="text-[10px] text-slate-400">Office of Chief Accounts Officer</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-emerald-700 text-sm block">
                  {selectedFee?.receiptNo || 'REC-26-4499'}
                </span>
                <span className="text-[10px] text-slate-400">Date: {new Date().toISOString().split('T')[0]}</span>
              </div>
            </div>

            {/* Student metadata */}
            <div className="grid grid-cols-2 gap-2 text-slate-700 text-xs">
              <div>Student: <strong>{selectedFee?.studentName}</strong></div>
              <div>Roll No: <strong>{selectedFee?.rollNo}</strong></div>
              <div>Batch: <strong>{selectedFee?.batch}</strong></div>
              <div>Invoice: <strong>{selectedFee?.invoiceNo}</strong></div>
            </div>

            {/* Fee summary */}
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <div className="bg-slate-50 p-2.5 font-bold flex justify-between border-b border-slate-200">
                <span>Fee Description</span>
                <span>Amount Paid</span>
              </div>
              <div className="p-3 flex justify-between text-slate-800">
                <span>{selectedFee?.termDescription}</span>
                <span className="font-bold text-[#0D887E]">₹{selectedFee?.amountPaid.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span>Status: <strong className="text-emerald-700">Payment Reconciled</strong></span>
              <span className="italic">Authorized System Copy</span>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                showToast('Receipt printed to local preview.', 'info');
                setIsReceiptModalOpen(false);
              }}
              className="px-4 py-2 bg-[#0B263A] text-white rounded-lg font-bold flex items-center space-x-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedFee) && !isPayModalOpen && !isReceiptModalOpen}
        onClose={() => setSelectedFee(null)}
        title={selectedFee?.invoiceNo || 'Fee Account'}
        subtitle={`Student: ${selectedFee?.studentName} (${selectedFee?.rollNo})`}
        badge={selectedFee ? <StatusBadge status={selectedFee.status} size="sm" /> : undefined}
      >
        {selectedFee && (
          <div className="space-y-6 text-xs">
            {/* Financial Ledger Breakdown */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2 text-slate-700">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Fee Structure Breakdown
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Tuition & Clinical Labs: <strong>₹{selectedFee.totalTuitionFee.toLocaleString('en-IN')}</strong></div>
                <div>Hostel & Mess Security: <strong>₹{selectedFee.hostelFee.toLocaleString('en-IN')}</strong></div>
                <div>Total Billable: <strong className="text-[#0B263A]">₹{selectedFee.totalDue.toLocaleString('en-IN')}</strong></div>
                <div>Amount Credited: <strong className="text-emerald-700">₹{selectedFee.amountPaid.toLocaleString('en-IN')}</strong></div>
                <div>Receivable Balance: <strong className="text-rose-600">₹{selectedFee.balanceDue.toLocaleString('en-IN')}</strong></div>
                <div>Payment Due Date: <strong>{selectedFee.dueDate}</strong></div>
              </div>
            </div>

            {selectedFee.balanceDue > 0 && (
              <button
                onClick={() => openPayModal(selectedFee)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                Record Payment (₹{selectedFee.balanceDue.toLocaleString('en-IN')} Due)
              </button>
            )}
          </div>
        )}
      </DetailsDrawer>
    </div>
  );
};
