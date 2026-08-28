import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileQuickBar from './components/MobileQuickBar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import EstimatorPage from './pages/EstimatorPage';
import AIAssistantPage from './pages/AIAssistantPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { translations } from './data/translations';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('th');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedServiceTab, setSelectedServiceTab] = useState('web');
  const [prefillData, setPrefillData] = useState(null);

  const t = translations[lang] || translations.th;

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            t={t}
            setPage={setCurrentPage}
            setSelectedServiceTab={setSelectedServiceTab}
          />
        );
      case 'services':
        return (
          <ServicesPage
            t={t}
            initialTab={selectedServiceTab}
            setPage={setCurrentPage}
            setPrefillData={setPrefillData}
          />
        );
      case 'estimator':
        return (
          <EstimatorPage
            t={t}
            setPage={setCurrentPage}
            setPrefillData={setPrefillData}
          />
        );
      case 'aiStudio':
        return (
          <AIAssistantPage
            t={t}
            setPage={setCurrentPage}
          />
        );
      case 'portfolio':
        return (
          <PortfolioPage
            t={t}
            setPage={setCurrentPage}
            setPrefillData={setPrefillData}
          />
        );
      case 'about':
        return (
          <AboutPage
            t={t}
            setPage={setCurrentPage}
          />
        );
      case 'contact':
        return (
          <ContactPage
            t={t}
            prefillData={prefillData}
          />
        );
      default:
        return (
          <HomePage
            t={t}
            setPage={setCurrentPage}
            setSelectedServiceTab={setSelectedServiceTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-brand-500 selection:text-white font-sans">
      {/* Top Navigation */}
      <Navbar
        t={t}
        lang={lang}
        setLang={setLang}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content Area (With bottom padding for mobile dock) */}
      <main className="flex-grow pb-16 md:pb-0">
        {renderPage()}
      </main>

      {/* Floating AI Studio Quick Trigger (Positioned above mobile bottom bar) */}
      {currentPage !== 'aiStudio' && (
        <button
          onClick={() => setCurrentPage('aiStudio')}
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 p-3 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-brand-500/35 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-cyan-300/30 backdrop-blur-md group"
          title="ปรึกษาผู้ช่วย Thai AI Studio"
        >
          <div className="relative">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-navy-950"></span>
          </div>
          <span className="hidden sm:inline">Thai AI Studio</span>
        </button>
      )}

      {/* Mobile Sticky Quick Navigation Dock */}
      <MobileQuickBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        t={t}
      />

      {/* Footer */}
      <Footer
        t={t}
        setCurrentPage={setCurrentPage}
        setSelectedServiceTab={setSelectedServiceTab}
      />
    </div>
  );
}
