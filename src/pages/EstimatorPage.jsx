import React, { useState } from 'react';
import { Calculator, Check, Sparkles, Send, Clock, DollarSign, FileText, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';

export default function EstimatorPage({ t, setPage, setPrefillData }) {
  const [serviceType, setServiceType] = useState('web');
  const [scale, setScale] = useState('business');
  const [addons, setAddons] = useState(['ai-assistant', 'security']);
  const [urgency, setUrgency] = useState('normal');

  const serviceOptions = [
    { id: 'marketing', nameTh: 'การตลาดออนไลน์ & ยิงแอด Facebook / Google / TikTok / SEO (เริ่ม ฿3,900/ด.)', nameEn: 'Digital Marketing & Ads (Facebook, Google, TikTok, SEO) - From ฿3,900/mo', basePrice: 3900, baseWeeks: 1 },
    { id: 'web', nameTh: 'โปรแกรมเว็บเพจและระบบเครือข่ายตามความต้องการ', nameEn: 'Web Pages & Custom Network Applications', basePrice: 45000, baseWeeks: 3 },
    { id: 'ai', nameTh: 'ซอฟต์แวร์ปัญญาประดิษฐ์ & LLM Integration (วัตถุประสงค์ 8)', nameEn: 'AI & LLM Software Solutions (Obj 8)', basePrice: 65000, baseWeeks: 4 },
    { id: 'cloud', nameTh: 'การจัดการสิ่งอำนวยความสะดวกคอมพิวเตอร์ & Cloud (วัตถุประสงค์ 9)', nameEn: 'Computer Facilities & Cloud Management (Obj 9)', basePrice: 35000, baseWeeks: 2 },
    { id: 'consult', nameTh: 'กิจกรรมการให้คำปรึกษาทางด้านคอมพิวเตอร์ (วัตถุประสงค์ 10)', nameEn: 'Computer & IT Consulting Activities (Obj 10)', basePrice: 30000, baseWeeks: 2 },
    { id: 'full', nameTh: 'โซลูชันครบวงจร (Web + AI + Cloud + Marketing Full-Suite)', nameEn: 'Complete Enterprise Full-Suite Solution', basePrice: 120000, baseWeeks: 6 }
  ];

  const scaleOptions = [
    { id: 'mvp', labelTh: 'Starter / รายเดือน (สเกลเริ่มต้น)', multiplier: 1.0, weeksAdd: 0 },
    { id: 'business', labelTh: 'Business / Growth (ระดับธุรกิจเติบโต)', multiplier: 1.8, weeksAdd: 1 },
    { id: 'enterprise', labelTh: 'Enterprise / High-Scale (ระดับองค์กรขยายผล)', multiplier: 3.2, weeksAdd: 2 }
  ];

  const addonOptions = [
    { id: 'tracking-pixel', nameTh: 'ติดตั้ง Pixel & Conversion API ครบวงจร (FB/TikTok/Google)', price: 1500, weeks: 1 },
    { id: 'creative-video', nameTh: 'ผลิตคลิปสั้นวิดีโอโฆษณา AI TikTok / Reels (4 คลิป)', price: 2500, weeks: 1 },
    { id: 'seo-boost', nameTh: 'ทำ SEO On-Page ปรับแต่งโครงสร้างคำค้นหา Google', price: 3000, weeks: 1 },
    { id: 'ai-assistant', nameTh: 'ติดตั้ง AI Smart Chatbot & Knowledge Base (RAG)', price: 25000, weeks: 1 },
    { id: 'ocr-doc', nameTh: 'ระบบประมวลผลเอกสารอัตโนมัติ AI OCR', price: 30000, weeks: 1 },
    { id: 'payment', nameTh: 'เชื่อมต่อ Payment Gateway / PromptPay QR / Kiosk API', price: 15000, weeks: 1 },
    { id: 'ha-cloud', nameTh: 'วางระบบ Multi-Region & 24/7 Monitoring (SLA 99.99%)', price: 25000, weeks: 1 },
    { id: 'security', nameTh: 'Security Audit & PDPA Data Governance Compliance', price: 20000, weeks: 1 }
  ];

  const urgencyOptions = [
    { id: 'normal', labelTh: 'มาตรฐานโครงการ (Standard)', multiplier: 1.0, weeksMult: 1.0 },
    { id: 'express', labelTh: 'เร่งด่วนพิเศษ (Fast-Track +25%)', multiplier: 1.25, weeksMult: 0.7 }
  ];

  const toggleAddon = (id) => {
    if (addons.includes(id)) {
      setAddons(addons.filter((a) => a !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  const currentService = serviceOptions.find((s) => s.id === serviceType) || serviceOptions[0];
  const currentScale = scaleOptions.find((s) => s.id === scale) || scaleOptions[0];
  const currentUrgency = urgencyOptions.find((u) => u.id === urgency) || urgencyOptions[0];

  const selectedAddonsPrice = addons.reduce((sum, id) => {
    const addon = addonOptions.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const selectedAddonsWeeks = addons.reduce((sum, id) => {
    const addon = addonOptions.find((a) => a.id === id);
    return sum + (addon ? addon.weeks : 0);
  }, 0);

  const baseCalculated = (currentService.basePrice * currentScale.multiplier + selectedAddonsPrice) * currentUrgency.multiplier;
  const calculatedMin = Math.round(baseCalculated * 0.95);
  const calculatedMax = Math.round(baseCalculated * 1.15);

  const totalWeeks = Math.max(1, Math.round((currentService.baseWeeks + currentScale.weeksAdd + selectedAddonsWeeks) * currentUrgency.weeksMult));
  const calculatedWeeks = totalWeeks;

  const handleProceedToContact = () => {
    if (setPrefillData) {
      setPrefillData({
        service: serviceType,
        budget: `฿${calculatedMin.toLocaleString()} - ฿${calculatedMax.toLocaleString()}`,
        message: `สรุปความต้องการจากระบบคำนวณราคา:\n- บริการ: ${currentService.nameTh}\n- สเกล: ${currentScale.labelTh}\n- ออปชันเสริม: ${addons.map((a) => addonOptions.find((opt) => opt.id === a)?.nameTh).join(', ') || 'ไม่มี'}\n- ระยะเวลาประมาณการ: ${calculatedWeeks} สัปดาห์\n- ประมาณการงบประมาณ: ฿${calculatedMin.toLocaleString()} - ฿${calculatedMax.toLocaleString()}`
      });
    }
    setPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-brand-700">
          <Calculator className="w-3.5 h-3.5 text-brand-600" />
          <span>{t.estimatorPage.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t.estimatorPage.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          {t.estimatorPage.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Calculator Controls (7 cols) */}
        <div className="lg:col-span-7 sge-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-8 bg-white shadow-lg">
          {/* Step 1 */}
          <div className="space-y-3">
            <label className="text-sm font-black text-slate-900 block">
              {t.estimatorPage.step1}
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {serviceOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setServiceType(opt.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-between ${
                    serviceType === opt.id
                      ? 'bg-blue-50 border-brand-500 text-brand-900 shadow-sm ring-1 ring-brand-500'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-white'
                  }`}
                >
                  <span className="truncate pr-2">{opt.nameTh}</span>
                  <span className="text-xs text-brand-700 font-mono shrink-0 font-bold">
                    เริ่มต้น ฿{opt.basePrice.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <label className="text-sm font-black text-slate-900 block">
              {t.estimatorPage.step2}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scaleOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScale(opt.id)}
                  className={`p-3.5 rounded-xl border text-xs text-left transition-all ${
                    scale === opt.id
                      ? 'bg-blue-50 border-brand-500 text-brand-900 font-bold ring-1 ring-brand-500'
                      : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-white'
                  }`}
                >
                  <div className="font-bold">{opt.labelTh}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <label className="text-sm font-black text-slate-900 block">
              {t.estimatorPage.step3}
            </label>
            <div className="space-y-2">
              {addonOptions.map((opt) => {
                const isChecked = addons.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleAddon(opt.id)}
                    className={`p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between ${
                      isChecked
                        ? 'bg-blue-50/60 border-brand-500 text-slate-900 font-medium'
                        : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                          isChecked
                            ? 'bg-brand-600 border-brand-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span>{opt.nameTh}</span>
                    </div>
                    <span className="text-xs font-mono text-brand-700 shrink-0 ml-2 font-bold">
                      +฿{opt.price.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-3">
            <label className="text-sm font-black text-slate-900 block">
              {t.estimatorPage.step4}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {urgencyOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setUrgency(opt.id)}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all ${
                    urgency === opt.id
                      ? 'bg-blue-50 border-brand-500 text-brand-900 font-bold ring-1 ring-brand-500'
                      : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-white'
                  }`}
                >
                  {opt.labelTh}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Official Quotation Letter / Document Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="sge-card p-6 sm:p-8 rounded-3xl border border-slate-300 bg-white shadow-2xl space-y-6">
            {/* Document Header */}
            <div className="border-b border-slate-200 pb-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-blue-50 text-brand-700 text-[11px] font-mono font-bold flex items-center gap-1.5 border border-blue-200">
                  <FileText className="w-3.5 h-3.5" />
                  QUOTATION DRAFT
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  REF: TAS-2026-{Math.floor(1000 + Math.random() * 9000)}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">
                {t.estimatorPage.companyHeader}
              </h3>
              <p className="text-xs text-brand-700 font-mono font-bold">
                {t.estimatorPage.taxId} | วัตถุประสงค์ (8), (9), (10)
              </p>
            </div>

            {/* Bill of Items */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-500 font-bold border-b border-slate-100 pb-2">
                <span>รายการ (Item Description)</span>
                <span>ประมาณการ</span>
              </div>

              <div className="flex justify-between text-slate-800 font-medium">
                <span className="max-w-[200px] truncate">{currentService.nameTh}</span>
                <span className="font-mono text-brand-700 font-bold">฿{(currentService.basePrice * currentScale.multiplier).toLocaleString()}</span>
              </div>

              {addons.map((id) => {
                const add = addonOptions.find((a) => a.id === id);
                return (
                  <div key={id} className="flex justify-between text-slate-600 pl-2">
                    <span className="truncate max-w-[200px]">+ {add?.nameTh}</span>
                    <span className="font-mono text-slate-500 font-medium">฿{add?.price.toLocaleString()}</span>
                  </div>
                );
              })}

              <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-100">
                <span>ระยะเวลาส่งมอบโดยประมาณ:</span>
                <span className="font-bold text-slate-900 font-mono">{calculatedWeeks} สัปดาห์</span>
              </div>
            </div>

            {/* Price Total Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs text-slate-500 font-bold">
                {t.estimatorPage.estTotal}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-brand-700 font-mono">
                ฿{calculatedMin.toLocaleString()} - ฿{calculatedMax.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500">
                {t.estimatorPage.vatNotice}
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleProceedToContact}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>{t.estimatorPage.exportBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
