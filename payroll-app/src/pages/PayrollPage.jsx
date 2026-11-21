import React, { useState, useEffect, useMemo } from 'react';
import {
  Users, Calculator, FileText, Pencil, Trash2, Search, Save,
  Download, Building2, Banknote, Eye,
  UserPlus, RefreshCw, CheckCircle2, X, CreditCard,
  TrendingUp, TrendingDown, DollarSign, ClipboardList, Award
} from 'lucide-react';
import {
  getActiveEmployees, getEmployees, saveEmployee, deleteEmployee,
  getPayrollsByMonth, savePayrollBatch, exportPayrollCSV,
  THAI_MONTHS, BANK_LIST
} from '../services/payrollStorage';
import { calculatePayroll, formatCurrency } from '../utils/taxCalculator';
import SalarySlipModal from '../components/SalarySlipModal';
import CertificateModal from '../components/CertificateModal';

// ==================== MAIN COMPONENT ====================

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState('employees');
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const tabs = [
    { id: 'employees', label: 'จัดการพนักงาน', icon: Users },
    { id: 'calculate', label: 'คำนวณเงินเดือน', icon: Calculator },
    { id: 'slips', label: 'ออกสลิปเงินเดือน', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-brand-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Banknote className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 font-heading">
                ระบบ Payroll & สลิปเงินเดือน
              </h1>
              <p className="text-xs text-slate-400">บริษัท ไทยเอไอโซลูชั่น จำกัด — Thai AI Solution Co., Ltd.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1.5 shadow-sm border border-slate-200 mb-6 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'employees' && <EmployeeTab />}
        {activeTab === 'calculate' && (
          <CalculateTab
            selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear} setSelectedYear={setSelectedYear}
          />
        )}
        {activeTab === 'slips' && (
          <SlipsTab
            selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear} setSelectedYear={setSelectedYear}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear() + 543} บริษัท ไทยเอไอโซลูชั่น จำกัด — Payroll System v1.0
      </footer>
    </div>
  );
}

// ==================== MONTH/YEAR SELECTOR ====================

