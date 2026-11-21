/**
 * Payroll Storage & Data Service for Thai AI Solution Co., Ltd.
 * จัดการข้อมูลพนักงานและ Payroll Records ใน localStorage
 */

const EMPLOYEES_KEY = 'thai_ai_payroll_employees';
const PAYROLLS_KEY = 'thai_ai_payroll_records';

// ข้อมูลพนักงานเริ่มต้น
const initialSampleEmployees = [
  {
    id: 'EMP-001',
    fullName: 'นายภาณุพงศ์ ชลเจริญ',
    position: 'Senior Full-Stack Developer',
    department: 'Engineering',
    startDate: '2026-08-26',
    baseSalary: 45000,
    bankName: 'ธนาคารกรุงไทย',
    bankAccount: '984-0-86067-4',
    socialSecurityId: '1-9001-01231-85-7',
    taxId: '1-9001-01231-85-7',
    isActive: true,
  },
  {
    id: 'EMP-002',
    fullName: 'นางสาวสมหญิง ใจดี',
    position: 'UI/UX Designer',
    department: 'Design',
    startDate: '2025-03-01',
    baseSalary: 35000,
    bankName: 'ธนาคารไทยพาณิชย์',
    bankAccount: '405-2-67890-1',
    socialSecurityId: '9876543210987',
    taxId: '1-9876-54321-09-8',
    isActive: true,
  },
  {
    id: 'EMP-003',
    fullName: 'นายวิชัย เก่งกาจ',
    position: 'AI Engineer',
    department: 'Engineering',
    startDate: '2025-06-15',
    baseSalary: 55000,
    bankName: 'ธนาคารกรุงเทพ',
    bankAccount: '123-4-56789-0',
    socialSecurityId: '5678901234567',
    taxId: '1-5678-90123-45-6',
    isActive: true,
  },
  {
    id: 'EMP-004',
    fullName: 'นางสาวพิมพ์ใจ รักงาน',
    position: 'Marketing Manager',
    department: 'Marketing',
    startDate: '2025-02-01',
    baseSalary: 40000,
    bankName: 'ธนาคารกรุงไทย',
    bankAccount: '987-6-54321-0',
    socialSecurityId: '1357924680135',
    taxId: '1-1357-92468-01-3',
    isActive: true,
  },
];

// ==================== EMPLOYEE CRUD ====================

export function getEmployees() {
  try {
    const data = localStorage.getItem(EMPLOYEES_KEY);
    if (!data) {
      localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(initialSampleEmployees));
      return initialSampleEmployees;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading employees:', err);
    return initialSampleEmployees;
  }
}

export function getActiveEmployees() {
  return getEmployees().filter(e => e.isActive !== false);
}

export function getEmployeeById(id) {
  return getEmployees().find(e => e.id === id) || null;
}

export function saveEmployee(employee) {
  try {
    const current = getEmployees();
    const isNew = !employee.id || !current.find(e => e.id === employee.id);

    const record = {
      ...employee,
      id: employee.id || generateEmployeeId(current),
      isActive: employee.isActive !== undefined ? employee.isActive : true,
      createdAt: employee.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let updated;
    if (isNew) {
      updated = [...current, record];
    } else {
      updated = current.map(e => (e.id === record.id ? record : e));
    }

    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(updated));
    return record;
  } catch (err) {
    console.error('Error saving employee:', err);
    return employee;
  }
}

export function deleteEmployee(id) {
  try {
    const current = getEmployees();
    const updated = current.map(e =>
      e.id === id ? { ...e, isActive: false, updatedAt: new Date().toISOString() } : e
    );
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Error deleting employee:', err);
    return false;
  }
}

function generateEmployeeId(employees) {
  const maxNum = employees.reduce((max, e) => {
    const match = e.id.match(/EMP-(\d+)/);
    return match ? Math.max(max, parseInt(match[1])) : max;
  }, 0);
  return `EMP-${String(maxNum + 1).padStart(3, '0')}`;
}

// ==================== PAYROLL CRUD ====================

