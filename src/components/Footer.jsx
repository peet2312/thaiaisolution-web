import React from 'react';
import { ShieldCheck, ArrowUp, Sparkles, Building, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ t, setPage, setCurrentPage, setSelectedServiceTab }) {
  const navigate = setPage || setCurrentPage || (() => {});

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (pageId, subTabId) => {
    if (subTabId && setSelectedServiceTab) {
      setSelectedServiceTab(subTabId);
    }
    navigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-12 relative text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info & Address (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center p-1">
                  <img src="/logo-icon.png" alt="Thai AI Solution" className="w-full h-full object-contain" />
                </div>
              </div>
              <div>
                <span className="font-black text-white text-base block">บริษัท ไทยเอไอ โซลูชั่น จำกัด</span>
                <span className="text-xs text-slate-400 font-mono">THAI AI SOLUTION CO., LTD.</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>149/8 ถ.เก้าแสน ต.บ่อยาง อ.เมือง จ.สงขลา 90000</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:0971328145" className="hover:text-cyan-300 font-bold text-white transition-colors">
                  097-132-8145
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:thaiaisolution@outlook.com" className="hover:text-cyan-300 font-bold text-white transition-colors">
                  thaiaisolution@outlook.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>เปิดให้บริการ 24 ชั่วโมง (24/7 Support)</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[11px] text-cyan-300 font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>เลขทะเบียนนิติบุคคล: 0905569007271</span>
              </div>
            </div>
          </div>

          {/* Core Services Sub-tabs Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              แท็บบริการหลัก (Services)
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('services', 'marketing')}
                  className="hover:text-cyan-300 transition-colors text-left font-bold text-slate-200"
                >
                  การตลาดออนไลน์ &amp; ยิงแอด (เริ่ม ฿3,900)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services', 'web')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  โปรแกรมเว็บเพจ &amp; ระบบเครือข่าย
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services', 'ai')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  ซอฟต์แวร์ AI &amp; LLM (ข้อ 8)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services', 'cloud')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  จัดการ Cloud &amp; Facilities (ข้อ 9)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services', 'consult')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  ที่ปรึกษาด้านคอมพิวเตอร์ (ข้อ 10)
                </button>
              </li>
            </ul>
          </div>

          {/* Multi-Pages Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              หน้าทั้งหมด (Pages)
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-cyan-300 transition-colors">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-300 transition-colors">
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portfolio')} className="hover:text-cyan-300 transition-colors">
                  {t.nav.portfolio}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('estimator')} className="hover:text-cyan-300 transition-colors">
                  {t.nav.estimator}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('aiStudio')} className="hover:text-cyan-300 transition-colors">
                  {t.nav.aiStudio}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-cyan-300 transition-colors">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-cyan-300 transition-colors">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              ความมั่นคงปลอดภัย (Security)
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>{t.footer.privacy}</li>
              <li>{t.footer.terms}</li>
              <li>{t.footer.security}</li>
              <li>PDPA &amp; Data Governance</li>
              <li className="text-emerald-400 font-bold">100% Client Code Ownership</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 บริษัท ไทยเอไอ โซลูชั่น จำกัด (THAI AI SOLUTION CO., LTD.). สงวนลิขสิทธิ์ทั้งหมด
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all font-bold"
          >
            <span>กลับขึ้นด้านบน</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
