import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, FileText, Search, Download, Trash2, Edit, CheckCircle2, 
  Clock, AlertCircle, Phone, Mail, User, Building2, Eye, Printer, 
  RefreshCw, Plus, Filter, MessageSquare, ChevronRight, TrendingUp, DollarSign 
} from 'lucide-react';
import { 
  getQuotations, updateQuotationStatus, deleteQuotation, exportQuotationsToCSV, saveQuotation 
} from '../services/quotationStorage';
import QuotationDocumentModal from '../components/QuotationDocumentModal';

export default function AdminQuotationsPage({ t, setPage }) {
  const [quotations, setQuotations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  const loadData = () => {
    const data = getQuotations();
    setQuotations(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    updateQuotationStatus(id, newStatus);
    loadData();
  };

  const handleSaveNotes = (id) => {
    updateQuotationStatus(id, null, tempNotes);
    setEditingNotesId(null);
    loadData();
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm(`ยืนยันการลบใบเสนอราคา ${id} ออกจากระบบ?`)) {
      deleteQuotation(id);
      loadData();
    }
  };

  const handleViewQuotation = (item) => {
    setSelectedQuotation(item);
    setIsModalOpen(true);
  };

  // Filtered list
  const filteredQuotations = quotations.filter((item) => {
    const matchesSearch = 
      (item.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.serviceName || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalCount = quotations.length;
  const pendingCount = quotations.filter(q => q.status === 'pending').length;
  const contactedCount = quotations.filter(q => q.status === 'contacted').length;
  const approvedCount = quotations.filter(q => q.status === 'approved').length;
  const totalPipelineValue = quotations.reduce((sum, q) => sum + (q.grandTotal || 0), 0);

  const statusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
            <Clock className="w-3 h-3" /> รอดำเนินการ
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
            <Phone className="w-3 h-3" /> ติดต่อแล้ว
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
            <CheckCircle2 className="w-3 h-3" /> อนุมัติแล้ว
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
            <AlertCircle className="w-3 h-3" /> ยกเลิก
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>ระบบหลังบ้าน • แดชบอร์ดจัดการใบเสนอราคา (Admin Portal)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            รายการใบเสนอราคาทั้งหมด
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            บันทึกข้อมูลใบเสนอราคาจากลูกค้าแบบเรียลไทม์ พร้อมเปิดดู พิมพ์ และส่งออกรายงาน
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => exportQuotationsToCSV()}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>ส่งออก Excel / CSV</span>
          </button>

          <button
            onClick={loadData}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm active:scale-95 transition-all"
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Quotes */}
        <div className="sge-card p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>ใบเสนอราคาทั้งหมด</span>
            <FileText className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            {totalCount} <span className="text-xs font-normal text-slate-500">ฉบับ</span>
          </div>
          <div className="text-[11px] text-slate-500">
            บันทึกในระบบทั้งหมด
          </div>
        </div>

        {/* Total Value */}
        <div className="sge-card p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>มูลค่ารวม (Pipeline Value)</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
            ฿{totalPipelineValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500">
            ยอดรวมทุกใบเสนอราคา
          </div>
        </div>

        {/* Pending */}
        <div className="sge-card p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>รอดำเนินการ (Pending)</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">
            {pendingCount} <span className="text-xs font-normal text-slate-500">ฉบับ</span>
          </div>
          <div className="text-[11px] text-slate-500">
            รอทีมงานติดต่อกลับ
          </div>
        </div>

        {/* Approved */}
        <div className="sge-card p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>อนุมัติแล้ว (Approved)</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 font-mono">
            {approvedCount} <span className="text-xs font-normal text-slate-500">ฉบับ</span>
          </div>
          <div className="text-[11px] text-slate-500">
            ลูกค้าตกลงว่าจ้าง
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="sge-card p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาเลขที่, ชื่อลูกค้า, บริษัท, เบอร์โทร..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: `ทั้งหมด (${totalCount})` },
            { id: 'pending', label: `รอดำเนินการ (${pendingCount})` },
            { id: 'contacted', label: `ติดต่อแล้ว (${contactedCount})` },
            { id: 'approved', label: `อนุมัติแล้ว (${approvedCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quotations Data Table */}
      <div className="sge-card rounded-3xl bg-white border border-slate-200 shadow-lg overflow-hidden">
        {filteredQuotations.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">ไม่พบข้อมูลใบเสนอราคา</h3>
            <p className="text-xs text-slate-500">
              เมื่อลูกค้าหรือผู้ใช้สร้างใบเสนอราคาจากหน้าเว็บ ข้อมูลจะถูกบันทึกมาแสดงที่นี่โดยอัตโนมัติ
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">เลขที่เอกสาร / วันที่</th>
                  <th className="py-3 px-4">ลูกค้า & บริษัท</th>
                  <th className="py-3 px-4">บริการที่ขอ</th>
                  <th className="py-3 px-4 text-right">ยอดรวมสุทธิ (VAT 7%)</th>
                  <th className="py-3 px-4 text-center">สถานะ</th>
                  <th className="py-3 px-4 text-center">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQuotations.map((item) => (
                  <tr 
                    key={item.id}
                    onClick={() => handleViewQuotation(item)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                  >
                    {/* ID & Date */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-mono font-black text-brand-800 text-xs sm:text-sm">
                        {item.id}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('th-TH') : '-'}
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.customerName}</span>
                      </div>
                      {item.companyName && (
                        <div className="text-[11px] text-slate-600 flex items-center gap-1.5 pt-0.5">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{item.companyName}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 pt-1 text-[11px]">
                        {item.phone && (
                          <a 
                            href={`tel:${item.phone}`} 
                            onClick={(e) => e.stopPropagation()} 
                            className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{item.phone}</span>
                          </a>
                        )}
                        {item.email && (
                          <a 
                            href={`mailto:${item.email}`} 
                            onClick={(e) => e.stopPropagation()} 
                            className="text-slate-500 hover:text-brand-600 truncate max-w-[150px]"
                          >
                            {item.email}
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-bold text-slate-800 text-xs max-w-xs truncate">
                        {item.serviceName}
                      </div>
                      <div className="text-[11px] text-slate-500 pt-0.5">
                        {item.scaleLabel} • {item.weeks || 4} สัปดาห์
                      </div>
                      {item.items && item.items.length > 1 && (
                        <div className="text-[10px] text-brand-700 font-bold pt-0.5">
                          + {item.items.length - 1} ออปชันเสริม
                        </div>
                      )}
                    </td>

                    {/* Grand Total */}
                    <td className="py-3.5 px-4 text-right align-top">
                      <div className="font-mono font-black text-brand-700 text-xs sm:text-sm">
                        ฿{(item.grandTotal || 0).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ก่อน VAT: ฿{(item.subtotal || 0).toLocaleString()}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4 text-center align-top" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-block">
                        <select
                          value={item.status || 'pending'}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        >
                          <option value="pending">⏳ รอดำเนินการ</option>
                          <option value="contacted">📞 ติดต่อแล้ว</option>
                          <option value="approved">✅ อนุมัติแล้ว</option>
                          <option value="cancelled">❌ ยกเลิก</option>
                        </select>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center align-top" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleViewQuotation(item)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          title="เปิดดู / พิมพ์ใบเสนอราคา"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                          title="ลบใบเสนอราคา"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Official Quotation Modal Viewer */}
      <QuotationDocumentModal
        quotation={selectedQuotation}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}
