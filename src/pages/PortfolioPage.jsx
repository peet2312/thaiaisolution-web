import React, { useState } from 'react';
import { 
  Award, TrendingUp, Sparkles, Filter, ExternalLink, ArrowRight, ShieldCheck, 
  CheckCircle2, Globe, Monitor, Smartphone, Zap, Eye, Check, X, 
  ChevronRight, Laptop, Layers, BarChart3, Clock, Lock, FileCode2, ShoppingCart, Building2, Flame, Megaphone, Star
} from 'lucide-react';

export default function PortfolioPage({ t, setPage, setPrefillData }) {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Portfolio items in the style of SGE Advertising, customized for Thai AI Solution Co., Ltd.
  const portfolioItems = [
    {
      id: 1,
      category: 'corporate',
      categoryLabel: 'เว็บไซต์บริษัท / องค์กร',
      badge: 'Corporate Website',
      client: 'บริษัท อุตสาหกรรมเครื่องจักรกลไทยกลึง จำกัด',
      title: 'รับทำเว็บไซต์จำหน่ายหัวจับกลึงและอุปกรณ์เครื่องจักรอุตสาหกรรม CNC',
      domain: 'www.thaicnc-machinery.com',
      shortDesc: 'ออกแบบและพัฒนาเว็บไซต์แคตตาล็อกสินค้าอุตสาหกรรมหนัก วางโครงสร้าง SEO ติดหน้าแรก Google และระบบขอใบเสนอราคาออนไลน์',
      highlights: [
        'ออกแบบสวย โมเดิร์น ยกระดับภาพลักษณ์แบรนด์ให้น่าเชื่อถือ',
        'ระบบแคตตาล็อกสินค้ากว่า 5,000 รายการ ค้นหาง่ายด้วย AI Search',
        'โครงสร้าง SEO Friendly โหลดเร็วคะแนน Core Web Vitals 96+',
        'รองรับ Responsive ทุกหน้าจอทั้ง PC, แท็บเล็ต และสมาร์ตโฟน'
      ],
      kpi: 'ยอดขอใบเสนอราคาเพิ่มขึ้น 340% ภายใน 3 เดือน',
      kpiSub: 'ติดหน้าแรก Google คำค้นหาอุปกรณ์เครื่องจักร CNC กว่า 45 คำค้นหา',
      tech: ['React 19', 'Next.js', 'Tailwind CSS', 'FastAPI', 'PostgreSQL'],
      problem: 'เดิมเว็บไซต์เก่าโหลดช้า ไม่รองรับมือถือ ลูกค้าหาข้อมูลสินค้ายาก และไม่สามารถขอใบเสนอราคาผ่านระบบออนไลน์ได้',
      solution: 'ออกแบบ UI/UX ใหม่ทั้งหมดด้วยโทนน้ำเงิน-เทาอุตสาหกรรม เพิ่มระบบตัวกรองสเปกสินค้าขั้นสูง พร้อมระบบกดขอใบเสนอราคา (One-Click RFQ) ส่งเข้าอีเมลฝ่ายขายทันที',
      results: [
        'ระยะเวลาเปิดหน้าเว็บลดลงจาก 4.8 วินาที เหลือ 0.8 วินาที',
        'ยอดเข้าชมจาก Google Organic Search เติบโตขึ้น 280%',
        'ลดเวลาของฝ่ายขายในการตอบข้อมูลสเปกสินค้าลง 60%'
      ],
      themeColor: 'from-blue-500/15 via-blue-50/50 to-white',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 2,
      category: 'ecommerce',
      categoryLabel: 'ร้านค้าออนไลน์ & ชำระเงิน',
      badge: 'E-Commerce & B2B Portal',
      client: 'บริษัท ซัพพลายเชน โกลบอล เทรดดิ้ง จำกัด',
      title: 'ระบบร้านค้าออนไลน์ B2B & ชำระเงิน PromptPay QR อัตโนมัติ',
      domain: 'www.globaltrade-supplies.co.th',
      shortDesc: 'เว็บไซต์อีคอมเมิร์ซสำหรับธุรกิจ B2B พร้อมระบบตะกร้าสินค้า ระบบราคาตามระดับสมาชิก และระบบยืนยันสลิปโอนเงินด้วย AI OCR',
      highlights: [
        'ระบบสั่งซื้อสินค้าและตัดสต็อกสินค้าแบบเรียลไทม์',
        'เชื่อมต่อช่องทางชำระเงิน PromptPay QR, บัตรเครดิต และผ่อนชำระ',
        'ระบบ AI สแกนตรวจสลิปธนาคารอัตโนมัติ ป้องกันสลิปปลอม 100%',
        'ระบบพิมพ์ใบปะหน้าขนส่ง Flash Express / Kerry / J&T อัตโนมัติ'
      ],
      kpi: 'รองรับยอดคำสั่งซื้อมากกว่า 120,000+ ออเดอร์/เดือน',
      kpiSub: 'ลดระยะเวลาตรวจสอบสลิปโอนเงินจาก 5 นาที เหลือ 1.5 วินาที/ออเดอร์',
      tech: ['Next.js', 'Node.js', 'Redis', 'Docker', 'AI OCR Gateway'],
      problem: 'ต้องใช้แอดมินหลายคนคอยตรวจสอบยอดเงินโอนและสลิป และระบบสต็อกเดิมไม่เชื่อมต่อกับคลังสินค้าหน้าร้าน',
      solution: 'พัฒนาระบบ E-Commerce ครบวงจร เชื่อม API บัญชีและคลัง พร้อมติดตั้งโมดูล AI OCR ตรวจจับยอดเงินและเลขอ้างอิงสลิปธนาคารแบบอัตโนมัติ',
      results: [
        'ประหยัดค่าจ้างแอดมินตรวจสอบยอดเงินได้มากกว่า 3 คนต่อสาขา',
        'อัตราการสั่งซื้อซ้ำ (Repeat Order) เพิ่มขึ้น 45%',
        'ระบบทำงานเสถียร Uptime 99.99% แม้ในช่วงเทศกาลโปรโมชันใหญ่'
      ],
      themeColor: 'from-emerald-500/15 via-emerald-50/50 to-white',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 3,
      category: 'salepage',
      categoryLabel: 'เซลล์เพจปิดการขาย',
      badge: 'High-Converting Sale Page',
      client: 'พรีเมียม ลักชัวรี่ เอสเตท กรุ๊ป',
      title: 'เว็บไซต์เซลล์เพจปิดการขายโครงการบ้านเดี่ยวและคอนโดหรู',
      domain: 'www.thegrand-residence.com',
      shortDesc: 'เซลล์เพจหน้าเดียวดีไซน์หรูหรา วางกลยุทธ์ตามหลักจิตวิทยาการปิดการขาย โหลดเร็วพิเศษ พร้อมระบบจองสิทธิ์และนัดชมโครงการ',
      highlights: [
        'โครงสร้าง Sales Funnel ออกแบบเน้นกระตุ้นการตัดสินใจ',
        'รองรับการฝัง Facebook Pixel, TikTok Pixel และ Google Tag Manager',
        'มีระบบเลือกวันและเวลาเพื่อนัดหมาย Private Viewing ผ่านปฏิทิน',
        'ความเร็วเปิดหน้าเว็บระดับ Ultra-fast (คะแนน Mobile 99/100)'
      ],
      kpi: 'Conversion Rate (ยอดลงทะเบียน) สูงถึง 14.8%',
      kpiSub: 'ลดต้นทุนค่าโฆษณาต่อลีด (Cost Per Lead) ลง 48%',
      tech: ['React 19', 'Tailwind CSS', 'Vite', 'Cloudflare Edge CDN'],
      problem: 'ยิงแอดแล้วผู้ใช้งานกดออกเร็วเนื่องจากเว็บโหลดช้า และแบบฟอร์มเดิมมีความซับซ้อนทำให้ผู้สนใจไม่ยอมกรอกข้อมูล',
      solution: 'ออกแบบ Single Page Sale Page ที่โหลดเสร็จภายใน 0.5 วินาที พร้อมวิดีโอพรีวิว 360 องศา และแบบฟอร์มลงทะเบียน 2 ขั้นตอน (Smart Multi-step Form)',
      results: [
        'ยอดลงทะเบียนจองสิทธิ์ทะลุเป้าหมายโครงการ 220%',
        'คะแนนคุณภาพโฆษณา (Quality Score) บน Google Ads เพิ่มขึ้นเป็น 10/10',
        'ปิดการขายห้องชุดได้เร็วกว่ากำหนดเวลาถึง 2 เดือน'
      ],
      themeColor: 'from-amber-500/15 via-amber-50/50 to-white',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 4,
      category: 'webapp_ai',
      categoryLabel: 'ระบบซอฟต์แวร์ & AI',
      badge: 'AI Smart Document OCR',
      client: 'บริษัท การเงินและประกันภัยร่วมทุนมหาชน',
      title: 'ระบบ AI Document Processing & OCR ตรวจสอบเอกสารเคลมประกัน',
      domain: 'claims-ai.finance-group.co.th',
      shortDesc: 'เว็บแอปพลิเคชันปัญญาประดิษฐ์อ่านและดึงข้อมูลจากเอกสารทางการแพทย์ บิลค่ารักษา และสลิปโอนเงินเข้าสู่ฐานข้อมูลอัตโนมัติ',
      highlights: [
        'โมเดล AI OCR ภาษาไทย-อังกฤษ ความแม่นยำสูงกว่า 98.6%',
        'ประมวลผลเอกสาร PDF และรูปภาพกว่า 10,000+ หน้าต่อวัน',
        'เชื่อมต่อระบบความปลอดภัย SSO, Active Directory และ Audit Log',
        'โครงสร้างระบบบน Cloud ทำงานตามข้อกำหนด PDPA 100%'
      ],
      kpi: 'ลดระยะเวลาอนุมัติเคลมจาก 3 วัน เหลือเพียง 15 นาที',
      kpiSub: 'ลดต้นทุนการคีย์ข้อมูลพนักงาน (Data Entry Cost) ลง 75%',
      tech: ['Python FastAPI', 'PyTorch', 'React 19', 'Docker', 'PostgreSQL'],
      problem: 'พนักงานต้องพิมพ์ข้อมูลจากเอกสารกระดาษวันละหลายพันแผ่น เกิดความผิดพลาดบ่อยและลูกค้าต้องรอนาน',
      solution: 'สร้างระบบ Web Application เฉพาะทาง พร้อมโมเดล Vision-Language AI ที่สกัดข้อความ จัดหมวดหมู่ และยิง API เข้า Core Banking อัตโนมัติ',
      results: [
        'ความถูกต้องของข้อมูลเพิ่มขึ้นเป็น 99.4%',
        'ลูกค้าประเมินความพึงพอใจการบริการ (CSAT) เพิ่มขึ้นเป็น 4.9/5',
        'ลดการใช้กระดาษในองค์กรได้กว่า 200,000 แผ่น/ปี'
      ],
      themeColor: 'from-purple-500/15 via-purple-50/50 to-white',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 5,
      category: 'corporate',
      categoryLabel: 'เว็บไซต์บริษัท / องค์กร',
      badge: 'Logistics & Tracking',
      client: 'บริษัท เอเชีย โลจิสติกส์ เอ็กซ์เพรส จำกัด',
      title: 'เว็บไซต์องค์กรขนส่งโลจิสติกส์ & ระบบคำนวณค่าส่งอัตโนมัติ',
      domain: 'www.asialogistics-express.com',
      shortDesc: 'ออกแบบเว็บไซต์บริษัทขนส่งระดับนานาชาติ พร้อมระบบติดตามสถานะพัสดุแบบเรียลไทม์ และระบบขอใบเสนอราคาตู้คอนเทนเนอร์',
      highlights: [
        'ระบบ Track & Trace พัสดุเชื่อมต่อ API สายการบินและท่าเรือ',
        'ระบบคำนวณค่าระวางสินค้าตามน้ำหนักและปริมาตร CBM อัตโนมัติ',
        'รองรับ 3 ภาษา (ไทย, อังกฤษ, จีน) สำหรับคู่ค้านานาชาติ',
        'การออกแบบ UI/UX สวยงาม โดดเด่น น่าเชื่อถือระดับสากล'
      ],
      kpi: 'ยอดเข้าชมจากต่างประเทศเพิ่มขึ้น 410%',
      kpiSub: 'ลูกค้าธุรกิจ B2B เซ็นสัญญาขนส่งระยะยาวเพิ่มขึ้น 32 ราย',
      tech: ['Next.js 15', 'Tailwind CSS', 'Redis', 'AWS CloudFront'],
      problem: 'ลูกค้าต่างชาติไม่สามารถเช็กสถานะตู้สินค้าได้ ต้องโทรสอบถามฝ่ายบริการลูกค้าตลอดเวลา',
      solution: 'พัฒนาเว็บไซต์ใหม่รองรับ Multi-language พร้อมระบบ API Webhook เชื่อมตรงกับระบบศุลกากรและสายการเดินเรือ',
      results: [
        'ลดภาระสายโทรเข้า Customer Service ลง 70%',
        'ได้รับรางวัลเว็บไซต์องค์กรดีเด่นด้านโลจิสติกส์',
        'ขยายฐานลูกค้าในกลุ่ม CLMV ได้เพิ่มขึ้น 65%'
      ],
      themeColor: 'from-cyan-500/15 via-cyan-50/50 to-white',
      tagColor: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    {
      id: 6,
      category: 'cloud',
      categoryLabel: 'การจัดการ Cloud (ข้อ 9, 10)',
      badge: 'Cloud Infrastructure & HA',
      client: 'ฟินเทค โซลูชั่น แพลตฟอร์ม',
      title: 'วางระบบคลาวด์ Multi-Cloud AWS/GCP & Kubernetes Cluster',
      domain: 'cloud-infra.fintechthailand.net',
      shortDesc: 'บริการจัดการสิ่งอำนวยความสะดวกด้านคอมพิวเตอร์และเซิร์ฟเวอร์ (วัตถุประสงค์ข้อ 9) เพื่อรองรับทราฟฟิกธุรกรรมการเงินระดับ 100,000 TPS',
      highlights: [
        'สถาปัตยกรรม High Availability (Uptime 99.99%)',
        'ระบบ Auto-scaling ปรับขนาดเซิร์ฟเวอร์ตามปริมาณการใช้งานจริง',
        'ติดตั้งระบบรักษาความปลอดภัย Web Application Firewall (WAF)',
        'ระบบ Monitor และแจ้งเตือนอัตโนมัติผ่าน LINE & Slack 24/7'
      ],
      kpi: 'รองรับธุรกรรมสูงสุด 150,000 รายการต่อนาที โดยระบบไม่หน่วง',
      kpiSub: 'ลดค่าใช้จ่ายคลาวด์ลง 38% ด้วยระบบ FinOps Architecture',
      tech: ['Kubernetes', 'Terraform', 'AWS EKS', 'Google Cloud', 'Grafana'],
      problem: 'ช่วงเวลาเงินเดือนออกระบบล่มบ่อย และค่าใช้จ่ายคลาวด์สูงเกินงบประมาณที่ตั้งไว้',
      solution: 'ออกแบบระบบใหม่ด้วย Microservices บน Kubernetes ติดตั้ง Load Balancer และตั้งค่านโยบาย Spot Instance ร่วมกับ FinOps',
      results: [
        'ไม่เคยเกิดระบบล่ม (Zero Unplanned Downtime) ต่อเนื่องกว่า 365 วัน',
        'ประหยัดงบประมาณค่าเซิร์ฟเวอร์ได้กว่า 450,000 บาท/ปี',
        'ผ่านการตรวจประเมินความปลอดภัย ISO 27001 และ PCI-DSS'
      ],
      themeColor: 'from-indigo-500/15 via-indigo-50/50 to-white',
      tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 7,
      category: 'marketing',
      categoryLabel: 'การตลาดออนไลน์ & ยิงแอด AI',
      badge: 'Digital Marketing & SEO',
      client: 'บริษัท นวัตกรรมโซลาร์และพลังงานสะอาดแห่งประเทศไทย จำกัด',
      title: 'แคมเปญยิงแอด Google Ads + Facebook Ads + SEO ติดหน้าแรก Google',
      domain: 'ads.thaisolar-marketing.com',
      shortDesc: 'บริการทำการตลาดออนไลน์ครบวงจร ยิงแอด Google Ads ดักจับลูกค้าค้นหาซื้อจริง พร้อมยิงแอด Facebook/TikTok Retargeting และดัน SEO ติดหน้าแรก เริ่มต้นเพียง ฿3,900/เดือน',
      highlights: [
        'ยิงแอด Google Ads ตรงกลุ่มลูกค้าที่มีความต้องการซื้อจริง (High-Intent)',
        'ระบบ AI Audience Targeting บน Facebook & TikTok เพื่อ Retargeting',
        'ดันคำค้นหาสำคัญติดหน้าแรก Google (Top 3) โดยไม่ต้องจ่ายค่าคลิก',
        'ติดตั้ง Conversion Tracking & Dashboard รายงานผลลัพธ์แบบเรียลไทม์'
      ],
      kpi: 'ผลตอบแทนค่าโฆษณา ROAS สูงถึง 8.4 เท่า (ยอดขายโต 420%)',
      kpiSub: 'ลดต้นทุนต่อการได้ลูกค้า (CPA) ลง 54% เริ่มต้นเพียง ฿3,900/เดือน',
      tech: ['Google Ads', 'Facebook Meta API', 'TikTok Pixel', 'Google Analytics 4', 'SEO Engine'],
      problem: 'ยิงแอดเองแล้วค่าคลิกแพง กลุ่มเป้าหมายไม่ตรง และไม่สามารถวัดผลได้ว่าเงินที่จ่ายไปสร้างยอดขายได้จริงเท่าไร',
      solution: 'ปรับแต่งโครงสร้างแคมเปญใหม่ ติดตั้ง Conversion API วัดผลยอดขายแบบ End-to-End พร้อมทำ SEO On-Page ดันคำค้นหาหลักติดหน้าแรก Google',
      results: [
        'ยอดสายโทรเข้าและแอด LINE จาก Google Search เพิ่มขึ้น 380%',
        'คะแนน Quality Score โฆษณาแตะระดับ 10/10 ทำให้จ่ายค่าคลิกถูกกว่าคู่แข่ง 35%',
        'สร้างยอดขายทะลุ 3.8 ล้านบาท จากงบโฆษณาที่ควบคุมได้'
      ],
      themeColor: 'from-rose-500/15 via-rose-50/50 to-white',
      tagColor: 'bg-rose-50 text-rose-700 border-rose-200'
    }
  ];

  // 5 Service Formats inspired by SGE Advertising
  const serviceCategories = [
    {
      id: 'marketing',
      icon: Megaphone,
      badge: 'เริ่มต้นเพียง ฿3,900/เดือน',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'รับทำการตลาดออนไลน์ & ยิงแอด (Facebook / Google / TikTok / SEO)',
      lead: 'ยิงแอดแม่นยำ ตรงกลุ่มเป้าหมาย ดันเว็บติดหน้าแรก Google เพิ่มยอดขายทันที',
      desc: 'เพิ่มยอดขายและสร้างการรับรู้ให้แบรนด์ด้วยการยิงแอดบนแพลตฟอร์มยอดนิยม Facebook Ads, Google Ads, TikTok Ads และการทำ SEO ให้ติดหน้าแรก Google อย่างยั่งยืน เริ่มต้นเพียง ฿3,900',
      points: [
        'ยิงแอด Google Ads ดักจับลูกค้าที่พร้อมซื้อจริง ติดหน้าแรกทันที',
        'ยิงแอด Facebook & TikTok Ads ด้วย AI Smart Audience และทำ Retargeting',
        'ปรับแต่งโครงสร้าง SEO On-Page & Off-Page ติดหน้าแรก Google ยั่งยืน',
        'รายงานผลลัพธ์ ROI ยอดขาย และคลิกแบบโปร่งใสทุกสัปดาห์'
      ],
      price: 'เริ่มต้น ฿3,900 / เดือน',
      duration: 'แพ็กเกจรายเดือน / ไม่มีข้อผูกมัดระยะยาว'
    },
    {
      id: 'corporate',
      icon: Building2,
      badge: 'ยอดนิยมสำหรับธุรกิจ',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'รับทำเว็บไซต์บริษัท / องค์กร (Corporate Website)',
      lead: 'เว็บสวย ยกระดับภาพลักษณ์องค์กรให้น่าเชื่อถือ ติดหน้าแรก Google',
      desc: 'เหมาะสำหรับบริษัท นิติบุคคล ห้างหุ้นส่วน โรงงาน และธุรกิจที่ต้องการสร้างความน่าเชื่อถือ วางโครงสร้าง SEO ติดหน้าแรก Google และสร้างความประทับใจตั้งแต่แรกเห็น',
      points: [
        'ดีไซน์เฉพาะตัว ตรงตาม Corporate Identity (CI) ของแบรนด์',
        'วางโครงสร้าง SEO ให้ติดหน้าแรก Google ได้ง่ายและยั่งยืน',
        'รองรับ 100% Mobile Responsive สวยงามบนทุกอุปกรณ์',
        'ระบบจัดการเนื้อหา (CMS) ใช้งานง่าย เพิ่มหน้าบทความได้ไม่จำกัด'
      ],
      price: 'เริ่มต้น ฿35,000',
      duration: 'ระยะเวลา 2-3 สัปดาห์'
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      badge: 'ครบ จบ พร้อมขาย',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'รับทำเว็บไซต์ร้านค้าออนไลน์ (E-Commerce & Portals)',
      lead: 'เว็บไซต์ที่พร้อมขาย ครบ จบในที่เดียว รองรับการชำระเงินทุกช่องทาง',
      desc: 'เหมาะสำหรับธุรกิจค้าปลีก ค้าส่ง B2B และแบรนด์สินค้าที่ต้องการระบบสั่งซื้อ ตะกร้าสินค้า ตัดบัตรเครดิต สแกน PromptPay QR และระบบจัดการสต็อกอัตโนมัติ',
      points: [
        'ระบบตะกร้าสินค้า ชำระเงิน และคำนวณค่าส่งอัตโนมัติ',
        'เชื่อมต่อ Payment Gateway, PromptPay QR และบัตรเครดิต',
        'ระบบ AI ตรวจสอบสลิปโอนเงิน ป้องกันสลิปปลอมทันที',
        'ระบบออกใบเสร็จ ใบกำกับภาษี และพิมพ์ใบปะหน้าขนส่ง'
      ],
      price: 'เริ่มต้น ฿55,000',
      duration: 'ระยะเวลา 3-4 สัปดาห์'
    },
    {
      id: 'salepage',
      icon: Flame,
      badge: 'เน้น Conversion Rate',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'รับทำเซลล์เพจปิดการขาย (High-Converting Sale Page)',
      lead: 'ออกแบบโครงสร้างเพื่อเน้นการปิดการขาย ยิงแอดได้แม่นยำ โหลดไวที่สุด',
      desc: 'เหมาะสำหรับแคมเปญเปิดตัวสินค้า คอร์สเรียน โครงการอสังหาริมทรัพย์ หรือบริการที่ต้องการกระตุ้นการตัดสินใจซื้อในหน้าเดียว โหลดเร็วพิเศษ ไม่เสียโอกาสทางการขาย',
      points: [
        'โครงสร้าง Sales Funnel ออกแบบตามจิตวิทยาการตัดสินใจซื้อ',
        'ติดตั้ง Facebook Pixel, TikTok Pixel และ Conversion Tracking ครบชุด',
        'ความเร็วเปิดหน้าเว็บระดับ Ultra-Fast โหลดจบใน 0.5-1 วินาที',
        'แบบฟอร์มเก็บลีดและปุ่มกดแอดไลน์ที่ดึงดูดสายตา'
      ],
      price: 'เริ่มต้น ฿18,000',
      duration: 'ระยะเวลา 5-7 วัน'
    },
    {
      id: 'webapp_ai',
      icon: Layers,
      badge: 'ซอฟต์แวร์ & AI เฉพาะทาง',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      title: 'รับทำเว็บแอปพลิเคชัน & ซอฟต์แวร์ AI (Custom Web & AI Systems)',
      lead: 'พัฒนาซอฟต์แวร์ตามวัตถุประสงค์เฉพาะทาง และผสานพลังปัญญาประดิษฐ์',
      desc: 'เหมาะสำหรับองค์กรที่ต้องการระบบเฉพาะทาง เช่น ระบบ CRM, ERP, AI Chatbot RAG, AI Document OCR',
      points: [
        'เขียนโปรแกรมเว็บเพจและระบบคลาวด์ตามความต้องการเฉพาะ',
        'เชื่อมต่อ AI Large Language Models (LLM), RAG และ Document OCR',
        'ระบบคลาวด์ประสิทธิภาพสูง High Availability 24/7',
        'ให้คำปรึกษา ออกแบบสถาปัตยกรรม และวางมาตรฐานความปลอดภัย'
      ],
      price: 'เริ่มต้น ฿65,000',
      duration: 'ระยะเวลา 3-6 สัปดาห์'
    }
  ];

  // 5 Delivery Process Steps
  const processSteps = [
    {
      num: '01',
      title: 'บรีฟและวางแผนโครงสร้าง (Planning & Wireframe)',
      desc: 'พูดคุยทำความเข้าใจโจทย์ธุรกิจ กลุ่มเป้าหมาย และฟังก์ชันที่ต้องการ พร้อมจัดทำ Sitemap และ Wireframe โครงสร้างหน้าเว็บ'
    },
    {
      num: '02',
      title: 'ออกแบบดีไซน์ UI/UX (Custom Design)',
      desc: 'ออกแบบหน้าตาเว็บไซต์และระบบให้สวยงาม ทันสมัย ตรงตามอัตลักษณ์แบรนด์ (CI) และรองรับการแสดงผลทุกขนาดหน้าจอ'
    },
    {
      num: '03',
      title: 'เขียนโปรแกรมและพัฒนาระบบ (Development & Coding)',
      desc: 'พัฒนาด้วยเทคโนโลยีที่ทันสมัย (React 19, Next.js, Python, Cloud) วางระบบความปลอดภัย และโครงสร้าง SEO ตั้งแต่วันแรก'
    },
    {
      num: '04',
      title: 'ทดสอบระบบและปรับแต่งความเร็ว (Testing & Optimization)',
      desc: 'ตรวจสอบความถูกต้องบนอุปกรณ์จริง ปรับแต่งความเร็วคะแนน Google PageSpeed และทดสอบความปลอดภัยก่อนขึ้นระบบจริง'
    },
    {
      num: '05',
      title: 'ส่งมอบงานและดูแลต่อเนื่อง (Launch & 24/7 Support)',
      desc: 'ขึ้นระบบออนไลน์บนโดเมนของท่านอย่างเป็นทางการ อบรมการใช้งานระบบหลังบ้าน และมีทีมงานคอยดูแลสนับสนุนตลอดอายุการใช้งาน 24 ชั่วโมง'
    }
  ];

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter((i) => i.category === filter);

  const handleStartSimilarProject = (project) => {
    if (setPrefillData) {
      setPrefillData({
        service: project.category === 'ecommerce' ? 'web' : project.category === 'webapp_ai' ? 'ai' : project.category === 'marketing' ? 'marketing' : 'web',
        budget: '',
        message: `สนใจผลงานสไตล์: ${project.title} (${project.badge})`
      });
    }
    setSelectedProject(null);
    setPage('estimator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* 1. Header & Breadcrumbs Section */}
      <div className="text-center max-w-4xl mx-auto space-y-5">
        {/* Breadcrumb badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-brand-700">
          <Globe className="w-3.5 h-3.5 text-brand-600" />
          <span>หน้าแรก &gt; ผลงานทำเว็บไซต์ &amp; ซอฟต์แวร์ AI (Portfolio)</span>
          <span className="text-slate-300">|</span>
          <span className="text-emerald-700 font-mono text-[11px] font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">เปิดบริการ 24 ชม.</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          ผลงานทำเว็บไซต์ &amp; <span className="text-gradient">เว็บแอปพลิเคชัน AI</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          รวมผลงานรับทำเว็บไซต์คุณภาพ ออกแบบสวย ใช้งานง่าย รองรับทุกอุปกรณ์ 
          วางโครงสร้าง SEO ให้ติดหน้าแรก Google และพร้อมต่อยอดด้วยเทคโนโลยี AI ปัญญาประดิษฐ์เพื่อสร้างยอดขายสูงสุดให้ธุรกิจคุณ
        </p>

        {/* Feature quick badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-slate-700">
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" /> ออกแบบสวยตรงใจแบรนด์
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" /> รองรับ 100% ทุกหน้าจอ
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" /> ติดหน้าแรก Google (SEO)
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" /> จดทะเบียนนิติบุคคล 0905569007271
          </span>
        </div>
      </div>

      {/* 2. Interactive Category Filter Bar */}
      <div className="flex justify-center sticky top-20 z-30 pt-2 pb-2">
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white/95 backdrop-blur-xl p-2 rounded-2xl border border-slate-200 shadow-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-brand-600 via-blue-600 to-brand-700 text-white shadow-md shadow-brand-600/25' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            ทั้งหมด (All Projects)
          </button>
          
          <button
            onClick={() => setFilter('corporate')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'corporate' 
                ? 'bg-gradient-to-r from-brand-600 via-blue-600 to-brand-700 text-white shadow-md shadow-brand-600/25' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            🏢 เว็บไซต์บริษัท / องค์กร
          </button>

          <button
            onClick={() => setFilter('ecommerce')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'ecommerce' 
                ? 'bg-gradient-to-r from-brand-600 via-blue-600 to-brand-700 text-white shadow-md shadow-brand-600/25' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            🛒 ร้านค้าออนไลน์ (E-Commerce)
          </button>

          <button
            onClick={() => setFilter('salepage')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'salepage' 
                ? 'bg-gradient-to-r from-brand-600 via-blue-600 to-brand-700 text-white shadow-md shadow-brand-600/25' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            ⚡ เซลล์เพจปิดการขาย
          </button>

          <button
            onClick={() => setFilter('webapp_ai')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'webapp_ai' 
                ? 'bg-gradient-to-r from-brand-600 via-blue-600 to-brand-700 text-white shadow-md shadow-brand-600/25' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            🤖 เว็บแอปพลิเคชัน &amp; AI
          </button>

          <button
            onClick={() => setFilter('cloud')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'cloud' 
                ? 'bg-gradient-to-r from-brand-600 via-blue-600 to-brand-700 text-white shadow-md shadow-brand-600/25' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            ☁️ จัดการคลาวด์ (ข้อ 9, 10)
          </button>

          <button
            onClick={() => setFilter('marketing')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'marketing' 
                ? 'bg-gradient-to-r from-brand-600 via-blue-600 to-brand-700 text-white shadow-md shadow-brand-600/25' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            📊 การตลาดออนไลน์ (เริ่ม ฿3,900)
          </button>
        </div>
      </div>

      {/* 3. Project Showcase Grid (Styled with Realistic Browser Frames like SGE Advertising) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((project) => (
          <div
            key={project.id}
            className="sge-card rounded-3xl overflow-hidden border border-slate-200 hover:border-brand-400 transition-all duration-300 flex flex-col justify-between group shadow-md hover:shadow-2xl hover:-translate-y-1.5 bg-white"
          >
            {/* Top: Browser Mockup Window Header */}
            <div>
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                </div>
                
                {/* Simulated URL bar */}
                <div className="bg-white px-3 py-0.5 rounded-md border border-slate-200 text-[10px] font-mono text-slate-600 flex items-center gap-1.5 max-w-[170px] truncate shadow-inner">
                  <Lock className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{project.domain}</span>
                </div>

                <div className="text-[10px] text-slate-400 font-mono font-bold">
                  HTTPS
                </div>
              </div>

              {/* Visual Project Screen Preview Area */}
              <div className={`p-6 bg-gradient-to-br ${project.themeColor} border-b border-slate-100 relative overflow-hidden flex flex-col justify-between min-h-[190px]`}>
                <div className="relative z-10 flex items-start justify-between gap-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border shadow-sm ${project.tagColor}`}>
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {project.badge}
                  </span>

                  <span className="text-[10px] font-mono text-slate-600 bg-white/90 px-2 py-0.5 rounded border border-slate-200 font-bold shadow-sm">
                    Live Demo
                  </span>
                </div>

                {/* Center graphic preview element */}
                <div className="relative z-10 my-3 space-y-1.5">
                  <div className="text-[11px] font-bold text-brand-700">
                    {project.client}
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-brand-600 transition-colors">
                    {project.title}
                  </div>
                </div>

                {/* KPI Result pill */}
                <div className="relative z-10 pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-white p-2.5 rounded-xl border border-emerald-200 shadow-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate text-[11px] font-bold">{project.kpi}</span>
                </div>
              </div>

              {/* Card Body & Feature Checklists */}
              <div className="p-6 space-y-5">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                  {project.shortDesc}
                </p>

                {/* Feature Checklist (SGE Style) */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 text-xs mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                    <span>จุดเด่นของผลงานนี้:</span>
                  </div>
                  {project.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0"></span>
                      <span className="leading-snug">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.map((tItem, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 flex items-center gap-3">
              <button
                onClick={() => setSelectedProject(project)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200"
              >
                <Eye className="w-3.5 h-3.5 text-slate-600" />
                <span>ดูข้อมูลเจาะลึก</span>
              </button>

              <button
                onClick={() => handleStartSimilarProject(project)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-brand-600/20 hover:shadow-brand-600/30 flex items-center justify-center gap-1.5"
              >
                <span>ขอราคาแบบนี้</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Service Formats Overview (4 รูปแบบบริการทำเว็บไซต์ยอดนิยม สไตล์ SGE Advertising) */}
      <div className="pt-12 border-t border-slate-200 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-brand-600" />
            <span>บริการรับทำเว็บไซต์ครอบคลุมทุกโจทย์ธุรกิจ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            รูปแบบการให้บริการทำเว็บไซต์ &amp; <span className="text-gradient">การตลาดออนไลน์</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            ไม่ว่าท่านจะต้องการเว็บไซต์บริษัท ร้านค้าออนไลน์ เซลเพจปิดการขาย หรือเว็บแอปพลิเคชัน AI เราพร้อมดูแลตั้งแต่ต้นจนจบ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((serv) => {
            const Icon = serv.icon;
            return (
              <div
                key={serv.id}
                className="sge-card p-7 flex flex-col justify-between group bg-white"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-600 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${serv.badgeColor}`}>
                      {serv.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {serv.title}
                    </h3>
                    <p className="text-xs text-brand-600 font-bold mt-1">
                      {serv.lead}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {serv.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    {serv.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-base font-extrabold text-slate-900">
                      {serv.price}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {serv.duration}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (setPrefillData) {
                        setPrefillData({
                          service: serv.id === 'webapp_ai' ? 'ai' : serv.id === 'marketing' ? 'marketing' : 'web',
                          budget: serv.price,
                          message: `สนใจบริการ: ${serv.title}`
                        });
                      }
                      setPage('estimator');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-brand-600 text-slate-800 hover:text-white text-xs font-bold border border-slate-200 hover:border-brand-600 transition-all flex items-center gap-1"
                  >
                    <span>คำนวณราคา</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. SGE 5-Step Delivery Process */}
      <div className="pt-12 border-t border-slate-200 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>มาตรฐานการส่งมอบงานระดับสากล</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            5 ขั้นตอนการทำงาน <span className="text-gradient">ส่งมอบตรงเวลา คุณภาพ 100%</span>
          </h2>
          <p className="text-slate-600 text-sm">
            ระบบการทำงานแบบ Agile ให้ลูกค้าตรวจสอบงานได้ทุกขั้นตอน สื่อสารชัดเจน โปร่งใส
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="sge-card p-6 flex flex-col justify-between relative group bg-white"
            >
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
      </div>

      {/* 6. Case Study Detail Modal (Popup Window) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-10">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${selectedProject.tagColor}`}>
                {selectedProject.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {selectedProject.title}
              </h2>
              <div className="text-xs text-slate-500 font-bold">
                ลูกค้า: {selectedProject.client} | โดเมน: <span className="font-mono text-brand-600">{selectedProject.domain}</span>
              </div>
            </div>

            {/* KPI Highlight Card */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3 text-brand-900">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
              <div>
                <div className="text-sm font-extrabold text-brand-900">{selectedProject.kpi}</div>
                <div className="text-xs text-brand-700">{selectedProject.kpiSub}</div>
              </div>
            </div>

            {/* Problem & Solution Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <div className="font-bold text-rose-800 text-sm">โจทย์และความท้าทาย (Problem):</div>
                <p className="text-rose-950 leading-relaxed font-medium">{selectedProject.problem}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="font-bold text-emerald-800 text-sm">แนวทางแก้ปัญหา (Solution):</div>
                <p className="text-emerald-950 leading-relaxed font-medium">{selectedProject.solution}</p>
              </div>
            </div>

            {/* Key Business Results */}
            <div className="space-y-2">
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                ผลลัพธ์ความสำเร็จเชิงสถิติ (Key Results):
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                {selectedProject.results.map((res, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tech.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleStartSimilarProject(selectedProject)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-brand-600/25 flex items-center gap-1.5"
              >
                <span>ต้องการทำแบบนี้ (ขอใบเสนอราคา)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Bottom Call To Action Banner (High Contrast & Clear Typography) */}
      <div className="rounded-3xl sge-card border-2 border-brand-300/80 p-8 sm:p-14 text-center bg-gradient-to-r from-blue-50 via-indigo-50/70 to-cyan-50 text-slate-900 shadow-2xl relative">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/25">
            <Sparkles className="w-7 h-7 text-amber-300" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            ชอบสไตล์ผลงานไหนเป็นพิเศษ? <span className="text-gradient">ให้เราช่วยประเมินราคาได้ทันที</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 font-bold leading-relaxed max-w-2xl mx-auto">
            ระบบคำนวณราคาออนไลน์ของเราช่วยประเมินสเปกและออกดราฟต์ใบเสนอราคาจำลองให้คุณได้ทันทีใน 1 นาที <span className="text-brand-700 underline decoration-brand-400 font-black">ฟรีไม่มีค่าใช้จ่าย</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setPage('estimator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-black text-sm sm:text-base shadow-xl shadow-brand-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              คำนวณราคาและออกใบเสนอราคาจำลอง
            </button>

            <button
              onClick={() => {
                setPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 text-sm sm:text-base font-black border-2 border-brand-300 hover:border-brand-500 shadow-md transition-all"
            >
              ติดต่อฝ่ายขายและที่ปรึกษา
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
