import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { KpiCard } from '../../components/common/KpiCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Link } from 'react-router-dom';
import {
  Building2,
  Stethoscope,
  BedDouble,
  HeartPulse,
  Pill,
  Sparkles,
  ArrowRight,
  Clock,
  UserPlus,
  Plus,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const HospitalPage: React.FC = () => {
  const { opdVisits, ipdAdmissions, patients, panchakarmaBookings } = useDemo();

  const activeAdmissions = ipdAdmissions.filter((a) => a.admissionStatus === 'Admitted');
  const waitingOpdCount = opdVisits.filter((v) => v.queueStatus === 'Waiting').length;
  const inConsultCount = opdVisits.filter((v) => v.queueStatus === 'In Consultation').length;
  const completedOpdCount = opdVisits.filter((v) => v.queueStatus === 'Completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-[#0D887E]" />
            <span>Ayurveda Teaching Hospital Command Center</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Integrated Marley Health clinical encounters, OPD tokens, IPD bed census, and ward rounds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/app/patients"
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs flex items-center space-x-1.5"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#0D887E]" />
            <span>Register Patient</span>
          </Link>
          <Link
            to="/app/opd"
            className="px-3.5 py-2 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-xs flex items-center space-x-1.5"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Manage OPD Queue</span>
          </Link>
        </div>
      </div>

      {/* Hospital KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard
          title="Today's OPD Visits"
          value={opdVisits.length}
          subtitle={`${waitingOpdCount} waiting · ${inConsultCount} in consult`}
          icon={Stethoscope}
          trend={{ value: '15 Tokens', isPositive: true, label: 'Active today' }}
          linkTo="/app/opd"
          accentColor="teal"
        />

        <KpiCard
          title="IPD Bed Occupancy"
          value={`${activeAdmissions.length} / 8 Beds`}
          subtitle="87.5% current bed utilization"
          icon={BedDouble}
          trend={{ value: '71.4%', isPositive: true, label: 'NCISM minimum satisfied' }}
          linkTo="/app/ipd"
          accentColor="mint"
        />

        <KpiCard
          title="Registered Patients"
          value={patients.length}
          subtitle="20 active hospital patient files"
          icon={HeartPulse}
          trend={{ value: '100%', isPositive: true, label: 'UHID linked' }}
          linkTo="/app/patients"
          accentColor="navy"
        />

        <KpiCard
          title="Panchakarma Sessions"
          value={panchakarmaBookings.length}
          subtitle="12 bookings for Shirodhara, Basti, etc."
          icon={Sparkles}
          trend={{ value: '4 suites', isPositive: true, label: 'Capacity full' }}
          linkTo="/app/panchakarma"
          accentColor="mint"
        />
      </div>

      {/* Hospital Real-Time Census Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active OPD Queue Preview */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-4 h-4 text-[#0D887E]" />
                <h3 className="font-bold text-sm text-[#0B263A]">Live OPD Consultation Queue</h3>
              </div>
              <Link to="/app/opd" className="text-xs font-bold text-[#0D887E] hover:underline">
                Full Queue →
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {opdVisits.slice(0, 5).map((visit) => (
                <div key={visit.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-[#0D887E]">Token #{visit.tokenNo}</span>
                      <span className="font-bold text-[#0B263A]">{visit.patientName}</span>
                      <span className="text-[10px] text-slate-400">({visit.uhid})</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {visit.department} · {visit.practitionerName} ({visit.visitTime})
                    </p>
                  </div>
                  <StatusBadge status={visit.queueStatus} size="sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Completed: {completedOpdCount} consultations today</span>
            <Link to="/app/opd" className="font-bold text-[#0D887E] hover:underline flex items-center">
              <span>View Consultations</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>

        {/* Right: Active Inpatient Ward Census */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <BedDouble className="w-4 h-4 text-[#0D887E]" />
                <h3 className="font-bold text-sm text-[#0B263A]">IPD Inpatient Ward Occupancy</h3>
              </div>
              <Link to="/app/ipd" className="text-xs font-bold text-[#0D887E] hover:underline">
                Manage Beds →
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {ipdAdmissions.slice(0, 5).map((adm) => (
                <div key={adm.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px]">
                        Bed {adm.bedNo}
                      </span>
                      <span className="font-bold text-[#0B263A]">{adm.patientName}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {adm.ward} · Diag: {adm.primaryDiagnosis}
                    </p>
                  </div>
                  <StatusBadge status={adm.admissionStatus} size="sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{activeAdmissions.length} active beds occupied</span>
            <Link to="/app/ipd" className="font-bold text-[#0D887E] hover:underline flex items-center">
              <span>Discharge & Bed Allocations</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
