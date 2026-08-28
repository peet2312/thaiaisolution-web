import React from 'react';
import { Building2, ShieldCheck, FileCheck, CheckCircle2, Award, Cpu, Globe, Lock, Shield } from 'lucide-react';

export default function AboutPage({ t, setPage }) {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-brand-700">
          <Building2 className="w-3.5 h-3.5 text-brand-600" />
          <span>{t.aboutPage.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t.aboutPage.title}
        </h1>
        <p className="text-brand-700 font-mono text-sm sm:text-base font-bold">
          {t.aboutPage.subtitle}
        </p>
      </div>

      {/* Main Corporate Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Story & Objectives (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.aboutPage.storyTitle}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {t.aboutPage.storyDesc1}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.aboutPage.storyDesc2}
            </p>
          </div>

          {/* Registered Objectives Official Box */}
          <div className="sge-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5 bg-white shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-brand-600" />
                <span>วัตถุประสงค์ของบริษัทตามหนังสือรับรอง</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
                เปิดบริการ 24 ชม.
              </span>
            </div>

            <div className="space-y-4">
              {t.about.objectivesDetailed?.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-7 h-7 rounded-full bg-blue-100 border border-blue-200 text-brand-700 font-black flex items-center justify-center shrink-0 font-mono text-xs">
                    {obj.num}
                  </span>
                  <div>
                    <span className="font-black text-slate-900">{obj.title}</span>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Credentials & Corporate Seal (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sge-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-center bg-white shadow-xl">
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900">
                {t.aboutPage.credTitle}
              </h3>
              <p className="text-xs text-brand-700 font-mono font-bold">
                เลขทะเบียนนิติบุคคล: 0905569007271
              </p>
            </div>

            {/* Official Seal / Stamp */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-3">
              <div className="w-28 h-28 rounded-full border-4 border-dashed border-brand-300 p-2 flex items-center justify-center relative shadow-sm">
                <img
                  src="/logo.png"
                  alt="Official Seal"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-slate-900">
                  {t.aboutPage.sealCaption}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  บริษัท ไทยเอไอ โซลูชั่น จำกัด
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 text-left space-y-1.5 font-medium">
              <div className="font-bold text-brand-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>การคุ้มครองข้อมูลและลิขสิทธิ์ซอฟต์แวร์:</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                ซอฟต์แวร์ โค้ดโปรแกรม และทรัพย์สินทางปัญญาทั้งหมดที่พัฒนาขึ้น เป็นกรรมสิทธิ์ของลูกค้า 100% พร้อมสัญญา NDA รักษาความลับ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
