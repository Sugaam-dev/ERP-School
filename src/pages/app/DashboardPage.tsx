import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { KpiCard } from '../../components/common/KpiCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  Building2,
  BedDouble,
  CircleDollarSign,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  Pill,
  Calendar,
  CheckCircle2,
  Bot,
  Activity,
  FileCheck2,
  Stethoscope,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const {
    students,
    faculty,
    opdVisits,
    ipdAdmissions,
    fees,
    pharmacyItems,
    admissions,
    timetable,
    exams,
    logbooks,
    panchakarmaBookings,
    currentUser,
  } = useDemo();

  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('month');

  // Dynamic calculations from mock dataset
  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const todayOpd = opdVisits.length;
  const activeIpd = ipdAdmissions.filter((a) => a.admissionStatus === 'Admitted').length;

  const totalCollected = fees.reduce((acc, f) => acc + f.amountPaid, 0);
  const totalOutstanding = fees.reduce((acc, f) => acc + f.balanceDue, 0);

  const lowStockOrNearExpiry = pharmacyItems.filter(
    (p) => p.status === 'Low Stock' || p.status === 'Near Expiry' || p.status === 'Expired'
  ).length;

  const pendingApprovalsCount =
    admissions.filter((a) => a.status === 'Submitted' || a.status === 'Under Review').length +
    logbooks.filter((l) => l.status === 'Pending Review').length;

  // Chart Data 1: Monthly Fee Collection Trend (INR Lakhs)
  const feeCollectionData = [
    { month: 'Jun', tuition: 18.5, hostel: 4.2 },
    { month: 'Jul', tuition: 24.0, hostel: 6.8 },
    { month: 'Aug', tuition: 42.5, hostel: 12.0 },
    { month: 'Sep', tuition: 36.2, hostel: 8.5 },
    { month: 'Oct (MTD)', tuition: 15.8, hostel: 3.2 },
  ];

  // Chart Data 2: Student Distribution by Academic Prof
  const studentDistributionData = [
    { name: '1st Prof (PG/Diploma)', count: 5, fill: '#0D887E' },
    { name: '2nd Prof (2023-28)', count: 10, fill: '#2E6994' },
    { name: '3rd Prof (2022-27)', count: 10, fill: '#79D4BD' },
    { name: 'Final Prof (2021-26)', count: 10, fill: '#0B263A' },
    { name: 'Internship (2020-25)', count: 5, fill: '#D97706' },
  ];

  // Chart Data 3: OPD Visits by Department
  const opdDeptData = [
    { dept: 'Kaya Chikitsa', count: 6 },
    { dept: 'Panchakarma', count: 4 },
    { dept: 'Prasuti Tantra', count: 2 },
    { dept: 'Shalya Tantra', count: 2 },
    { dept: 'Shalakya', count: 1 },
  ];

  // Chart Data 4: Pharmacy Inventory Health Status
  const pharmacyStatusData = [
    { name: 'Adequate Stock', count: pharmacyItems.filter((i) => i.status === 'Adequate').length, color: '#10B981' },
    { name: 'Low Stock', count: pharmacyItems.filter((i) => i.status === 'Low Stock').length, color: '#F59E0B' },
    { name: 'Near Expiry', count: pharmacyItems.filter((i) => i.status === 'Near Expiry').length, color: '#F43F5E' },
    { name: 'Expired/Quarantined', count: pharmacyItems.filter((i) => i.status === 'Expired').length, color: '#64748B' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0B263A] via-[#113854] to-[#0B263A] text-white p-6 rounded-2xl shadow-sm border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0D887E]/30 text-[#79D4BD] border border-[#79D4BD]/30 uppercase tracking-wider">
              Ayurveda Campus Command Center
            </span>
            <span className="text-xs text-slate-400">· Term 2026-27</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Welcome, {currentUser.name}
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Unified institutional oversight across <span className="text-[#79D4BD] font-semibold">Academics</span>, the <span className="text-[#79D4BD] font-semibold">Teaching Hospital</span>, and <span className="text-[#79D4BD] font-semibold">PMRG Ayurveda Operations</span>.
          </p>
        </div>

        {/* Time filter selector */}
        <div className="flex items-center space-x-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-700/60 text-xs self-start md:self-auto">
          {(['today', 'week', 'month'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(t)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                timeFilter === t
                  ? 'bg-[#0D887E] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === 'today' ? "Today's View" : t === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI STATS GRID (8 Key Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Students"
          value={totalStudents}
          subtitle="40 active across 4 BAMS batches & PG"
          icon={Users}
          trend={{ value: '100%', isPositive: true, label: 'Enrolment capacity' }}
          linkTo="/app/students"
          accentColor="teal"
        />

        <KpiCard
          title="Faculty & Teaching Staff"
          value={totalFaculty}
          subtitle="12 Ayurvedic professors & HODs"
          icon={GraduationCap}
          trend={{ value: '100%', isPositive: true, label: 'MSR statutory norm' }}
          linkTo="/app/hr"
          accentColor="navy"
        />

        <KpiCard
          title="Today's OPD Visits"
          value={todayOpd}
          subtitle="15 active tokens in hospital queue"
          icon={Stethoscope}
          trend={{ value: '+18%', isPositive: true, label: 'vs last week' }}
          linkTo="/app/opd"
          accentColor="mint"
        />

        <KpiCard
          title="Active IPD Beds"
          value={`${activeIpd} / 8`}
          subtitle="87.5% current bed occupancy rate"
          icon={BedDouble}
          trend={{ value: '71.4%', isPositive: true, label: 'NCISM verified avg' }}
          linkTo="/app/ipd"
          accentColor="teal"
        />

        <KpiCard
          title="Fee Collection (MTD)"
          value={`₹${(totalCollected / 100000).toFixed(2)} L`}
          subtitle="₹69.50 Lakhs collected"
          icon={CircleDollarSign}
          trend={{ value: '92.8%', isPositive: true, label: 'Collection rate' }}
          linkTo="/app/finance"
          accentColor="mint"
        />

        <KpiCard
          title="Outstanding Fees"
          value={`₹${(totalOutstanding / 100000).toFixed(2)} L`}
          subtitle="3 students overdue past grace period"
          icon={TrendingUp}
          trend={{ value: '4 accounts', isPositive: false, label: 'Need follow-up' }}
          linkTo="/app/finance"
          accentColor="rose"
        />

        <KpiCard
          title="Pharmacy Stock Alerts"
          value={lowStockOrNearExpiry}
          subtitle="Avipattikar, Rasnasaptaka & Jatyadi"
          icon={Pill}
          trend={{ value: '3 items', isPositive: false, label: 'Reorder / expiry' }}
          linkTo="/app/pharmacy"
          accentColor="amber"
        />

        <KpiCard
          title="Pending Approvals"
          value={pendingApprovalsCount}
          subtitle="Admissions & Clinical logbooks"
          icon={Clock}
          trend={{ value: 'Needs action', isPositive: false, label: 'Faculty & Dean' }}
          linkTo="/app/clinical-logbooks"
          accentColor="teal"
        />
      </div>

      {/* CHARTS ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Fee Collection Trend */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0B263A]">Fee Collections Trend (₹ Lakhs)</h3>
              <p className="text-xs text-slate-500">Tuition vs Hostel & Paramedical Collections</p>
            </div>
            <Link to="/app/finance" className="text-xs font-bold text-[#0D887E] hover:underline flex items-center">
              <span>Fee Ledgers</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={feeCollectionData}>
                <defs>
                  <linearGradient id="tuitionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D887E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0D887E" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="hostelGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E6994" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2E6994" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  formatter={(value: any) => [`₹${value} Lakhs`, '']}
                  contentStyle={{ backgroundColor: '#0B263A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="tuition" name="Tuition & Labs" stroke="#0D887E" strokeWidth={2} fillOpacity={1} fill="url(#tuitionGrad)" />
                <Area type="monotone" dataKey="hostel" name="Hostel & Amenities" stroke="#2E6994" strokeWidth={2} fillOpacity={1} fill="url(#hostelGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Distribution by Batch */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#0B263A]">Student Batch Distribution</h3>
                <p className="text-xs text-slate-500">40 Enrolled Scholars</p>
              </div>
              <Link to="/app/students" className="text-xs font-bold text-[#0D887E] hover:underline">
                Directory →
              </Link>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={studentDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {studentDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val} Students`, 'Count']}
                    contentStyle={{ backgroundColor: '#0B263A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {studentDistributionData.map((b) => (
              <div key={b.name} className="flex items-center justify-between text-slate-600">
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: b.fill }} />
                  {b.name}
                </span>
                <span className="font-bold text-[#0B263A]">{b.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* OPD Visits by Department */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0B263A]">Hospital OPD Consultations Today</h3>
              <p className="text-xs text-slate-500">Distribution across 5 Ayurvedic departments</p>
            </div>
            <Link to="/app/opd" className="text-xs font-bold text-[#0D887E] hover:underline">
              View Queue →
            </Link>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={opdDeptData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis dataKey="dept" type="category" width={110} tick={{ fontSize: 11, fill: '#0B263A', fontWeight: 600 }} />
                <Tooltip
                  formatter={(val: any) => [`${val} Patients`, 'Visits']}
                  contentStyle={{ backgroundColor: '#0B263A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#0D887E" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pharmacy Inventory Health */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0B263A]">Ayurvedic Pharmacy Stock Health</h3>
              <p className="text-xs text-slate-500">25 Classical formulations & raw drugs</p>
            </div>
            <Link to="/app/pharmacy" className="text-xs font-bold text-[#0D887E] hover:underline">
              Inventory Master →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 my-2">
            {pharmacyStatusData.map((item) => (
              <div key={item.name} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3">
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <p className="text-xs text-slate-500 font-medium">{item.name}</p>
                  <p className="text-lg font-bold text-[#0B263A]">{item.count} items</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-amber-600 mr-2 flex-shrink-0" />
              <span>Avipattikar Churna (24 pkts) & Rasnasaptaka (expires 15 Nov) require attention.</span>
            </span>
            <Link to="/app/pharmacy" className="font-bold text-amber-700 hover:underline ml-2">
              Review
            </Link>
          </div>
        </div>
      </div>

      {/* OPERATIONAL PANELS GRID (4 Panels) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Panel 1: Today's Timetable */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-[#0B263A] font-bold text-sm">
                <Calendar className="w-4 h-4 text-[#0D887E]" />
                <span>Today's Classes</span>
              </div>
              <Link to="/app/academics" className="text-[11px] font-bold text-[#0D887E] hover:underline">
                Full →
              </Link>
            </div>

            <div className="mt-3 space-y-2.5">
              {timetable.slice(0, 3).map((t) => (
                <div key={t.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-slate-500 text-[10px]">
                    <span className="font-semibold text-[#0D887E]">{t.timeSlot}</span>
                    <span>{t.batch}</span>
                  </div>
                  <h4 className="font-bold text-[#0B263A] mt-0.5 truncate">{t.subject}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{t.facultyName} · {t.room}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/app/academics"
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500 hover:text-[#0D887E] flex items-center justify-between"
          >
            <span>{timetable.length} sessions scheduled</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Panel 2: OPD Live Queue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-[#0B263A] font-bold text-sm">
                <Stethoscope className="w-4 h-4 text-[#0D887E]" />
                <span>Live OPD Queue</span>
              </div>
              <Link to="/app/opd" className="text-[11px] font-bold text-[#0D887E] hover:underline">
                Queue →
              </Link>
            </div>

            <div className="mt-3 space-y-2.5">
              {opdVisits.slice(0, 3).map((v) => (
                <div key={v.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0B263A]">Token #{v.tokenNo}</span>
                    <StatusBadge status={v.queueStatus} size="sm" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mt-0.5 truncate">{v.patientName}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{v.department} ({v.visitTime})</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/app/opd"
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500 hover:text-[#0D887E] flex items-center justify-between"
          >
            <span>{opdVisits.filter((v) => v.queueStatus === 'Waiting').length} patients waiting</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Panel 3: Panchakarma Schedule */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-[#0B263A] font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Panchakarma Sessions</span>
              </div>
              <Link to="/app/panchakarma" className="text-[11px] font-bold text-[#0D887E] hover:underline">
                Center →
              </Link>
            </div>

            <div className="mt-3 space-y-2.5">
              {panchakarmaBookings.slice(0, 3).map((b) => (
                <div key={b.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-700">{b.therapyType}</span>
                    <StatusBadge status={b.sessionStatus} size="sm" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mt-0.5 truncate">{b.patientName}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{b.timeSlot} · {b.roomNo}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/app/panchakarma"
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500 hover:text-[#0D887E] flex items-center justify-between"
          >
            <span>{panchakarmaBookings.length} total appointments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Panel 4: AI Operational Summary */}
        <div className="bg-gradient-to-br from-[#0B263A] to-[#123854] text-white p-5 rounded-2xl shadow-xs flex flex-col justify-between border border-slate-800">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <Bot className="w-4 h-4 text-[#79D4BD]" />
                <span>AI Operational Brief</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-[#79D4BD] font-bold">
                Assisted
              </span>
            </div>

            <div className="mt-3 text-xs text-slate-300 space-y-2">
              <p className="leading-snug">
                <strong>Hospital Census:</strong> 15 OPD visits, 7 active IPD beds (87.5% occupancy).
              </p>
              <p className="leading-snug">
                <strong>Attention Required:</strong> 3 pharmacy items near reorder/expiry; 3 student fees overdue.
              </p>
              <p className="text-[11px] text-[#79D4BD] italic leading-snug pt-1">
                "AI prepares. Authorised staff review and decide."
              </p>
            </div>
          </div>

          <Link
            to="/app/ai-assistant"
            className="mt-4 pt-3 border-t border-slate-700 text-xs font-bold text-[#79D4BD] hover:text-white flex items-center justify-between"
          >
            <span>Open AI Assistant Screen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
