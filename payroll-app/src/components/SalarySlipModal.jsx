import React, { useRef, useState } from 'react';
import { X, Download, Printer, Banknote, Edit3, Check } from 'lucide-react';
import { formatCurrency } from '../utils/taxCalculator';
import { THAI_MONTHS } from '../services/payrollStorage';

export default function SalarySlipModal({ payroll, employee, onClose }) {
  const slipRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  if (!payroll || !employee) return null;

  const month = payroll.month || 9;
  const year = payroll.year || 2026;
  const buddhistYear = year + 543;
  const lastDayOfMonth = new Date(year, month, 0).getDate();

  // Configurable / Editable Slip States
  const [slipData, setSlipData] = useState({
    // Header & Period
    payDate: payroll.payDate || `${String(lastDayOfMonth).padStart(2, '0')}/${String(month).padStart(2, '0')}/${buddhistYear}`,
    periodRange: payroll.periodRange || `01/${String(month).padStart(2, '0')}/${buddhistYear} ถึง ${String(lastDayOfMonth).padStart(2, '0')}/${String(month).padStart(2, '0')}/${buddhistYear}`,
    payPeriodText: payroll.payPeriodText || `${buddhistYear} ${month} งวด`,
    
    // Attendance
    absenceDays: payroll.absenceDays || '0-0:0',
    leaveDays: payroll.leaveDays || '0-0:0',
    lateCount: payroll.lateCount || '0.00',

    // Incomes
    baseSalary: payroll.baseSalary || 0,
    positionAllowance: payroll.positionAllowance || 0,
    phoneAllowance: payroll.phoneAllowance || 0,
    incentive: payroll.incentive || (payroll.bonus || 0),
    ot1Hours: payroll.ot1Hours || '',
    ot1Pay: payroll.ot1Pay || 0,
    ot15Hours: payroll.ot15Hours || '',
    ot15Pay: payroll.ot15Pay || (payroll.otPay || 0),
    ot3Hours: payroll.ot3Hours || '',
    ot3Pay: payroll.ot3Pay || 0,
    allowance: payroll.allowance || 0,
    commission: payroll.commission || 0,
    otherIncome: payroll.otherIncome || 0,

    // Deductions
    socialSecurity: payroll.socialSecurity || 0,
    providentFund: payroll.providentFund || 0,
    tax: payroll.tax || 0,
    absenceDeduction: payroll.absenceDeduction || 0,
    otherDeduction: payroll.otherDeduction || 0,

    // Cumulatives (YTD)
    providentFundCum: payroll.providentFundCum || ((payroll.providentFund || 0) * month),
    taxCum: payroll.taxCum || (Math.round((payroll.tax || 0) * month * 100) / 100),
    ytdIncome: payroll.ytdIncome || (Math.round((payroll.totalIncome || payroll.baseSalary || 0) * month * 100) / 100),
    ytdSocialSecurity: payroll.ytdSocialSecurity || ((payroll.socialSecurity || 750) * month),

    // Bank details
    bankAccount: employee.bankAccount || '068-8-12345-6',
    bankName: employee.bankName || 'ธนาคารกสิกรไทย จำกัด (มหาชน)',
  });

  const handleFieldChange = (field, val) => {
    setSlipData(prev => ({ ...prev, [field]: val }));
  };

  // Compute Incomes & Deductions Dynamically
  const incomeList = [
    { label: 'เงินเดือน', amount: parseFloat(slipData.baseSalary) || 0 },
    slipData.positionAllowance > 0 && { label: 'ค่าตำแหน่ง', amount: parseFloat(slipData.positionAllowance) || 0 },
    slipData.phoneAllowance > 0 && { label: 'ค่าโทรศัพท์', amount: parseFloat(slipData.phoneAllowance) || 0 },
    slipData.incentive > 0 && { label: 'เงินรางวัลจูงใจ', amount: parseFloat(slipData.incentive) || 0 },
    slipData.ot1Pay > 0 && {
      label: `ค่าล่วงเวลา1.0 ${slipData.ot1Hours ? `(${slipData.ot1Hours})` : ''}`,
      amount: parseFloat(slipData.ot1Pay) || 0,
    },
    slipData.ot15Pay > 0 && {
      label: `ค่าล่วงเวลา1.5 ${slipData.ot15Hours ? `(${slipData.ot15Hours})` : ''}`,
      amount: parseFloat(slipData.ot15Pay) || 0,
    },
    slipData.ot3Pay > 0 && {
      label: `ค่าล่วงเวลา3.0 ${slipData.ot3Hours ? `(${slipData.ot3Hours})` : ''}`,
      amount: parseFloat(slipData.ot3Pay) || 0,
    },
    slipData.allowance > 0 && { label: 'เบี้ยเลี้ยง', amount: parseFloat(slipData.allowance) || 0 },
    slipData.commission > 0 && { label: 'ค่าคอมมิชชั่น', amount: parseFloat(slipData.commission) || 0 },
    slipData.otherIncome > 0 && { label: 'เงินได้อื่นๆ', amount: parseFloat(slipData.otherIncome) || 0 },
  ].filter(Boolean);

  const deductionList = [
    { label: 'ประกันสังคม', amount: parseFloat(slipData.socialSecurity) || 0 },
    slipData.providentFund > 0 && { label: 'เงินสะสมกองทุนสำรองฯ', amount: parseFloat(slipData.providentFund) || 0 },
    slipData.tax > 0 && { label: 'ภาษีหัก ณ ที่จ่าย', amount: parseFloat(slipData.tax) || 0 },
    slipData.absenceDeduction > 0 && { label: 'หักขาดงาน', amount: parseFloat(slipData.absenceDeduction) || 0 },
    slipData.otherDeduction > 0 && { label: 'หักอื่นๆ', amount: parseFloat(slipData.otherDeduction) || 0 },
  ].filter(Boolean);

  const totalIncome = incomeList.reduce((sum, item) => sum + item.amount, 0);
  const totalDeduction = deductionList.reduce((sum, item) => sum + item.amount, 0);
  const netPay = Math.round((totalIncome - totalDeduction) * 100) / 100;

  // Render row count (ensure at least 7 rows for visual balance matching the template)
  const rowCount = Math.max(incomeList.length, deductionList.length, 7);

  const handlePrint = () => {
    const printContents = slipRef.current?.innerHTML;
    if (!printContents) return;
    const w = window.open('', '_blank', 'width=950,height=750');
    w.document.write(`
      <html>
        <head>
          <title>สลิปเงินเดือน - ${employee.fullName}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Sarabun', sans-serif; padding: 10mm; background: #fff; }
            @media print {
              body { padding: 0; }
              @page { size: A4 landscape; margin: 10mm; }
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
    if (!slipRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(slipRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Fit to A4 landscape maintaining aspect ratio
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
      pdf.save(`PaySlip_${employee.id}_${year}${String(month).padStart(2, '0')}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('เกิดข้อผิดพลาดในการสร้าง PDF กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[960px] my-auto overflow-hidden">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Banknote className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wide">ใบรับเงินเดือน (Pay Slip)</h2>
              <p className="text-[11px] text-slate-400">พนักงาน: {employee.fullName} ({employee.id})</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors font-medium ${
                isEditing ? 'bg-amber-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isEditing ? 'เสร็จสิ้นการแก้ไข' : 'ปรับแต่งข้อมูลสลิป'}</span>
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold shadow-md"
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

        {/* Quick Edit Drawer if enabled */}
        {isEditing && (
          <div className="bg-amber-50 border-b border-amber-200 p-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">วันที่จ่าย</label>
                <input
                  type="text"
                  value={slipData.payDate}
                  onChange={e => handleFieldChange('payDate', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">งวดวันที่</label>
                <input
                  type="text"
                  value={slipData.periodRange}
                  onChange={e => handleFieldChange('periodRange', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">งวดการจ่าย</label>
                <input
                  type="text"
                  value={slipData.payPeriodText}
                  onChange={e => handleFieldChange('payPeriodText', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">ขาดงาน (วัน:ชม.)</label>
                <input
                  type="text"
                  value={slipData.absenceDays}
                  onChange={e => handleFieldChange('absenceDays', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">ลางาน (วัน:ชม.)</label>
                <input
                  type="text"
                  value={slipData.leaveDays}
                  onChange={e => handleFieldChange('leaveDays', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">มาสาย (ครั้ง)</label>
                <input
                  type="text"
                  value={slipData.lateCount}
                  onChange={e => handleFieldChange('lateCount', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">ค่าตำแหน่ง</label>
                <input
                  type="number"
                  value={slipData.positionAllowance}
                  onChange={e => handleFieldChange('positionAllowance', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">ค่าโทรศัพท์</label>
                <input
                  type="number"
                  value={slipData.phoneAllowance}
                  onChange={e => handleFieldChange('phoneAllowance', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">เงินรางวัลจูงใจ</label>
                <input
                  type="number"
                  value={slipData.incentive}
                  onChange={e => handleFieldChange('incentive', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">ค่าล่วงเวลา 1.0 (บาท)</label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="ชม."
                    value={slipData.ot1Hours}
                    onChange={e => handleFieldChange('ot1Hours', e.target.value)}
                    className="w-16 px-1 py-1 bg-white border border-slate-300 rounded text-xs"
                  />
                  <input
                    type="number"
                    placeholder="บาท"
                    value={slipData.ot1Pay}
                    onChange={e => handleFieldChange('ot1Pay', e.target.value)}
                    className="flex-1 px-1 py-1 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">ค่าล่วงเวลา 1.5 (บาท)</label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="ชม."
                    value={slipData.ot15Hours}
                    onChange={e => handleFieldChange('ot15Hours', e.target.value)}
                    className="w-16 px-1 py-1 bg-white border border-slate-300 rounded text-xs"
                  />
                  <input
                    type="number"
                    placeholder="บาท"
                    value={slipData.ot15Pay}
                    onChange={e => handleFieldChange('ot15Pay', e.target.value)}
                    className="flex-1 px-1 py-1 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">ค่าล่วงเวลา 3.0 (บาท)</label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="ชม."
                    value={slipData.ot3Hours}
                    onChange={e => handleFieldChange('ot3Hours', e.target.value)}
                    className="w-16 px-1 py-1 bg-white border border-slate-300 rounded text-xs"
                  />
                  <input
                    type="number"
                    placeholder="บาท"
                    value={slipData.ot3Pay}
                    onChange={e => handleFieldChange('ot3Pay', e.target.value)}
                    className="flex-1 px-1 py-1 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">สะสมกองทุนสำรองฯ</label>
                <input
                  type="number"
                  value={slipData.providentFund}
                  onChange={e => handleFieldChange('providentFund', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">รวมรายได้สะสม YTD</label>
                <input
                  type="number"
                  value={slipData.ytdIncome}
                  onChange={e => handleFieldChange('ytdIncome', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">รวมภาษีสะสม YTD</label>
                <input
                  type="number"
                  value={slipData.taxCum}
                  onChange={e => handleFieldChange('taxCum', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">รวม ปกส. สะสม YTD</label>
                <input
                  type="number"
                  value={slipData.ytdSocialSecurity}
                  onChange={e => handleFieldChange('ytdSocialSecurity', e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Container for Preview */}
        <div className="p-4 sm:p-6 overflow-x-auto bg-slate-100 flex justify-center">
          {/* ==================== EXACT MATCH SALARY SLIP (PRINT & PDF TARGET) ==================== */}
          <div
            ref={slipRef}
            className="w-[880px] bg-white p-7 shadow-lg border border-[#0052cc]"
            style={{
              fontFamily: "'Prompt', 'Sarabun', sans-serif",
              color: '#002f99',
            }}
          >
            {/* 1. TOP HEADER ROW */}
            <div className="flex items-start justify-between">
              {/* Left: Logo + Company Name */}
              <div className="w-[240px]">
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src="/logo.jpg"
                    alt="Thai AI Solution Logo"
                    className="h-14 w-auto object-contain"
                    onError={(e) => {
                      // Fallback if image not directly loadable
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-[13px] font-bold text-[#002f99] border-b border-[#002f99] inline-block pb-0.5 tracking-tight">
                  บริษัท ไทยเอไอ โซลูชั่น จำกัด
                </div>
              </div>

              {/* Center: Title */}
              <div className="flex-1 text-center pt-2">
                <h1 className="text-[26px] font-bold text-[#f57c00] tracking-wide font-heading">
                  ใบรับเงินเดือน (Pay Slip)
                </h1>
              </div>

              {/* Right: Employee Info Box */}
              <div className="w-[260px] text-[12px] leading-[1.6]">
                <div className="flex">
                  <span className="w-24 font-bold text-[#002f99]">รหัสพนักงาน</span>
                  <span className="font-semibold">{employee.id}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-bold text-[#002f99]">ชื่อพนักงาน</span>
                  <span className="font-semibold">{employee.fullName}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-bold text-[#002f99]">หน่วยงาน</span>
                  <span>{employee.department || 'ฝ่ายพัฒนาซอฟต์แวร์'}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-bold text-[#002f99]">ตำแหน่ง</span>
                  <span>{employee.position}</span>
                </div>
              </div>
            </div>

            {/* 2. HORIZONTAL DIVIDER */}
            <div className="border-t-[1.5px] border-[#002f99] my-2"></div>

            {/* 3. EMPLOYEE & PAYMENT DATE ROW */}
            <div className="flex justify-between items-center text-[12px] py-0.5">
              <div className="flex items-center gap-6">
                <div>
                  <span className="font-bold">รหัสพนักงาน</span>&nbsp;&nbsp;
                  <span className="font-semibold">{employee.id}</span>
                </div>
                <div>
                  <span className="font-bold">ชื่อพนักงาน</span>&nbsp;&nbsp;
                  <span className="font-semibold">{employee.fullName}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <span className="font-bold">วันที่จ่าย</span>&nbsp;&nbsp;
                  <span>{slipData.payDate}</span>
                </div>
                <div>
                  <span className="font-bold">งวดวันที่</span>&nbsp;&nbsp;
                  <span>{slipData.periodRange}</span>
                </div>
              </div>
            </div>

            {/* 4. HORIZONTAL DIVIDER */}
            <div className="border-t border-[#002f99] my-1.5"></div>

            {/* 5. ATTENDANCE & PERIOD STATS ROW */}
            <div className="grid grid-cols-4 text-[12px] py-0.5 text-center">
              <div>
                <span className="font-semibold">จำนวนวันที่ขาด(วัน:ชม.)</span>
                <div className="mt-0.5">{slipData.absenceDays}</div>
              </div>
              <div>
                <span className="font-semibold">จำนวนวันที่ลา(วัน:ชม.)</span>
                <div className="mt-0.5">{slipData.leaveDays}</div>
              </div>
              <div>
                <span className="font-semibold">จำนวนวันที่มาสาย(ครั้ง)</span>
                <div className="mt-0.5">{slipData.lateCount}</div>
              </div>
              <div>
                <span className="font-semibold">งวดการจ่าย</span>
                <div className="mt-0.5">{slipData.payPeriodText}</div>
              </div>
            </div>

            {/* 6. MAIN TABLE SECTION HEADERS */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              {/* Income Header */}
              <div className="flex items-center text-[#002f99] font-bold text-[12px]">
                <span>&lt;&lt;</span>
                <span className="flex-1 border-t-[2px] border-double border-[#002f99] mx-1.5"></span>
                <span>รายได้</span>
                <span className="flex-1 border-t-[2px] border-double border-[#002f99] mx-1.5"></span>
                <span>&gt;&gt;</span>
              </div>
              {/* Deduction Header */}
              <div className="flex items-center text-[#002f99] font-bold text-[12px]">
                <span>&lt;&lt;</span>
                <span className="flex-1 border-t-[2px] border-double border-[#002f99] mx-1.5"></span>
                <span>รายการหัก</span>
                <span className="flex-1 border-t-[2px] border-double border-[#002f99] mx-1.5"></span>
                <span>&gt;&gt;</span>
              </div>
            </div>

            {/* 7. ITEMIZED ROWS (รายได้ vs รายการหัก) */}
            <div className="grid grid-cols-2 gap-4 text-[12px] my-2 min-h-[160px]">
              {/* Left: Income Column */}
              <div className="space-y-1 pr-2">
                {Array.from({ length: rowCount }).map((_, idx) => {
                  const item = incomeList[idx];
                  return (
                    <div key={idx} className="flex justify-between items-center leading-tight">
                      <span>{item ? item.label : '\u00A0'}</span>
                      <span className="tabular-nums font-medium">
                        {item ? formatCurrency(item.amount) : '\u00A0'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Right: Deduction Column */}
              <div className="space-y-1 pl-2">
                {Array.from({ length: rowCount }).map((_, idx) => {
                  const item = deductionList[idx];
                  return (
                    <div key={idx} className="flex justify-between items-center leading-tight">
                      <span>{item ? item.label : '\u00A0'}</span>
                      <span className="tabular-nums font-medium">
                        {item ? formatCurrency(item.amount) : '\u00A0'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 8. SUBTOTAL ROW (รวมรายได้ / รวมรายการหัก) */}
            <div className="grid grid-cols-2 gap-4 text-[12px] py-1 border-t border-dashed border-[#002f99]/40">
              <div className="flex justify-between items-center font-bold">
                <span>รวมรายได้</span>
                <span className="border-b-[3px] border-double border-[#002f99] pb-0.5 tabular-nums text-[13px]">
                  {formatCurrency(totalIncome)}
                </span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span>รวมรายการหัก</span>
                <span className="border-b-[3px] border-double border-[#002f99] pb-0.5 tabular-nums text-[13px]">
                  {formatCurrency(totalDeduction)}
                </span>
              </div>
            </div>

            {/* 9. HORIZONTAL DIVIDER */}
            <div className="border-t-[1.5px] border-[#002f99] my-2"></div>

            {/* 10. CUMULATIVE SUMMARY (YTD) & NET PAY BLOCK */}
            <div className="grid grid-cols-12 text-[12px] py-1 items-center">
              {/* Column 1 & 2 (Provident / Tax) */}
              <div className="col-span-4 space-y-1.5 leading-tight">
                <div className="flex justify-between pr-4">
                  <span>กองทุนสำรองฯพนักงานจ่าย</span>
                  <span className="tabular-nums font-medium">{formatCurrency(slipData.providentFundCum)}</span>
                </div>
                <div className="flex justify-between pr-4">
                  <span>รวมยอดภาษี</span>
                  <span className="tabular-nums font-medium">{formatCurrency(slipData.taxCum)}</span>
                </div>
              </div>

              {/* Column 3 & 4 (YTD Income / Social Security) */}
              <div className="col-span-4 space-y-1.5 leading-tight border-l border-[#002f99]/20 pl-4">
                <div className="flex justify-between pr-4">
                  <span>รวมรายได้ทั้งหมด</span>
                  <span className="tabular-nums font-medium">{formatCurrency(slipData.ytdIncome)}</span>
                </div>
                <div className="flex justify-between pr-4">
                  <span>รวมประกันสังคม</span>
                  <span className="tabular-nums font-medium">{formatCurrency(slipData.ytdSocialSecurity)}</span>
                </div>
              </div>

              {/* Column 5: NET PAY (รายได้สุทธิ) */}
              <div className="col-span-4 text-right border-l border-[#002f99]/30 pl-4">
                <div className="text-[13px] font-bold text-[#002f99] mb-0.5">รายได้สุทธิ</div>
                <div className="inline-block border-b-[3px] border-double border-[#002f99] pb-0.5 text-[18px] font-bold tabular-nums text-[#002f99]">
                  {formatCurrency(netPay)}
                </div>
              </div>
            </div>

            {/* 11. HORIZONTAL DIVIDER */}
            <div className="border-t border-[#002f99] my-2"></div>

            {/* 12. BANK ACCOUNT ROW */}
            <div className="flex items-center text-[12px] py-0.5">
              <div className="w-[320px]">
                <span className="font-bold">หมายเลขบัญชี</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="tabular-nums font-semibold">{slipData.bankAccount}</span>
              </div>
              <div>
                <span className="font-bold">ชื่อธนาคาร</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="font-semibold">{slipData.bankName}</span>
              </div>
            </div>

            {/* 13. HORIZONTAL DIVIDER */}
            <div className="border-t-[1.5px] border-[#002f99] my-2"></div>

            {/* 14. FOOTER: CONFIDENTIALITY NOTICE & SIGNATURE */}
            <div className="flex justify-between items-end pt-2 text-[11px] leading-relaxed">
              {/* Left: Strict Privacy Statement & Employee Signature */}
              <div className="w-[360px]">
                <div className="text-[#f57c00] font-medium mb-3">
                  บริษัทฯ ถืออย่างเคร่งครัดว่าเรื่องรายรับเป็นเรื่องลับเฉพาะ ห้ามบอกกล่าวหรือเปิดเผยแก่ผู้อื่น
                </div>
                <div>
                  ลงชื่อผู้รับเงิน........................................................ วันที่ ...../...../.........
                </div>
                <div className="pl-16 pt-1 text-slate-700 font-semibold">
                  (&nbsp;&nbsp;&nbsp;&nbsp;{employee.fullName}&nbsp;&nbsp;&nbsp;&nbsp;)
                </div>
              </div>

              {/* Right: Company Seal & Authorized Payer Signature */}
              <div className="relative text-center w-[250px]">
                <img
                  src="/stamp.png"
                  alt="Company Seal"
                  className="absolute -top-7 left-3 w-24 h-auto opacity-85 pointer-events-none -rotate-6"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="h-10"></div>
                <div className="font-bold text-[#002f99]">
                  ( นายอานันทชัย ทวีวัฒน์ )
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  กรรมการผู้จัดการ / ผู้จ่ายเงิน
                </div>
              </div>
            </div>
          </div>
          {/* ==================== END SALARY SLIP ==================== */}
        </div>
      </div>
    </div>
  );
}
