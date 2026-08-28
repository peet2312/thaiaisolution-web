import React from 'react';
import { ShieldCheck, Building, CheckCircle2, Award, FileCheck2, Cpu, Globe } from 'lucide-react';

export default function AboutCompany({ t }) {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Objectives (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300">
              <Building className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.about.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.about.title}
              <span className="block text-lg sm:text-xl font-medium text-cyan-400 mt-1">
                {t.about.subtitle}
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.about.desc1}
            </p>

            <p className="text-slate-400 text-sm leading-relaxed">
              {t.about.desc2}
            </p>

            {/* Registered Objectives Box */}
            <div className="glass-panel p-6 rounded-2xl border border-brand-500/30 space-y-4 bg-gradient-to-br from-slate-900/90 to-navy-950">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-cyan-400" />
                <span>{t.about.objectivesTitle}</span>
              </h3>

              <div className="space-y-3">
                {t.about.objectivesDetailed?.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <span className="w-6 h-6 rounded-full bg-brand-500/20 border border-brand-400/30 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      {obj.num}
                    </span>
                    <div>
                      <span className="font-semibold text-white">{obj.title}</span>
                      <p className="text-slate-400 text-xs mt-0.5">{obj.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.about.certBadge}</span>
            </div>
          </div>

          {/* Right Column: Visual Credentials & Seal Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Seal & Logo Card */}
            <div className="glass-card p-8 rounded-3xl border border-brand-500/30 bg-gradient-to-b from-slate-900/90 to-navy-950 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-2xl bg-slate-950 p-2 border border-slate-700 shadow-lg flex items-center justify-center">
                  <img src="/logo.png" alt="Official Logo" className="w-full h-full object-contain" />
                </div>
                <div className="w-24 h-24 rounded-2xl bg-white p-2 border border-slate-300 shadow-lg flex items-center justify-center">
                  <img src="/seal.png" alt="Official Seal" className="w-full h-full object-contain" />
                </div>
              </div>

              <h4 className="text-base font-bold text-white mb-1">
                {t.about.title}
              </h4>
              <p className="text-xs font-semibold text-brand-300 tracking-wider mb-4">
                {t.about.subtitle}
              </p>

              <div className="grid grid-cols-2 gap-3 text-left pt-4 border-t border-slate-800 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-medium">เลขทะเบียนนิติบุคคล</div>
                  <div className="font-bold text-cyan-300 mt-0.5">0905569007271</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-medium">เวลาให้บริการ</div>
                  <div className="font-bold text-emerald-400 mt-0.5">24 ชั่วโมง (24/7)</div>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-2 gap-4">
              {t.about.values?.map((val, vIdx) => (
                <div key={vIdx} className="glass-panel p-4 rounded-xl border border-slate-800">
                  <h5 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                    {vIdx === 0 ? <Award className="w-3.5 h-3.5 text-cyan-400" /> : <Cpu className="w-3.5 h-3.5 text-brand-400" />}
                    {val.title}
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
