import React, { useState, useEffect } from 'react';
import { Code, Bot, Server, Briefcase, Megaphone, CheckCircle2, ArrowRight, Sparkles, Layers, ShieldCheck, Clock, Zap } from 'lucide-react';

const iconMap = {
  web: Code,
  ai: Bot,
  cloud: Server,
  consult: Briefcase,
  marketing: Megaphone
};

export default function ServicesPage({ t, initialTab = 'web', setPage, setPrefillData }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const currentDetail = t.servicesPage.details[activeTab] || t.servicesPage.details.web;
  const TabIcon = iconMap[activeTab] || Code;

  const handleRequestQuoteForService = (pkgName) => {
    if (setPrefillData) {
      setPrefillData({
        service: activeTab,
        budget: '',
        message: `สนใจแพ็กเกจ: ${pkgName || currentDetail.title} (${currentDetail.code})`
      });
    }
    setPage('estimator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-brand-700">
          <Layers className="w-3.5 h-3.5 text-brand-600" />
          <span>{t.servicesPage.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t.servicesPage.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          {t.servicesPage.subtitle}
        </p>
      </div>

      {/* 5 Interactive Sub-Tabs Bar */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 bg-white p-2 rounded-2xl border border-slate-200 w-full max-w-6xl shadow-md">
          {t.servicesPage.tabs.map((tab) => {
            const Icon = iconMap[tab.id] || Code;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 via-blue-600 to-brand-700 text-white shadow-md shadow-brand-600/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-brand-600'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Service Tab Detail Container */}
      <div className="sge-card p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-12 bg-white shadow-xl">
        {/* Service Header Info */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-brand-700 border border-blue-200 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentDetail.code}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {currentDetail.title}
            </h2>

            <div className="text-xs sm:text-sm font-bold text-brand-600 tracking-wider">
              {currentDetail.enTitle}
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
              {currentDetail.lead}
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2.5">
            <button
              onClick={() => handleRequestQuoteForService(currentDetail.title)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>คำนวณราคา & ขอใบเสนอราคาหมวดนี้</span>
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-600" />
            <span>ขอบเขตความเชี่ยวชาญและคุณสมบัติหลัก (Key Capabilities)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentDetail.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-brand-300 hover:bg-blue-50/30 transition-all"
              >
                <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm sm:text-base">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 font-normal">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            <span>ขั้นตอนการดำเนินงานมาตรฐาน (Standard Delivery Workflow)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {currentDetail.workflow.map((step, sIdx) => (
              <div
                key={sIdx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 relative"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 text-brand-700 border border-blue-200 flex items-center justify-center font-mono font-bold text-[11px]">
                  0{sIdx + 1}
                </div>
                <div className="font-bold text-slate-800">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Packages Table */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>แพ็กเกจและระดับราคามาตรฐาน (Standard Service Packages)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentDetail.packages.map((pkg, pIdx) => (
              <div
                key={pIdx}
                className={`rounded-2xl p-6 flex flex-col justify-between border transition-all bg-white ${
                  pIdx === 1
                    ? 'border-brand-500 shadow-xl shadow-brand-500/10 ring-2 ring-brand-500/20'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-base">{pkg.name}</h4>
                    {pIdx === 1 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-brand-700 border border-blue-200">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="text-xl sm:text-2xl font-black text-slate-900">
                    {pkg.price}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {pkg.desc}
                  </p>

                  <div className="text-[11px] font-mono text-slate-500 pt-2 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-brand-600" />
                    <span>ระยะเวลา: {pkg.time}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRequestQuoteForService(pkg.name)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-brand-600 text-slate-800 hover:text-white text-xs font-bold border border-slate-200 hover:border-brand-600 transition-colors shadow-sm"
                >
                  เลือกแพ็กเกจนี้เพื่อประเมินราคา
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
