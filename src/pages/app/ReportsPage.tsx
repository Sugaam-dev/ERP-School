import React, { useState } from 'react';
import {
  Download,
  Search,
  Printer,
  Calendar,
  GraduationCap,
  Users,
  Stethoscope,
  Activity,
  Pill,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  BedDouble,
  CircleDollarSign,
  Boxes,
  Clock,
  Sparkles,
  Microscope,
  Building,
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { KpiCard } from '../../components/common/KpiCard';

type ReportTab =
  | 'academics'
  | 'attendance'
  | 'hospital'
  | 'panchakarma'
  | 'pharmacy'
  | 'finance'
  | 'hr'
  | 'compliance';

export const ReportsPage: React.FC = () => {
  const {
    students,
    faculty,
    patients,
    opdVisits,
    ipdAdmissions,
    pharmacyItems,
    panchakarmaBookings,
    fees,
    compliance,
    research,
    showToast,
  } = useDemo();

  const [activeTab, setActiveTab] = useState<ReportTab>('finance');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('Current Academic Session (2025-26)');

  // Function to download CSV
  const downloadCSV = (headers: string[], rows: (string | number)[][], filename: string) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))].join(
        '\n'
      );
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filename}.csv successfully.`, 'success');
  };

  // Render report content based on activeTab
  const renderReportContent = () => {
    switch (activeTab) {
      case 'finance': {
        const totalBilled = fees.reduce((sum, f) => sum + f.totalDue, 0);
        const totalCollected = fees.reduce((sum, f) => sum + f.amountPaid, 0);
        const totalOutstanding = fees.reduce((sum, f) => sum + f.balanceDue, 0);
        const collectionRate = Math.round((totalCollected / totalBilled) * 100);

        const filteredFees = fees.filter(
          (f) =>
            f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.batch.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const handleExport = () => {
          const headers = ['Invoice No', 'Roll No', 'Student Name', 'Program', 'Batch', 'Total Due', 'Paid', 'Balance', 'Status'];
          const rows = filteredFees.map((f) => [
            f.invoiceNo,
            f.rollNo,
            f.studentName,
            f.program,
            f.batch,
            f.totalDue,
            f.amountPaid,
            f.balanceDue,
            f.status,
          ]);
          downloadCSV(headers, rows, `PMRG_Fee_Collection_Report_${new Date().toISOString().split('T')[0]}`);
        };

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <KpiCard title="Total Invoiced" value={`₹${(totalBilled / 100000).toFixed(2)} L`} subtitle="30 student invoices" icon={CreditCard} accentColor="navy" />
              <KpiCard title="Total Collected" value={`₹${(totalCollected / 100000).toFixed(2)} L`} subtitle="Bank & DD collections" icon={CheckCircle2} accentColor="mint" />
              <KpiCard title="Outstanding Balance" value={`₹${(totalOutstanding / 100000).toFixed(2)} L`} subtitle="Pending receivables" icon={AlertCircle} accentColor="rose" />
              <KpiCard title="Collection Efficiency" value={`${collectionRate}%`} subtitle="Institution target: >85%" icon={Activity} accentColor="teal" />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[#0B263A] text-sm sm:text-base">Student Fee Ledger & Collection Statement</h3>
                  <p className="text-xs text-slate-500">Breakdown of annual tuition, clinical fees, and balance receivables</p>
                </div>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D887E] hover:bg-[#0A6C64] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export to CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Invoice No</th>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Roll No</th>
                      <th className="py-2.5 px-3">Program / Batch</th>
                      <th className="py-2.5 px-3 text-right">Total Due</th>
                      <th className="py-2.5 px-3 text-right">Paid</th>
                      <th className="py-2.5 px-3 text-right">Balance</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredFees.map((fee) => (
                      <tr key={fee.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-medium text-[#0D887E]">{fee.invoiceNo}</td>
                        <td className="py-2.5 px-3 font-medium text-[#0B263A]">{fee.studentName}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">{fee.rollNo}</td>
                        <td className="py-2.5 px-3 text-slate-600">{fee.program} ({fee.batch})</td>
                        <td className="py-2.5 px-3 text-right font-medium text-slate-800">₹{fee.totalDue.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-right text-emerald-600 font-medium">₹{fee.amountPaid.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-right text-rose-600 font-medium">₹{fee.balanceDue.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              fee.status === 'Paid'
                                ? 'bg-emerald-50 text-emerald-700'
                                : fee.status === 'Overdue'
                                ? 'bg-rose-50 text-rose-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {fee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case 'academics': {
        const filteredStudents = students.filter(
          (s) =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.batch.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const handleExport = () => {
          const headers = ['Roll No', 'Name', 'Program', 'Current Batch', 'Prof / Semester', 'Attendance %', 'Fee Status'];
          const rows = filteredStudents.map((s) => [
            s.rollNo,
            s.name,
            s.program,
            s.batch,
            s.currentSemester,
            s.attendancePercent,
            s.feeStatus,
          ]);
          downloadCSV(headers, rows, `PMRG_Academic_Enrollment_Report_${new Date().toISOString().split('T')[0]}`);
        };

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <KpiCard title="Total Enrolled" value={students.length} subtitle="BAMS UG & MD/MS PG" icon={GraduationCap} accentColor="navy" />
              <KpiCard title="Exam Eligible" value={students.filter((s) => s.attendancePercent >= 75).length} subtitle="Attendance ≥ 75%" icon={CheckCircle2} accentColor="mint" />
              <KpiCard title="Attendance Shortage" value={students.filter((s) => s.attendancePercent < 75).length} subtitle="Remedial tutorials allocated" icon={AlertCircle} accentColor="rose" />
              <KpiCard title="Avg Attendance" value="86.4%" subtitle="Campus-wide average" icon={Activity} accentColor="teal" />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[#0B263A] text-sm sm:text-base">Comprehensive Student Enrollment Directory</h3>
                  <p className="text-xs text-slate-500">Student rosters, batch details, and attendance verification status</p>
                </div>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D887E] hover:bg-[#0A6C64] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export to CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Roll No</th>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Program</th>
                      <th className="py-2.5 px-3">Batch</th>
                      <th className="py-2.5 px-3">Term / Prof</th>
                      <th className="py-2.5 px-3 text-center">Attendance</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((std) => (
                      <tr key={std.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-medium text-[#0D887E]">{std.rollNo}</td>
                        <td className="py-2.5 px-3 font-medium text-[#0B263A]">{std.name}</td>
                        <td className="py-2.5 px-3 text-slate-700">{std.program}</td>
                        <td className="py-2.5 px-3 text-slate-600">{std.batch}</td>
                        <td className="py-2.5 px-3 text-slate-600">{std.currentSemester}</td>
                        <td className="py-2.5 px-3 text-center font-medium">
                          <span className={std.attendancePercent < 75 ? 'text-rose-600 font-bold' : 'text-emerald-700'}>
                            {std.attendancePercent}%
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              std.attendancePercent >= 75
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {std.attendancePercent >= 75 ? 'Eligible' : 'Shortage'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case 'hospital': {
        const totalOpd = opdVisits.length;
        const occupiedBeds = ipdAdmissions.filter((a) => a.admissionStatus === 'Admitted').length;

        const handleExport = () => {
          const headers = ['Encounter Type', 'Code / UHID', 'Patient Name', 'Doctor / Vaidya', 'Department', 'Date/Time', 'Status'];
          const opdRows = opdVisits.map((v) => ['OPD', `Token ${v.tokenNo} (${v.uhid})`, v.patientName, v.practitionerName, v.department, v.visitTime, v.queueStatus]);
          const ipdRows = ipdAdmissions.map((i) => ['IPD', `${i.ipdNo} (${i.uhid})`, i.patientName, i.doctorInCharge, i.department, i.admissionDate, i.admissionStatus]);
          downloadCSV(headers, [...opdRows, ...ipdRows], `PMRG_Hospital_Clinical_Census_${new Date().toISOString().split('T')[0]}`);
        };

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <KpiCard title="OPD Daily Census" value={totalOpd} subtitle="Tokens issued today" icon={Stethoscope} accentColor="navy" />
              <KpiCard title="IPD In-Patients" value={occupiedBeds} subtitle="Active bed occupancy (71.4%)" icon={BedDouble} accentColor="mint" />
              <KpiCard title="Total Registrations" value={patients.length} subtitle="Registered UHIDs" icon={Users} accentColor="teal" />
              <KpiCard title="Avg Wait Time" value="18 mins" subtitle="Triage to consultation" icon={Clock} accentColor="amber" />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[#0B263A] text-sm sm:text-base">Hospital Clinical Encounters Log</h3>
                  <p className="text-xs text-slate-500">Cross-departmental records for OPD tokens and IPD ward beds</p>
                </div>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D887E] hover:bg-[#0A6C64] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export to CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Token / IPD No</th>
                      <th className="py-2.5 px-3">Patient Name</th>
                      <th className="py-2.5 px-3">Consultant Vaidya</th>
                      <th className="py-2.5 px-3">Department</th>
                      <th className="py-2.5 px-3">Time / Date</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {opdVisits.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-sky-700">OPD</td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">Token #{v.tokenNo}</td>
                        <td className="py-2.5 px-3 font-medium text-[#0B263A]">{v.patientName}</td>
                        <td className="py-2.5 px-3 text-slate-700">{v.practitionerName}</td>
                        <td className="py-2.5 px-3 text-slate-600">{v.department}</td>
                        <td className="py-2.5 px-3 text-slate-600">{v.visitTime}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                            {v.queueStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {ipdAdmissions.map((i) => (
                      <tr key={i.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-purple-700">IPD</td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">{i.ipdNo}</td>
                        <td className="py-2.5 px-3 font-medium text-[#0B263A]">{i.patientName}</td>
                        <td className="py-2.5 px-3 text-slate-700">{i.doctorInCharge}</td>
                        <td className="py-2.5 px-3 text-slate-600">{i.ward} ({i.bedNo})</td>
                        <td className="py-2.5 px-3 text-slate-600">{i.admissionDate}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              i.admissionStatus === 'Admitted'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {i.admissionStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case 'panchakarma': {
        const totalBookings = panchakarmaBookings.length;
        const totalCharges = panchakarmaBookings.reduce((sum, b) => sum + b.charges, 0);

        const handleExport = () => {
          const headers = ['Booking Code', 'Patient Name', 'Therapy Type', 'Therapist', 'Room', 'Date Slot', 'Charges', 'Status'];
          const rows = panchakarmaBookings.map((b) => [
            b.bookingCode,
            b.patientName,
            b.therapyType,
            b.therapistName,
            b.roomNo,
            `${b.date} ${b.timeSlot}`,
            b.charges,
            b.sessionStatus,
          ]);
          downloadCSV(headers, rows, `PMRG_Panchakarma_Therapy_Report_${new Date().toISOString().split('T')[0]}`);
        };

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <KpiCard title="Therapy Sessions" value={totalBookings} subtitle="Active treatment plans" icon={Activity} accentColor="navy" />
              <KpiCard title="Revenue Generated" value={`₹${totalCharges.toLocaleString('en-IN')}`} subtitle="Direct therapy charges" icon={CircleDollarSign} accentColor="mint" />
              <KpiCard title="Consent Verified" value="100%" subtitle="Consent forms signed" icon={CheckCircle2} accentColor="teal" />
              <KpiCard title="Clinical Reviews" value="100%" subtitle="Reviewed by Vaidya" icon={Sparkles} accentColor="mint" />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[#0B263A] text-sm sm:text-base">Panchakarma Therapy Utilization Ledger</h3>
                  <p className="text-xs text-slate-500">Therapy procedures, assigned therapists, and consumables billed</p>
                </div>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D887E] hover:bg-[#0A6C64] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export to CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Booking Code</th>
                      <th className="py-2.5 px-3">Patient Name</th>
                      <th className="py-2.5 px-3">Therapy</th>
                      <th className="py-2.5 px-3">Therapist / Room</th>
                      <th className="py-2.5 px-3">Date & Slot</th>
                      <th className="py-2.5 px-3 text-right">Charges</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {panchakarmaBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-medium text-[#0D887E]">{b.bookingCode}</td>
                        <td className="py-2.5 px-3 font-medium text-[#0B263A]">{b.patientName}</td>
                        <td className="py-2.5 px-3 font-semibold text-teal-700">{b.therapyType}</td>
                        <td className="py-2.5 px-3 text-slate-600">{b.therapistName} ({b.roomNo})</td>
                        <td className="py-2.5 px-3 text-slate-600">{b.date} | {b.timeSlot}</td>
                        <td className="py-2.5 px-3 text-right font-medium text-slate-800">₹{b.charges.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              b.sessionStatus === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700'
                                : b.sessionStatus === 'In Progress'
                                ? 'bg-sky-50 text-sky-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {b.sessionStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case 'pharmacy': {
        const totalItems = pharmacyItems.length;
        const lowStockItems = pharmacyItems.filter((i) => i.quantity <= i.reorderLevel).length;

        const handleExport = () => {
          const headers = ['Item Code', 'Medicine Name', 'Classical Category', 'Batch No', 'Expiry Date', 'Current Stock', 'MRP', 'Stock Status'];
          const rows = pharmacyItems.map((i) => [
            i.itemCode,
            i.name,
            i.category,
            i.batchNo,
            i.expiryDate,
            i.quantity,
            i.mrp,
            i.status,
          ]);
          downloadCSV(headers, rows, `PMRG_Ayurveda_Pharmacy_Inventory_${new Date().toISOString().split('T')[0]}`);
        };

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <KpiCard title="Classical Medicines" value={totalItems} subtitle="Asava, Arishta, Taila, Bhasma" icon={Pill} accentColor="navy" />
              <KpiCard title="Low Stock Alerts" value={lowStockItems} subtitle="Below reorder threshold" icon={AlertCircle} accentColor="rose" />
              <KpiCard title="Total Batch Value" value="₹4.82 L" subtitle="Current inventory valuation" icon={Boxes} accentColor="mint" />
              <KpiCard title="Expiring in 60 Days" value="2 items" subtitle="FIFO batch flags" icon={Clock} accentColor="amber" />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[#0B263A] text-sm sm:text-base">Classical Ayurveda Pharmacy Stock Statement</h3>
                  <p className="text-xs text-slate-500">Real-time batch tracking, expiration dates, and unit quantities</p>
                </div>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D887E] hover:bg-[#0A6C64] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export to CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Item Code</th>
                      <th className="py-2.5 px-3">Medicine Formulation</th>
                      <th className="py-2.5 px-3">Classical Category</th>
                      <th className="py-2.5 px-3">Batch No</th>
                      <th className="py-2.5 px-3">Expiry Date</th>
                      <th className="py-2.5 px-3 text-right">In Stock</th>
                      <th className="py-2.5 px-3 text-right">Unit MRP</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pharmacyItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-medium text-[#0D887E]">{item.itemCode}</td>
                        <td className="py-2.5 px-3 font-medium text-[#0B263A]">{item.name}</td>
                        <td className="py-2.5 px-3 text-slate-600">{item.category}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-500">{item.batchNo}</td>
                        <td className="py-2.5 px-3 text-slate-600">{item.expiryDate}</td>
                        <td className="py-2.5 px-3 text-right font-medium text-slate-800">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-700">₹{item.mrp}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              item.status === 'Adequate'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case 'hr': {
        const handleExport = () => {
          const headers = ['Employee ID', 'Name', 'Designation', 'Department', 'Qualification', 'Experience (Yrs)', 'Status'];
          const rows = faculty.map((f) => [
            f.employeeId,
            f.name,
            f.designation,
            f.department,
            f.qualification,
            f.experienceYears,
            f.status,
          ]);
          downloadCSV(headers, rows, `PMRG_Faculty_Roster_${new Date().toISOString().split('T')[0]}`);
        };

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <KpiCard title="Total Teaching Faculty" value={faculty.length} subtitle="14 Statutory Departments" icon={Users} accentColor="navy" />
              <KpiCard title="Active On Duty" value={faculty.filter((f) => f.status === 'Active').length} subtitle="NCISM Schedule 1 Norms" icon={CheckCircle2} accentColor="mint" />
              <KpiCard title="Biometric Integration" value="100%" subtitle="Punch sync active" icon={ShieldCheck} accentColor="teal" />
              <KpiCard title="Avg Experience" value="11.4 Yrs" subtitle="Senior Vaidyas & Scholars" icon={GraduationCap} accentColor="mint" />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[#0B263A] text-sm sm:text-base">Statutory Faculty Roster (NCISM MSR Format)</h3>
                  <p className="text-xs text-slate-500">Designation, qualification, department, and teacher code</p>
                </div>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D887E] hover:bg-[#0A6C64] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export to CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Employee ID</th>
                      <th className="py-2.5 px-3">Faculty Name</th>
                      <th className="py-2.5 px-3">Designation</th>
                      <th className="py-2.5 px-3">Department</th>
                      <th className="py-2.5 px-3">Qualifications</th>
                      <th className="py-2.5 px-3 text-center">Experience</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {faculty.map((f) => (
                      <tr key={f.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-medium text-[#0D887E]">{f.employeeId}</td>
                        <td className="py-2.5 px-3 font-medium text-[#0B263A]">{f.name}</td>
                        <td className="py-2.5 px-3 text-slate-800">{f.designation}</td>
                        <td className="py-2.5 px-3 text-slate-600">{f.department}</td>
                        <td className="py-2.5 px-3 text-slate-600">{f.qualification}</td>
                        <td className="py-2.5 px-3 text-center text-slate-700">{f.experienceYears} Yrs</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                            {f.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case 'compliance': {
        const handleExport = () => {
          const headers = ['Doc Code', 'Title', 'Category', 'Department', 'Owner', 'Review Date', 'Status'];
          const rows = compliance.map((c) => [
            c.docCode,
            c.title,
            c.category,
            c.department,
            c.owner,
            c.lastReviewDate,
            c.status,
          ]);
          downloadCSV(headers, rows, `PMRG_Institutional_Compliance_Report_${new Date().toISOString().split('T')[0]}`);
        };

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <KpiCard title="Evidence Documents" value={compliance.length} subtitle="Indexed statutory packs" icon={ShieldCheck} accentColor="navy" />
              <KpiCard title="Verified Ready" value={compliance.filter((c) => c.status === 'Verified Ready').length} subtitle="Inspection clearance" icon={CheckCircle2} accentColor="mint" />
              <KpiCard title="Research Grants" value={research.length} subtitle="Active extramural trials" icon={Microscope} accentColor="teal" />
              <KpiCard title="Total Research Budget" value="₹85.6 L" subtitle="CCRAS & NMPB funded" icon={Building} accentColor="mint" />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[#0B263A] text-sm sm:text-base">Institutional Accreditation Dossier Register</h3>
                  <p className="text-xs text-slate-500">Statutory inspection documentation status across academic & clinical wings</p>
                </div>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D887E] hover:bg-[#0A6C64] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export to CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Dossier Code</th>
                      <th className="py-2.5 px-3">Title</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Department</th>
                      <th className="py-2.5 px-3">Owner</th>
                      <th className="py-2.5 px-3">Review Date</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {compliance.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-medium text-[#0D887E]">{c.docCode}</td>
                        <td className="py-2.5 px-3 font-medium text-[#0B263A]">{c.title}</td>
                        <td className="py-2.5 px-3 text-slate-600">{c.category}</td>
                        <td className="py-2.5 px-3 text-slate-600">{c.department}</td>
                        <td className="py-2.5 px-3 text-slate-500">{c.owner}</td>
                        <td className="py-2.5 px-3 text-slate-500">{c.lastReviewDate}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              c.status === 'Verified Ready'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const tabs: { key: ReportTab; label: string; icon: React.ReactNode }[] = [
    { key: 'finance', label: 'Finance & Collections', icon: <CreditCard className="w-4 h-4" /> },
    { key: 'academics', label: 'Academics & Enrolment', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'hospital', label: 'Hospital & Census', icon: <Stethoscope className="w-4 h-4" /> },
    { key: 'panchakarma', label: 'Panchakarma Operations', icon: <Activity className="w-4 h-4" /> },
    { key: 'pharmacy', label: 'Pharmacy & Batches', icon: <Pill className="w-4 h-4" /> },
    { key: 'hr', label: 'HR & MSR Roster', icon: <Users className="w-4 h-4" /> },
    { key: 'compliance', label: 'NCISM & Compliance', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0B263A] tracking-tight">Institutional Report Centre</h1>
            <span className="bg-[#0D887E]/10 text-[#0D887E] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#0D887E]/20">
              Cross-Module
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time operational, clinical, and statutory statements with client-side CSV exports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            Print View
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-white text-[#0B263A] shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search within active report statement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0D887E]/20 focus:border-[#0D887E]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0D887E]/20"
          >
            <option>Current Academic Session (2025-26)</option>
            <option>Previous Financial Year (2024-25)</option>
            <option>Last 30 Days Hospital Window</option>
          </select>
        </div>
      </div>

      {/* Active Tab Report Content */}
      {renderReportContent()}
    </div>
  );
};

export default ReportsPage;
