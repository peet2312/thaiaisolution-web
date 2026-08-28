import React from 'react';
import { Cpu, Globe, Database, Cloud, Shield, Terminal, Sparkles } from 'lucide-react';

export default function TechStack({ t }) {
  const categories = [
    {
      name: "AI & Machine Learning",
      icon: Cpu,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      skills: ["OpenAI / GPT-4o", "Google Gemini API", "Claude 3.7", "PyTorch", "LangChain & LlamaIndex", "DeepSeek", "Computer Vision (YOLO)"]
    },
    {
      name: "Web & Network Programming",
      icon: Globe,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
      skills: ["React 19 & Next.js", "TypeScript / JavaScript", "Tailwind CSS", "RESTful & GraphQL APIs", "WebSockets & Realtime", "Micro-Frontends"]
    },
    {
      name: "Cloud Facilities & DevOps",
      icon: Cloud,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      skills: ["Amazon Web Services (AWS)", "Google Cloud (GCP)", "Microsoft Azure", "Docker & Kubernetes (K8s)", "CI/CD (GitHub Actions)", "24/7 SLA Monitoring"]
    },
    {
      name: "Backend & Modern Databases",
      icon: Database,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      skills: ["Python (FastAPI / Django)", "Node.js & Express", "Go (Golang)", "PostgreSQL & MySQL", "MongoDB & Redis", "Vector DBs (Pinecone, Qdrant)"]
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300 mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.techStack.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.techStack.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.techStack.subtitle}
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${cat.bg} border flex items-center justify-center ${cat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Enterprise Ready 2026</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
