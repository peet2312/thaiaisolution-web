/**
 * Utility to convert numeric amount into Thai Baht text format
 * Example: 128400 -> "หนึ่งแสนสองหมื่นแปดพันสี่ร้อยบาทถ้วน"
 */
export function thaiBahtText(num) {
  if (num === null || num === undefined || isNaN(num)) return 'ศูนย์บาทถ้วน';

  const numbers = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
  const units = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];

  // Handle negative numbers
  let isNegative = false;
  if (num < 0) {
    isNegative = true;
    num = Math.abs(num);
  }

  // Split integer and decimal parts
  const formatted = num.toFixed(2);
  const [intStr, decStr] = formatted.split('.');

  function convertChunk(str) {
    let result = '';
    const len = str.length;
    for (let i = 0; i < len; i++) {
      const digit = parseInt(str[i], 10);
      const pos = len - i - 1;

      if (digit !== 0) {
        if (pos === 0 && digit === 1 && len > 1) {
          result += 'เอ็ด';
        } else if (pos === 1 && digit === 2) {
          result += 'ยี่';
        } else if (pos === 1 && digit === 1) {
          // don't add "หนึ่ง" before "สิบ"
        } else {
          result += numbers[digit];
        }
        result += units[pos];
      }
    }
    return result;
  }

  function convertInteger(str) {
    if (parseInt(str, 10) === 0) return 'ศูนย์';
    let result = '';
    let len = str.length;

    // Handle millions recursion
    if (len > 6) {
      const millionPart = str.slice(0, len - 6);
      const remainPart = str.slice(len - 6);
      result += convertInteger(millionPart) + 'ล้าน' + convertChunk(remainPart);
    } else {
      result += convertChunk(str);
    }
    return result;
  }

  let text = '';
  const intVal = parseInt(intStr, 10);
  const decVal = parseInt(decStr, 10);

  if (intVal === 0 && decVal === 0) {
    return 'ศูนย์บาทถ้วน';
  }

  if (intVal > 0) {
    text += convertInteger(intStr) + 'บาท';
  }

  if (decVal > 0) {
    text += convertChunk(decStr) + 'สตางค์';
  } else {
    text += 'ถ้วน';
  }

  return isNegative ? 'ลบ' + text : text;
}
