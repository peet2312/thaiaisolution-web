import React, { useRef } from 'react';
import { 
  X, Printer, Download, Share2, CheckCircle2, Copy, 
  MessageSquare, Phone, Mail, Building2, ShieldCheck, FileText, Check 
} from 'lucide-react';
import { thaiBahtText } from '../utils/thaiBahtText';

export default function QuotationDocumentModal({ quotation, isOpen, onClose }) {
  if (!isOpen || !quotation) return null;

  const [copied, setCopied] = React.useState(false);
  const printRef = useRef(null);

  const formattedDate = quotation.createdAt 
    ? new Date(quotation.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });

  // 30 days valid date
  const validUntilDate = (() => {
    const d = quotation.createdAt ? new Date(quotation.createdAt) : new Date();
    d.setDate(d.getDate() + 30);
    return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
  })();

  const subtotal = quotation.subtotal || 0;
  const vat = quotation.vat || Math.round(subtotal * 0.07 * 100) / 100;
  const grandTotal = quotation.grandTotal || (subtotal + vat);
  const bahtText = thaiBahtText(grandTotal);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `ใบเสนอราคา บริษัท ไทยเอไอ โซลูชั่น จำกัด\nเลขที่: ${quotation.id}\nวันที่: ${formattedDate}\nลูกค้า: ${quotation.customerName} (${quotation.companyName || '-'})\nบริการ: ${quotation.serviceName}\nยอดรวมสุทธิ: ฿${grandTotal.toLocaleString()} บาท (${bahtText})\nโทรติดต่อ: 097-132-8145`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareLine = () => {
    const message = encodeURIComponent(`สวัสดีครับ ขอส่งใบเสนอราคาเลขที่ ${quotation.id} สำหรับบริการ ${quotation.serviceName} ยอดรวมสุทธิ ฿${grandTotal.toLocaleString()} บาท ให้ทางทีมงาน บริษัท ไทยเอไอ โซลูชั่น จำกัด ครับ`);
    window.open(`https://line.me/R/msg/text/?${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex justify-center items-start p-2 sm:p-4 md:p-6 print:p-0 print:bg-white print:static">
      
      {/* Container Box */}
      <div className="relative w-full max-w-4xl bg-slate-100 rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 print:my-0 print:rounded-none print:shadow-none print:bg-white print:w-full print:max-w-none">
        
        {/* Top Floating Control Bar (Hidden on Print) */}
        <div className="sticky top-0 z-20 bg-slate-900 text-white px-4 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 shadow-md print:hidden">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold text-xs sm:text-sm tracking-wide text-white">
              ใบเสนอราคาอย่างเป็นทางการ (Official Quotation)
            </span>
            <span className="text-cyan-300 font-mono text-xs bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              {quotation.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-brand-500/20 active:scale-95 transition-all"
              title="พิมพ์เอกสาร หรือ บันทึกเป็นไฟล์ PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์ / บันทึก PDF</span>
            </button>

            <button
              onClick={handleShareLine}
              className="px-3 py-1.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              title="ส่งข้อมูลใบเสนอราคาเข้า LINE"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ส่งเข้า LINE</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 active:scale-95 transition-all"
              title="คัดลอกข้อมูลสรุป"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'คัดลอกแล้ว' : 'คัดลอกสรุป'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Printable Official A4 Document Section */}
        {/* ========================================================================= */}
        <div 
          ref={printRef}
          className="bg-white p-6 sm:p-10 md:p-12 text-slate-900 shadow-sm print:p-8 print:shadow-none min-h-[1100px] flex flex-col justify-between font-sans"
          style={{ width: '100%' }}
        >
          <div>
            {/* 1. Official Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-slate-900 pb-5">
              {/* Company Info */}
              <div className="flex items-start gap-3.5">
                <img 
                  src="/logo-icon.png" 
                  alt="Thai AI Solution Logo" 
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-xl border border-slate-200 p-1 bg-white shrink-0" 
                />
                <div className="space-y-0.5">
                  <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    บริษัท ไทยเอไอ โซลูชั่น จำกัด
                  </h1>
                  <p className="text-xs sm:text-sm font-bold text-brand-700 font-mono tracking-wider">
                    THAI AI SOLUTION CO., LTD.
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed max-w-md pt-1">
                    สำนักงานใหญ่: เลขที่ 149/8 ถนนเก้าแสน ตำบลบ่อยาง อำเภอเมืองสงขลา จังหวัดสงขลา 90000
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
                    เลขประจำตัวผู้เสียภาษีอากร (Tax ID): <strong className="font-mono text-slate-900 font-bold">0905569007271</strong>
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-600">
                    โทรศัพท์: <strong>097-132-8145</strong> (24 ชม.) | อีเมล: <strong>thaiaisolution@outlook.com</strong> | เว็บไซต์: <strong>www.thaiaisolution.co.th</strong>
                  </p>
                </div>
              </div>

              {/* Document Title & Badge */}
              <div className="text-left sm:text-right shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="inline-block px-3 py-1 bg-brand-50 border border-brand-300 text-brand-800 text-xs font-black rounded-lg mb-1">
                  ต้นฉบับ / ORIGINAL
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  ใบเสนอราคา
                </h2>
                <p className="text-xs font-bold text-slate-500 font-mono tracking-widest">
                  QUOTATION
                </p>
              </div>
            </div>

            {/* 2. Customer & Document Meta Info Box */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 my-6 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              {/* Customer Box (7 cols) */}
              <div className="sm:col-span-7 space-y-1.5 pr-0 sm:pr-4 sm:border-r border-slate-200">
                <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  ข้อมูลลูกค้า / ผู้ว่าจ้าง (CUSTOMER INFORMATION)
                </div>
                <div className="text-sm font-black text-slate-900">
                  {quotation.customerName || 'ผู้สนใจโครงการ / ลูกค้าทั่วไป'}
                </div>
                {quotation.companyName && (
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>{quotation.companyName}</span>
                  </div>
                )}
                <div className="text-slate-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>โทรศัพท์: <strong>{quotation.phone || '-'}</strong></span>
                </div>
                {quotation.email && (
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand-600" />
                    <span>อีเมล: <strong>{quotation.email}</strong></span>
                  </div>
                )}
                {quotation.taxId && (
                  <div className="text-slate-600">
                    เลขประจำตัวผู้เสียภาษี: <strong className="font-mono">{quotation.taxId}</strong>
                  </div>
                )}
                {quotation.address && (
                  <div className="text-slate-600 pt-0.5 leading-relaxed">
                    ที่อยู่: {quotation.address}
                  </div>
                )}
              </div>

              {/* Document Meta (5 cols) */}
              <div className="sm:col-span-5 space-y-1.5">
                <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  รายละเอียดเอกสาร (DOCUMENT DETAILS)
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">เลขที่ใบเสนอราคา:</span>
                  <strong className="font-mono text-brand-800 font-bold text-xs">{quotation.id}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">วันที่ออกเอกสาร:</span>
                  <span className="font-bold text-slate-900">{formattedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">กำหนดยืนราคา:</span>
                  <span className="font-bold text-slate-900">30 วัน (ถึง {validUntilDate})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ระยะเวลาส่งมอบ:</span>
                  <strong className="text-slate-900 font-bold font-mono">{quotation.weeks || 4} สัปดาห์</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">เงื่อนไขการชำระเงิน:</span>
                  <span className="text-slate-700 font-bold">แบ่งชำระตามงวดงาน</span>
                </div>
              </div>
            </div>

            {/* 3. Items & Services Table */}
            <div className="my-6 overflow-hidden rounded-xl border border-slate-300">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-black text-[11px]">
                    <th className="py-2.5 px-3 text-center w-12 border-r border-slate-800">ลำดับ<br/>(No.)</th>
                    <th className="py-2.5 px-4 border-r border-slate-800">รายการและขอบเขตงาน (Description)</th>
                    <th className="py-2.5 px-3 text-center w-16 border-r border-slate-800">จำนวน<br/>(Qty)</th>
                    <th className="py-2.5 px-3 text-center w-16 border-r border-slate-800">หน่วย<br/>(Unit)</th>
                    <th className="py-2.5 px-4 text-right w-28 border-r border-slate-800">ราคา/หน่วย<br/>(Unit Price)</th>
                    <th className="py-2.5 px-4 text-right w-32">จำนวนเงิน (บาท)<br/>(Amount THB)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {quotation.items && quotation.items.length > 0 ? (
                    quotation.items.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                        <td className="py-3 px-3 text-center font-mono font-bold text-slate-500 border-r border-slate-200">
                          {item.no || idx + 1}
                        </td>
                        <td className="py-3 px-4 border-r border-slate-200">
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">
                            {item.name}
                          </div>
                          {item.description && (
                            <div className="text-[11px] text-slate-500 pt-0.5 leading-relaxed">
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold border-r border-slate-200">
                          {item.qty || 1}
                        </td>
                        <td className="py-3 px-3 text-center text-slate-600 border-r border-slate-200">
                          {item.unit || 'ระบบ'}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-700 border-r border-slate-200">
                          ฿{(item.unitPrice || 0).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                          ฿{(item.total || item.unitPrice || 0).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-white">
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-500 border-r border-slate-200">1</td>
                      <td className="py-3 px-4 border-r border-slate-200">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{quotation.serviceName}</div>
                        <div className="text-[11px] text-slate-500 pt-0.5">{quotation.scaleLabel} - {quotation.urgencyLabel}</div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold border-r border-slate-200">1</td>
                      <td className="py-3 px-3 text-center text-slate-600 border-r border-slate-200">ระบบ</td>
                      <td className="py-3 px-4 text-right font-mono text-slate-700 border-r border-slate-200">฿{subtotal.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">฿{subtotal.toLocaleString()}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 4. Financial Calculations & Baht Text Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start mb-6">
              {/* Thai Baht Text Box (7 cols) */}
              <div className="sm:col-span-7 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  จำนวนเงินตัวอักษร (AMOUNT IN WORDS)
                </div>
                <div className="text-xs sm:text-sm font-bold text-brand-900">
                  {bahtText}
                </div>
                {quotation.notes && (
                  <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200 mt-1">
                    <strong>หมายเหตุ:</strong> {quotation.notes}
                  </div>
                )}
              </div>

              {/* Grand Total Box (5 cols) */}
              <div className="sm:col-span-5 bg-white border border-slate-300 rounded-xl overflow-hidden text-xs">
                <div className="flex justify-between py-2 px-3 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">รวมเป็นเงิน (Subtotal):</span>
                  <span className="font-mono font-bold text-slate-900">฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 px-3 border-b border-slate-200 bg-slate-50/50">
                  <span className="text-slate-600 font-medium">ภาษีมูลค่าเพิ่ม 7% (VAT 7%):</span>
                  <span className="font-mono font-bold text-slate-900">฿{vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2.5 px-3 bg-brand-50/80 text-brand-900 border-t border-brand-200">
                  <span className="font-black text-xs sm:text-sm">รวมเงินทั้งสิ้น (Grand Total):</span>
                  <span className="font-mono font-black text-sm sm:text-base text-brand-700">฿{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* 5. Terms, Conditions & Bank Transfer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] text-slate-600 border-t border-slate-200 pt-4 mb-6">
              <div className="space-y-1">
                <strong className="text-slate-800 font-bold block text-xs">เงื่อนไขการชำระเงิน (Payment Terms):</strong>
                <p>• งวดที่ 1: ชำระ 40% เมื่อลงนามสัญญาและเริ่มพัฒนาโครงการ</p>
                <p>• งวดที่ 2: ชำระ 40% เมื่อติดตั้งระบบขึ้นเซิร์ฟเวอร์ทดสอบ (Staging)</p>
                <p>• งวดที่ 3: ชำระ 20% เมื่องานส่งมอบสมบูรณ์และเปิดใช้งานจริง (Go-Live)</p>
                <p>• รวมการรับประกันและดูแลรักษาระบบ (Maintenance Support) ฟรี 1 ปีเต็ม</p>
              </div>

              <div className="space-y-1 p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                <strong className="text-brand-900 font-bold block text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  การชำระเงินผ่านบัญชีธนาคาร:
                </strong>
                <p className="font-medium text-slate-800">ธนาคารกสิกรไทย (KBank)</p>
                <p className="text-brand-800 font-bold">ชื่อบัญชี: นาย อานันทชัย ทวีวัฒน์ (กรรมการผู้จัดการ)</p>
                <p className="font-mono text-slate-700 font-bold">เลขที่บัญชี: 097-1-85033-7</p>
                <p className="text-[10px] text-slate-500">*นิติบุคคลสามารถหักภาษี ณ ที่จ่าย 3% ตามกฎหมายสรรพากร</p>
              </div>
            </div>
          </div>

          {/* 6. Signatures & Official Stamp */}
          <div className="border-t-2 border-slate-800 pt-6 mt-4">
            <div className="grid grid-cols-2 gap-8 text-center text-xs">
              
              {/* Customer Signature Box */}
              <div className="flex flex-col justify-between items-center h-40 border border-dashed border-slate-300 rounded-2xl p-4 bg-slate-50/50">
                <div className="text-slate-600 font-bold">
                  อนุมัติสั่งซื้อ / ลงนามผู้ว่าจ้าง (Customer Acceptance)
                </div>
                <div className="w-48 border-b border-slate-400 pb-1 text-slate-400 text-[10px]">
                  (ลงชื่อ / ประทับตรา)
                </div>
                <div className="text-[11px] text-slate-600">
                  วันที่ .......... / .......... / ................
                </div>
              </div>

              {/* Company Authorized Signer Box with Seal */}
              <div className="flex flex-col justify-between items-center h-40 border border-slate-300 rounded-2xl p-4 bg-white relative">
                <div className="text-slate-800 font-bold">
                  ในนาม บริษัท ไทยเอไอ โซลูชั่น จำกัด (Authorized Signatory)
                </div>

                {/* Company Digital Stamp Seal Overlay */}
                <div className="relative w-full flex justify-center items-center my-1">
                  <img 
                    src="/seal.png" 
                    alt="Official Company Seal" 
                    className="w-20 h-20 object-contain opacity-85 absolute pointer-events-none -top-6 rotate-[-6deg]"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="font-mono text-xs font-bold text-brand-700 z-10 bg-white/80 px-2 py-0.5 rounded border border-brand-200 shadow-sm">
                    นาย อานันทชัย ทวีวัฒน์
                  </div>
                </div>

                <div className="text-[11px] text-slate-700">
                  กรรมการผู้จัดการ / ผู้มีอำนาจลงนาม
                  <div className="text-[10px] text-slate-500 font-mono">วันที่ {formattedDate}</div>
                </div>
              </div>

            </div>

            <div className="text-center text-[10px] text-slate-400 font-mono pt-4">
              THAI AI SOLUTION CO., LTD. • 0905569007271 • WWW.THAIAISOLUTION.CO.TH • 24/7 CUSTOMER SUPPORT
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
