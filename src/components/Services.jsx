import React, { useState } from 'react';
import { Code, Bot, Server, Briefcase, CheckCircle2, ArrowRight, Sparkles, Layers } from 'lucide-react';

const iconMap = {
  Code: Code,
  Bot: Bot,
  Server: Server,
  Briefcase: Briefcase
};

export default function Services({ t, onSelectServiceForQuote }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="services" className="py-24 relative bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.services.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {t.services.items.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <div
                key={service.id}
                className="relative rounded-2xl glass-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden group hover:border-cyan-400/40"
              >
                {/* Top gradient glow inside card */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.color}`} />
                
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shadow-md group-hover:scale-110 group-hover:bg-brand-600/20 group-hover:text-cyan-300 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide bg-slate-800/90 text-cyan-300 border border-slate-700">
                      {service.objCode}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-400 mb-4 tracking-wider">
                    {service.enTitle}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2.5 mb-8">
                    {service.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <a
                    href="#estimator"
                    onClick={() => onSelectServiceForQuote && onSelectServiceForQuote(service.id)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                  >
                    <span>คำนวณราคา & ขอใบเสนอราคาบริการนี้</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight TSIC 62011 Notice Box */}
        <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-brand-500/30 bg-gradient-to-r from-brand-950/40 via-navy-950 to-cyan-950/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-400/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                บริษัทจดทะเบียนนิติบุคคล 0905569007271 พร้อมบริการ 24 ชั่วโมง
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                ให้บริการพัฒนาเว็บไซต์บริษัท ร้านค้าออนไลน์ เซลเพจ ซอฟต์แวร์ AI และการตลาดออนไลน์ครบวงจร
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-brand-500/20 hover:scale-105 transition-all"
          >
            ปรึกษาโครงการกับเรา
          </a>
        </div>
      </div>
    </section>
  );
}