export function getPayrolls() {
  try {
    const data = localStorage.getItem(PAYROLLS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading payrolls:', err);
    return [];
  }
}

export function getPayrollsByMonth(month, year) {
  return getPayrolls().filter(p => p.month === month && p.year === year);
}

export function savePayroll(payroll) {
  try {
    const current = getPayrolls();
    const record = {
      ...payroll,
      id: payroll.id || generatePayrollId(payroll.month, payroll.year, current),
      createdAt: payroll.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: payroll.status || 'draft',
    };

    const existingIdx = current.findIndex(
      p => p.employeeId === record.employeeId && p.month === record.month && p.year === record.year
    );

    let updated;
    if (existingIdx >= 0) {
      updated = [...current];
      updated[existingIdx] = { ...current[existingIdx], ...record };
    } else {
      updated = [...current, record];
    }

    localStorage.setItem(PAYROLLS_KEY, JSON.stringify(updated));
    return record;
  } catch (err) {
    console.error('Error saving payroll:', err);
    return payroll;
  }
}

export function savePayrollBatch(payrolls) {
  try {
    const current = getPayrolls();
    let updated = [...current];

    for (const payroll of payrolls) {
      const record = {
        ...payroll,
        id: payroll.id || generatePayrollId(payroll.month, payroll.year, updated),
        createdAt: payroll.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: payroll.status || 'draft',
      };

      const existingIdx = updated.findIndex(
        p => p.employeeId === record.employeeId && p.month === record.month && p.year === record.year
      );

      if (existingIdx >= 0) {
        updated[existingIdx] = { ...updated[existingIdx], ...record };
      } else {
        updated.push(record);
      }
    }

    localStorage.setItem(PAYROLLS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving payroll batch:', err);
    return [];
  }
}

export function deletePayroll(id) {
  try {
    const current = getPayrolls();
    const updated = current.filter(p => p.id !== id);
    localStorage.setItem(PAYROLLS_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Error deleting payroll:', err);
    return false;
  }
}

function generatePayrollId(month, year, existingPayrolls) {
  const prefix = `PAY-${year}${String(month).padStart(2, '0')}`;
  const sameMonth = existingPayrolls.filter(p => p.id && p.id.startsWith(prefix));
  const nextNum = sameMonth.length + 1;
  return `${prefix}-${String(nextNum).padStart(3, '0')}`;
}

// ==================== EXPORT CSV ====================

export function exportPayrollCSV(month, year) {
  const payrolls = getPayrollsByMonth(month, year);
  const employees = getEmployees();

  if (!payrolls || payrolls.length === 0) {
    alert('ไม่มีข้อมูล Payroll ในเดือนที่เลือก');
    return;
  }

  const headers = [
    'รหัส Payroll', 'รหัสพนักงาน', 'ชื่อ-นามสกุล', 'ตำแหน่ง', 'แผนก',
    'เงินเดือนฐาน', 'ค่าล่วงเวลา', 'โบนัส', 'เบี้ยเลี้ยง', 'ค่าคอมมิชชั่น', 'รายได้อื่น',
    'รวมรายได้', 'ประกันสังคม', 'ภาษีหัก ณ ที่จ่าย', 'หักขาดงาน', 'หักอื่นๆ',
    'รวมรายหัก', 'เงินสุทธิ', 'สถานะ',
  ];

  const statusMap = { draft: 'ร่าง', approved: 'อนุมัติ', paid: 'จ่ายแล้ว' };

  const rows = payrolls.map(p => {
    const emp = employees.find(e => e.id === p.employeeId) || {};
    return [
      `"${p.id}"`, `"${p.employeeId}"`, `"${emp.fullName || ''}"`,
      `"${emp.position || ''}"`, `"${emp.department || ''}"`,
      p.baseSalary || 0, p.otPay || 0, p.bonus || 0, p.allowance || 0,
      p.commission || 0, p.otherIncome || 0, p.totalIncome || 0,
      p.socialSecurity || 0, p.tax || 0, p.absenceDeduction || 0,
      p.otherDeduction || 0, p.totalDeduction || 0, p.netPay || 0,
      `"${statusMap[p.status] || p.status}"`,
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Payroll_${THAI_MONTHS[month]}_${year + 543}_ThaiAISolution.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ==================== CONSTANTS ====================

export const THAI_MONTHS = [
  '', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
];

export const BANK_LIST = [
  'ธนาคารกสิกรไทย', 'ธนาคารไทยพาณิชย์', 'ธนาคารกรุงเทพ', 'ธนาคารกรุงไทย',
  'ธนาคารกรุงศรีอยุธยา', 'ธนาคารทหารไทยธนชาต', 'ธนาคารออมสิน',
  'ธนาคารเกียรตินาคินภัทร', 'ธนาคารซีไอเอ็มบีไทย', 'ธนาคารแลนด์ แอนด์ เฮ้าส์', 'อื่นๆ',
];
