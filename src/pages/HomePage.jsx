import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, Code, Bot, Server, Briefcase, Megaphone, 
  ChevronRight, ShieldCheck, CheckCircle2, Cpu, Globe, Laptop, 
  ShoppingCart, Building2, Flame, Layers, Star, Check, HelpCircle, 
  Phone, MessageSquare, ExternalLink, Zap, Clock, Award
} from 'lucide-react';

export default function HomePage({ t, setPage, setSelectedServiceTab }) {
  const [openFaq, setOpenFaq] = useState(null);

  const handleGoToService = (tabId) => {
    if (setSelectedServiceTab) setSelectedServiceTab(tabId);
    setPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToPortfolio = (category) => {
    setPage('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceFormats = [
    {
      id: 'marketing',
      serviceTab: 'marketing',
      icon: Megaphone,
      badge: 'แนะนำ เริ่มต้น ฿3,900/เดือน',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'รับทำการตลาดออนไลน์ & ยิงแอด AI (FB / Google / TikTok / SEO)',
      subtitle: 'ยิงแอดแม่นยำ ตรงกลุ่มเป้าหมาย ดันเว็บติดหน้าแรก Google เพิ่มยอดขายทันที',
      desc: 'บริการยิงแอดโฆษณาออนไลน์ครบวงจรบน Google Ads, Facebook Ads, TikTok Ads และทำ SEO ดันอันดับคำค้นหาติดหน้าแรก Google อย่างยั่งยืน รายงานผลแบบโปร่งใสทุกสัปดาห์',
      price: 'เริ่มต้น ฿3,900 / เดือน',
      duration: 'แพ็กเกจรายเดือน / ไม่มีข้อผูกมัด',
      features: [
        'ยิงแอด Google Ads ดักจับลูกค้าค้นหาซื้อจริง (High Intent)',
        'ยิงแอด Facebook & TikTok Ads ด้วย AI Smart Audience',
        'ปรับแต่งโครงสร้าง SEO On-Page ดันติดหน้าแรก Google',
        'รายงานผลลัพธ์ ROI และยอดขายแบบโปร่งใสทุกสัปดาห์'
      ]
    },
    {
      id: 'corporate',
      serviceTab: 'web',
      icon: Building2,
      badge: 'ยอดนิยมสำหรับธุรกิจ',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'รับทำเว็บไซต์บริษัท / องค์กร (Corporate Website)',
      subtitle: 'เว็บสวย ยกระดับภาพลักษณ์องค์กรให้น่าเชื่อถือ ติดหน้าแรก Google',
      desc: 'ออกแบบเฉพาะตาม Corporate Identity (CI) ของแบรนด์ วางโครงสร้าง SEO ติดหน้าแรก Google รองรับทุกอุปกรณ์ 100% พร้อมระบบจัดการเนื้อหา (CMS) ใช้งานง่าย',
      price: 'เริ่มต้น ฿35,000',
      duration: 'ระยะเวลา 2-3 สัปดาห์',
      features: [
        'ดีไซน์ตาม Corporate Identity (CI) ขององค์กร',
        'วางโครงสร้าง SEO ให้ติดหน้าแรก Google ง่ายขึ้น',
        'ระบบ CMS เพิ่มและแก้ไขบทความได้ไม่จำกัด',
        'ระบบความปลอดภัย SSL และฟอร์มติดต่อลูกค้า'
      ]
    },
    {
      id: 'ecommerce',
      serviceTab: 'web',
      icon: ShoppingCart,
      badge: 'ครบ จบ พร้อมขาย',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'รับทำเว็บไซต์ร้านค้าออนไลน์ (E-Commerce & Portals)',
      subtitle: 'เว็บไซต์ที่พร้อมขาย ครบ จบในที่เดียว รองรับการชำระเงินทุกช่องทาง',
      desc: 'เหมาะสำหรับธุรกิจค้าปลีก-ส่ง B2B/B2C ระบบตะกร้าสินค้า ตัดบัตรเครดิต สแกน PromptPay QR อัตโนมัติ พร้อมระบบเช็กสลิปโอนเงินด้วย AI OCR อัจฉริยะ',
      price: 'เริ่มต้น ฿55,000',
      duration: 'ระยะเวลา 3-4 สัปดาห์',
      features: [
        'ระบบตะกร้าสินค้า คำนวณค่าส่ง และสต็อกสินค้า',
        'เชื่อมต่อ PromptPay QR, บัตรเครดิต และเคาน์เตอร์',
        'ระบบ AI OCR ตรวจสลิปโอนเงินอัตโนมัติ',
        'ระบบออกใบเสร็จ / ใบกำกับภาษีออนไลน์'
      ]
    },
    {
      id: 'salepage',
      serviceTab: 'web',
      icon: Flame,
      badge: 'เน้น Conversion Rate',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'รับทำเซลเพจปิดการขาย (High-Converting Sale Page)',
      subtitle: 'ออกแบบโครงสร้างเพื่อเน้นการปิดการขาย ยิงแอดได้แม่นยำ โหลดไวที่สุด',
      desc: 'เหมาะสำหรับยิงแอด Facebook, TikTok, Google โหลดจบใน 0.5-1 วินาที วางโครงสร้าง Sales Funnel ตามหลักจิตวิทยาการตัดสินใจซื้อ เพิ่มอัตราปิดการขายสูงสุด',
      price: 'เริ่มต้น ฿18,000',
      duration: 'ระยะเวลา 5-7 วัน',
      features: [
        'ความเร็วเปิดหน้าเว็บระดับ Ultra-Fast (< 1 วินาที)',
        'ติดตั้ง Facebook Pixel, TikTok Pixel ครบชุด',
        'โครงสร้าง Sales Funnel ปิดการขายในหน้าเดียว',
        'แบบฟอร์มเก็บลีดและปุ่มกดแอดไลน์โดดเด่น'
      ]
    },
    {
      id: 'webapp_ai',
      serviceTab: 'ai',
      icon: Layers,
      badge: 'ซอฟต์แวร์ & AI เฉพาะทาง',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      title: 'รับทำเว็บแอปพลิเคชัน & ซอฟต์แวร์ AI (Custom Web & AI Systems)',
      subtitle: 'พัฒนาซอฟต์แวร์ตามวัตถุประสงค์เฉพาะทาง และผสานพลังปัญญาประดิษฐ์',
      desc: 'พัฒนาโปรแกรมและเว็บแอปพลิเคชันเฉพาะทางสำหรับองค์กร ระบบ CRM, ERP, AI Chatbot RAG และระบบวิเคราะห์ข้อมูลธุรกิจ เชื่อมต่อฐานข้อมูลและคลาวด์แบบสมบูรณ์',
      price: 'เริ่มต้น ฿65,000',
      duration: 'ระยะเวลา 3-6 สัปดาห์',
      features: [
        'เขียนโปรแกรมเว็บแอปพลิเคชันตามความต้องการเฉพาะ',
        'เชื่อมต่อ AI Large Language Models (LLM) & RAG',
        'จัดการโครงสร้างคลาวด์ AWS/GCP ประสิทธิภาพสูง 24/7',
        'ให้คำปรึกษาวาง System Architecture ระดับองค์กร'
      ]
    }
  ];

  const featuredProjects = [
    {
      id: 1,
      category: 'corporate',
      badge: 'Corporate Website',
      title: 'เว็บไซต์จำหน่ายอุปกรณ์เครื่องจักรอุตสาหกรรม CNC',
      client: 'บริษัท อุตสาหกรรมเครื่องจักรกลไทยกลึง จำกัด',
      domain: 'www.thaicnc-machinery.com',
      kpi: 'ยอดขอใบเสนอราคาเพิ่มขึ้น 340% ภายใน 3 เดือน',
      kpiSub: 'ติดหน้าแรก Google คำค้นหาสำคัญกว่า 45 คำ',
      themeColor: 'from-blue-500/15 via-blue-50/50 to-white',
      tags: ['React 19', 'Next.js', 'SEO Top 3', 'FastAPI']
    },
    {
      id: 2,
      category: 'ecommerce',
      badge: 'E-Commerce & B2B',
      title: 'ระบบร้านค้าออนไลน์ B2B & ชำระเงิน PromptPay QR อัตโนมัติ',
      client: 'บริษัท ซัพพลายเชน โกลบอล เทรดดิ้ง จำกัด',
      domain: 'www.globaltrade-supplies.co.th',
      kpi: 'ยอดขายออนไลน์ทะลุ 1.8 ล้านบาทใน 60 วัน',
      kpiSub: 'ลดเวลางานแอดมินตรวจสลิปโอนเงินลง 90%',
      themeColor: 'from-emerald-500/15 via-emerald-50/50 to-white',
      tags: ['E-Commerce', 'PromptPay QR', 'AI OCR', 'PostgreSQL']
    },
    {
      id: 7,
      category: 'marketing',
      badge: 'Performance Marketing & SEO',
      title: 'แคมเปญยิงแอด Google Ads + Facebook Ads + SEO ติดหน้าแรก',
      client: 'บริษัท นวัตกรรมโซลาร์และพลังงานสะอาดแห่งประเทศไทย จำกัด',
      domain: 'ads.thaisolar-marketing.com',
      kpi: 'ผลตอบแทนค่าโฆษณา ROAS สูงถึง 8.4 เท่า (รายได้โต 420%)',
      kpiSub: 'ลดต้นทุนต่อการได้ลูกค้า (CPA) ลง 54% เริ่มต้นงบ ฿3,900/ด.',
      themeColor: 'from-rose-500/15 via-rose-50/50 to-white',
      tags: ['Google Ads', 'Facebook Meta API', 'SEO On-Page', 'GA4']
    }
  ];

  const processSteps = [
    {
      num: '01',
      title: 'ปรึกษาและวางแผน (Planning & Wireframe)',
      desc: 'พูดคุยทำความเข้าใจโจทย์ธุรกิจ กลุ่มเป้าหมาย และฟังก์ชันที่ต้องการ พร้อมจัดทำ Sitemap และ Wireframe โครงสร้างหน้าเว็บ'
    },
    {
      num: '02',
      title: 'ออกแบบดีไซน์ UI/UX (Custom Design)',
      desc: 'ออกแบบหน้าตาเว็บไซต์ให้สวยงาม ทันสมัย ตรงตามอัตลักษณ์แบรนด์ (CI) และรองรับการแสดงผลทุกขนาดหน้าจอ (Mobile Responsive)'
    },
    {
      num: '03',
      title: 'เขียนโปรแกรมและพัฒนาระบบ (Development & Coding)',
      desc: 'ลงมือพัฒนาด้วยเทคโนโลยีระดับโมเดิร์น (React, Next.js, Python, Node.js) โครงสร้าง Clean Code โหลดเร็ว ปลอดภัย และ SEO Friendly'
    },
    {
      num: '04',
      title: 'ทดสอบระบบและตรวจสอบคุณภาพ (Testing & QA)',
      desc: 'ทดสอบความถูกต้อง ความเร็ว Core Web Vitals ความปลอดภัย และการทำงานบนสมาร์ตโฟน แท็บเล็ต และคอมพิวเตอร์ทุกระบบ'
    },
    {
      num: '05',
      title: 'ส่งมอบงานและดูแล 24 ชม. (Launch & 24/7 Support)',
      desc: 'เปิดตัวเว็บไซต์ขึ้นสู่โดเมนจริง พร้อมส่งมอบ Source Code กรรมสิทธิ์ 100% ให้ลูกค้า และมีทีมวิศวกรคอยดูแลซัพพอร์ตตลอด 24 ชั่วโมง'
    }
  ];

  const whyChooseUs = [
    {
      icon: ShieldCheck,
      title: 'จดทะเบียนนิติบุคคลถูกต้อง 100%',
      desc: 'บริษัท ไทยเอไอ โซลูชั่น จำกัด จดทะเบียนนิติบุคคลถูกต้องตามกฎหมาย เลขทะเบียน 0905569007271 สามารถออกใบเสร็จ ใบกำกับภาษี และหัก ณ ที่จ่ายได้เต็มรูปแบบ'
    },
    {
      icon: Clock,
      title: 'เปิดให้บริการและดูแลตลอด 24 ชั่วโมง',
      desc: 'ทีมวิศวกรซอฟต์แวร์และผู้เชี่ยวชาญด้านการตลาด AI สแตนด์บายพร้อมให้คำปรึกษา ออกแบบ และดูแลระบบของคุณตลอด 24/7 ไม่มีวันหยุด'
    },
    {
      icon: Code,
      title: 'Source Code ลิขสิทธิ์ของลูกค้า 100%',
      desc: 'งานเขียนโปรแกรมและเว็บไซต์ทั้งหมดเป็นกรรมสิทธิ์ของลูกค้าโดยสมบูรณ์ ไม่มีการผูกขาด สามารถนำไปต่อยอดหรือย้ายโฮสติ้งได้อิสระตลอดเวลา'
    },
    {
      icon: Bot,
      title: 'เชี่ยวชาญเทคโนโลยี AI ปัญญาประดิษฐ์',
      desc: 'ทีมวิศวกรพร้อมเชื่อมต่อ Large Language Models (LLM), AI Chatbot RAG, Document OCR และระบบวิเคราะห์ข้อมูลอัตโนมัติเพื่อขับเคลื่อนธุรกิจ'
    }
  ];

  const faqs = [
    {
      q: 'ทำเว็บไซต์กับ บริษัท ไทยเอไอ โซลูชั่น จำกัด ใช้ระยะเวลากี่วัน?',
      a: 'ระยะเวลาขึ้นอยู่กับรูปแบบบริการ: เซลเพจปิดการขายใช้เวลา 5-7 วัน, เว็บไซต์บริษัท/องค์กรใช้เวลา 2-3 สัปดาห์, ร้านค้าออนไลน์ E-Commerce ใช้เวลา 3-4 สัปดาห์ และเว็บแอปพลิเคชัน AI ตามขนาดโครงการ 3-6 สัปดาห์'
    },
    {
      q: 'เวลาให้บริการและช่องทางติดต่อเป็นอย่างไร?',
      a: 'บริษัท ไทยเอไอ โซลูชั่น จำกัด ให้บริการและดูแลซัพพอร์ตตลอด 24 ชั่วโมง (24/7) สามารถติดต่อได้ทางโทรศัพท์ 097-132-8145 หรืออีเมล thaiaisolution@outlook.com ตลอดเวลาครับ'
    },
    {
      q: 'เว็บไซต์ที่ทำรองรับการแสดงผลบนมือถือ (Mobile Responsive) และทำ SEO หรือไม่?',
      a: 'รองรับ 100% ทุกเว็บไซต์ที่เราจัดทำได้รับการออกแบบ Mobile-First ให้เปิดบนสมาร์ตโฟน แท็บเล็ต และคอมพิวเตอร์ได้อย่างลื่นไหล พร้อมวางโครงสร้าง On-Page SEO, Meta Tag, Schema Markup และคะแนน Core Web Vitals สูงเพื่อให้ติดหน้าแรก Google ได้ง่าย'
    },
    {
      q: 'บริการทำการตลาดออนไลน์และยิงแอดเริ่มต้น ฿3,900/เดือน รวมอะไรบ้าง?',
      a: 'รวมการวางแผนแคมเปญโฆษณา เลือกกลุ่มเป้าหมาย ออกแบบข้อความโฆษณา ติดตั้ง Pixel & Conversion Tracking และรายงานผลลัพธ์ ROI ยอดขาย และยอดคลิกรายสัปดาห์/รายเดือนแบบโปร่งใส'
    },
    {
      q: 'สามารถออกใบเสร็จรับเงิน ใบกำกับภาษี และหักภาษี ณ ที่จ่ายได้หรือไม่?',
      a: 'ได้ครับ บริษัท ไทยเอไอ โซลูชั่น จำกัด จดทะเบียนนิติบุคคลถูกต้องตามกฎหมาย เลขทะเบียน 0905569007271 สามารถออกใบเสนอราคา ใบเสร็จรับเงิน ใบกำกับภาษี และรับเอกสารหักภาษี ณ ที่จ่าย (3%) ได้ตามระเบียบนิติบุคคลทุกประการ'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12 sm:pb-20 tech-grid-pattern">
      {/* 1. Modern Agency Hero Section */}
      <section className="relative pt-24 sm:pt-36 lg:pt-40 pb-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50">
        {/* Soft Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] lg:w-[900px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-brand-300/30 via-cyan-200/30 to-blue-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-5 sm:space-y-6">
            
            {/* Accreditation & 24/7 Tag */}
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white border border-brand-200 text-[11px] sm:text-xs text-brand-700 shadow-sm">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-slate-800 tracking-wide">
                รับทำเว็บไซต์ &amp; การตลาดออนไลน์ AI ครบวงจร
              </span>
              <span className="hidden sm:inline-block text-slate-300">|</span>
              <span className="text-emerald-700 font-mono text-[10px] sm:text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                ⚡ เปิดบริการ 24 ชม.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.2]">
              รับทำเว็บไซต์บริษัท <span className="text-gradient">ออกแบบสวย ติดหน้าแรก Google</span> พร้อมทำการตลาดออนไลน์ครบวงจร
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
              <strong>บริษัท ไทยเอไอ โซลูชั่น จำกัด</strong> (เลขทะเบียน 0905569007271) ให้บริการจัดทำเว็บไซต์บริษัท, ร้านค้าออนไลน์, เซลเพจ, 
              พัฒนาซอฟต์แวร์ AI ดูแลระบบคลาวด์ตลอด 24 ชั่วโมง และยิงแอด <strong>Google Ads / Facebook Ads / TikTok Ads / SEO</strong> เริ่มต้นเพียง <strong>฿3,900/เดือน</strong>
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 pt-1 sm:pt-2 w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
              <button
                onClick={() => handleGoToPortfolio('all')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-extrabold text-xs sm:text-sm md:text-base shadow-xl shadow-brand-600/25 hover:shadow-cyan-600/35 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>ดูผลงานเว็บไซต์ (Portfolio)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setPage('estimator')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-brand-600 font-extrabold text-xs sm:text-sm md:text-base border border-slate-300 hover:border-brand-400 shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>คำนวณราคาทำเว็บทันที</span>
              </button>

              <a
                href="https://line.me"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-xs sm:text-sm md:text-base shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>แอด LINE ปรึกษาฟรี 24 ชม.</span>
              </a>
            </div>

            {/* Quick Trust Highlights Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 w-full pt-6 sm:pt-8 border-t border-slate-200 text-left">
              <div className="sge-card p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3 bg-white">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-extrabold text-slate-900">ทะเบียน: 0905569007271</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500">นิติบุคคล ออกใบกำกับภาษีได้</div>
                </div>
              </div>

              <div className="sge-card p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3 bg-white">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-extrabold text-slate-900">บริการตลอด 24 ชั่วโมง</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500">24/7 Support ทุกวัน</div>
                </div>
              </div>

              <div className="sge-card p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3 bg-white">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                  <Laptop className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-extrabold text-slate-900">100% Mobile Ready</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500">รองรับทุกขนาดหน้าจอ</div>
                </div>
              </div>

              <div className="sge-card p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3 bg-white">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
                  <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-extrabold text-slate-900">ยิงแอด ฿3,900/ด.</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500">Google/FB/TikTok/SEO</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. 5 Service Formats Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-extrabold text-brand-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>บริการของเรา (Our Service Formats)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            รูปแบบการให้บริการทำเว็บไซต์ &amp; <span className="text-gradient">การตลาดออนไลน์</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            ตอบโจทย์ทุกขนาดธุรกิจ ตั้งแต่การตลาดออนไลน์ เซลเพจปิดการขาย เว็บไซต์บริษัท ร้านค้าออนไลน์ จนถึงระบบเว็บแอปพลิเคชัน AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceFormats.map((format) => {
            const Icon = format.icon;
            return (
              <div
                key={format.id}
                className="sge-card p-7 flex flex-col justify-between group bg-white"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-brand-600 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${format.badgeColor}`}>
                      {format.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {format.title}
                    </h3>
                    <p className="text-xs text-brand-600 font-bold mt-1">
                      {format.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {format.desc}
                  </p>

                  {/* Checklist */}
                  <ul className="space-y-2 pt-2 text-xs text-slate-700 border-t border-slate-100">
                    {format.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-base font-extrabold text-slate-900">
                      {format.price}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {format.duration}
                    </div>
                  </div>

                  <button
                    onClick={() => handleGoToService(format.serviceTab)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-brand-600 text-slate-800 hover:text-white text-xs font-bold border border-slate-200 hover:border-brand-500 transition-all flex items-center gap-1.5"
                  >
                    <span>ดูรายละเอียด</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Browser Mockup Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold">
              <Laptop className="w-3.5 h-3.5 text-brand-600" />
              <span>ผลงานของเรา (Featured Projects)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              ตัวอย่างผลงานเว็บไซต์ที่ <span className="text-gradient">สร้างยอดขายได้จริง</span>
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              ชมตัวอย่างผลงานที่ส่งมอบแล้ว พร้อมผลลัพธ์ทางธุรกิจ วัดผลยอดขายและอันดับ SEO ได้จริง
            </p>
          </div>

          <button
            onClick={() => handleGoToPortfolio('all')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-800 hover:shadow-lg transition-all flex items-center gap-2 w-fit shrink-0"
          >
            <span>ดูผลงานทั้งหมด (All Projects)</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="sge-card overflow-hidden group flex flex-col justify-between bg-white"
            >
              <div>
                {/* Mac Browser Frame Header */}
                <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="flex-1 bg-white px-3 py-1 rounded-md text-[10px] font-mono text-slate-600 truncate flex items-center gap-1.5 border border-slate-200 shadow-inner">
                    <Globe className="w-2.5 h-2.5 text-brand-600" />
                    <span>https://{project.domain}</span>
                  </div>
                </div>

                {/* Preview Window Graphic */}
                <div className={`p-6 bg-gradient-to-b ${project.themeColor} min-h-[160px] flex flex-col justify-center border-b border-slate-100`}>
                  <span className="inline-block px-2.5 py-1 rounded text-[10px] font-bold bg-white text-brand-700 border border-brand-200 shadow-sm w-fit mb-2">
                    {project.badge}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h4>
                  <div className="text-xs text-slate-600 mt-1 font-medium">
                    ลูกค้า: {project.client}
                  </div>
                </div>

                {/* KPI Highlight & Tech Tags */}
                <div className="p-6 space-y-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                      <span>{project.kpi}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      {project.kpiSub}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleGoToPortfolio(project.category)}
                  className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                >
                  <span>ดูเคสเจาะลึก</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setPage('estimator')}
                  className="px-3.5 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white text-xs font-bold border border-brand-200 hover:border-brand-600 transition-all"
                >
                  ขอราคาแบบนี้
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sge-card p-8 sm:p-12 border-slate-200 bg-gradient-to-tr from-blue-50/50 via-white to-slate-50">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>ความน่าเชื่อถือ &amp; มาตรฐานวิศวกรรม</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              ทำไมองค์กรชั้นนำจึงเลือก <span className="text-gradient">บริษัท ไทยเอไอ โซลูชั่น จำกัด</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              เราส่งมอบงานคุณภาพสูง ถูกต้องตามระเบียบนิติบุคคล โปร่งใส และพร้อมดูแลคุณตลอด 24 ชั่วโมง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-600 border border-blue-100 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. 5-Step Delivery Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>มาตรฐานการส่งมอบงาน (5-Step Work Process)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            5 ขั้นตอนการทำงาน <span className="text-gradient">เป็นระบบ รวดเร็ว ส่งมอบตรงเวลา</span>
          </h2>
          <p className="text-slate-600 text-sm">
            กระบวนการทำงานที่เป็นมาตรฐาน ช่วยให้คุณเห็นความคืบหน้าของโครงการอย่างต่อเนื่องทุกสัปดาห์
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {processSteps.map((step, idx) => (
            <div key={idx} className="sge-card p-6 flex flex-col justify-between relative group bg-white">
              <div className="space-y-3">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600">
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[10px] font-mono text-brand-600 font-bold">
                STAGE {step.num}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
            <span>คำถามที่พบบ่อย (FAQ)</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">
            ข้อสงสัยเกี่ยวกับการทำเว็บไซต์ &amp; <span className="text-gradient">การตลาดออนไลน์</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="sge-card overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-brand-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-brand-600 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Bottom High-Impact CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl sge-card border-2 border-brand-300/80 p-6 sm:p-14 text-center bg-gradient-to-r from-blue-50 via-indigo-50/70 to-cyan-50 text-slate-900 shadow-2xl relative">
          <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/25">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              พร้อมเริ่มต้นสร้างเว็บไซต์และ<span className="text-gradient">ขยายยอดขายกับเรา</span>แล้วหรือยัง?
            </h2>

            <p className="text-xs sm:text-base lg:text-lg text-slate-700 font-bold leading-relaxed max-w-2xl mx-auto">
              ปรึกษาทีมวิศวกรซอฟต์แวร์และผู้เชี่ยวชาญด้านการตลาด AI บริษัท ไทยเอไอ โซลูชั่น จำกัด ได้ตลอด <span className="text-emerald-700 font-black">24 ชั่วโมง</span> <span className="text-brand-700 underline decoration-brand-400 font-black">ฟรีไม่มีค่าใช้จ่าย</span>
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 pt-2 w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
              <button
                onClick={() => setPage('estimator')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-black text-xs sm:text-sm md:text-base shadow-xl shadow-brand-600/30 active:scale-95 transition-all"
              >
                คำนวณราคา &amp; ขอใบเสนอราคา
              </button>

              <a
                href="tel:0971328145"
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 text-xs sm:text-sm md:text-base font-black border-2 border-brand-300 hover:border-brand-500 shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>โทร 097-132-8145 (24 ชม.)</span>
              </a>

              <a
                href="https://line.me"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-sm md:text-base font-black shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>แอด LINE ปรึกษาทันที</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
