import React, { useState } from 'react';
import { 
  Calculator, Check, Sparkles, Send, Clock, DollarSign, FileText, 
  ArrowRight, RefreshCw, ShieldCheck, User, Building2, Phone, Mail, 
  MapPin, CheckCircle2, Eye, Printer, AlertCircle 
} from 'lucide-react';
import { saveQuotation } from '../services/quotationStorage';
import QuotationDocumentModal from '../components/QuotationDocumentModal';

export default function EstimatorPage({ t, setPage, setPrefillData }) {
  const [serviceType, setServiceType] = useState('web');
  const [scale, setScale] = useState('business');
  const [addons, setAddons] = useState(['ai-assistant', 'security']);
  const [urgency, setUrgency] = useState('normal');

  // Customer Form State
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [taxId, setTaxId] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Generated Quotation Modal State
  const [generatedQuotation, setGeneratedQuotation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastSavedId, setLastSavedId] = useState(null);

  const serviceOptions = [
    { id: 'marketing', nameTh: 'การตลาดออนไลน์ & ยิงแอด Facebook / Google / TikTok / SEO (เริ่ม ฿3,900/ด.)', nameEn: 'Digital Marketing & Ads (Facebook, Google, TikTok, SEO) - From ฿3,900/mo', basePrice: 3900, baseWeeks: 1, unit: 'เดือน' },
    { id: 'web', nameTh: 'โปรแกรมเว็บเพจและระบบเครือข่ายตามความต้องการ', nameEn: 'Web Pages & Custom Network Applications', basePrice: 45000, baseWeeks: 3, unit: 'ระบบ' },
    { id: 'ai', nameTh: 'ซอฟต์แวร์ปัญญาประดิษฐ์ & LLM Integration (วัตถุประสงค์ 8)', nameEn: 'AI & LLM Software Solutions (Obj 8)', basePrice: 65000, baseWeeks: 4, unit: 'ระบบ' },
    { id: 'cloud', nameTh: 'การจัดการสิ่งอำนวยความสะดวกคอมพิวเตอร์ & Cloud (วัตถุประสงค์ 9)', nameEn: 'Computer Facilities & Cloud Management (Obj 9)', basePrice: 35000, baseWeeks: 2, unit: 'ระบบ' },
    { id: 'consult', nameTh: 'กิจกรรมการให้คำปรึกษาทางด้านคอมพิวเตอร์ (วัตถุประสงค์ 10)', nameEn: 'Computer & IT Consulting Activities (Obj 10)', basePrice: 30000, baseWeeks: 2, unit: 'โครงการ' },
    { id: 'full', nameTh: 'โซลูชันครบวงจร (Web + AI + Cloud + Marketing Full-Suite)', nameEn: 'Complete Enterprise Full-Suite Solution', basePrice: 120000, baseWeeks: 6, unit: 'ระบบ' }
  ];

  const scaleOptions = [
    { id: 'mvp', labelTh: 'Starter / รายเดือน (สเกลเริ่มต้น)', multiplier: 1.0, weeksAdd: 0 },
    { id: 'business', labelTh: 'Business / Growth (ระดับธุรกิจเติบโต)', multiplier: 1.8, weeksAdd: 1 },
    { id: 'enterprise', labelTh: 'Enterprise / High-Scale (ระดับองค์กรขยายผล)', multiplier: 3.2, weeksAdd: 2 }
  ];

  const addonOptions = [
    { id: 'tracking-pixel', nameTh: 'ติดตั้ง Pixel & Conversion API ครบวงจร (FB/TikTok/Google)', price: 1500, weeks: 1, unit: 'ชุด' },
    { id: 'creative-video', nameTh: 'ผลิตคลิปสั้นวิดีโอโฆษณา AI TikTok / Reels (4 คลิป)', price: 2500, weeks: 1, unit: 'แพ็กเกจ' },
    { id: 'seo-boost', nameTh: 'ทำ SEO On-Page ปรับแต่งโครงสร้างคำค้นหา Google', price: 3000, weeks: 1, unit: 'บริการ' },
    { id: 'ai-assistant', nameTh: 'ติดตั้ง AI Smart Chatbot & Knowledge Base (RAG)', price: 25000, weeks: 1, unit: 'โมดูล' },
    { id: 'ocr-doc', nameTh: 'ระบบประมวลผลเอกสารอัตโนมัติ AI OCR', price: 30000, weeks: 1, unit: 'โมดูล' },
    { id: 'payment', nameTh: 'เชื่อมต่อ Payment Gateway / PromptPay QR / Kiosk API', price: 15000, weeks: 1, unit: 'ระบบ' },
    { id: 'ha-cloud', nameTh: 'วางระบบ Multi-Region & 24/7 Monitoring (SLA 99.99%)', price: 25000, weeks: 1, unit: 'ระบบ' },
    { id: 'security', nameTh: 'Security Audit & PDPA Data Governance Compliance', price: 20000, weeks: 1, unit: 'บริการ' }
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

  const basePriceCalculated = Math.round(currentService.basePrice * currentScale.multiplier);

  const selectedAddonsPrice = addons.reduce((sum, id) => {
    const addon = addonOptions.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const selectedAddonsWeeks = addons.reduce((sum, id) => {
    const addon = addonOptions.find((a) => a.id === id);
    return sum + (addon ? addon.weeks : 0);
  }, 0);

  const subtotalBeforeUrgency = basePriceCalculated + selectedAddonsPrice;
  const expressFee = urgency === 'express' ? Math.round(subtotalBeforeUrgency * 0.25) : 0;
  const exactSubtotal = subtotalBeforeUrgency + expressFee;
  const exactVat = Math.round(exactSubtotal * 0.07 * 100) / 100;
  const exactGrandTotal = exactSubtotal + exactVat;

  const totalWeeks = Math.max(1, Math.round((currentService.baseWeeks + currentScale.weeksAdd + selectedAddonsWeeks) * currentUrgency.weeksMult));
  const calculatedWeeks = totalWeeks;

  // Handle Generating and Saving Quotation
  const handleGenerateOfficialQuotation = (e) => {
    if (e) e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('กรุณากรอกชื่อผู้ติดต่อ หรือชื่อบริษัท/หน่วยงาน');
      return;
    }
    if (!phone.trim()) {
      setFormError('กรุณากรอกเบอร์โทรศัพท์สำหรับระบุในใบเสนอราคา');
      return;
    }

    // Build Line Items
    const items = [
      {
        no: 1,
        name: `${currentService.nameTh}`,
        description: `ระดับโครงการ: ${currentScale.labelTh}`,
        qty: 1,
        unit: currentService.unit || 'ระบบ',
        unitPrice: basePriceCalculated,
        total: basePriceCalculated
      }
    ];

    addons.forEach((id, index) => {
      const add = addonOptions.find((a) => a.id === id);
      if (add) {
        items.push({
          no: items.length + 1,
          name: add.nameTh,
          description: `ออปชันเสริมประสิทธิภาพระบบ`,
          qty: 1,
          unit: add.unit || 'โมดูล',
          unitPrice: add.price,
          total: add.price
        });
      }
    });

    if (urgency === 'express') {
      items.push({
        no: items.length + 1,
        name: 'ค่าบริการเร่งด่วนพิเศษ (Fast-Track Express +25%)',
        description: `เร่งรัดกำหนดส่งมอบงานเร็วขึ้น 30%`,
        qty: 1,
        unit: 'บริการ',
        unitPrice: expressFee,
        total: expressFee
      });
    }

    const quotationPayload = {
      customerName: customerName.trim(),
      companyName: companyName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      taxId: taxId.trim(),
      address: address.trim(),
      notes: notes.trim(),
      serviceId: serviceType,
      serviceName: currentService.nameTh,
      scale: scale,
      scaleLabel: currentScale.labelTh,
      urgency: urgency,
      urgencyLabel: currentUrgency.labelTh,
      weeks: calculatedWeeks,
      items: items,
      subtotal: exactSubtotal,
      vat: exactVat,
      grandTotal: exactGrandTotal,
      status: 'pending'
    };

    // Save to backend storage
    const savedRecord = saveQuotation(quotationPayload);
    setLastSavedId(savedRecord.id);
    setGeneratedQuotation(savedRecord);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-brand-700">
          <Calculator className="w-3.5 h-3.5 text-brand-600" />
          <span>ระบบคำนวณราคา & ออกใบเสนอราคาจริงอัตโนมัติ 24 ชม.</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          ขอใบเสนอราคาทางการ <span className="text-gradient">รับเอกสารทันที</span>
        </h1>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
          เลือกขอบเขตงานและกรอกข้อมูล ระบบจะคำนวณราคาพร้อมออก <strong>เอกสารใบเสนอราคาทางการ (Quotation)</strong> ให้ท่านดาวน์โหลดและพิมพ์ได้ทันที พร้อมบันทึกข้อมูลเข้าสู่ระบบหลังบ้าน
        </p>
      </div>

      {/* Success Notification Bar (if generated) */}
      {lastSavedId && (
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-wrap items-center justify-between gap-3 shadow-md animate-in fade-in">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>ออกใบเสนอราคาเลขที่ <strong className="font-mono text-emerald-800">{lastSavedId}</strong> เรียบร้อยแล้ว (บันทึกเข้าระบบหลังบ้านแล้ว)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>เปิดดูใบเสนอราคา</span>
            </button>
            <button
              onClick={() => setPage('admin')}
              className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100/50"
            >
              ดูระบบหลังบ้าน
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive Calculator Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="sge-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-8 bg-white shadow-lg">
            {/* Step 1: Base Service */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>เลือกประเภทบริการหลัก (Base Service)</span>
                </label>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setServiceType(opt.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-between ${
                      serviceType === opt.id
                        ? 'bg-blue-50 border-brand-500 text-brand-900 shadow-sm ring-2 ring-brand-500/20'
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

            {/* Step 2: Project Scale */}
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>เลือกระดับสเกลโครงการ (Project Scale)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scaleOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setScale(opt.id)}
                    className={`p-3.5 rounded-2xl border text-xs text-left transition-all ${
                      scale === opt.id
                        ? 'bg-blue-50 border-brand-500 text-brand-900 font-bold ring-2 ring-brand-500/20'
                        : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-white'
                    }`}
                  >
                    <div className="font-bold">{opt.labelTh}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Addons */}
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>เลือกโมดูลเสริม AI & ฟีเจอร์ที่ต้องการ (AI Add-ons)</span>
              </label>
              <div className="space-y-2">
                {addonOptions.map((opt) => {
                  const isChecked = addons.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleAddon(opt.id)}
                      className={`p-3 rounded-2xl border text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-blue-50/60 border-brand-500 text-slate-900 font-medium ring-1 ring-brand-500/20'
                          : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
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

            {/* Step 4: Urgency */}
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                <span>ระยะเวลากำหนดส่งมอบงาน (Delivery Timeline)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {urgencyOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setUrgency(opt.id)}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm text-left transition-all ${
                      urgency === opt.id
                        ? 'bg-blue-50 border-brand-500 text-brand-900 font-bold ring-2 ring-brand-500/20'
                        : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-white'
                    }`}
                  >
                    {opt.labelTh}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Information Input Form */}
          <div className="sge-card p-6 sm:p-8 rounded-3xl border-2 border-brand-300 bg-gradient-to-b from-white to-blue-50/30 space-y-6 shadow-xl">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-brand-700 font-bold text-xs">
                <User className="w-4 h-4" />
                <span>ข้อมูลสำหรับออกเอกสารใบเสนอราคาทางการ</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                กรอกข้อมูลผู้ติดต่อ / บริษัทผู้ว่าจ้าง
              </h2>
              <p className="text-xs text-slate-500">
                ระบบจะนำข้อมูลนี้ไปพิมพ์ลงในเอกสารใบเสนอราคาจริงและบันทึกเข้าระบบหลังบ้านทันที
              </p>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Customer Name */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">
                  ชื่อผู้ติดต่อ / ตัวแทน *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="เช่น คุณสมชาย เจริญสุข"
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900"
                />
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">
                  ชื่อบริษัท / นิติบุคคล / ร้านค้า
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="เช่น บริษัท สมาร์ทบิซ จำกัด"
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">
                  เบอร์โทรศัพท์ติดต่อ *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="เช่น 081-234-5678"
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">
                  อีเมล (สำหรับจัดส่งเอกสาร)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="เช่น contact@company.com"
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900"
                />
              </div>

              {/* Tax ID */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">
                  เลขประจำตัวผู้เสียภาษี (Tax ID / ถ้ามี)
                </label>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  placeholder="เช่น 0105560012345"
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 font-mono"
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">
                  ที่อยู่สำหรับออกเอกสาร
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="เช่น 123/4 ถ.สุขุมวิท กรุงเทพฯ 10110"
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-800">
                รายละเอียดหรือความต้องการเพิ่มเติม
              </label>
              <textarea
                rows="2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ระบุข้อกำหนดเพิ่มเติม หรือฟังก์ชันเฉพาะที่ต้องการ..."
                className="w-full p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleGenerateOfficialQuotation}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-brand-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5 text-amber-300" />
              <span>📄 ออกใบเสนอราคาทางการจริง & บันทึกเข้าระบบทันที</span>
            </button>
          </div>

        </div>

        {/* Right Side: Live Quotation Summary & Breakdown (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="sge-card p-6 sm:p-8 rounded-3xl border border-slate-300 bg-white shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="border-b border-slate-200 pb-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-blue-50 text-brand-700 text-[11px] font-mono font-bold flex items-center gap-1.5 border border-blue-200">
                  <FileText className="w-3.5 h-3.5" />
                  สรุปใบเสนอราคาเรียลไทม์
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  24/7 Auto Generated
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 pt-1">
                บริษัท ไทยเอไอ โซลูชั่น จำกัด
              </h3>
              <p className="text-xs text-brand-700 font-mono font-bold">
                เลขทะเบียนนิติบุคคล: 0905569007271
              </p>
            </div>

            {/* Bill of Items */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-500 font-bold border-b border-slate-100 pb-2">
                <span>รายการ (Item Description)</span>
                <span>จำนวนเงิน</span>
              </div>

              {/* Service Base */}
              <div className="flex justify-between text-slate-800 font-medium">
                <div className="pr-2">
                  <div className="font-bold text-slate-900">{currentService.nameTh}</div>
                  <div className="text-[10px] text-slate-500">{currentScale.labelTh}</div>
                </div>
                <span className="font-mono text-brand-700 font-bold shrink-0">฿{basePriceCalculated.toLocaleString()}</span>
              </div>

              {/* Selected Addons */}
              {addons.map((id) => {
                const add = addonOptions.find((a) => a.id === id);
                return (
                  <div key={id} className="flex justify-between text-slate-600 pl-2">
                    <span className="truncate max-w-[200px] text-[11px]">+ {add?.nameTh}</span>
                    <span className="font-mono text-slate-700 font-bold shrink-0">฿{add?.price.toLocaleString()}</span>
                  </div>
                );
              })}

              {/* Urgency */}
              {urgency === 'express' && (
                <div className="flex justify-between text-amber-700 pl-2 font-bold">
                  <span className="text-[11px]">+ เร่งด่วนพิเศษ (Fast-Track Express +25%)</span>
                  <span className="font-mono">฿{expressFee.toLocaleString()}</span>
                </div>
              )}

              {/* Timeline */}
              <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-100 text-[11px]">
                <span>ระยะเวลาส่งมอบโดยประมาณ:</span>
                <span className="font-bold text-slate-900 font-mono">{calculatedWeeks} สัปดาห์</span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>ยอดรวมก่อนภาษี (Subtotal):</span>
                <span className="font-mono font-bold text-slate-900">฿{exactSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ภาษีมูลค่าเพิ่ม 7% (VAT):</span>
                <span className="font-mono font-bold text-slate-900">฿{exactVat.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-brand-900">
                <span className="font-black text-xs sm:text-sm">ยอดสุทธิ (Grand Total):</span>
                <span className="text-xl sm:text-2xl font-black text-brand-700 font-mono">
                  ฿{exactGrandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleGenerateOfficialQuotation}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-brand-600/25 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>ออกใบเสนอราคาจริงทันที</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="tel:0971328145"
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>โทร 24 ชม.</span>
                </a>

                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#06C755]/10 border border-[#06C755]/30 text-[#06C755] font-bold flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>แอด LINE ปรึกษา</span>
                </a>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-center">
              *ใบเสนอราคาออกโดยนิติบุคคล ถูกต้องตามระเบียบสรรพากร 100%
            </div>

          </div>
        </div>

      </div>

      {/* Official Quotation Modal Document */}
      <QuotationDocumentModal
        quotation={generatedQuotation}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}
