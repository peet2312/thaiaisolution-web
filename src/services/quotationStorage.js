/**
 * Quotation Storage & Backend Service for Thai AI Solution Co., Ltd.
 * Manages customer quotation submissions, status tracking, and backend data persistence.
 */

const STORAGE_KEY = 'thai_ai_solution_quotations';

// Initial sample data if no data exists
const initialSampleQuotations = [
  {
    id: 'QT-202608-1001',
    createdAt: '2026-08-28T10:30:00.000Z',
    customerName: 'คุณวรวิทย์ สันติสุข',
    companyName: 'บริษัท สยาม โลจิสติกส์ โปร จำกัด',
    phone: '081-456-7890',
    email: 'worawit@siamlogistics.co.th',
    taxId: '0105559012345',
    address: '88/12 อาคารสยามทาวเวอร์ ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
    serviceId: 'full',
    serviceName: 'โซลูชันครบวงจร (Web + AI + Cloud + Marketing Full-Suite)',
    scale: 'business',
    scaleLabel: 'Business / Growth (ระดับธุรกิจเติบโต)',
    urgency: 'normal',
    urgencyLabel: 'มาตรฐานโครงการ (Standard)',
    weeks: 7,
    items: [
      { no: 1, name: 'พัฒนาโซลูชันครบวงจร (Web + AI + Cloud + Marketing)', description: 'สเกล Business / Growth สำหรับธุรกิจขนส่งและบริหารจัดการ', qty: 1, unit: 'ระบบ', unitPrice: 216000, total: 216000 },
      { no: 2, name: 'ติดตั้ง AI Smart Chatbot & Knowledge Base (RAG)', description: 'ระบบผู้ช่วยตอบลูกค้าและค้นหาข้อมูลเอกสารภายในองค์กร', qty: 1, unit: 'โมดูล', unitPrice: 25000, total: 25000 },
      { no: 3, name: 'ระบบประมวลผลเอกสารอัตโนมัติ AI OCR', description: 'อ่านใบส่งสินค้าและสลิปโอนเงินเข้าฐานข้อมูลเรียลไทม์', qty: 1, unit: 'โมดูล', unitPrice: 30000, total: 30000 },
      { no: 4, name: 'เชื่อมต่อ Payment Gateway / PromptPay QR', description: 'ระบบตัดเงินและตรวจสลิปอัตโนมัติ', qty: 1, unit: 'ระบบ', unitPrice: 15000, total: 15000 }
    ],
    subtotal: 286000,
    vat: 20020,
    grandTotal: 306020,
    notes: 'ต้องการเชื่อมต่อกับระบบฐานข้อมูล SQL เดิมของบริษัท',
    status: 'contacted', // pending, contacted, approved, cancelled
    adminNotes: 'โทรติดต่อพูดคุยเบื้องต้นแล้ว นัดประชุม Zoom วันจันทร์หน้า'
  },
  {
    id: 'QT-202608-1002',
    createdAt: '2026-08-29T14:15:00.000Z',
    customerName: 'คุณกิตติศักดิ์ รัตนพงษ์',
    companyName: 'บจก. เจริญทรัพย์ สมาร์ทรีเทล',
    phone: '089-771-2233',
    email: 'kittisak@charoensub.com',
    taxId: '0905561008899',
    address: '150/4 ถ.เพชรเกษม ต.หาดใหญ่ อ.หาดใหญ่ จ.สงขลา 90110',
    serviceId: 'marketing',
    serviceName: 'การตลาดออนไลน์ & ยิงแอด Facebook / Google / TikTok / SEO',
    scale: 'mvp',
    scaleLabel: 'Starter / รายเดือน (สเกลเริ่มต้น)',
    urgency: 'express',
    urgencyLabel: 'เร่งด่วนพิเศษ (Fast-Track +25%)',
    weeks: 1,
    items: [
      { no: 1, name: 'แพ็กเกจยิงแอด AI & การตลาดออนไลน์ (รายเดือน)', description: 'Google Ads, Facebook Ads, TikTok Ads พร้อมรายงานผล', qty: 1, unit: 'เดือน', unitPrice: 3900, total: 3900 },
      { no: 2, name: 'ติดตั้ง Pixel & Conversion API ครบวงจร', description: 'ติดตั้ง Meta Pixel, TikTok Pixel และ Google Tag Manager', qty: 1, unit: 'ชุด', unitPrice: 1500, total: 1500 },
      { no: 3, name: 'ผลิตคลิปสั้นวิดีโอโฆษณา AI TikTok / Reels (4 คลิป)', description: 'ผลิตวิดีโอสร้างยอดขายด้วยเสียงพากย์และเอฟเฟกต์ AI', qty: 1, unit: 'แพ็กเกจ', unitPrice: 2500, total: 2500 },
      { no: 4, name: 'ค่าปรับแต่งเร่งด่วนพิเศษ (Fast-Track Express +25%)', description: 'เริ่มงานทันทีภายใน 24 ชั่วโมง', qty: 1, unit: 'บริการ', unitPrice: 1975, total: 1975 }
    ],
    subtotal: 9875,
    vat: 691.25,
    grandTotal: 10566.25,
    notes: 'ต้องการยิงแอดกระตุ้นยอดขายสินค้าแฟชั่นต้อนรับต้นเดือน',
    status: 'approved',
    adminNotes: 'ชำระเงินมัดจำงวดแรกแล้ว เริ่มรันแคมเปญโฆษณา'
  }
];

