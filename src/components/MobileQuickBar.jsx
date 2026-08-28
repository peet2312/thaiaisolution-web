import React from 'react';
import { Home, Layers, Calculator, Phone, MessageSquare, Bot, Sparkles } from 'lucide-react';

export default function MobileQuickBar({ currentPage, setCurrentPage, t }) {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 py-2 md:hidden"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      aria-label="Mobile Navigation Bar"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1 items-center">
        {/* 1. Home */}
        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            currentPage === 'home'
              ? 'text-brand-600 font-extrabold bg-blue-50/80'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 ${currentPage === 'home' ? 'text-brand-600 scale-110' : 'text-slate-500'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">หน้าแรก</span>
        </button>

        {/* 2. Services */}
        <button
          onClick={() => {
            setCurrentPage('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            currentPage === 'services'
              ? 'text-brand-600 font-extrabold bg-blue-50/80'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className={`w-5 h-5 ${currentPage === 'services' ? 'text-brand-600 scale-110' : 'text-slate-500'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">บริการ</span>
        </button>

        {/* 3. Estimator (Highlighted Center Button) */}
        <button
          onClick={() => {
            setCurrentPage('estimator');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center -mt-4 group relative"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-blue-600 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-brand-500/35 border-2 border-white group-active:scale-95 transition-all">
            <Calculator className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-1 font-bold text-brand-700 tracking-tight">คำนวณราคา</span>
        </button>

        {/* 4. Phone 24/7 Call */}
        <a
          href="tel:0971328145"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-700 hover:text-brand-600 transition-all relative"
        >
          <div className="relative">
            <Phone className="w-5 h-5 text-emerald-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold text-emerald-700 tracking-tight">โทร 24 ชม.</span>
        </a>

        {/* 5. LINE Official */}
        <a
          href="https://lin.ee/u14z1Oq"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-700 hover:text-emerald-600 transition-all"
        >
          <div className="w-5 h-5 rounded-full bg-[#06C755] flex items-center justify-center text-white">
            <MessageSquare className="w-3 h-3 fill-current" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold text-[#06C755] tracking-tight">แอด LINE</span>
        </a>
      </div>
    </nav>
  );
}
