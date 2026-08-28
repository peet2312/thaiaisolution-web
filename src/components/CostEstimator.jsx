import React, { useState } from 'react';
import { Calculator, Check, Sparkles, Send, Clock, DollarSign, ShieldAlert, ArrowRight } from 'lucide-react';

export default function CostEstimator({ t, onPrefillContact }) {
  const [serviceType, setServiceType] = useState('web');
  const [scale, setScale] = useState('business');
  const [addons, setAddons] = useState(['ai-assistant', 'security']);
  const [urgency, setUrgency] = useState('normal');

  const serviceOptions = [
    { id: 'web', nameTh: 'เว็บเพจ & แอปพลิเคชันตามความต้องการ', nameEn: 'Web & Custom Network Application', basePrice: 45000, baseWeeks: 3 },
    { id: 'ai', nameTh: 'ซอฟต์แวร์ปัญญาประดิษฐ์ & LLM Integration (วัตถุประสงค์ 8)', nameEn: 'AI & LLM Software Solution (Obj 8)', basePrice: 65000, baseWeeks: 4 },
    { id: 'cloud', nameTh: 'จัดการ Cloud & สิ่งอำนวยความสะดวกคอมพิวเตอร์ (วัตถุประสงค์ 9)', nameEn: 'Cloud Facilities Management (Obj 9)', basePrice: 35000, baseWeeks: 2 },
    { id: 'consult', nameTh: 'ให้คำปรึกษาไอที & AI Transformation (วัตถุประสงค์ 10)', nameEn: 'IT & AI Consulting Activities (Obj 10)', basePrice: 30000, baseWeeks: 2 },
    { id: 'full', nameTh: 'โซลูชันครบวงจร (Web + AI + Cloud + Consulting)', nameEn: 'Complete Full-Suite Enterprise Solution', basePrice: 120000, baseWeeks: 6 }
  ];

  const scaleOptions = [
    { id: 'mvp', labelTh: 'Startup / MVP (ระบบเริ่มต้น)', labelEn: 'Startup / MVP', multiplier: 1.0, weeksAdd: 0 },
    { id: 'business', labelTh: 'Business / SME (ระบบมาตรฐานธุรกิจ)', labelEn: 'Business / SME Standard', multiplier: 1.8, weeksAdd: 2 },
    { id: 'enterprise', labelTh: 'Enterprise (ระบบองค์กรขนาดใหญ่ High-Scale)', labelEn: 'Enterprise High-Scale & High Security', multiplier: 3.2, weeksAdd: 4 }
  ];

  const addonOptions = [
    { id: 'ai-assistant', nameTh: 'ติดตั้ง AI Smart Chatbot / Agentic Workflow', nameEn: 'AI Smart Chatbot / Agent Workflow', price: 25000, weeks: 1 },
    { id: 'ocr-doc', nameTh: 'ระบบประมวลผลเอกสารอัตโนมัติ AI OCR', nameEn: 'Document AI OCR Processing', price: 30000, weeks: 1 },
    { id: 'payment', nameTh: 'เชื่อมต่อระบบชำระเงิน / PromptPay QR / Kiosk API', nameEn: 'Payment Gateway / QR PromptPay Integration', price: 15000, weeks: 1 },
    { id: 'ha-cloud', nameTh: 'วางระบบ Multi-Region & 24/7 Monitoring', nameEn: 'Multi-Region HA & 24/7 Monitoring', price: 25000, weeks: 1 },
    { id: 'security', nameTh: 'Security Audit & PDPA Data Governance', nameEn: 'Security Audit & PDPA Governance', price: 20000, weeks: 1 }
  ];

  const urgencyOptions = [
    { id: 'normal', labelTh: 'ตามมาตรฐานโครงการ (Standard)', labelEn: 'Standard Pace', multiplier: 1.0, weeksMult: 1.0 },
    { id: 'express', labelTh: 'เร่งด่วนพิเศษ (Fast-Track +25%)', labelEn: 'Fast-Track Express (+25%)', multiplier: 1.25, weeksMult: 0.7 }
  ];

  const toggleAddon = (id) => {
    if (addons.includes(id)) {
      setAddons(addons.filter((a) => a !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  // Calculate pricing
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

  const calculatedMin = Math.round(
    (currentService.basePrice * currentScale.multiplier + selectedAddonsPrice) * currentUrgency.multiplier
  );
  const calculatedMax = Math.round(calculatedMin * 1.35);

  const calculatedWeeks = Math.max(
    1,
    Math.round((currentService.baseWeeks + currentScale.weeksAdd + selectedAddonsWeeks) * currentUrgency.weeksMult)
  );

  const handleApplyToContact = () => {
    const summaryText = `[สรุปการประเมินราคา]:
- บริการ: ${currentService.nameTh}
- ขนาดระบบ: ${currentScale.labelTh}
- ฟีเจอร์เพิ่มเติม: ${addons.map(id => addonOptions.find(a => a.id === id)?.nameTh).filter(Boolean).join(', ') || 'ไม่มี'}
- ความเร่งด่วน: ${currentUrgency.labelTh}
- งบประมาณประเมิน: ฿${calculatedMin.toLocaleString()} - ฿${calculatedMax.toLocaleString()} บาท
- ระยะเวลาประเมิน: ประมาณ ${calculatedWeeks} สัปดาห์`;

    if (onPrefillContact) {
      onPrefillContact({
        service: currentService.id,
        budget: `฿${calculatedMin.toLocaleString()} - ฿${calculatedMax.toLocaleString()}`,
        message: summaryText
      });
    }

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="py-24 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300 mb-3">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.estimator.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.estimator.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.estimator.subtitle}
          </p>
        </div>

        {/* Main Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls (8 cols) */}
          <div className="lg:col-span-7 space-y-8 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
            {/* Step 1: Service Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">
                1. {t.estimator.serviceLabel}
              </label>
              <div className="space-y-2">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setServiceType(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                      serviceType === opt.id
                        ? 'bg-brand-600/20 border-cyan-400 text-white shadow-md shadow-brand-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{opt.nameTh}</span>
                    <span className="text-[11px] text-cyan-400 font-mono shrink-0 ml-2">
                      เริ่มต้น ฿{opt.basePrice.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: System Scale */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">
                2. {t.estimator.scaleLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scaleOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setScale(opt.id)}
                    className={`p-3.5 rounded-xl border text-xs text-left transition-all ${
                      scale === opt.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-white font-semibold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-medium text-slate-200 mb-1">{opt.labelTh}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Capabilities */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">
                3. {t.estimator.featuresLabel}
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
                          ? 'bg-slate-800/80 border-cyan-400/80 text-white'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                            isChecked
                              ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                              : 'border-slate-600 bg-slate-950'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span>{opt.nameTh}</span>
                      </div>
                      <span className="text-xs font-mono text-cyan-300 shrink-0 ml-2">
                        +฿{opt.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Urgency */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">
                4. {t.estimator.timelineLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {urgencyOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setUrgency(opt.id)}
                    className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition-all ${
                      urgency === opt.id
                        ? 'bg-brand-600/20 border-cyan-400 text-white font-medium'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {opt.labelTh}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-2 border-brand-500/40 bg-gradient-to-b from-slate-900/90 to-navy-950 shadow-2xl shadow-brand-500/10">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  สรุปผลการประเมินราคา
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  24/7 Support
                </span>
              </div>

              {/* Price Display */}
              <div className="mb-6">
                <div className="text-xs text-slate-400 mb-1">{t.estimator.estimatedBudget}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-brand-300 to-white">
                  ฿{calculatedMin.toLocaleString()} - ฿{calculatedMax.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  {t.estimator.currency} (ยังไม่รวมภาษีมูลค่าเพิ่ม)
                </div>
              </div>

              {/* Timeline Display */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">{t.estimator.estimatedDuration}</div>
                  <div className="text-sm font-bold text-slate-100">
                    ประมาณ {calculatedWeeks} {t.estimator.weeks}
                  </div>
                </div>
              </div>

              {/* Selected Specs Breakdown */}
              <div className="space-y-2 text-xs text-slate-300 pb-6 border-b border-slate-800 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">บริการหลัก:</span>
                  <span className="font-medium text-slate-200 text-right truncate max-w-[200px]">
                    {currentService.nameTh}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">สเกลระบบ:</span>
                  <span className="font-medium text-slate-200">{currentScale.labelTh}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ส่วนเสริม:</span>
                  <span className="font-medium text-cyan-300">{addons.length} รายการ</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleApplyToContact}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-brand-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>{t.estimator.requestQuotation}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-slate-400 text-center mt-4 leading-relaxed">
                {t.estimator.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
