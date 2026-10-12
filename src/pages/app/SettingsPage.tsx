import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Calendar,
  Users,
  Database,
  RotateCcw,
  ShieldAlert,
  Save,
  CheckCircle2,
  Layers,
  Sparkles,
  ExternalLink,
  Sliders,
  Mail,
  Palette
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { Modal } from '../../components/common/Modal';

export const SettingsPage: React.FC = () => {
  const {
    currentUser,
    personas,
    loginAsPersona,
    resetDemoData,
    showToast,
  } = useDemo();

  const [activeTab, setActiveTab] = useState<'institution' | 'academic' | 'roles' | 'system' | 'demo'>('institution');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Institution profile form state
  const [instName, setInstName] = useState('PMRG Model Ayurveda Medical College & Hospital');
  const [instCode, setInstCode] = useState('PMRG-AYU-DEL-04');
  const [affiliation, setAffiliation] = useState('Affiliated with State Ayush University | Approved by NCISM, New Delhi');
  const [contactEmail, setContactEmail] = useState('support@pmrgsolution.com');
  const [phone, setPhone] = useState('+91 11 4987 6500');
  const [address, setAddress] = useState('Sector 12, Institutional Area, Knowledge Park V, New Delhi - 110001');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Institutional settings updated (Session persistent).', 'success');
  };

  const handleResetConfirm = () => {
    resetDemoData();
    setIsResetModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0B263A] tracking-tight">System Settings & Institution Configuration</h1>
            <span className="bg-[#0D887E]/10 text-[#0D887E] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#0D887E]/20">
              Control Panel
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Institutional metadata, academic session rules, role configurations, and demo state management.
          </p>
        </div>

        <button
          onClick={() => setIsResetModalOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold shadow-sm transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo Data
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        <button
          onClick={() => setActiveTab('institution')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'institution'
              ? 'bg-white text-[#0B263A] shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#0D887E]" />
          Institution Profile
        </button>
        <button
          onClick={() => setActiveTab('academic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'academic'
              ? 'bg-white text-[#0B263A] shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#0D887E]" />
          Academic Calendar & Terms
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'roles'
              ? 'bg-white text-[#0B263A] shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-[#0D887E]" />
          Personas & Access Controls
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'system'
              ? 'bg-white text-[#0B263A] shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-[#0D887E]" />
          Architecture & Ecosystem
        </button>
        <button
          onClick={() => setActiveTab('demo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'demo'
              ? 'bg-white text-[#0B263A] shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Database className="w-4 h-4 text-[#0D887E]" />
          POC State & Reset
        </button>
      </div>

      {/* Tab: Institution Profile */}
      {activeTab === 'institution' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#0B263A] mb-1">Campus Metadata & Statutory Registrations</h3>
            <p className="text-xs text-slate-500 mb-6">Details displayed across institutional reports, fee receipts, and patient prescriptions</p>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">College & Hospital Name</label>
                  <input
                    type="text"
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0D887E]/20 focus:border-[#0D887E]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Statutory Institutional Code</label>
                  <input
                    type="text"
                    value={instCode}
                    onChange={(e) => setInstCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0D887E]/20 focus:border-[#0D887E]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Affiliation & Regulatory Recognition</label>
                <input
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0D887E]/20 focus:border-[#0D887E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Solution Contact Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0D887E]/20 focus:border-[#0D887E]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Administrative Helpdesk Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0D887E]/20 focus:border-[#0D887E]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Campus Physical Address</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0D887E]/20 focus:border-[#0D887E]"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0D887E] hover:bg-[#0A6C64] text-white font-semibold rounded-lg shadow-sm text-xs transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Configuration
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
                <img src="/pmrg-logo.png" alt="PMRG Solution" className="h-10 w-auto object-contain" />
              </div>
              <h4 className="font-semibold text-[#0B263A] text-sm flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#0D887E]" />
                PMRG Solution LLP Design System
              </h4>
              <p className="text-xs text-slate-500">
                Calibrated enterprise healthcare-and-education palette matching PMRG pitch direction:
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#0B263A] border border-black/10 inline-block" />
                    <span className="font-medium text-slate-800">Deep Navy</span>
                  </div>
                  <span className="font-mono text-slate-500">#0B263A</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#0D887E] border border-black/10 inline-block" />
                    <span className="font-medium text-slate-800">Ayurveda Teal</span>
                  </div>
                  <span className="font-mono text-slate-500">#0D887E</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#79D4BD] border border-black/10 inline-block" />
                    <span className="font-medium text-slate-800">Herbal Mint</span>
                  </div>
                  <span className="font-mono text-slate-500">#79D4BD</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#F5F8FA] border border-slate-300 inline-block" />
                    <span className="font-medium text-slate-800">Canvas Surface</span>
                  </div>
                  <span className="font-mono text-slate-500">#F5F8FA</span>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-xs text-teal-900 space-y-1.5">
              <div className="font-semibold flex items-center gap-1.5 text-[#0D887E]">
                <Mail className="w-3.5 h-3.5" />
                Solution Inquiries & Support
              </div>
              <p className="text-slate-600">
                PMRG Solution LLP Implementation Directorate:
              </p>
              <a
                href="mailto:support@pmrgsolution.com"
                className="font-medium text-[#0D887E] underline block"
              >
                support@pmrgsolution.com
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Academic Calendar & Terms */}
      {activeTab === 'academic' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#0B263A]">Academic Sessions & Professional Years</h3>
              <p className="text-xs text-slate-500">Configured NCISM BAMS curriculum batches and PG calendars</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              Active Session: 2025–26
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0B263A]">BAMS 2nd Professional</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">Active</span>
              </div>
              <p className="text-slate-600">Batch 2023–28 (60 Enrolled Students)</p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                Terms: Term 1 Theory & Dravyaguna Lab Postings
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0B263A]">BAMS 3rd Professional</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">Active</span>
              </div>
              <p className="text-slate-600">Batch 2022–27 (60 Enrolled Students)</p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                Terms: Roganidana, Charaka Uttarardha, Swasthavritta
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0B263A]">BAMS Final Prof & Interns</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">Active</span>
              </div>
              <p className="text-slate-600">Batch 2021–26 (Rotary Clinical Postings)</p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                Terms: Kaya Chikitsa, Shalya, Shalakya, Panchakarma Bedside
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">Academic Calendar Rules:</div>
            <ul className="list-disc list-inside space-y-1">
              <li>Minimum attendance required for examination hall ticket: <strong>75% Theory, 80% Clinical Practicals</strong>.</li>
              <li>NCISM syllabus reforms 2022 integration: 3 Elective courses mandated for 2nd Prof.</li>
              <li>Compulsory Rotary Internship: 12 Calendar Months across IPD, OPD, and PHC Postings.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab: Personas & Access Controls */}
      {activeTab === 'roles' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#0B263A]">Predefined Demonstration Personas</h3>
              <p className="text-xs text-slate-500">Switch active user role instantly to evaluate department-specific views</p>
            </div>
            <div className="text-xs text-slate-500">
              Current Active: <strong className="text-[#0D887E]">{currentUser.name} ({currentUser.role})</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map((persona) => {
              const isActive = currentUser.id === persona.id;
              return (
                <div
                  key={persona.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isActive
                      ? 'border-[#0D887E] bg-teal-50/50 shadow-sm ring-1 ring-[#0D887E]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-[#0B263A] text-xs">{persona.name}</div>
                      <div className="text-[11px] text-[#0D887E] font-medium mt-0.5">{persona.role}</div>
                    </div>
                    {isActive ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0D887E] text-white">
                        Active
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          loginAsPersona(persona.id);
                          showToast(`Switched active persona to ${persona.name}`, 'info');
                        }}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
                      >
                        Switch
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2">{persona.email}</p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                    <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                      {persona.roleTitle}
                    </span>
                    <span className="text-[9px] bg-teal-50 text-[#0D887E] px-1.5 py-0.5 rounded font-medium">
                      {persona.department}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: System Architecture & Ecosystem */}
      {activeTab === 'system' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-semibold text-[#0B263A]">Platform Architecture (Slide 3 Model)</h3>
            <p className="text-xs text-slate-500">Core ERP configuration, companion engines, and PMRG custom Ayurveda workflows</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Layer 1 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex items-center gap-2 text-[#0B263A] font-bold">
                <span className="w-5 h-5 rounded-full bg-[#0B263A] text-white flex items-center justify-center text-[10px]">1</span>
                Core ERP — Configure
              </div>
              <p className="text-slate-600">Enterprise operational backbone built on open foundation:</p>
              <ul className="space-y-1.5 text-slate-700 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Accounts & Institutional Budgets
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Buying & Supplier Purchase Orders
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Batch Stock & Expiry Control
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fixed Assets & Maintenance Schedules
                </li>
              </ul>
              <div className="text-[10px] text-slate-500 bg-white p-2 rounded border border-slate-200">
                Status: Simulated Local State (POC Active)
              </div>
            </div>

            {/* Layer 2 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex items-center gap-2 text-[#0B263A] font-bold">
                <span className="w-5 h-5 rounded-full bg-[#0D887E] text-white flex items-center justify-center text-[10px]">2</span>
                Companion Apps — Validate
              </div>
              <p className="text-slate-600">Domain companion modules integrated into unified schema:</p>
              <ul className="space-y-1.5 text-slate-700 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Frappe Education (Admissions, Exams)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Frappe HR (Staff Rosters, Leaves)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Marley Health (Hospital EMR & Wards)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Campus LMS & Library Circulation
                </li>
              </ul>
              <div className="text-[10px] text-slate-500 bg-white p-2 rounded border border-slate-200">
                Status: Simulated Companion Engine Integration
              </div>
            </div>

            {/* Layer 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-teal-50/40 space-y-3">
              <div className="flex items-center gap-2 text-[#0B263A] font-bold">
                <span className="w-5 h-5 rounded-full bg-[#79D4BD] text-[#0B263A] flex items-center justify-center text-[10px]">3</span>
                PMRG Extensions — Customise
              </div>
              <p className="text-slate-600">Ayurveda-specific specialized clinical and compliance IP:</p>
              <ul className="space-y-1.5 text-slate-700 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D887E]" /> Rogi Pariksha & Prakriti Profiling
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D887E]" /> Panchakarma 7-Step Clinical Workflow
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D887E]" /> Classical Formulary (Asava, Bhasma)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D887E]" /> NCISM Inspection Evidence Compiler
                </li>
              </ul>
              <div className="text-[10px] text-[#0D887E] bg-white p-2 rounded border border-teal-200 font-semibold">
                Status: Fully Functional Frontend POC IP
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Demo State Management */}
      {activeTab === 'demo' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-semibold text-[#0B263A]">Proof of Concept (POC) State Management</h3>
            <p className="text-xs text-slate-500">
              Manage client-side browser storage and restore initial mock demonstration data
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
            <div className="font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              Demo Environment Persistence Notice
            </div>
            <p className="text-slate-700">
              All interactions (new OPD patients, fee payments, student admissions, attendance updates, logbook sign-offs) are preserved in your browser&apos;s <code>localStorage</code>.
            </p>
            <p className="text-slate-700">
              If you wish to return the presentation to its pristine default baseline, click <strong>Reset Demo Data</strong> below.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Demo Data to Initial Mock Seed
            </button>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Confirm Demo State Reset"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 space-y-1">
            <p className="font-semibold">Reset to default state?</p>
            <p className="text-slate-600">
              This will restore all 40 students, 20 patients, 30 fee items, 15 compliance documents, and pharmacy inventories back to their original presentation state.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              onClick={() => setIsResetModalOpen(false)}
              className="px-3.5 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleResetConfirm}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
