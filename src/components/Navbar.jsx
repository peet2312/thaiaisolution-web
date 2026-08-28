import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Globe, Sparkles, ChevronRight, Phone, Mail, MessageSquare, 
  Clock, ShieldCheck, ArrowRight, Bot, Layers, Building2, ChevronDown 
} from 'lucide-react';

export default function Navbar({ lang, setLang, t, currentPage, setPage, setCurrentPage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = setPage || setCurrentPage || (() => {});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTabs = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'portfolio', label: t.nav.portfolio, isHot: true },
    { id: 'estimator', label: t.nav.estimator },
    { id: 'aiStudio', label: t.nav.aiStudio },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleTabClick = (pageId) => {
    navigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* 1. SGE Style Top Contact Bar (Dark Navy contrast bar) */}
      <div className="bg-slate-900 text-[11px] sm:text-xs text-slate-300 py-1.5 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:0971328145" className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors font-medium">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>097-132-8145</span>
            </a>
            <a href="mailto:thaiaisolution@outlook.com" className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors font-medium">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>thaiaisolution@outlook.com</span>
            </a>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-bold">เปิดให้บริการ 24 ชั่วโมง (24/7)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-brand-500/20 text-cyan-300 border border-brand-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> เลขทะเบียนนิติบุคคล: 0905569007271
            </span>

            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all font-semibold"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>{lang === 'th' ? 'TH | EN' : 'EN | TH'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Mini Contact Bar */}
      <div className="bg-slate-950 text-[10px] text-slate-300 py-1.5 px-3 flex md:hidden items-center justify-between border-b border-slate-800">
        <a href="tel:0971328145" className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>โทร 24 ชม. • 097-132-8145</span>
        </a>
        <span className="font-mono text-cyan-300 font-bold text-[9px] bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
          ทะเบียน: 0905569007271
        </span>
      </div>

      {/* 2. SGE Style Main Bright Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-xl border-b border-slate-200/90 shadow-lg shadow-slate-900/5 py-2'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-200/70 py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo & Corporate Identity */}
            <button
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-2.5 sm:gap-3 text-left group shrink-0"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 p-[2px] shadow-md shadow-brand-500/15 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center p-1">
                  <img src="/logo-icon.png" alt="Thai AI Solution Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-black text-sm sm:text-base text-slate-900 tracking-tight">
                    ไทยเอไอ โซลูชั่น
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-brand-50 text-brand-700 border border-brand-200">
                    นิติบุคคล 0905569007271
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono tracking-wider font-semibold">
                  THAI AI SOLUTION CO., LTD.
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
              {navTabs.map((tab) => {
                const isActive = currentPage === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-600 via-blue-600 to-brand-700 text-white shadow-md shadow-brand-600/25'
                        : 'text-slate-600 hover:text-brand-600 hover:bg-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.isHot && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${isActive ? 'bg-rose-400 text-white' : 'bg-rose-500 text-white'}`}>
                        HOT
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Button (Desktop) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleTabClick('estimator')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-extrabold shadow-xl shadow-brand-500/25 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>ขอใบเสนอราคา / ปรึกษาฟรี</span>
              </button>
            </div>

            {/* Mobile Action Controls */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200"
                aria-label="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-brand-600" />
                <span>{lang.toUpperCase()}</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 focus:outline-none transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-rose-600" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[88px] max-h-[calc(100vh-88px)] overflow-y-auto bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-4 pt-3 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navTabs.map((tab) => {
              const isActive = currentPage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-600 to-blue-600 text-white font-bold shadow-md shadow-brand-600/20'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{tab.label}</span>
                    {tab.isHot && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-rose-500 text-white">
                        HOT
                      </span>
                    )}
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Quick Action Buttons in Drawer */}
          <div className="pt-3 border-t border-slate-200 space-y-2.5">
            <button
              onClick={() => handleTabClick('estimator')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-500 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 active:scale-95 transition-transform"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>คำนวณราคา & ขอใบเสนอราคา</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:0971328145"
                className="py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>โทร 24 ชม.</span>
              </a>

              <a
                href="https://lin.ee/9gpj1h4"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#06C755]/10 border border-[#06C755]/30 text-[#06C755] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>LINE Official</span>
              </a>
            </div>
          </div>

          {/* Company Registration Stamp in Drawer */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>บริษัท ไทยเอไอ โซลูชั่น จำกัด</span>
            </div>
            <div className="font-mono text-brand-700 text-[10px]">
              เลขทะเบียนนิติบุคคล: 0905569007271 (24/7 Support)
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