export function getQuotations() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSampleQuotations));
      return initialSampleQuotations;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading quotations from storage:', err);
    return initialSampleQuotations;
  }
}

export function saveQuotation(quotation) {
  try {
    const current = getQuotations();
    
    // Generate unique ID if not present
    const now = new Date();
    const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = quotation.id || `QT-${yearMonth}-${randomSuffix}`;
    
    const newRecord = {
      ...quotation,
      id: newId,
      createdAt: quotation.createdAt || now.toISOString(),
      status: quotation.status || 'pending',
      adminNotes: quotation.adminNotes || ''
    };

    const updated = [newRecord, ...current.filter(q => q.id !== newId)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newRecord;
  } catch (err) {
    console.error('Error saving quotation to storage:', err);
    return quotation;
  }
}

export function updateQuotationStatus(id, status, adminNotes = null) {
  try {
    const current = getQuotations();
    const updated = current.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          adminNotes: adminNotes !== null ? adminNotes : item.adminNotes,
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.find(item => item.id === id);
  } catch (err) {
    console.error('Error updating quotation status:', err);
    return null;
  }
}

export function deleteQuotation(id) {
  try {
    const current = getQuotations();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Error deleting quotation:', err);
    return false;
  }
}

export function exportQuotationsToCSV() {
  const quotations = getQuotations();
  if (!quotations || quotations.length === 0) return;

  const headers = [
    'เลขที่ใบเสนอราคา',
    'วันที่บันทึก',
    'ชื่อผู้ติดต่อ',
    'บริษัท/องค์กร',
    'เบอร์โทรศัพท์',
    'อีเมล',
    'เลขผู้เสียภาษี',
    'บริการหลัก',
    'สเกลโครงการ',
    'ยอดรวมก่อนภาษี (บาท)',
    'ภาษีมูลค่าเพิ่ม 7% (บาท)',
    'ยอดรวมสุทธิ (บาท)',
    'สถานะ',
    'หมายเหตุผู้ดูแล'
  ];

  const statusMap = {
    pending: 'รอดำเนินการ',
    contacted: 'ติดต่อแล้ว',
    approved: 'อนุมัติแล้ว',
    cancelled: 'ยกเลิก'
  };

  const rows = quotations.map(q => [
    `"${q.id}"`,
    `"${new Date(q.createdAt).toLocaleString('th-TH')}"`,
    `"${(q.customerName || '').replace(/"/g, '""')}"`,
    `"${(q.companyName || '').replace(/"/g, '""')}"`,
    `"${q.phone || ''}"`,
    `"${q.email || ''}"`,
    `"${q.taxId || ''}"`,
    `"${(q.serviceName || '').replace(/"/g, '""')}"`,
    `"${(q.scaleLabel || '').replace(/"/g, '""')}"`,
    q.subtotal || 0,
    q.vat || 0,
    q.grandTotal || 0,
    `"${statusMap[q.status] || q.status}"`,
    `"${(q.adminNotes || '').replace(/"/g, '""')}"`
  ]);

  // Prepend UTF-8 BOM so Excel displays Thai characters correctly
  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Thai_AI_Solution_Quotations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
