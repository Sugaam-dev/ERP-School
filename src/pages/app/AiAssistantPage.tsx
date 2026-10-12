import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { AI_DEMO_KNOWLEDGE_BASE } from '../../mock/mockData';
import {
  Bot,
  Sparkles,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  RotateCcw,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: string[];
  timestamp: string;
}

export const AiAssistantPage: React.FC = () => {
  const { students, pharmacyItems, fees, opdVisits, ipdAdmissions } = useDemo();

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Greetings. I am the **PMRG Institutional AI Assistant (Simulated POC Demonstration)**.

I synthesize operational summaries across your academic records, hospital encounters, pharmacy inventory, and NCISM evidence preparation dossiers.

*Principle: AI prepares. Authorised staff review and decide.*

You can select one of the suggested executive prompts below or enter your own institutional question.`,
      sources: ['PMRG Ayurveda College Operational Master Data'],
      timestamp: '09:00 AM',
    },
  ]);

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      // Find matching knowledge base entry or synthesize dynamic answer
      const match = AI_DEMO_KNOWLEDGE_BASE.find(
        (k) => k.query.toLowerCase() === promptText.trim().toLowerCase()
      );

      let replyText = '';
      let replySources: string[] = [];

      if (match) {
        replyText = match.response;
        replySources = match.sources;
      } else {
        // Dynamic fallback response grounded in the live mock dataset
        replyText = `**Assistant Query Analysis for:** "${promptText}"

Based on the live institutional dataset:
- **Academics:** ${students.length} students enrolled across BAMS & PG. Current average attendance is ${(students.reduce((a, s) => a + s.attendancePercent, 0) / students.length).toFixed(1)}%.
- **Hospital:** ${opdVisits.length} OPD visits queued, with ${ipdAdmissions.filter((a) => a.admissionStatus === 'Admitted').length} active beds occupied in IPD.
- **Finance:** ₹${(fees.reduce((a, f) => a + f.amountPaid, 0) / 100000).toFixed(2)} Lakhs collected (MTD); ₹${(fees.reduce((a, f) => a + f.balanceDue, 0) / 100000).toFixed(2)} Lakhs outstanding across fee ledgers.
- **Pharmacy:** ${pharmacyItems.filter((i) => i.status === 'Low Stock' || i.status === 'Near Expiry').length} inventory items flagged for reorder or expiry attention.

*Note: In production deployment, all queries are grounded exclusively in institution-approved Frappe/ERPNext data sources without exporting personal identifiable records to external unvetted models.*`;
        replySources = ['ERPNext General Ledger', 'Marley Health OPD Census', 'Batch Inventory Master'];
      }

      const botMsg: ChatMessage = {
        id: `msg-resp-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        sources: replySources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatHistory((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B263A] via-[#113955] to-[#0B263A] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0D887E]/30 text-[#79D4BD] border border-[#79D4BD]/30 uppercase tracking-wider">
              Slide 08 / 11 · Institutional Governance
            </span>
            <span className="text-xs text-slate-400">· Assistive Intelligence</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Bot className="w-6 h-6 text-[#79D4BD]" />
            <span>AI Operational Assistant (Simulated POC)</span>
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Assist routine review of documents, identify operational bottlenecks, and assemble audit evidence packs without compromising staff decision-making.
          </p>
        </div>

        <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-right self-start md:self-auto">
          <p className="text-[10px] text-[#79D4BD] font-bold uppercase tracking-wider">Governing Rule</p>
          <p className="text-xs font-bold text-white mt-0.5">
            "AI prepares. Authorised staff review and decide."
          </p>
        </div>
      </div>

      {/* Suggested Demo Prompts Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0D887E]" />
            <span>Pre-Configured Demonstration Prompts:</span>
          </span>
          <button
            onClick={() => setChatHistory([chatHistory[0]])}
            className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear History</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {AI_DEMO_KNOWLEDGE_BASE.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(item.query)}
              className="p-3 rounded-xl bg-white hover:bg-teal-50/50 border border-slate-200 hover:border-teal-300 text-left transition-all shadow-xs group"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-[#0B263A] group-hover:text-[#0D887E] transition-colors leading-snug">
                  "{item.query}"
                </span>
                <span className="text-[10px] text-[#0D887E] font-bold ml-2 whitespace-nowrap">
                  Test →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Chat Conversation Thread */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[520px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#0B263A] text-white'
                    : 'bg-[#0D887E] text-white'
                }`}
              >
                {msg.sender === 'user' ? 'U' : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#0B263A] text-white rounded-tr-none'
                    : 'bg-[#F5F8FA] text-[#0B263A] border border-slate-200/90 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-[10px] text-slate-500">
                    <span className="font-bold text-slate-600 block mb-0.5">Data Sources Referenced:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {msg.sources.map((src, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                          {src}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`text-[9px] mt-2 font-mono ${
                    msg.sender === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 p-2">
              <span className="w-2 h-2 rounded-full bg-[#0D887E] animate-ping" />
              <span>Analyzing institutional dataset & compiling summary...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50/70">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(inputQuery);
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask the assistant a question about student attendance, bed occupancy, or stock..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#0B263A] focus:outline-none focus:border-[#0D887E]"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-4 py-2.5 rounded-xl bg-[#0D887E] hover:bg-[#0A7068] text-white font-bold text-xs shadow-xs disabled:opacity-40 flex items-center space-x-1.5"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="mt-2 text-[10px] text-slate-400 text-center">
            * Simulated Demonstration: Demonstrates assistive AI workflow. Sensitive decisions require verified staff approval.
          </div>
        </div>
      </div>
    </div>
  );
};
