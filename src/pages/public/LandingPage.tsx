import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Building2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronRight,
  Activity,
  Pill,
  Users,
  CircleDollarSign,
  Briefcase,
  Boxes,
  Home,
  BookMarked,
  Microscope,
  Bot,
  FileCheck2,
  CalendarCheck,
  Stethoscope,
  BarChart3,
  Mail,
  ExternalLink,
  Menu,
  X,
  FileSpreadsheet,
  UserPlus,
  BookOpenCheck,
  HeartPulse,
  BedDouble,
  ShoppingCart,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'student' | 'hospital' | 'pharmacy' | 'panchakarma'>('student');

  return (
    <div className="min-h-screen bg-[#F5F8FA] text-[#0B263A] flex flex-col font-sans selection:bg-[#79D4BD]/30 selection:text-[#0B263A]">
      {/* SECTION 1: PUBLIC NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#0B263A]/95 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D887E] to-[#79D4BD] flex items-center justify-center text-white font-extrabold text-base tracking-tighter shadow-md group-hover:scale-105 transition-transform">
              PMRG
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-white leading-none">
                PMRG Solution LLP
              </div>
              <span className="text-[11px] text-[#79D4BD] font-medium tracking-wide">
                Ayurveda College ERP & Digital Campus
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold text-slate-300">
            <a href="#overview" className="hover:text-white transition-colors">Overview</a>
            <a href="#opportunity" className="hover:text-white transition-colors">College Opportunity</a>
            <a href="#architecture" className="hover:text-white transition-colors">Platform Architecture</a>
            <a href="#modules" className="hover:text-white transition-colors">Modules</a>
            <a href="#workflows" className="hover:text-white transition-colors">Connected Workflows</a>
            <a href="#governance" className="hover:text-white transition-colors">Governance & AI</a>
            <a href="#outcomes" className="hover:text-white transition-colors">Measurable Outcomes</a>
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              to="/demo-login"
              className="text-xs font-bold text-slate-200 hover:text-white px-4 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              Demo Login
            </Link>
            <Link
              to="/demo-login"
              className="text-xs font-bold text-white bg-[#0D887E] hover:bg-[#0A7068] px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center space-x-1.5"
            >
              <span>Explore Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#081E2E] border-b border-slate-800 px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
              <a href="#overview" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Overview</a>
              <a href="#opportunity" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">College Opportunity</a>
              <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Platform Architecture</a>
              <a href="#modules" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Modules</a>
              <a href="#workflows" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Connected Workflows</a>
              <a href="#governance" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Governance & AI</a>
              <a href="#outcomes" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Measurable Outcomes</a>
              <a href="#roadmap" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Roadmap</a>
            </nav>
            <div className="pt-4 border-t border-slate-800 flex flex-col space-y-2">
              <Link
                to="/demo-login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-[#0D887E] text-white font-bold text-sm"
              >
                Launch Interactive Demo
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* SECTION 2: HERO SECTION */}
      <section id="overview" className="relative bg-gradient-to-b from-[#0B263A] via-[#0E334D] to-[#0B263A] text-white py-16 md:py-24 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#0D887E]/20 border border-[#79D4BD]/30 text-[#79D4BD] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PMRG Solution Pitch — Ayurveda College ERP & Digital Campus</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                One Institution.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#79D4BD] via-teal-300 to-white">
                  Connected Workflows.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Connect academics, the teaching hospital, Ayurveda-specific operations, and administration in one integrated digital campus.
              </p>

              {/* Three Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-xs">
                  <div className="text-xs font-bold text-[#79D4BD] uppercase tracking-wide">01. Academics</div>
                  <p className="text-xs text-slate-300 mt-1">Students · Faculty · Timetables · Logbooks</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-xs">
                  <div className="text-xs font-bold text-[#79D4BD] uppercase tracking-wide">02. Teaching Hospital</div>
                  <p className="text-xs text-slate-300 mt-1">Patients · OPD/IPD · Pharmacy · Panchakarma</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-xs">
                  <div className="text-xs font-bold text-[#79D4BD] uppercase tracking-wide">03. College Operations</div>
                  <p className="text-xs text-slate-300 mt-1">Finance · HR & Payroll · Campus Assets</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/demo-login"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#0D887E] hover:bg-[#0A7068] text-white shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 group"
                >
                  <span>Explore Interactive Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#modules"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  View Platform Modules
                </a>
              </div>

              <div className="pt-2 text-xs text-slate-400 flex items-center space-x-4">
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#79D4BD] mr-1.5" /> ERPNext + Frappe Ecosystem</span>
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#79D4BD] mr-1.5" /> Marley Health Hospital Integration</span>
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#79D4BD] mr-1.5" /> PMRG Custom Extensions</span>
              </div>
            </div>

            {/* Right Preview Card (Split Mockup) */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto rounded-2xl p-1 bg-gradient-to-tr from-[#0D887E] to-[#79D4BD] shadow-2xl">
                <div className="bg-[#081E2E] rounded-xl p-5 border border-slate-800 text-left">
                  {/* Top Bar inside mockup */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2">pmrg-ayurveda-erp.internal</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-900/60 text-[#79D4BD] border border-teal-700/50">
                      LIVE DEMO ACTIVE
                    </span>
                  </div>

                  {/* Mockup Quick Metrics */}
                  <div className="grid grid-cols-2 gap-3 my-4">
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">Active Students</p>
                      <h4 className="text-xl font-bold text-white mt-0.5">40 Enrolled</h4>
                      <p className="text-[10px] text-emerald-400 mt-1">4 BAMS & PG Batches</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">Hospital OPD Today</p>
                      <h4 className="text-xl font-bold text-white mt-0.5">15 Visits</h4>
                      <p className="text-[10px] text-teal-300 mt-1">Queue & Token Live</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">Panchakarma</p>
                      <h4 className="text-xl font-bold text-white mt-0.5">12 Bookings</h4>
                      <p className="text-[10px] text-emerald-400 mt-1">Abhyanga, Basti, Dhara</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">Pharmacy Stocks</p>
                      <h4 className="text-xl font-bold text-white mt-0.5">25 Classical Meds</h4>
                      <p className="text-[10px] text-amber-400 mt-1">Batch & Expiry Tracked</p>
                    </div>
                  </div>

                  {/* Mock Workflow Bar */}
                  <div className="p-3 rounded-lg bg-[#0B263A] border border-slate-700 text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-300 font-semibold">
                      <span>Connected Workflow Status</span>
                      <span className="text-[#79D4BD] text-[11px]">Synchronized</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#0D887E] to-[#79D4BD] h-2 rounded-full w-4/5" />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      Admissions → Fee Ledgers → Timetables → Clinical Postings → Supervised Hospital Encounters
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Predefined Demo Creds: admin / Admin@123</span>
                    <Link
                      to="/demo-login"
                      className="text-xs font-bold text-[#79D4BD] hover:underline flex items-center"
                    >
                      <span>Launch App</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE COLLEGE OPPORTUNITY (Slide 2) */}
      <section id="opportunity" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D887E]">
              Slide 02 / 11 — The College Opportunity
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B263A] tracking-tight mt-2">
              Solve the Gaps Between Departments
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Discovery focus: Where disconnected records create repeated work, delayed decisions, and fragmented service across academics and the teaching hospital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-[#F5F8FA] rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-[#0B263A]">Admissions & Fees</h3>
                <div className="mt-3 space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-rose-700 uppercase tracking-wider text-[10px] block">Daily Challenge:</span>
                    <p className="text-slate-600 mt-0.5">Disconnected forms, offline fee registers, and manual follow-ups between admissions and accounts.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0D887E] uppercase tracking-wider text-[10px] block">PMRG Solution Approach:</span>
                    <p className="text-slate-700 mt-0.5">Link application, enrolment, fee schedules, receipts, and student self-service into one profile.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <span className="text-xs font-bold text-[#0B263A]">Expected Value:</span>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">Quicker turnaround; clearer real-time collection status.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F5F8FA] rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-[#0B263A]">Academics & Training</h3>
                <div className="mt-3 space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-rose-700 uppercase tracking-wider text-[10px] block">Daily Challenge:</span>
                    <p className="text-slate-600 mt-0.5">Attendance, internal assessments, and clinical logbooks recorded in paper silos across departments.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0D887E] uppercase tracking-wider text-[10px] block">PMRG Solution Approach:</span>
                    <p className="text-slate-700 mt-0.5">Connect lecture schedules and exam marks with supervised clinical postings and signed digital logbooks.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <span className="text-xs font-bold text-[#0B263A]">Expected Value:</span>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">Better academic visibility; less manual record chasing.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F5F8FA] rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#0D887E] border border-teal-200 flex items-center justify-center font-bold mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-[#0B263A]">Hospital & Pharmacy</h3>
                <div className="mt-3 space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-rose-700 uppercase tracking-wider text-[10px] block">Daily Challenge:</span>
                    <p className="text-slate-600 mt-0.5">Separate patient case sheets, Panchakarma schedules, and standalone Ayurvedic medicine inventory.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0D887E] uppercase tracking-wider text-[10px] block">PMRG Solution Approach:</span>
                    <p className="text-slate-700 mt-0.5">Connect OPD/IPD queues, prescribed classical therapies, batch-linked dispensing, and billing.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <span className="text-xs font-bold text-[#0B263A]">Expected Value:</span>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">Coordinated care workflows; complete batch traceability.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#F5F8FA] rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-[#0B263A]">Management & Reviews</h3>
                <div className="mt-3 space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-rose-700 uppercase tracking-wider text-[10px] block">Daily Challenge:</span>
                    <p className="text-slate-600 mt-0.5">Regulatory reports and inspection evidence assembled manually under high pressure across teams.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0D887E] uppercase tracking-wider text-[10px] block">PMRG Solution Approach:</span>
                    <p className="text-slate-700 mt-0.5">Combine financial and clinical views with an indexed institutional evidence repository and AI assistance.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <span className="text-xs font-bold text-[#0B263A]">Expected Value:</span>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">Faster reviews; clearer departmental exception ownership.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-center">
            <p className="text-xs font-semibold text-[#0D887E]">
              The Goal: Less time reconciling disconnected records, more time teaching, serving patients, and running an exemplary Ayurvedic institution.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: PLATFORM ARCHITECTURE (Slide 3) */}
      <section id="architecture" className="py-20 bg-[#F5F8FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D887E]">
              Slide 03 / 11 — Proposed Solution Blueprint
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B263A] tracking-tight mt-2">
              Connected Platform Architecture
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Combine established open-source ERP capabilities with education and healthcare applications, then tailor the Ayurveda-specific workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Layer 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                    LAYER 1 · CONFIGURE
                  </span>
                  <Layers className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-[#0B263A]">ERPNext Core</h3>
                <p className="text-xs text-slate-500 mt-1">Enterprise foundational back-office modules.</p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#0D887E] mr-2 flex-shrink-0 mt-0.5" /> Accounts, cost centres & budgets</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#0D887E] mr-2 flex-shrink-0 mt-0.5" /> Buying, purchase requisitions & suppliers</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#0D887E] mr-2 flex-shrink-0 mt-0.5" /> Batch stock tracking & billing</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#0D887E] mr-2 flex-shrink-0 mt-0.5" /> Campus assets & preventive maintenance</li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
                Matured Frappe/ERPNext foundation proven globally.
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-white rounded-2xl border border-teal-200 p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -z-0" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-[#0D887E] border border-teal-200">
                    LAYER 2 · VALIDATE
                  </span>
                  <Building2 className="w-5 h-5 text-[#0D887E]" />
                </div>
                <h3 className="text-lg font-bold text-[#0B263A]">Companion Applications</h3>
                <p className="text-xs text-slate-500 mt-1">Specialist education and healthcare apps.</p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#0D887E] mr-2 flex-shrink-0 mt-0.5" /> <strong>Frappe Education:</strong> Student & program cycles</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#0D887E] mr-2 flex-shrink-0 mt-0.5" /> <strong>Frappe HR:</strong> Faculty roster, shifts & payroll</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#0D887E] mr-2 flex-shrink-0 mt-0.5" /> <strong>Marley Health:</strong> Hospital OPD/IPD clinical encounters</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-[#0D887E] mr-2 flex-shrink-0 mt-0.5" /> LMS & Library existing integrations</li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
                Compatible open maintainer releases integrated seamlessly.
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    LAYER 3 · TAILOR & EXTEND
                  </span>
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0B263A]">PMRG Custom Extensions</h3>
                <p className="text-xs text-slate-500 mt-1">Ayurveda-specific clinical & institutional workflows.</p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" /> Supervised clinical forms & student logbooks</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" /> Panchakarma scheduling & therapist/room booking</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" /> Campus services: Hostel, mess & grievances</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" /> Institutional evidence pack preparation & AI assistance</li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
                Designed specifically for Ayurveda college operating realities.
              </div>
            </div>
          </div>

          {/* Shared Enterprise Controls Banner */}
          <div className="mt-8 bg-[#0B263A] rounded-xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-[#79D4BD] flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold">Shared Enterprise Controls across All Layers</h4>
                <p className="text-xs text-slate-300">
                  Role-based access · Multi-level approvals · Immutable audit history · Standard REST APIs · Scheduled backup & recovery
                </p>
              </div>
            </div>
            <Link
              to="/demo-login"
              className="text-xs font-bold text-[#79D4BD] hover:text-white px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors whitespace-nowrap"
            >
              Verify Controls in Demo →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: PLATFORM MODULES */}
      <section id="modules" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D887E]">
              Interactive System Components
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B263A] tracking-tight mt-2">
              Explore All 23 Platform Modules
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Every major college and hospital workflow is represented in this interactive POC with realistic mock data and responsive views.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Admissions & Enrolment', desc: 'NEET verification, quota categorization, merit review, and student onboarding.', icon: UserPlus, path: '/app/admissions' },
              { title: 'Unified Student Directory', desc: 'Single student 360 view: academic records, attendance, dues, and clinical postings.', icon: Users, path: '/app/students' },
              { title: 'Academics & Timetables', desc: 'BAMS & PG program calendars, weekly master timetables, and classroom conflict checking.', icon: GraduationCap, path: '/app/academics' },
              { title: 'Attendance Register', desc: 'Daily batch and subject attendance, calculation of statutory percentages, and low-attendance alerts.', icon: CalendarCheck, path: '/app/attendance' },
              { title: 'Examinations & Marks', desc: 'Internal assessments, practical vivas, grade publishing, and university format export.', icon: FileCheck2, path: '/app/examinations' },
              { title: 'Clinical Logbooks', desc: 'Supervised clinical case exposure, Rogi Pariksha records, and faculty supervisor approval status.', icon: BookOpenCheck, path: '/app/clinical-logbooks' },
              { title: 'Teaching Hospital Overview', desc: 'OPD registrations, active ward beds, census metrics, and hospital encounters.', icon: Building2, path: '/app/hospital' },
              { title: 'Patient Registry', desc: 'Fictional patient profiles, Prakriti assessment, visit histories, and demographic registers.', icon: HeartPulse, path: '/app/patients' },
              { title: 'OPD Queue & Consultations', desc: 'Departmental token queue, waiting status, Vaidya consultation notes, and prescriptions.', icon: Stethoscope, path: '/app/opd' },
              { title: 'IPD Wards & Admissions', desc: 'Bed occupancy, ward transfers, daily clinical rounds, and discharge summaries.', icon: BedDouble, path: '/app/ipd' },
              { title: 'Ayurveda Pharmacy & Stock', desc: 'Batch-tracked churnas, asavas, tailas, expiry monitoring, reorders, and stock-out alerts.', icon: Pill, path: '/app/pharmacy' },
              { title: 'Panchakarma Center', desc: 'Abhyanga, Swedana, Shirodhara, and Basti bookings, therapist-room allocation, and consent logs.', icon: Sparkles, path: '/app/panchakarma' },
              { title: 'Finance & Fee Ledgers', desc: 'Tuition and hostel fee collection, installment ledgers, payment receipts, and balance dues.', icon: CircleDollarSign, path: '/app/finance' },
              { title: 'HR & Faculty Roster', desc: 'Ayurvedic teaching faculty designations, department staffing, shifts, and leave management.', icon: Briefcase, path: '/app/hr' },
              { title: 'Procurement & Stores', desc: 'Purchase requisitions for raw herbs, glassware, OT supplies, and supplier orders.', icon: ShoppingCart, path: '/app/procurement' },
              { title: 'Assets & Maintenance', desc: 'Panchakarma dronis, surgical OT units, classroom AV equipment, and maintenance schedules.', icon: Boxes, path: '/app/assets' },
              { title: 'Campus Services & Hostel', desc: 'Hostel maintenance, mess feedback, college transport bus routes, and student grievance cell.', icon: Home, path: '/app/campus-services' },
              { title: 'Library & Learning', desc: 'Classical Samhita catalogue, digital commentary access, and book issue/return tracking.', icon: BookMarked, path: '/app/library' },
              { title: 'Research & Outreach', desc: 'CCRAS and institutional research grants, Ethics committee approvals, and community health camps.', icon: Microscope, path: '/app/research' },
              { title: 'AI Assistant', desc: 'Simulated assistant summarizing operational statistics, low stock flags, and review preparation.', icon: Bot, path: '/app/ai-assistant' },
              { title: 'Compliance & Evidence', desc: 'NCISM annual inspection dossier preparation, bed occupancy audits, and verified document packs.', icon: ShieldCheck, path: '/app/compliance' },
            ].map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.title}
                  className="bg-[#F5F8FA] rounded-xl border border-slate-200 p-5 hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-[#0D887E] flex items-center justify-center mb-3 group-hover:bg-[#0D887E] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#0B263A] group-hover:text-[#0D887E] transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{mod.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">Interactive POC</span>
                    <Link
                      to="/demo-login"
                      className="text-xs font-bold text-[#0D887E] hover:underline flex items-center"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: CONNECTED WORKFLOWS */}
      <section id="workflows" className="py-20 bg-[#F5F8FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D887E]">
              End-to-End Operating Journeys
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B263A] tracking-tight mt-2">
              Visualizing Connected Institutional Journeys
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Experience how data travels seamlessly across academic and clinical units without duplicate data entry.
            </p>
          </div>

          {/* Workflow Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: 'student', label: 'Student Journey (Academics to Clinical)' },
              { id: 'hospital', label: 'Hospital Journey (Registration to Discharge)' },
              { id: 'pharmacy', label: 'Ayurveda Pharmacy (Purchase to Patient)' },
              { id: 'panchakarma', label: 'Panchakarma (Approved Plan to Review)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveWorkflowTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeWorkflowTab === tab.id
                    ? 'bg-[#0B263A] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Workflow Steps Container */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            {activeWorkflowTab === 'student' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#0B263A]">Comprehensive Student Academic & Clinical Pathway</h3>
                  <p className="text-xs text-slate-500 mt-1">From NEET counseling to supervised clinical postings and final degree completion.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-3">
                  {[
                    { step: '01', title: 'Admission', desc: 'NEET merit verification' },
                    { step: '02', title: 'Enrolment', desc: 'Batch & roll allocation' },
                    { step: '03', title: 'Fees', desc: 'Tuition & hostel schedule' },
                    { step: '04', title: 'Timetable', desc: 'Samhita & lab slots' },
                    { step: '05', title: 'Attendance', desc: 'Daily batch tracking' },
                    { step: '06', title: 'Assessment', desc: 'Internal theory & viva' },
                    { step: '07', title: 'Posting', desc: 'OPD/IPD ward rotation' },
                    { step: '08', title: 'Logbook', desc: 'Faculty sign-off' },
                    { step: '09', title: 'Completion', desc: 'Final university record' },
                  ].map((s) => (
                    <div key={s.step} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center relative">
                      <span className="text-[10px] font-black text-[#0D887E]">{s.step}</span>
                      <h4 className="text-xs font-bold text-[#0B263A] mt-1">{s.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeWorkflowTab === 'hospital' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#0B263A]">Hospital Care & Encounter Flow</h3>
                  <p className="text-xs text-slate-500 mt-1">Coordinated clinical record linking front desk, consultation, nursing, and billing.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { step: '01', title: 'Registration', desc: 'UHID & Prakriti profiling' },
                    { step: '02', title: 'Consultation', desc: 'Vaidya Rogi Pariksha' },
                    { step: '03', title: 'Treatment', desc: 'OPD / IPD bed admission' },
                    { step: '04', title: 'Dispensing', desc: 'Batch-tracked medicines' },
                    { step: '05', title: 'Billing', desc: 'Service charges receipt' },
                    { step: '06', title: 'Follow-up', desc: 'Discharge & review log' },
                  ].map((s) => (
                    <div key={s.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <span className="text-xs font-black text-[#0D887E]">{s.step}</span>
                      <h4 className="text-xs font-bold text-[#0B263A] mt-1">{s.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeWorkflowTab === 'pharmacy' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#0B263A]">Ayurveda Pharmacy & Batch Traceability Flow</h3>
                  <p className="text-xs text-slate-500 mt-1">Complete lifecycle of classical formulations from raw procurement to patient dispensing.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { step: '01', title: 'Purchase PO', desc: 'Raw herbs & manufacturer orders' },
                    { step: '02', title: 'Batch Inward', desc: 'Goods receipt with expiry dates' },
                    { step: '03', title: 'Monitoring', desc: 'Automated low stock alerts' },
                    { step: '04', title: 'Dispensing', desc: 'OPD token & IPD ward issues' },
                    { step: '05', title: 'Returns', desc: 'Quarantine & supplier returns' },
                    { step: '06', title: 'Billing Link', desc: 'Real-time billing settlement' },
                  ].map((s) => (
                    <div key={s.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <span className="text-xs font-black text-[#0D887E]">{s.step}</span>
                      <h4 className="text-xs font-bold text-[#0B263A] mt-1">{s.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeWorkflowTab === 'panchakarma' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#0B263A]">Panchakarma Treatment Scheduling & Delivery</h3>
                  <p className="text-xs text-slate-500 mt-1">Resource allocation, patient consent, and consumable accounting for therapy procedures.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { step: '01', title: 'Approved Plan', desc: 'Vaidya prescribes Shirodhara or Basti series' },
                    { step: '02', title: 'Booking', desc: 'Therapist and therapy suite reservation' },
                    { step: '03', title: 'Consent & Session', desc: 'Informed consent signed & procedure performed' },
                    { step: '04', title: 'Consumables & Review', desc: 'Oils logged, charges settled, clinical review completed' },
                  ].map((s) => (
                    <div key={s.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <span className="text-xs font-black text-[#0D887E]">{s.step}</span>
                      <h4 className="text-xs font-bold text-[#0B263A] mt-1">{s.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7: GOVERNANCE AND AI (Slide 8) */}
      <section id="governance" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D887E]">
              Slide 08 / 11 — AI Assistance & Institutional Governance
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B263A] tracking-tight mt-2">
              Helpful Automation. Accountable Decisions.
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Make routine institutional work easier while preserving staff ownership, privacy, and an unassailable trail of evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5F8FA] rounded-xl border border-slate-200 p-6">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#0D887E] border border-teal-200 flex items-center justify-center font-bold mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B263A]">Assist Routine Work</h3>
              <p className="text-xs text-slate-500 mt-1">Proposed PMRG AI Assistance Scope</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#0D887E] mr-2 mt-0.5" /> Review draft student admission document files</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#0D887E] mr-2 mt-0.5" /> Answer approved-policy and calendar FAQs</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-[#0D887E] mr-2 mt-0.5" /> Flag operational exceptions (low attendance, near expiry)</li>
              </ul>
            </div>

            <div className="bg-[#F5F8FA] rounded-xl border border-slate-200 p-6">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B263A]">Prepare Evidence</h3>
              <p className="text-xs text-slate-500 mt-1">NCISM / University Preparation</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 mt-0.5" /> Index institutional records across departments</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 mt-0.5" /> Summarise daily hospital census and IPD bed records</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 mt-0.5" /> Build approved annual inspection evidence packs</li>
              </ul>
            </div>

            <div className="bg-[#F5F8FA] rounded-xl border border-slate-200 p-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B263A]">Protect Records</h3>
              <p className="text-xs text-slate-500 mt-1">Enterprise Delivery Controls</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 mt-0.5" /> Define granular role-based access for students vs clinicians</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 mt-0.5" /> Maintain tamper-evident change and approval logs</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 mt-0.5" /> Enforce agreed data retention and backup recovery routines</li>
              </ul>
            </div>
          </div>

          {/* Core Ethical Governance Callout */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#0B263A] to-[#133954] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#79D4BD]">Governance Principle</span>
              <h4 className="text-xl font-bold mt-1">"AI prepares. Authorised staff review and decide."</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Every sensitive action—from admissions and financial concessions to clinical evaluations and regulatory submissions—has an accountable human owner. No diagnoses or clinical decisions are delegated to automated models.
              </p>
            </div>
            <Link
              to="/demo-login"
              className="px-5 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white text-xs font-bold whitespace-nowrap shadow"
            >
              Test AI Assistant in Demo →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: MEASURABLE OUTCOMES (Slide 9) */}
      <section id="outcomes" className="py-20 bg-[#F5F8FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D887E]">
              Slide 09 / 11 — Benefits & Measurable Outcomes
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B263A] tracking-tight mt-2">
              Measure Success in Daily Institutional Work
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Agree baseline, target, and accountable owner before pilot deployment; review operational results systematically after go-live.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3.5 px-6">Expected Improvement Area</th>
                    <th className="py-3.5 px-6">How We Measure It</th>
                    <th className="py-3.5 px-6">Accountable Institutional Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-4 px-6 font-bold text-[#0B263A]">Faster student administration</td>
                    <td className="py-4 px-6">Time from completed NEET file to confirmed enrolment and fee setup</td>
                    <td className="py-4 px-6 font-semibold text-[#0D887E]">Admissions & Registrar</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-4 px-6 font-bold text-[#0B263A]">Clearer fee collections</td>
                    <td className="py-4 px-6">Overdue fee ledger value; time required to reconcile bank receipts</td>
                    <td className="py-4 px-6 font-semibold text-[#0D887E]">Finance & Accounts</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-4 px-6 font-bold text-[#0B263A]">More complete learning records</td>
                    <td className="py-4 px-6">Proportion of student attendance and clinical logbooks signed by due date</td>
                    <td className="py-4 px-6 font-semibold text-[#0D887E]">Academic Office & HODs</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-4 px-6 font-bold text-[#0B263A]">Smoother hospital operations</td>
                    <td className="py-4 px-6">Registration-to-consultation waiting time; clinical record completeness</td>
                    <td className="py-4 px-6 font-semibold text-[#0D887E]">Medical Superintendent</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-4 px-6 font-bold text-[#0B263A]">Better pharmacy control</td>
                    <td className="py-4 px-6">Physical stock count accuracy; stockouts; expired classical formulation value</td>
                    <td className="py-4 px-6 font-semibold text-[#0D887E]">Chief Pharmacist & Stores Head</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-4 px-6 font-bold text-[#0B263A]">Faster evidence preparation</td>
                    <td className="py-4 px-6">Hours to compile and cross-verify an inspection / regulatory review pack</td>
                    <td className="py-4 px-6 font-semibold text-[#0D887E]">Principal & IQAC Quality Cell</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-[11px] text-slate-500">
              * Targets are agreed during discovery based on baseline audit. Benefits depend on clean data, adoption, and sustained leadership usage.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: IMPLEMENTATION ROADMAP (Slide 10) */}
      <section id="roadmap" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D887E]">
              Slide 10 / 11 — Implementation Approach
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B263A] tracking-tight mt-2">
              Start with a Focused Pilot. Expand After Proof.
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              A phased rollout aligned to the academic calendar, hospital continuity, and agreed acceptance gates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                phase: '01',
                title: 'Discover',
                subtitle: 'Map & Baseline',
                points: ['Map priority workflows', 'Confirm existing systems & data', 'Scope, design and baseline approved'],
              },
              {
                phase: '02',
                title: 'Pilot',
                subtitle: 'Trial Intake or Unit',
                points: ['Trial one student batch or OPD/Panchakarma unit', 'Workflows proven in live daily operation', 'Data reconciled with finance'],
              },
              {
                phase: '03',
                title: 'Expand',
                subtitle: 'Add Full Campus',
                points: ['Add academic, hospital & campus capabilities', 'Faculty and administrative users trained', 'Formal institutional cutover approved'],
              },
              {
                phase: '04',
                title: 'Support',
                subtitle: 'Hypercare & Review',
                points: ['Hypercare support & dedicated helpdesk', 'Regular quarterly outcome reviews', 'Support transitioned to stable operations'],
              },
            ].map((p) => (
              <div key={p.phase} className="bg-[#F5F8FA] rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-black text-[#0D887E] tracking-tight mb-2">
                    {p.phase}
                  </div>
                  <h3 className="text-base font-bold text-[#0B263A]">{p.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 mb-4">{p.subtitle}</p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {p.points.map((pt, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0D887E] mr-2 mt-1.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-200/80 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                  Milestone Gate Review
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: CONTACT & FOOTER (Slide 11) */}
      <footer className="bg-[#0B263A] text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
            {/* Col 1 */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-[#0D887E] flex items-center justify-center text-white font-black text-sm">
                  PMRG
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">PMRG Solution LLP</h4>
                  <p className="text-xs text-[#79D4BD]">Ayurveda College ERP & Digital Campus</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                One partner for a connected institution. We bring workflow design, ERP implementation, healthcare integration, and responsible automation together.
              </p>
              <div className="pt-2 flex items-center space-x-2 text-xs text-[#79D4BD]">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@pmrgsolution.com" className="hover:underline font-semibold">
                  support@pmrgsolution.com
                </a>
              </div>
            </div>

            {/* Col 2 */}
            <div className="md:col-span-3 space-y-2 text-xs">
              <h5 className="font-bold text-white text-sm mb-3">Next Step: Discovery</h5>
              <p className="text-slate-400 leading-relaxed">
                Start with a 60-minute focused discovery session with college and hospital leaders. Review key systems, agree priority workflows, and define outcomes.
              </p>
            </div>

            {/* Col 3 */}
            <div className="md:col-span-4 space-y-3">
              <h5 className="font-bold text-white text-sm">Explore Interactive POC</h5>
              <p className="text-xs text-slate-400">
                Test the complete system with 40 students, hospital encounters, pharmacy inventory, and simulated persona roles.
              </p>
              <Link
                to="/demo-login"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 PMRG Solution LLP. All rights reserved. Interactive Client Proof of Concept.</p>
            <p className="text-[11px] text-slate-400">
              Disclaimer: Sample data illustrative only. ERPNext, Frappe, and Marley Health are trademarks of their respective maintainers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
