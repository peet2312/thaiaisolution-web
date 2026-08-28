import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Code2, Server, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function Hero({ t }) {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden tech-grid-bg">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-brand-600/25 via-cyan-500/20 to-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Official TSIC & Accreditation Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-500/30 text-xs sm:text-sm text-cyan-300 mb-6 shadow-lg shadow-brand-500/10 animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-semibold text-white tracking-wide">{t.hero.badge}</span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-block text-emerald-300 font-mono text-xs bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30 font-bold">
              24 ชม.
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            {t.hero.titlePrefix}{' '}
            <span className="text-gradient">
              {t.hero.titleHighlight}
            </span>{' '}
            {t.hero.titleSuffix}
          </h1>

          {/* Subtitle / Company Value Prop */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-3xl">
            {t.hero.description}
          </p>

          {/* Objectives Highlight Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl mb-10 text-left">
            <div className="glass-card p-3.5 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="text-[10px] text-brand-400 font-bold uppercase block tracking-wider">วัตถุประสงค์ (8)</span>
                <span className="font-semibold text-slate-200">เขียนโปรแกรม & Web Dev</span>
              </div>
            </div>

            <div className="glass-card p-3.5 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block tracking-wider">วัตถุประสงค์ (9)</span>
                <span className="font-semibold text-slate-200">จัดการระบบคอม & Cloud</span>
              </div>
            </div>

            <div className="glass-card p-3.5 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="text-[10px] text-purple-400 font-bold uppercase block tracking-wider">วัตถุประสงค์ (10)</span>
                <span className="font-semibold text-slate-200">ที่ปรึกษาไอที & AI Strategy</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-semibold text-base shadow-xl shadow-brand-500/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>{t.hero.consultBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#estimator"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-semibold text-base border border-slate-700 hover:border-cyan-400/50 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{t.nav.estimator}</span>
            </a>
          </div>

          {/* Key Stats Counter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full pt-8 border-t border-slate-800/80">
            {t.hero.stats.map((stat, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-300 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
