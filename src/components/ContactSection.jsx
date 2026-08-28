import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Sparkles, Building, PhoneCall } from 'lucide-react';

export default function ContactSection({ t, prefilledData }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceType: 'web',
    budget: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        serviceType: prefilledData.service || prev.serviceType,
        budget: prefilledData.budget || prev.budget,
        message: prefilledData.message || prev.message
      }));
    }
  }, [prefilledData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative bg-navy-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.contact.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t.contact.form.successTitle}
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
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
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold border border-slate-700 transition-all"
                >
                  ส่งแบบฟอร์มอีกครั้ง
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.form.name} <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.form.namePlaceholder || "คุณสมชาย ใจดี"}
                      className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.form.company}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t.contact.form.companyPlaceholder || "บริษัท / ร้านค้า"}
                      className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.form.email} <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.form.emailPlaceholder || "name@company.com"}
                      className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.form.phone} <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.contact.form.phonePlaceholder || "08X-XXX-XXXX"}
                      className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.form.serviceType}
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none transition-all"
                    >
                      {t.contact.form.serviceOptions ? (
                        t.contact.form.serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="web">พัฒนาเว็บ & แอปพลิเคชันตามความต้องการ</option>
                          <option value="ai">ระบบ AI & LLM Integration (วัตถุประสงค์ 8)</option>
                          <option value="cloud">การจัดการ Cloud & สิ่งอำนวยความสะดวก (วัตถุประสงค์ 9)</option>
                          <option value="consult">ที่ปรึกษาไอที & AI Transformation (วัตถุประสงค์ 10)</option>
                          <option value="full">แพ็กเกจครบวงจรทุกด้าน (Full-Suite)</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.form.budget}
                    </label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder={t.contact.form.budgetPlaceholder || "เช่น ฿50,000 - ฿100,000"}
                      className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.form.messagePlaceholder || "อธิบายรายละเอียดโปรเจกต์ ฟีเจอร์ที่ต้องการ หรือกำหนดเวลาส่งมอบ..."}
                    className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl p-4 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-brand-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
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

          {/* Right: Contact Information & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Info Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {t.contact.info.companyName}
                </h3>
                <p className="text-xs text-slate-400">
                  {t.contact.info.companyNameEn}
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">อีเมลติดต่อฝ่ายขายและโครงการ</span>
                    <a href={`mailto:${t.contact.info.email}`} className="text-white hover:text-cyan-300 font-semibold transition-colors">
                      {t.contact.info.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">สถานที่ตั้งสำนักงาน</span>
                    <span className="text-slate-200">{t.contact.info.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">เวลาทำการ</span>
                    <span className="text-slate-200">{t.contact.info.businessHours}</span>
                  </div>
                </div>
              </div>

              {/* Quick Communication Buttons */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <a
                  href="https://lin.ee/9gpj1h4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>ปรึกษาด่วนผ่าน LINE Official Account (@9gpj1h4)</span>
                </a>
              </div>
            </div>

            {/* Map / High-Tech Locator Visual */}
            <div className="glass-panel p-4 rounded-2xl border border-slate-800 relative overflow-hidden">
              <div className="h-36 rounded-xl bg-slate-950 border border-slate-800 relative flex items-center justify-center overflow-hidden tech-grid-bg">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent pointer-events-none" />
                <div className="text-center z-10 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-300 animate-pulse">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-white">Bangkok, Thailand Hub</div>
                  <div className="text-[10px] text-slate-400 font-mono">13.7563° N, 100.5018° E</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
