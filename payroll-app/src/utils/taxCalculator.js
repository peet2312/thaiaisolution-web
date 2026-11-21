/**
 * Thai Tax & Social Security Calculator
 * อัตราภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได + ประกันสังคม
 */

// อัตราภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได (Progressive Tax Rate)
const TAX_BRACKETS = [
  { min: 0,        max: 150000,   rate: 0    },
  { min: 150001,   max: 300000,   rate: 0.05 },
  { min: 300001,   max: 500000,   rate: 0.10 },
  { min: 500001,   max: 750000,   rate: 0.15 },
  { min: 750001,   max: 1000000,  rate: 0.20 },
  { min: 1000001,  max: 2000000,  rate: 0.25 },
  { min: 2000001,  max: 5000000,  rate: 0.30 },
  { min: 5000001,  max: Infinity, rate: 0.35 },
];

const STANDARD_DEDUCTIONS = {
  personalExpense: 100000,
  personalAllowance: 60000,
};

const SOCIAL_SECURITY = {
  rate: 0.05,
  maxBase: 15000,
  maxPerMonth: 750,
  minBase: 1650,
};

/**
 * คำนวณประกันสังคมต่อเดือน
 */
export function calculateSocialSecurity(monthlySalary) {
  if (monthlySalary <= 0) return 0;
  const base = Math.min(Math.max(monthlySalary, SOCIAL_SECURITY.minBase), SOCIAL_SECURITY.maxBase);
  const amount = Math.round(base * SOCIAL_SECURITY.rate);
  return Math.min(amount, SOCIAL_SECURITY.maxPerMonth);
}

/**
 * คำนวณภาษีเงินได้ทั้งปีจากเงินได้สุทธิ
 */
export function calculateYearlyTax(netIncome) {
  if (netIncome <= 0) return 0;
  let tax = 0;
  let remaining = netIncome;

  for (const bracket of TAX_BRACKETS) {
    if (remaining <= 0) break;
    const bracketSize = bracket.max === Infinity ? remaining : bracket.max - bracket.min + 1;
    const taxableInBracket = Math.min(remaining, bracketSize);
    tax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
  }

  return Math.round(tax * 100) / 100;
}

/**
 * คำนวณภาษีหัก ณ ที่จ่ายต่อเดือน
 */
export function calculateMonthlyTax(monthlyIncome, monthlySocialSecurity = 0) {
  if (monthlyIncome <= 0) return 0;

  const yearlyIncome = monthlyIncome * 12;
  const personalExpense = Math.min(yearlyIncome * 0.5, STANDARD_DEDUCTIONS.personalExpense);
  const personalAllowance = STANDARD_DEDUCTIONS.personalAllowance;
  const yearlySocialSecurity = monthlySocialSecurity * 12;
  const netIncome = yearlyIncome - personalExpense - personalAllowance - yearlySocialSecurity;
  const yearlyTax = calculateYearlyTax(netIncome);
  const monthlyTax = Math.round((yearlyTax / 12) * 100) / 100;

  return monthlyTax;
}

/**
 * คำนวณ Payroll สำหรับพนักงาน 1 คน ในรอบเดือน
 */
export function calculatePayroll({
  baseSalary = 0,
  positionAllowance = 0,
  phoneAllowance = 0,
  incentive = 0,
  bonus = 0,
  ot1Pay = 0,
  ot15Pay = 0,
  ot3Pay = 0,
  otPay = 0,
  allowance = 0,
  commission = 0,
  otherIncome = 0,
  providentFund = 0,
  absenceDeduction = 0,
  otherDeduction = 0,
}) {
  const totalOt = (ot1Pay || 0) + (ot15Pay || 0) + (ot3Pay || 0) + (otPay || 0);
  const totalIncome =
    (baseSalary || 0) +
    (positionAllowance || 0) +
    (phoneAllowance || 0) +
    (incentive || 0) +
    (bonus || 0) +
    totalOt +
    (allowance || 0) +
    (commission || 0) +
    (otherIncome || 0);

  const socialSecurity = calculateSocialSecurity(baseSalary);
  const tax = calculateMonthlyTax(totalIncome, socialSecurity);
  const totalDeduction =
    socialSecurity +
    tax +
    (providentFund || 0) +
    (absenceDeduction || 0) +
    (otherDeduction || 0);

  const netPay = Math.round((totalIncome - totalDeduction) * 100) / 100;

  return {
    totalIncome: Math.round(totalIncome * 100) / 100,
    socialSecurity,
    tax,
    totalDeduction: Math.round(totalDeduction * 100) / 100,
    netPay,
  };
}

/**
 * Format ตัวเลขเงินเป็นรูปแบบไทย
 */
export function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '0.00';
  return amount.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export { TAX_BRACKETS, STANDARD_DEDUCTIONS, SOCIAL_SECURITY };