function MonthYearSelector({ month, setMonth, year, setYear }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-500 font-medium">เดือน:</label>
        <select
          value={month}
          onChange={e => setMonth(parseInt(e.target.value))}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
        >
          {THAI_MONTHS.slice(1).map((name, idx) => (
            <option key={idx + 1} value={idx + 1}>{name}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-500 font-medium">ปี:</label>
        <select
          value={year}
          onChange={e => setYear(parseInt(e.target.value))}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
        >
          {years.map(y => (
            <option key={y} value={y}>{y + 543} ({y})</option>
          ))}
        </select>
      </div>
    </div>
  );
}

// ==================== TAB 1: EMPLOYEE MANAGEMENT ====================

function EmployeeTab() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [certEmployee, setCertEmployee] = useState(null);

  useEffect(() => {
    setEmployees(getActiveEmployees());
  }, []);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return employees;
    const q = searchTerm.toLowerCase();
    return employees.filter(e =>
      e.fullName?.toLowerCase().includes(q) ||
      e.department?.toLowerCase().includes(q) ||
      e.position?.toLowerCase().includes(q) ||
      e.id?.toLowerCase().includes(q)
    );
  }, [employees, searchTerm]);

  const handleSave = (emp) => {
    saveEmployee(emp);
    setEmployees(getActiveEmployees());
    setShowModal(false);
    setEditingEmployee(null);
  };

  const handleDelete = (id) => {
    if (!confirm('คุณต้องการลบพนักงานนี้ใช่หรือไม่?')) return;
    deleteEmployee(id);
    setEmployees(getActiveEmployees());
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setShowModal(true);
  };

  return (
    <div>
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาพนักงาน (ชื่อ, แผนก, ตำแหน่ง)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>
        <button
          onClick={() => { setEditingEmployee(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl shadow-md transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          เพิ่มพนักงาน
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <SummaryCard label="พนักงานทั้งหมด" value={employees.length} />
        <SummaryCard label="แผนกทั้งหมด" value={new Set(employees.map(e => e.department)).size} />
        <SummaryCard
          label="เงินเดือนฐานเฉลี่ย"
          value={employees.length > 0 ? formatCurrency(employees.reduce((s, e) => s + (e.baseSalary || 0), 0) / employees.length) : '0.00'}
          color="emerald"
        />
        <SummaryCard
          label="ฐานเงินเดือนรวม"
          value={formatCurrency(employees.reduce((s, e) => s + (e.baseSalary || 0), 0))}
          color="brand"
        />
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-600">รหัส</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">ชื่อ-นามสกุล</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">ตำแหน่ง</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden sm:table-cell">แผนก</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600">เงินเดือนฐาน</th>
                <th className="text-center px-4 py-3 font-semibold text-slate-600">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>ไม่พบข้อมูลพนักงาน</p>
                  </td>
                </tr>
              ) : (
                filtered.map(emp => (
                  <tr key={emp.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-brand-600 font-semibold">{emp.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{emp.fullName}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{emp.position}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="px-2 py-0.5 bg-brand-50 text-brand-700 rounded-full text-xs font-medium">
                        {emp.department}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-800 tabular-nums">
                      {formatCurrency(emp.baseSalary)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setCertEmployee(emp)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="ออกหนังสือรับรองการทำงาน">
                          <Award className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEdit(emp)} className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="แก้ไข">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(emp.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="ลบ">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <EmployeeFormModal
          employee={editingEmployee}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingEmployee(null); }}
        />
      )}

      {certEmployee && (
        <CertificateModal
          employee={certEmployee}
          onClose={() => setCertEmployee(null)}
        />
      )}
    </div>
  );
}

// ==================== SUMMARY CARD ====================

function SummaryCard({ label, value, color = 'slate' }) {
  const colorClass = color === 'emerald' ? 'text-emerald-600' : color === 'brand' ? 'text-brand-600' : 'text-slate-800';
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${colorClass} tabular-nums`}>{value}</p>
    </div>
  );
}

// ==================== EMPLOYEE FORM MODAL ====================

function EmployeeFormModal({ employee, onSave, onClose }) {
  const [form, setForm] = useState({
    id: '', fullName: '', position: '', department: '', startDate: '',
    bankName: '', bankAccount: '', socialSecurityId: '', taxId: '',
    ...employee,
    baseSalary: employee?.baseSalary ?? '',
  });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.baseSalary) {
      alert('กรุณากรอกชื่อ-นามสกุลและเงินเดือนฐาน');
      return;
    }
    onSave({ ...form, baseSalary: parseFloat(form.baseSalary) || 0 });
  };

  const fields = [
    { key: 'fullName', label: 'ชื่อ-นามสกุล *', type: 'text', placeholder: 'นายภาณุพงศ์ ทดสอบ', required: true },
    { key: 'position', label: 'ตำแหน่ง', type: 'text', placeholder: 'Senior Developer' },
    { key: 'department', label: 'แผนก', type: 'text', placeholder: 'Engineering' },
    { key: 'startDate', label: 'วันเริ่มงาน', type: 'date' },
    { key: 'baseSalary', label: 'เงินเดือนฐาน (บาท) *', type: 'number', placeholder: '35000', required: true },
    { key: 'bankName', label: 'ธนาคาร', type: 'select', options: BANK_LIST },
    { key: 'bankAccount', label: 'เลขบัญชีธนาคาร', type: 'text', placeholder: '068-8-12345-6' },
    { key: 'taxId', label: 'เลขประจำตัวผู้เสียภาษี', type: 'text', placeholder: '1-1234-56789-01-2' },
    { key: 'socialSecurityId', label: 'เลขประกันสังคม', type: 'text', placeholder: '1234567890123' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h3 className="text-lg font-bold text-slate-800">
            {employee ? 'แก้ไขข้อมูลพนักงาน' : 'เพิ่มพนักงานใหม่'}
          </h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
              {f.type === 'select' ? (
                <select
                  value={form[f.key] || ''}
                  onChange={e => handleChange(f.key, e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                >
                  <option value="">-- เลือก --</option>
                  {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input
                  type={f.type}
                  value={form[f.key] || ''}
                  onChange={e => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  required={f.required}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                />
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
              ยกเลิก
            </button>
            <button type="submit"
              className="flex-1 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium shadow-md transition-colors">
              <Save className="w-4 h-4 inline mr-1" />
              {employee ? 'บันทึกการแก้ไข' : 'เพิ่มพนักงาน'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==================== TAB 2: PAYROLL CALCULATION ====================

function CalculateTab({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }) {
  const [employees, setEmployees] = useState([]);
  const [payrollData, setPayrollData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const emps = getActiveEmployees();
    setEmployees(emps);
    const existingPayrolls = getPayrollsByMonth(selectedMonth, selectedYear);
    const dataMap = {};
    emps.forEach(emp => {
      const existing = existingPayrolls.find(p => p.employeeId === emp.id);
      dataMap[emp.id] = {
        baseSalary: existing?.baseSalary ?? emp.baseSalary ?? 0,
        otPay: existing?.otPay ?? 0,
        bonus: existing?.bonus ?? 0,
        allowance: existing?.allowance ?? 0,
        commission: existing?.commission ?? 0,
        otherIncome: existing?.otherIncome ?? 0,
        absenceDeduction: existing?.absenceDeduction ?? 0,
        otherDeduction: existing?.otherDeduction ?? 0,
      };
    });
    setPayrollData(dataMap);
  }, [selectedMonth, selectedYear]);

  const handleFieldChange = (empId, field, value) => {
    setPayrollData(prev => ({
      ...prev,
      [empId]: { ...prev[empId], [field]: parseFloat(value) || 0 },
    }));
    setSaveSuccess(false);
  };

  const results = useMemo(() => {
    const res = {};
    employees.forEach(emp => {
      const data = payrollData[emp.id];
      if (data) res[emp.id] = calculatePayroll(data);
    });
    return res;
  }, [employees, payrollData]);

  const totals = useMemo(() => {
    let totalIncome = 0, totalDeduction = 0, totalNet = 0;
    Object.values(results).forEach(r => {
      totalIncome += r.totalIncome;
      totalDeduction += r.totalDeduction;
      totalNet += r.netPay;
    });
    return { totalIncome, totalDeduction, totalNet };
  }, [results]);

  const handleSaveAll = () => {
    setIsSaving(true);
    const payrolls = employees.map(emp => {
      const data = payrollData[emp.id] || {};
      const calc = results[emp.id] || {};
      return { employeeId: emp.id, month: selectedMonth, year: selectedYear, ...data, ...calc, status: 'draft' };
    });
    savePayrollBatch(payrolls);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExport = () => exportPayrollCSV(selectedMonth, selectedYear);

  const inputFields = [
    { key: 'otPay', label: 'OT' },
    { key: 'bonus', label: 'โบนัส' },
    { key: 'allowance', label: 'เบี้ยเลี้ยง' },
    { key: 'commission', label: 'คอม.' },
    { key: 'otherIncome', label: 'อื่นๆ+' },
    { key: 'absenceDeduction', label: 'หักขาด' },
    { key: 'otherDeduction', label: 'หักอื่นๆ' },
  ];

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <MonthYearSelector month={selectedMonth} setMonth={setSelectedMonth} year={selectedYear} setYear={setSelectedYear} />
        <div className="flex items-center gap-2">
          <button onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={handleSaveAll} disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl shadow-md transition-colors disabled:opacity-50">
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saveSuccess ? 'บันทึกแล้ว!' : 'บันทึกทั้งหมด'}
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <DashboardCard icon={TrendingUp} iconBg="bg-emerald-100" iconColor="text-emerald-600" label="รวมรายได้ทั้งเดือน" value={formatCurrency(totals.totalIncome)} valueColor="text-emerald-600" />
        <DashboardCard icon={TrendingDown} iconBg="bg-red-100" iconColor="text-red-600" label="รวมรายหักทั้งเดือน" value={formatCurrency(totals.totalDeduction)} valueColor="text-red-600" />
        <DashboardCard icon={DollarSign} iconBg="bg-brand-100" iconColor="text-brand-600" label="เงินสุทธิจ่ายทั้งเดือน" value={formatCurrency(totals.totalNet)} valueColor="text-brand-600" />
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-3 py-3 font-semibold text-slate-600 sticky left-0 bg-slate-50 z-10 min-w-[140px]">พนักงาน</th>
                <th className="text-right px-3 py-3 font-semibold text-slate-600 min-w-[90px]">เงินเดือน</th>
                {inputFields.map(f => (
                  <th key={f.key} className="text-center px-2 py-3 font-semibold text-slate-600 min-w-[80px]">{f.label}</th>
                ))}
                <th className="text-right px-3 py-3 font-semibold text-emerald-600 min-w-[80px]">ปกส.</th>
                <th className="text-right px-3 py-3 font-semibold text-orange-600 min-w-[80px]">ภาษี</th>
                <th className="text-right px-3 py-3 font-semibold text-brand-600 min-w-[100px] bg-brand-50">สุทธิ</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-12 text-slate-400">
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>ยังไม่มีข้อมูลพนักงาน</p>
                  </td>
                </tr>
              ) : (
                employees.map(emp => {
                  const data = payrollData[emp.id] || {};
                  const result = results[emp.id] || {};
                  return (
                    <tr key={emp.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-3 py-2.5 sticky left-0 bg-white z-10 border-r border-slate-100">
                        <p className="font-medium text-slate-800 text-xs">{emp.fullName}</p>
                        <p className="text-[10px] text-slate-400">{emp.id} · {emp.department}</p>
                      </td>
                      <td className="px-3 py-2.5 text-right font-semibold text-slate-700 tabular-nums">
                        {formatCurrency(data.baseSalary || 0)}
                      </td>
                      {inputFields.map(f => (
                        <td key={f.key} className="px-1 py-1.5">
                          <input
                            type="number" min="0"
                            value={data[f.key] || ''}
                            onChange={e => handleFieldChange(emp.id, f.key, e.target.value)}
                            placeholder="0"
                            className="w-full px-2 py-1.5 text-right text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none tabular-nums bg-slate-50 focus:bg-white"
                          />
                        </td>
                      ))}
                      <td className="px-3 py-2.5 text-right text-xs text-emerald-600 tabular-nums font-medium">
                        {formatCurrency(result.socialSecurity || 0)}
                      </td>
                      <td className="px-3 py-2.5 text-right text-xs text-orange-600 tabular-nums font-medium">
                        {formatCurrency(result.tax || 0)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-bold text-brand-700 tabular-nums bg-brand-50/50">
                        {formatCurrency(result.netPay || 0)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {saveSuccess && (
        <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm">
          <CheckCircle2 className="w-4 h-4" />
          บันทึก Payroll เดือน {THAI_MONTHS[selectedMonth]} {selectedYear + 543} สำเร็จแล้ว!
        </div>
      )}
    </div>
  );
}

// ==================== DASHBOARD CARD ====================

function DashboardCard({ icon: Icon, iconBg, iconColor, label, value, valueColor }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div>
          <p className="text-xs text-slate-400">{label}</p>
          <p className={`text-xl font-bold ${valueColor} tabular-nums`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

// ==================== TAB 3: SALARY SLIPS ====================

function SlipsTab({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }) {
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [certEmployee, setCertEmployee] = useState(null);

  useEffect(() => {
    setEmployees(getActiveEmployees());
    setPayrolls(getPayrollsByMonth(selectedMonth, selectedYear));
  }, [selectedMonth, selectedYear]);

  const payrollsWithEmployee = useMemo(() => {
    return payrolls.map(p => {
      const emp = employees.find(e => e.id === p.employeeId);
      return { payroll: p, employee: emp };
    }).filter(item => item.employee);
  }, [payrolls, employees]);

  const handleViewSlip = (payroll, employee) => {
    setSelectedSlip(payroll);
    setSelectedEmployee(employee);
  };

  const handleCloseSlip = () => {
    setSelectedSlip(null);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <MonthYearSelector month={selectedMonth} setMonth={setSelectedMonth} year={selectedYear} setYear={setSelectedYear} />
      </div>

      {payrollsWithEmployee.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
          <ClipboardList className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">ยังไม่มีข้อมูล Payroll</h3>
          <p className="text-sm text-slate-400">
            กรุณาคำนวณเงินเดือนในแท็บ "คำนวณเงินเดือน" ก่อน เพื่อสร้างข้อมูลสำหรับออกสลิป
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {payrollsWithEmployee.map(({ payroll, employee }) => (
            <div
              key={payroll.id || payroll.employeeId}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md hover:border-brand-300 transition-all cursor-pointer group"
              onClick={() => handleViewSlip(payroll, employee)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-brand-700">
                      {employee.fullName?.charAt(0) || '?'}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{employee.fullName}</p>
                    <p className="text-xs text-slate-400">{employee.id} · {employee.department}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                  payroll.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                  payroll.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {payroll.status === 'paid' ? 'จ่ายแล้ว' : payroll.status === 'approved' ? 'อนุมัติ' : 'ร่าง'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                <div className="bg-emerald-50 rounded-lg p-2 text-center">
                  <p className="text-emerald-400 mb-0.5">รายได้</p>
                  <p className="font-semibold text-emerald-700 tabular-nums">{formatCurrency(payroll.totalIncome || 0)}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-2 text-center">
                  <p className="text-red-400 mb-0.5">รายหัก</p>
                  <p className="font-semibold text-red-700 tabular-nums">{formatCurrency(payroll.totalDeduction || 0)}</p>
                </div>
                <div className="bg-brand-50 rounded-lg p-2 text-center">
                  <p className="text-brand-400 mb-0.5">สุทธิ</p>
                  <p className="font-bold text-brand-700 tabular-nums">{formatCurrency(payroll.netPay || 0)}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleViewSlip(payroll, employee); }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 group-hover:bg-brand-50 text-slate-600 group-hover:text-brand-600 rounded-xl text-xs font-medium transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> สลิปเงินเดือน
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setCertEmployee(employee); }}
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-medium transition-colors"
                  title="ออกหนังสือรับรองการทำงาน"
                >
                  <Award className="w-3.5 h-3.5" /> หนังสือรับรอง
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSlip && selectedEmployee && (
        <SalarySlipModal payroll={selectedSlip} employee={selectedEmployee} onClose={handleCloseSlip} />
      )}

      {certEmployee && (
        <CertificateModal employee={certEmployee} onClose={() => setCertEmployee(null)} />
      )}
    </div>
  );
}
