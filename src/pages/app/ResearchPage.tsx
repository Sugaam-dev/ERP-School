import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ResearchProject } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  Microscope,
  Search,
  Eye,
  Award,
  Users,
  Calendar,
  Building2,
  FileText,
  Sparkles,
} from 'lucide-react';

export const ResearchPage: React.FC = () => {
  const { research } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);

  const filteredProjects = research.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.principalInvestigator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.projectCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalGrants = research.reduce((acc, p) => acc + p.budget, 0);
  const totalOutreach = research.reduce((acc, p) => acc + p.outreachBeneficiaries, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <Microscope className="w-5 h-5 text-[#0D887E]" />
            <span>Ayurvedic Research Grants & Community Outreach</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            CCRAS funded clinical trials, institutional ethics committee (IEC) registers, and Swarna Prashana outreach camps.
          </p>
        </div>

        <div className="p-2 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 font-semibold flex items-center space-x-2">
          <Award className="w-4 h-4 text-[#0D887E]" />
          <span>Statutory Institutional Ethics Committee (IEC) Register Active</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Projects</p>
          <h3 className="text-2xl font-bold text-[#0B263A] mt-1">{research.length} Studies</h3>
          <p className="text-[11px] text-slate-400">Clinical & Pharmacognosy</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Extramural Grants</p>
          <h3 className="text-2xl font-bold text-[#0D887E] mt-1">₹{(totalGrants / 100000).toFixed(2)} L</h3>
          <p className="text-[11px] text-slate-400">CCRAS & NMPB funded</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Outreach Impact</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">{totalOutreach.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-slate-400">Rural camp beneficiaries</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ethics Approvals</p>
          <h3 className="text-2xl font-bold text-purple-600 mt-1">
            {research.filter((p) => p.ethicsApprovalStatus === 'Ethics Approved').length}
          </h3>
          <p className="text-[11px] text-slate-400">IEC cleared protocols</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search study title, investigator, agency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
          />
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Showing {filteredProjects.length} Research Dossiers
        </span>
      </div>

      {/* Research Projects Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Project Code</th>
                <th className="py-3 px-4">Research Study Title</th>
                <th className="py-3 px-4">Principal Investigator</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Funding Agency</th>
                <th className="py-3 px-4">Grant Budget</th>
                <th className="py-3 px-4">Ethics Status</th>
                <th className="py-3 px-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{p.projectCode}</td>
                  <td className="py-3 px-4 max-w-sm">
                    <p className="font-bold text-[#0B263A] line-clamp-1">{p.title}</p>
                    <span className="text-[10px] text-slate-400">Timeline: {p.startDate} to {p.endDate}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{p.principalInvestigator}</td>
                  <td className="py-3 px-4 text-slate-600">{p.department}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{p.fundingAgency}</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">
                    ₹{p.budget.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={p.ethicsApprovalStatus} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#0D887E] hover:bg-teal-50 transition-colors"
                      title="View Research Project Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.projectCode || 'Research Grant'}
        subtitle={`PI: ${selectedProject?.principalInvestigator} · ${selectedProject?.department}`}
        badge={selectedProject ? <StatusBadge status={selectedProject.ethicsApprovalStatus} size="sm" /> : undefined}
      >
        {selectedProject && (
          <div className="space-y-6 text-xs">
            <div>
              <h4 className="font-bold text-[#0B263A] text-sm leading-snug">{selectedProject.title}</h4>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2 text-slate-700">
              <h4 className="font-bold text-[#0B263A] uppercase tracking-wider text-[11px]">
                Grant & Ethical Oversight Parameters
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Funding Body: <strong>{selectedProject.fundingAgency}</strong></div>
                <div>Allocated Budget: <strong>₹{selectedProject.budget.toLocaleString('en-IN')}</strong></div>
                <div>Ethics Review: <strong>{selectedProject.ethicsApprovalStatus}</strong></div>
                <div>Publications Generated: <strong>{selectedProject.publicationCount} Peer-Reviewed</strong></div>
                <div>Project Timeline: <strong>{selectedProject.startDate} to {selectedProject.endDate}</strong></div>
                <div>Community Beneficiaries: <strong>{selectedProject.outreachBeneficiaries} People</strong></div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500">
              * Demonstration Scope Notice: Research grants and ethics registers are illustrative demonstration entries to show institutional workflow connectivity; ethics approvals remain subject to statutory committee minutes.
            </div>
          </div>
        )}
      </DetailsDrawer>
    </div>
  );
};
