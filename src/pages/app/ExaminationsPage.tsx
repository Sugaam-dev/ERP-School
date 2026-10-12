import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DetailsDrawer } from '../../components/common/DetailsDrawer';
import {
  FileCheck2,
  Calendar,
  Award,
  Search,
  Download,
  Share2,
  CheckCircle2,
  Eye,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';

export const ExaminationsPage: React.FC = () => {
  const { exams, results, showToast } = useDemo();

  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || 'ex-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPublishedSimulated, setIsPublishedSimulated] = useState<Record<string, boolean>>({});

  const currentExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  // Results for the selected exam
  const examResults = results.filter((r) => r.examId === currentExam.id);
  const filteredResults = examResults.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const passedCount = examResults.filter((r) => r.status === 'Passed').length;
  const failedCount = examResults.filter((r) => r.status === 'Failed').length;
  const passPercentage =
    examResults.length > 0 ? ((passedCount / examResults.length) * 100).toFixed(1) : '100';

  const handlePublishResults = () => {
    setIsPublishedSimulated((prev) => ({ ...prev, [currentExam.id]: true }));
    showToast(`Results published successfully for ${currentExam.title}! Notifications broadcast to students.`, 'success');
  };

  const handleSimulateExport = () => {
    showToast(`Simulated Export: University mark sheet XML for ${currentExam.examCode} compiled.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B263A] tracking-tight flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-[#0D887E]" />
            <span>Examinations, Internal Assessments & Grading</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Theory papers, bedside clinical vivas, continuous internal evaluations, and university result rosters.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleSimulateExport}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs shadow-xs flex items-center space-x-1.5"
            title="Simulate university XML/PDF marksheet export"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Mark Sheet (Simulated)</span>
          </button>
        </div>
      </div>

      {/* Examination Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {exams.map((exam) => {
          const isSelected = exam.id === selectedExamId;
          const isPub = isPublishedSimulated[exam.id] || exam.status === 'Results Published';

          return (
            <div
              key={exam.id}
              onClick={() => setSelectedExamId(exam.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-white border-[#0D887E] shadow-md ring-2 ring-[#0D887E]/20'
                  : 'bg-white/80 hover:bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span className="font-mono">{exam.examCode}</span>
                <span className="font-medium">{exam.date}</span>
              </div>
              <h4 className="font-bold text-xs text-[#0B263A] line-clamp-1">{exam.title}</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">{exam.examType}</p>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-600 font-semibold">{exam.batch}</span>
                <StatusBadge status={isPub ? 'Results Published' : exam.status} size="sm" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Exam Overview & Result Actions */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-[#0D887E] uppercase">
              {currentExam.examType}
            </span>
            <span className="text-xs text-slate-400">· Max Marks: {currentExam.maxMarks} (Pass: {currentExam.passingMarks})</span>
          </div>
          <h3 className="text-lg font-bold text-[#0B263A] mt-1">{currentExam.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cohort: {currentExam.batch} ({currentExam.semester}) · Subject: {currentExam.subject}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Pass Percentage</span>
            <span className="text-base font-extrabold text-[#0D887E]">{passPercentage}%</span>
          </div>

          <button
            onClick={handlePublishResults}
            className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-xs flex items-center space-x-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Publish Results to Portal</span>
          </button>
        </div>
      </div>

      {/* Marks Entry & Scores Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate name or roll no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
            />
          </div>

          <span className="text-xs text-slate-500 font-medium self-end sm:self-auto">
            {filteredResults.length} candidate marks entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Marks Obtained</th>
                <th className="py-3 px-4">Maximum Marks</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Evaluation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No results evaluated for this exam yet or matched search.
                  </td>
                </tr>
              ) : (
                filteredResults.map((res) => {
                  const pct = ((res.marksObtained / res.maxMarks) * 100).toFixed(1);
                  return (
                    <tr key={res.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-800">{res.rollNo}</td>
                      <td className="py-3 px-4 font-bold text-[#0B263A]">{res.studentName}</td>
                      <td className="py-3 px-4 font-extrabold text-[#0D887E] text-sm">
                        {res.marksObtained}
                      </td>
                      <td className="py-3 px-4 text-slate-500">{res.maxMarks}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{pct}%</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded font-black text-xs bg-slate-100 text-slate-800">
                          {res.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={res.status} size="sm" />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
