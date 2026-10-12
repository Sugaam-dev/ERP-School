import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Search,
  ExternalLink,
  BookOpen,
  Filter,
  CheckSquare,
  Sparkles,
  Layers,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { ComplianceDocument } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { KpiCard } from '../../components/common/KpiCard';
import { Modal } from '../../components/common/Modal';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';

export const CompliancePage: React.FC = () => {
  const { compliance, updateComplianceStatus, showToast } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  
  // Selected Doc for details drawer
  const [selectedDoc, setSelectedDoc] = useState<ComplianceDocument | null>(null);

  // Modals
  const [isGeneratePackOpen, setIsGeneratePackOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);

  // MSR Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, norm: 'Teaching Hospital Bed Occupancy ≥ 60%', status: 'Compliant (71.4% actual)', verified: true },
    { id: 2, norm: 'Faculty to Student Ratio (NCISM MSR Schedule 1)', status: 'Compliant (1:8 actual, min 1:10)', verified: true },
    { id: 3, norm: 'Demonstration Herbal Garden (min 250 verified species)', status: 'Compliant (320 catalogued species)', verified: true },
    { id: 4, norm: 'Teaching Pharmacy Batch Manufacturing Records (BMR)', status: 'Compliant (Validated work orders)', verified: true },
    { id: 5, norm: 'Clinical Logbook Completion for Interns & PG Scholars', status: 'In Review (Pending 3 HOD signs)', verified: false },
    { id: 6, norm: 'Bio-Metric Daily Staff Attendance Sync', status: 'Compliant (98.2% average punch compliance)', verified: true },
    { id: 7, norm: 'Institutional Ethics Committee (IEC) CDSCO Registration', status: 'Compliant (Active registration till 2028)', verified: true },
    { id: 8, norm: 'State Pollution Control Board Biomedical Waste NOC', status: 'Compliant (Valid barcoded manifest)', verified: true },
  ]);

  const categories = [
    'All',
    'NCISM Annual Verification',
    'Ayush Hospital Bed Occupancy Audit',
    'University Board of Studies',
    'Herbal Garden Botanical Register',
    'Faculty Bio-Metric Audit Preparation',
    'Pharmacovigilance Return'
  ];

  const statuses = ['All', 'Verified Ready', 'Pending Internal Sign-off', 'Needs Update'];

  // Filtered docs
  const filteredDocs = compliance.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.docCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.owner.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // KPIs
  const totalDocs = compliance.length;
  const verifiedCount = compliance.filter((d) => d.status === 'Verified Ready').length;
  const pendingCount = compliance.filter((d) => d.status === 'Pending Internal Sign-off').length;
  const needsUpdateCount = compliance.filter((d) => d.status === 'Needs Update').length;
  const readinessScore = Math.round((verifiedCount / totalDocs) * 100);

  const startEvidencePackGeneration = () => {
    setIsGenerating(true);
    setGenerationProgress(15);
    setGenerationComplete(false);

    setTimeout(() => setGenerationProgress(45), 600);
    setTimeout(() => setGenerationProgress(75), 1200);
    setTimeout(() => {
      setGenerationProgress(100);
      setIsGenerating(false);
      setGenerationComplete(true);
      showToast('Institutional Evidence Pack (2026 Dossier) compiled successfully.', 'success');
    }, 1800);
  };

  const handleDownloadDossier = (code: string) => {
    showToast(`Downloading simulated compliance package ${code}.pdf`, 'info');
  };

  const toggleChecklistItem = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, verified: !item.verified } : item))
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0B263A] tracking-tight">Institutional Compliance & NCISM Evidence</h1>
            <span className="bg-[#0D887E]/10 text-[#0D887E] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#0D887E]/20">
              Audit Ready
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Statutory records, NCISM MSR verification dossiers, hospital audits, and verified institutional packs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsChecklistOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-all"
          >
            <CheckSquare className="w-4 h-4 text-[#0D887E]" />
            NCISM MSR Checklist
          </button>
          <button
            onClick={() => {
              setIsGeneratePackOpen(true);
              setGenerationProgress(0);
              setGenerationComplete(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D887E] hover:bg-[#0A6C64] text-white rounded-lg text-sm font-semibold shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#79D4BD]" />
            Compile Evidence Pack
          </button>
        </div>
      </div>

      {/* Governance & Disclaimers Banner */}
      <div className="bg-gradient-to-r from-[#0B263A] to-[#133A57] text-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-white/10 text-[#79D4BD] mt-0.5">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#79D4BD]">Governance Principle</span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-200">Slide 8 Mandate</span>
            </div>
            <p className="text-base font-semibold text-white mt-0.5">
              &ldquo;AI prepares. Authorised staff review and decide.&rdquo;
            </p>
            <p className="text-xs text-slate-300 mt-1">
              Automated pipelines index hospital registers, logbooks, and rosters. All final filings require institutional sign-off by the Principal and HODs.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs text-slate-300">Statutory Norms Target</div>
          <div className="text-lg font-bold text-[#79D4BD]">NCISM 2026 Ready</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Evidence Dossiers"
          value={totalDocs}
          subtitle="Catalogued packs"
          icon={FileText}
          trend={{ value: '100%', isPositive: true }}
        />
        <KpiCard
          title="Verified Ready"
          value={verifiedCount}
          subtitle="Ready for submission"
          icon={CheckCircle2}
          accentColor="mint"
        />
        <KpiCard
          title="Pending Sign-Off"
          value={pendingCount}
          subtitle="Awaiting HOD sign"
          icon={Clock}
          accentColor="amber"
        />
        <KpiCard
          title="Needs Update"
          value={needsUpdateCount}
          subtitle="Action required"
          icon={AlertTriangle}
          accentColor="rose"
        />
        <KpiCard
          title="Readiness Score"
          value={`${readinessScore}%`}
          subtitle="Statutory compliance"
          icon={ShieldCheck}
          accentColor="teal"
        />
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search dossier by code, title, department, or nodal officer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0D887E]/20 focus:border-[#0D887E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0D887E]/20"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0D887E]/20"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dossiers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0D887E]" />
            <h3 className="font-semibold text-[#0B263A] text-sm sm:text-base">Statutory Verification Dossiers</h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              {filteredDocs.length} records
            </span>
          </div>
          <span className="text-xs text-slate-400">All documents synced with institution audit vault</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Dossier Code</th>
                <th className="py-3 px-4">Title & Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Department & Nodal Officer</th>
                <th className="py-3 px-4">Audit Version</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No compliance records match your current filters.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-xs text-[#0D887E]">
                      {doc.docCode}
                    </td>
                    <td className="py-3 px-4 max-w-sm">
                      <div className="font-medium text-[#0B263A] line-clamp-1">{doc.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{doc.simulatedSummary}</div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      <span className="inline-block bg-slate-100 px-2 py-1 rounded text-[11px] font-medium text-slate-700">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-xs font-medium text-slate-800">{doc.department}</div>
                      <div className="text-[11px] text-slate-400">{doc.owner}</div>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-slate-600">
                      <div>{doc.version}</div>
                      <div className="text-[10px] text-slate-400">{doc.lastReviewDate}</div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#0D887E] hover:text-[#0A6C64] hover:underline"
                      >
                        Inspect
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedDoc)}
        onClose={() => setSelectedDoc(null)}
        title={selectedDoc?.title || 'Dossier Details'}
        subtitle={`Dossier Ref: ${selectedDoc?.docCode || ''}`}
        width="xl"
      >
        {selectedDoc && (
          <div className="space-y-6 text-sm">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</span>
                <span className="text-xs font-medium text-slate-700">{selectedDoc.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</span>
                <StatusBadge status={selectedDoc.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Nodal Lead</span>
                <span className="text-xs font-medium text-slate-800">{selectedDoc.owner}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Department</span>
                <span className="text-xs font-medium text-slate-800">{selectedDoc.department}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Version & Date</span>
                <span className="text-xs font-medium font-mono text-slate-700">{selectedDoc.version} ({selectedDoc.lastReviewDate})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Evidence Pack Ref</span>
                <span className="text-xs font-mono font-semibold text-[#0D887E]">{selectedDoc.evidencePackRef}</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#0B263A] mb-2 text-xs uppercase tracking-wider text-slate-600">
                Simulated Evidence Summary
              </h4>
              <div className="p-3.5 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm leading-relaxed">
                {selectedDoc.simulatedSummary}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#0B263A] mb-2 text-xs uppercase tracking-wider text-slate-600">
                Update Institutional Sign-Off Status
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                Change the verification workflow stage for this statutory document:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    updateComplianceStatus(selectedDoc.id, 'Verified Ready');
                    setSelectedDoc({ ...selectedDoc, status: 'Verified Ready' });
                  }}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                    selectedDoc.status === 'Verified Ready'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-200'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Verified Ready
                </button>
                <button
                  onClick={() => {
                    updateComplianceStatus(selectedDoc.id, 'Pending Internal Sign-off');
                    setSelectedDoc({ ...selectedDoc, status: 'Pending Internal Sign-off' });
                  }}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                    selectedDoc.status === 'Pending Internal Sign-off'
                      ? 'bg-amber-50 border-amber-500 text-amber-700 ring-2 ring-amber-200'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Pending Sign-off
                </button>
                <button
                  onClick={() => {
                    updateComplianceStatus(selectedDoc.id, 'Needs Update');
                    setSelectedDoc({ ...selectedDoc, status: 'Needs Update' });
                  }}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                    selectedDoc.status === 'Needs Update'
                      ? 'bg-rose-50 border-rose-500 text-rose-700 ring-2 ring-rose-200'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Needs Update
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => handleDownloadDossier(selectedDoc.docCode)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Simulated PDF Export
              </button>
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </DetailsDrawer>

      {/* Evidence Pack Compiler Modal */}
      <Modal
        isOpen={isGeneratePackOpen}
        onClose={() => setIsGeneratePackOpen(false)}
        title="Institutional Evidence Pack Compiler"
        maxWidth="lg"
      >
        <div className="space-y-5 text-sm">
          <div className="flex items-start gap-3 p-3.5 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 text-xs">
            <Sparkles className="w-4 h-4 text-[#0D887E] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#0B263A]">Automated Dossier Generation</p>
              <p className="text-slate-600 mt-0.5">
                Indexes all 15 institutional documents, calculates average bed occupancy, cross-checks clinical logbooks, and compiles an audit-ready dossier bundle.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Compilation Status</span>
              <span>{generationProgress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#0D887E] h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {generationProgress < 20 && 'Awaiting trigger...'}
              {generationProgress >= 20 && generationProgress < 50 && 'Parsing Hospital Bed Occupancy & OPD Census registers...'}
              {generationProgress >= 50 && generationProgress < 80 && 'Collating Teacher MSR Biometric logs & Herbal Garden species list...'}
              {generationProgress >= 80 && generationProgress < 100 && 'Generating watermark stamps & signing hash records...'}
              {generationProgress === 100 && 'Ready: PMRG_Ayurveda_NCISM_EvidencePack_2026.zip'}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="font-semibold text-slate-800">Included Dossiers in Package:</div>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              <li>15 Institutional verified documents with audit timestamps</li>
              <li>OPD / IPD Daily register extract (Jan - Oct 2026)</li>
              <li>Faculty MSR Norms & Departmental staff qualification records</li>
              <li>Herbal Garden 320-species botanical photographic index</li>
              <li>Dissection hall formalin register and municipal clearances</li>
            </ul>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={() => setIsGeneratePackOpen(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50"
            >
              Close
            </button>
            {!generationComplete ? (
              <button
                onClick={startEvidencePackGeneration}
                disabled={isGenerating}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0D887E] hover:bg-[#0A6C64] disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-sm"
              >
                {isGenerating ? 'Compiling Dossier...' : 'Start Compilation'}
              </button>
            ) : (
              <button
                onClick={() => {
                  showToast('Downloaded simulated evidence pack ZIP', 'success');
                  setIsGeneratePackOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Download Complete Pack (ZIP)
              </button>
            )}
          </div>
        </div>
      </Modal>

      {/* NCISM MSR Inspection Checklist Modal */}
      <Modal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        title="NCISM Minimum Standard Requirements (MSR) Checklist"
        maxWidth="xl"
      >
        <div className="space-y-4 text-sm">
          <p className="text-xs text-slate-500">
            Simulated institutional compliance audit against statutory NCISM (National Commission for Indian System of Medicine) inspection parameters:
          </p>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={item.verified}
                    onChange={() => {}}
                    className="w-4 h-4 text-[#0D887E] rounded border-slate-300 focus:ring-[#0D887E] mt-0.5"
                  />
                  <div>
                    <div className={`text-xs font-semibold ${item.verified ? 'text-[#0B263A]' : 'text-slate-500'}`}>
                      {item.norm}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.status}</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    item.verified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {item.verified ? 'Verified' : 'Under Review'}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 flex items-center justify-between">
            <span>Verified Requirements:</span>
            <span className="font-bold text-[#0D887E]">
              {checklist.filter((c) => c.verified).length} of {checklist.length} Completed
            </span>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-200">
            <button
              onClick={() => setIsChecklistOpen(false)}
              className="px-4 py-2 bg-[#0B263A] hover:bg-[#133A57] text-white rounded-lg text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CompliancePage;
