import React, { useRef, useState } from 'react';
import { X, Download, Printer, Award, Edit3, Check, Globe } from 'lucide-react';
import { formatCurrency } from '../utils/taxCalculator';

export default function CertificateModal({ employee, onClose }) {
  const certRef = useRef(null);
  const [lang, setLang] = useState('th'); // 'th' | 'en'
  const [isEditing, setIsEditing] = useState(false);

  if (!employee) return null;

  const today = new Date();
  const buddhistYear = today.getFullYear() + 543;
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const englishMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const defaultDateTh = `${today.getDate()} ${thaiMonths[today.getMonth()]} พ.ศ. ${buddhistYear}`;
  const defaultDateEn = `${englishMonths[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

  const [formData, setFormData] = useState({
    refNoTh: `TAS-HR/${buddhistYear}/${String(today.getMonth() + 1).padStart(2, '0')}-001`,
    refNoEn: `TAS-HR/${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}-001`,
    issueDateTh: defaultDateTh,
    issueDateEn: defaultDateEn,
    fullNameTh: employee.fullName || 'นายภาณุพงศ์ ชลเจริญ',
    fullNameEn: employee.fullNameEn || 'Mr. Panupong Chonjareon',
    idNumber: employee.socialSecurityId || employee.taxId || '1-9001-01231-85-7',
    positionTh: employee.position || 'Senior Full-Stack Developer (นักพัฒนาซอฟต์แวร์อาวุโส)',
    positionEn: 'Senior Full-Stack Developer',
    departmentTh: employee.department ? `ฝ่าย${employee.department}` : 'ฝ่ายเทคโนโลยีสารสนเทศและการพัฒนา (Engineering & Technology)',
    departmentEn: 'Engineering & Technology Department',
    startDateTh: '26 สิงหาคม พ.ศ. 2569',
    startDateEn: 'August 26, 2026',
    salary: employee.baseSalary || 45000,
    purposeTh: 'เพื่อเป็นหลักฐานประกอบการทำธุรกรรมทางการเงิน ขอสินเชื่อ ยื่นคำร้องขอวีซ่า หรือตามวัตถุประสงค์อันชอบด้วยกฎหมายของผู้ขอรับหนังสือรับรอง',
    purposeEn: 'upon his request to serve as official verification for financial transactions, banking credit applications, visa processing, or any other legitimate purpose.',
    signerNameTh: 'นายอานันทชัย ทวีวัฒน์',
    signerNameEn: 'Mr. Ananthachai Thaweewat',
    signerTitleTh: 'กรรมการผู้จัดการ / ผู้มีอำนาจลงนามผูกพันบริษัท',
    signerTitleEn: 'Managing Director / Authorized Signatory',
  });

  const handleFieldChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handlePrint = () => {
    const printContents = certRef.current?.innerHTML;
    if (!printContents) return;
    const w = window.open('', '_blank', 'width=900,height=800');
    w.document.write(`
      <html>
        <head>
          <title>หนังสือรับรองการทำงาน - ${employee.fullName}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Sarabun', sans-serif; padding: 0; background: #fff; }
            @media print {
              body { padding: 0; }
              @page { size: A4 portrait; margin: 12mm 16mm; }
            }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    w.document.close();
    setTimeout(() => { w.print(); }, 400);
  };

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(certRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const availableWidth = pageWidth - (margin * 2);
      const availableHeight = pageHeight - (margin * 2);

      let renderWidth = availableWidth;
      let renderHeight = (canvas.height * renderWidth) / canvas.width;

      if (renderHeight > availableHeight) {
        renderHeight = availableHeight;
        renderWidth = (canvas.width * renderHeight) / canvas.height;
      }

      const xPos = (pageWidth - renderWidth) / 2;
      const yPos = (pageHeight - renderHeight) / 2;

      pdf.addImage(imgData, 'PNG', xPos, yPos, renderWidth, renderHeight);
      pdf.save(`Certificate_${employee.id}_${lang.toUpperCase()}.pdf`);
    } catch (err) {
      console.error('Certificate PDF generation error:', err);
      alert('เกิดข้อผิดพลาดในการสร้าง PDF กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[880px] my-auto overflow-hidden">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wide">หนังสือรับรองการทำงาน & เงินเดือน</h2>
              <p className="text-[11px] text-slate-400">พนักงาน: {employee.fullName} ({employee.id})</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang switch */}
            <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setLang('th')}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all ${
                  lang === 'th' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                ไทย
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all ${
                  lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors font-medium ${
                isEditing ? 'bg-amber-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isEditing ? 'เสร็จสิ้นการแก้ไข' : 'แก้ไขข้อมูล'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-medium"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">พิมพ์</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-semibold shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Edit Drawer */}
        {isEditing && (
          <div className="bg-amber-50 border-b border-amber-200 p-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">เลขที่เอกสาร</label>
                <input
                  type="text"
                  value={lang === 'th' ? formData.refNoTh : formData.refNoEn}
                  onChange={e => handleFieldChange(lang === 'th' ? 'refNoTh' : 'refNoEn', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">วันที่ออกเอกสาร</label>
                <input
                  type="text"
                  value={lang === 'th' ? formData.issueDateTh : formData.issueDateEn}
                  onChange={e => handleFieldChange(lang === 'th' ? 'issueDateTh' : 'issueDateEn', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">ตำแหน่ง</label>
                <input
                  type="text"
                  value={lang === 'th' ? formData.positionTh : formData.positionEn}
                  onChange={e => handleFieldChange(lang === 'th' ? 'positionTh' : 'positionEn', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">เงินเดือน (บาท)</label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={e => handleFieldChange('salary', parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Preview Container */}
        <div className="p-4 sm:p-6 overflow-x-auto bg-slate-100 flex justify-center">
          <div
            ref={certRef}
            className="w-[720px] bg-white p-8 shadow-lg border border-slate-300 relative text-[#1e293b]"
            style={{ fontFamily: "'Sarabun', sans-serif" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b-2 border-[#0052cc] pb-3 mb-4">
              <img
                src="/logo.jpg"
                alt="Logo"
                className="h-14 w-auto object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="text-right text-[11px] text-slate-600 leading-snug">
                <div className="text-[16px] font-bold text-[#003399]">
                  {lang === 'th' ? 'บริษัท ไทยเอไอ โซลูชั่น จำกัด' : 'THAI AI SOLUTION CO., LTD.'}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mb-1">
                  {lang === 'th' ? 'THAI AI SOLUTION CO., LTD.' : 'บริษัท ไทยเอไอ โซลูชั่น จำกัด'}
                </div>
                <div>เลขประจำตัวผู้เสียภาษี / ทะเบียนนิติบุคคล: <strong>0905569007271</strong></div>
                <div>สำนักงานใหญ่: 149/8 ถนนเก้าแสน ตำบลบ่อยาง อำเภอเมืองสงขลา จังหวัดสงขลา 90000</div>
                <div>โทรศัพท์: 099-313-4546 | อีเมล: thaiaisolution@outlook.com</div>
              </div>
            </div>

            {/* Doc Meta */}
            <div className="flex justify-between text-[12px] text-slate-600 mb-4">
              <div>{lang === 'th' ? 'เลขที่:' : 'Ref. No.:'} <strong>{lang === 'th' ? formData.refNoTh : formData.refNoEn}</strong></div>
              <div>{lang === 'th' ? 'วันที่:' : 'Date:'} <strong>{lang === 'th' ? formData.issueDateTh : formData.issueDateEn}</strong></div>
            </div>

            {/* Title */}
            <div className="text-center mb-5">
              <h1 className="text-[20px] font-bold text-slate-900 tracking-wide">
                {lang === 'th' ? 'หนังสือรับรองการทำงานและอัตราเงินเดือน' : 'CERTIFICATE OF EMPLOYMENT AND COMPENSATION'}
              </h1>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                {lang === 'th' ? 'CERTIFICATE OF EMPLOYMENT AND SALARY' : 'TO WHOM IT MAY CONCERN'}
              </div>
            </div>

            {/* Body */}
            {lang === 'th' ? (
              <div className="text-[13.5px] leading-relaxed text-justify space-y-3">
                <p className="indent-8">
                  หนังสือรับรองฉบับนี้ออกให้โดย <strong>บริษัท ไทยเอไอ โซลูชั่น จำกัด</strong> เพื่อแสดงและรับรองว่า
                </p>

                <div className="my-2 border-y border-slate-200 py-2 space-y-1.5 text-[13px]">
                  <div className="flex">
                    <span className="w-36 text-slate-500">ชื่อ - นามสกุล:</span>
                    <span className="font-bold text-slate-900">{formData.fullNameTh}</span>
                  </div>
                  <div className="flex">
                    <span className="w-36 text-slate-500">เลขประจำตัวประชาชน:</span>
                    <span className="font-semibold text-slate-900">{formData.idNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="w-36 text-slate-500">สถานะการทำงาน:</span>
                    <span className="font-semibold text-slate-900">พนักงานประจำ (Full-Time Employee)</span>
                  </div>
                  <div className="flex">
                    <span className="w-36 text-slate-500">ตำแหน่งหน้าที่:</span>
                    <span className="font-bold text-slate-900">{formData.positionTh}</span>
                  </div>
                  <div className="flex">
                    <span className="w-36 text-slate-500">สังกัดฝ่าย / แผนก:</span>
                    <span className="font-semibold text-slate-900">{formData.departmentTh}</span>
                  </div>
                  <div className="flex">
                    <span className="w-36 text-slate-500">วันที่เริ่มปฏิบัติงาน:</span>
                    <span className="font-semibold text-slate-900">{formData.startDateTh} จนถึงปัจจุบัน</span>
                  </div>
                  <div className="flex">
                    <span className="w-36 text-slate-500">อัตราเงินเดือนปัจจุบัน:</span>
                    <span className="font-bold text-[#003399]">{formatCurrency(formData.salary)} บาท / เดือน</span>
                  </div>
                </div>

                <p className="indent-8">
                  ตลอดระยะเวลาที่ปฏิบัติงานกับบริษัทฯ <strong>{formData.fullNameTh}</strong> เป็นผู้มีความรู้ ความสามารถ ความเชี่ยวชาญ และความมุ่งมั่นในการปฏิบัติหน้าที่อย่างดียิ่ง มีความซื่อสัตย์สุจริต ขยันขันแข็ง ปฏิบัติตนตามระเบียบข้อบังคับและจรรยาบรรณของบริษัทฯ อย่างเคร่งครัด สม่ำเสมอ และได้อุทิศตนสร้างคุณประโยชน์แก่องค์กรด้วยความรับผิดชอบสูง
                </p>

                <p className="indent-8">
                  บริษัทฯ จึงออกหนังสือรับรองฉบับนี้ไว้{formData.purposeTh}
                </p>
              </div>
            ) : (
              <div className="text-[13.5px] leading-relaxed text-justify space-y-3">
                <p>
                  This letter is issued by <strong>Thai AI Solution Co., Ltd.</strong> to formally certify that:
                </p>

                <div className="my-2 border-y border-slate-200 py-2 space-y-1.5 text-[13px]">
                  <div className="flex">
                    <span className="w-44 text-slate-500">Employee Name:</span>
                    <span className="font-bold text-slate-900">{formData.fullNameEn}</span>
                  </div>
                  <div className="flex">
                    <span className="w-44 text-slate-500">National ID No.:</span>
                    <span className="font-semibold text-slate-900">{formData.idNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="w-44 text-slate-500">Employment Status:</span>
                    <span className="font-semibold text-slate-900">Full-Time Permanent Employee</span>
                  </div>
                  <div className="flex">
                    <span className="w-44 text-slate-500">Position / Job Title:</span>
                    <span className="font-bold text-slate-900">{formData.positionEn}</span>
                  </div>
                  <div className="flex">
                    <span className="w-44 text-slate-500">Department:</span>
                    <span className="font-semibold text-slate-900">{formData.departmentEn}</span>
                  </div>
                  <div className="flex">
                    <span className="w-44 text-slate-500">Period of Employment:</span>
                    <span className="font-semibold text-slate-900">{formData.startDateEn} – Present</span>
                  </div>
                  <div className="flex">
                    <span className="w-44 text-slate-500">Monthly Base Salary:</span>
                    <span className="font-bold text-[#003399]">THB {formatCurrency(formData.salary)} / Month</span>
                  </div>
                </div>

                <p>
                  During his employment with Thai AI Solution Co., Ltd., <strong>{formData.fullNameEn}</strong> has demonstrated high technical proficiency, outstanding professional dedication, and integrity. He consistently complies with all company rules, ethical guidelines, and standards, and has contributed significantly to our technological initiatives.
                </p>

                <p>
                  This certificate is granted {formData.purposeEn}
                </p>
              </div>
            )}

            {/* Sign-off & Seal */}
            <div className="mt-8 flex justify-end">
              <div className="w-[280px] text-center relative">
                <div className="text-[13px] mb-2">{lang === 'th' ? 'ขอแสดงความนับถือ' : 'Yours faithfully,'}</div>
                <div className="h-14 relative flex items-center justify-center">
                  <img
                    src="/stamp.png"
                    alt="Company Seal"
                    className="absolute -top-5 left-4 w-28 h-auto opacity-85 pointer-events-none -rotate-6"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="text-[14px] font-bold text-slate-900">
                  {lang === 'th' ? `( ${formData.signerNameTh} )` : formData.signerNameEn}
                </div>
                <div className="text-[11px] text-slate-600 leading-tight mt-0.5">
                  {lang === 'th' ? formData.signerTitleTh : formData.signerTitleEn}
                </div>
                <div className="text-[11px] font-semibold text-[#003399] mt-0.5">
                  {lang === 'th' ? 'บริษัท ไทยเอไอ โซลูชั่น จำกัด' : 'Thai AI Solution Co., Ltd.'}
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-8 pt-2 border-t border-dashed border-slate-300 text-center text-[10px] text-slate-400">
              {lang === 'th'
                ? 'เอกสารฉบับนี้มีผลบังคับใช้ตามกฎหมาย สามารถใช้ยืนยันสถานะการทำงานและรายได้ สอบถามเพิ่มเติม โทร. 099-313-4546'
                : 'Official employment certification issued by Thai AI Solution Co., Ltd. For verification, contact +66 99 313 4546'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
