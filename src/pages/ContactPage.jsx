import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Calendar, Building, Sparkles, PhoneCall } from 'lucide-react';

export default function ContactPage({ t, prefillData }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceType: 'web',
    budget: '',
    message: ''
  });

  const [selectedDate, setSelectedDate] = useState('2026-08-25');
  const [selectedTime, setSelectedTime] = useState('10:00 - 11:00');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        serviceType: prefillData.service || prev.serviceType,
        budget: prefillData.budget || prev.budget,
        message: prefillData.message || prev.message
      }));
    }
  }, [prefillData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-brand-700">
          <Mail className="w-3.5 h-3.5 text-brand-600" />
          <span>{t.contactPage.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t.contactPage.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          {t.contactPage.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: RFP & Booking Form (7 cols) */}
        <div className="lg:col-span-7 sge-card p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-6 bg-white shadow-xl">
          {isSubmitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                {t.contact.form.successTitle}
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                {t.contact.form.successMsg}
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    serviceType: 'web',
                    budget: '',
                    message: ''
                  });
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
              >
                ส่งคำขอเพิ่มเติม
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">
                  แบบฟอร์มขอใบเสนอราคา &amp; ปรึกษาโครงการ (RFP)
                </h3>
                <p className="text-xs text-slate-500">
                  กรอกข้อมูลเพื่อให้ทีมงานฝ่ายวิศวกรรมจัดทำข้อเสนอโครงการและติดต่อกลับ
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.contact.form.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.form.namePlaceholder}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.contact.form.company}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={t.contact.form.companyPlaceholder}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.contact.form.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.form.emailPlaceholder}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.contact.form.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.contact.form.phonePlaceholder}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.contact.form.serviceType}
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none transition-colors"
                  >
                    {t.contact.form.serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.contact.form.budget}
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder={t.contact.form.budgetPlaceholder || "เช่น ฿50,000 - ฿100,000"}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.contact.form.message}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.form.messagePlaceholder || "อธิบายรายละเอียดโปรเจกต์ ฟีเจอร์ที่ต้องการ หรือกำหนดเวลาส่งมอบ..."}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-brand-500 focus:bg-white rounded-xl p-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>{t.contact.form.submitting}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.contact.form.submit}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Scheduler & Official Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Channels Card */}
          <div className="sge-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 bg-white shadow-xl">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                {t.contact.info.companyName}
              </h3>
              <p className="text-xs text-brand-700 font-mono font-bold mb-3">
                {t.contact.info.companyNameEn} | ทะเบียนนิติบุคคล: 0905569007271
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href="https://dbdregistered.dbd.go.th/api/public/shopinfoReg?param=560A0F03DAD1F05E60FACE779017B18456F64EF1FE4CE7B4447D4CFB27DD8854"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center hover:opacity-90 transition-all hover:scale-105"
                  title="คลิกเพื่อตรวจสอบเครื่องหมาย DBD Registered กรมพัฒนาธุรกิจการค้า"
                >
                  <img
                    src="https://dbdregistered.dbd.go.th/api/public/bannerreg?param=560A0F03DAD1F05E60FACE779017B18456F64EF1FE4CE7B4447D4CFB27DD8854"
                    alt="DBD Registered กรมพัฒนาธุรกิจการค้า"
                    className="h-10 w-auto object-contain rounded bg-white p-1 border border-slate-200 shadow-md"
                  />
                </a>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                  ✓ ได้รับการรับรอง DBD Registered
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-600 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-bold">เบอร์โทรศัพท์ติดต่อ</span>
                  <a href="tel:0971328145" className="text-slate-900 hover:text-brand-600 font-black transition-colors text-sm">
                    {t.contact.info.phone} (24 ชม.)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-600 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-bold">อีเมลฝ่ายโครงการ</span>
                  <a href={`mailto:${t.contact.info.email}`} className="text-slate-900 hover:text-brand-600 font-black transition-colors">
                    {t.contact.info.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-600 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-bold">สถานที่ตั้งสำนักงาน</span>
                  <span className="text-slate-800 font-medium">{t.contact.info.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-bold">เวลาให้บริการ</span>
                  <span className="text-emerald-700 font-black">เปิดให้บริการตลอด 24 ชั่วโมง (24/7 ทุกวัน)</span>
                </div>
              </div>
            </div>

            {/* Fast Track LINE OA */}
            <div className="pt-3 border-t border-slate-100">
              <a
                href="https://lin.ee/u14z1Oq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-extrabold shadow-md shadow-emerald-500/20 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ปรึกษาด่วนผ่าน LINE Official Account (@319feyqj)</span>
              </a>
            </div>
          </div>

          {/* Meeting Scheduler Demo Box */}
          <div className="sge-card p-6 rounded-3xl border border-slate-200 space-y-4 bg-white shadow-md">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600" />
              <span>{t.contactPage.scheduleTitle}</span>
            </h4>
            <p className="text-xs text-slate-600">
              {t.contactPage.scheduleDesc}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {["10:00 - 11:00", "13:30 - 14:30", "15:00 - 16:00", "16:30 - 17:30"].map((slot, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`p-2.5 rounded-xl border text-center font-mono font-bold transition-all ${
                    selectedTime === slot
                      ? 'bg-blue-50 border-brand-500 text-brand-900 ring-1 ring-brand-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
