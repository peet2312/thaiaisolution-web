import { generateAIResponse } from './ai-service.js';

const LINE_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || 'yP1CscBeAmqnLS17FQlt4in3Oq3QzRtMZCSGedFrneSyZ0+tDFwNTHwPTuQi6mr4VbDfaEqBExYTV2TUM5d97UaEbKg1/XI04/guVk81I6P9HILfdml5bCEMdSDrP+VULWf3nB3tyUBAf/YcSxTEAgdB04t89/1O/w1cDnyilFU=';

const defaultQuickReplies = {
  items: [
    { type: 'action', action: { type: 'message', label: '🤖 AI Chatbot', text: 'AI Chatbot' } },
    { type: 'action', action: { type: 'message', label: '🎙️ Voice Bot', text: 'Voice Bot' } },
    { type: 'action', action: { type: 'message', label: '📑 e-KYC & OCR', text: 'e-KYC & OCR' } },
    { type: 'action', action: { type: 'message', label: '🛍️ สินค้าและบริการ', text: 'สินค้าและบริการ AI' } },
    { type: 'action', action: { type: 'message', label: '🧩 โซลูชันธุรกิจ', text: 'โซลูชันสำหรับธุรกิจ' } },
    { type: 'action', action: { type: 'message', label: '📖 บทความน่ารู้ AI', text: 'บทความน่ารู้ AI' } },
    { type: 'action', action: { type: 'uri', label: '📞 โทร 097-132-8145', uri: 'tel:0971328145' } },
    { type: 'action', action: { type: 'message', label: '📑 ขอใบเสนอราคา', text: 'ขอใบเสนอราคา' } }
  ]
};

// 1. AI CHATBOT Flex Message
function getChatbotFlex() {
  return {
    type: 'flex',
    altText: '🤖 AI Chatbot แชทบอทอัจฉริยะ 24 ชม. - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '🤖 AI CHATBOT อัจฉริยะ 24 ชม.', weight: 'bold', color: '#38bdf8', size: 'lg' },
          { type: 'text', text: '24/7 Intelligent Chatbot System | เริ่มต้น ฿18,000', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'md',
        contents: [
          { type: 'text', text: 'แชทบอท AI อัจฉริยะคอยตอบคำถาม ปิดการขาย สรุปออเดอร์ และเชื่อมต่อสต็อกสินค้าอัตโนมัติบน LINE OA, Facebook และเว็บไซต์', color: '#e2e8f0', size: 'xs', wrap: true },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '✨ ฟีเจอร์เด่น:', color: '#38bdf8', size: 'xs', weight: 'bold' },
              { type: 'text', text: '• เข้าใจภาษาไทยเป็นธรรมชาติ ด้วย Generative AI', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• เชื่อมต่อฐานข้อมูลสินค้า & ออกลิงก์ชำระเงินทันที', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• ระบบ Handover โอนบทสนทนาให้แอดมินคนจริง', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• บันทึกข้อมูลลูกค้า (CRM Lead Capture) อัตโนมัติ', color: '#cbd5e1', size: 'xxs' }
            ]
          }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          { type: 'button', style: 'primary', color: '#2563eb', height: 'sm', action: { type: 'uri', label: 'ดูตัวอย่างบนเว็บไซต์', uri: 'https://www.thaiaisolution.co.th/#services' } },
          { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'message', label: 'ขอใบเสนอราคา AI Chatbot', text: 'ขอใบเสนอราคา AI Chatbot' } }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// 2. VOICE BOT Flex Message
function getVoiceBotFlex() {
  return {
    type: 'flex',
    altText: '🎙️ VOICE BOT ระบบเสียงอัตโนมัติ - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '🎙️ VOICE BOT ระบบเสียงอัตโนมัติ', weight: 'bold', color: '#38bdf8', size: 'lg' },
          { type: 'text', text: 'Automated Voice System & Smart IVR', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'md',
        contents: [
          { type: 'text', text: 'ระบบตอบรับและโทรออกด้วยเสียง AI อัจฉริยะ (Speech-to-Text & Text-to-Speech) สำเนียงภาษาไทยเป็นธรรมชาติ', color: '#e2e8f0', size: 'xs', wrap: true },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '✨ ฟีเจอร์เด่น:', color: '#38bdf8', size: 'xs', weight: 'bold' },
              { type: 'text', text: '• AI Outbound Call โทรแจ้งเตือนยอด/ยืนยันนัดหมาย', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• AI Inbound IVR รับสายคัดกรองปัญหาและตอบคำถาม', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• ถอดเทปเสียงและสรุปประเด็นลงระบบ CRM ทันที', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• รองรับการโทรพร้อมกันหลายร้อยสาย 24/7', color: '#cbd5e1', size: 'xxs' }
            ]
          }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          { type: 'button', style: 'primary', color: '#0891b2', height: 'sm', action: { type: 'uri', label: 'โทรปรึกษาผู้เชี่ยวชาญ', uri: 'tel:0971328145' } },
          { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'message', label: 'ขอใบเสนอราคา Voice Bot', text: 'ขอใบเสนอราคา Voice Bot' } }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// 3. e-KYC & OCR Flex Message
function getOcrFlex() {
  return {
    type: 'flex',
    altText: '📑 e-KYC & OCR ยืนยันตัวตนและสแกนเอกสาร - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '📑 e-KYC & AI OCR สแกนเอกสาร', weight: 'bold', color: '#38bdf8', size: 'lg' },
          { type: 'text', text: 'Verification & Document Scan System | เริ่มต้น ฿25,000', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'md',
        contents: [
          { type: 'text', text: 'เทคโนโลยี AI สแกนอ่านข้อมูลจากเอกสารและสลิปการโอนเงิน พร้อมระบบยืนยันตัวตนความปลอดภัยสูง', color: '#e2e8f0', size: 'xs', wrap: true },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '✨ ฟีเจอร์เด่น:', color: '#38bdf8', size: 'xs', weight: 'bold' },
              { type: 'text', text: '• AI Slip Verification ตรวจสลิปโอนเงินธนาคารไทย 100%', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• AI Smart OCR สแกนบัตรประชาชน/ใบกำกับภาษีลง ERP', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• Facial Recognition & Liveness Detection ยืนยันใบหน้า', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• ป้องกันสลิปปลอม และการสวมสิทธิ์ตัวตนได้แม่นยำ', color: '#cbd5e1', size: 'xxs' }
            ]
          }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          { type: 'button', style: 'primary', color: '#7c3aed', height: 'sm', action: { type: 'uri', label: 'ดูระบบบนเว็บไซต์', uri: 'https://www.thaiaisolution.co.th/#services' } },
          { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'message', label: 'ขอใบเสนอราคา e-KYC & OCR', text: 'ขอใบเสนอราคา e-KYC & OCR' } }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// 4. PRODUCT (Products & Services Carousel)
function getProductFlex() {
  return {
    type: 'flex',
    altText: '🛍️ สินค้าและบริการ AI - Thai AI Solution',
    contents: {
      type: 'carousel',
      contents: [
        {
          type: 'bubble',
          header: { type: 'box', layout: 'vertical', backgroundColor: '#0b0f19', contents: [ { type: 'text', text: '🌐 เว็บไซต์ & E-Commerce', weight: 'bold', color: '#38bdf8', size: 'md' }, { type: 'text', text: 'เริ่มต้น ฿28,000', color: '#c084fc', size: 'xs', weight: 'bold' } ] },
          body: { type: 'box', layout: 'vertical', backgroundColor: '#111827', contents: [ { type: 'text', text: 'เว็บองค์กร ร้านค้าออนไลน์ SEO ความเร็วสูง พร้อม AI ปิดการขาย', color: '#cbd5e1', size: 'xs', wrap: true } ] },
          footer: { type: 'box', layout: 'vertical', backgroundColor: '#111827', contents: [ { type: 'button', style: 'primary', color: '#2563eb', height: 'sm', action: { type: 'message', label: 'สนใจทำเว็บไซต์', text: 'สนใจทำเว็บไซต์' } } ] }
        },
        {
          type: 'bubble',
          header: { type: 'box', layout: 'vertical', backgroundColor: '#0b0f19', contents: [ { type: 'text', text: '🏢 ซอฟต์แวร์ ERP / CRM', weight: 'bold', color: '#c084fc', size: 'md' }, { type: 'text', text: 'เริ่มต้น ฿85,000', color: '#c084fc', size: 'xs', weight: 'bold' } ] },
          body: { type: 'box', layout: 'vertical', backgroundColor: '#111827', contents: [ { type: 'text', text: 'ระบบคลังสินค้า บัญชี จัดซื้อ พร้อม AI OCR สแกนเอกสารและพยากรณ์สต็อก', color: '#cbd5e1', size: 'xs', wrap: true } ] },
          footer: { type: 'box', layout: 'vertical', backgroundColor: '#111827', contents: [ { type: 'button', style: 'primary', color: '#7c3aed', height: 'sm', action: { type: 'message', label: 'สนใจระบบ ERP/CRM', text: 'สนใจระบบ ERP/CRM' } } ] }
        },
        {
          type: 'bubble',
          header: { type: 'box', layout: 'vertical', backgroundColor: '#0b0f19', contents: [ { type: 'text', text: '📱 โมบายล์แอป & LINE LIFF', weight: 'bold', color: '#06b6d4', size: 'md' }, { type: 'text', text: 'เริ่มต้น ฿58,000', color: '#c084fc', size: 'xs', weight: 'bold' } ] },
          body: { type: 'box', layout: 'vertical', backgroundColor: '#111827', contents: [ { type: 'text', text: 'แอป iOS & Android และ LINE LIFF ระบบสมาชิก สะสมแต้ม จองคิว', color: '#cbd5e1', size: 'xs', wrap: true } ] },
          footer: { type: 'box', layout: 'vertical', backgroundColor: '#111827', contents: [ { type: 'button', style: 'primary', color: '#0891b2', height: 'sm', action: { type: 'message', label: 'สนใจทำโมบายล์แอป', text: 'สนใจทำโมบายล์แอป' } } ] }
        },
        {
          type: 'bubble',
          header: { type: 'box', layout: 'vertical', backgroundColor: '#0b0f19', contents: [ { type: 'text', text: '🚀 AI Digital Marketing', weight: 'bold', color: '#f43f5e', size: 'md' }, { type: 'text', text: 'เริ่มต้น ฿18,000/เดือน', color: '#c084fc', size: 'xs', weight: 'bold' } ] },
          body: { type: 'box', layout: 'vertical', backgroundColor: '#111827', contents: [ { type: 'text', text: 'ยิงแอด FB, Google, TikTok, SEO ติดหน้าแรก พร้อม AI ปรับงบ Real-time', color: '#cbd5e1', size: 'xs', wrap: true } ] },
          footer: { type: 'box', layout: 'vertical', backgroundColor: '#111827', contents: [ { type: 'button', style: 'primary', color: '#e11d48', height: 'sm', action: { type: 'message', label: 'สนใจทำการตลาดออนไลน์', text: 'สนใจทำการตลาดออนไลน์' } } ] }
        }
      ]
    },
    quickReply: defaultQuickReplies
  };
}

// 5. SOLUTION (Business Solutions)
function getSolutionFlex() {
  return {
    type: 'flex',
    altText: '🧩 โซลูชันสำหรับธุรกิจ - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '🧩 โซลูชัน AI สำหรับธุรกิจ', weight: 'bold', color: '#38bdf8', size: 'lg' },
          { type: 'text', text: 'Tailor-Made Solutions for Every Industry', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'md',
        contents: [
          { type: 'text', text: 'เราออกแบบและพัฒนาโซลูชันซอฟต์แวร์ผสาน AI ให้ตรงกับกระบวนการทำงานของแต่ละอุตสาหกรรม:', color: '#e2e8f0', size: 'xs', wrap: true },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '📦 ค้าปลีก-ค้าส่ง: เว็บร้านค้า + AI ปิดการขาย + คลังสินค้า', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '🏥 คลินิก & การแพทย์: ระบบจองคิว LINE LIFF + เวชระเบียน CRM', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '🏭 โรงงาน & ผลิต: ERP + AI OCR เอกสาร + ทำนายสต็อก', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '🏢 องค์กร & นิติบุคคล: ระบบเอกสาร Workflow + AI Voice Bot', color: '#cbd5e1', size: 'xxs' }
            ]
          }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          { type: 'button', style: 'primary', color: '#6366f1', height: 'sm', action: { type: 'uri', label: '🧮 คำนวณราคาโปรเจกต์บนเว็บ', uri: 'https://www.thaiaisolution.co.th/#estimator' } },
          { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'message', label: 'ปรึกษาจัดทำโซลูชันองค์กร', text: 'ปรึกษาทีมงานฟรี' } }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// 6. BLOG (AI Knowledge & Articles)
function getBlogFlex() {
  return {
    type: 'flex',
    altText: '📖 บทความน่ารู้ AI - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '📖 บทความน่ารู้ AI & เทคโนโลยี', weight: 'bold', color: '#38bdf8', size: 'lg' },
          { type: 'text', text: 'AI Knowledge, Trends & Business Insights', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'md',
        contents: [
          { type: 'text', text: 'อัปเดตสาระน่ารู้ เทรนด์เทคโนโลยี AI และกรณีศึกษาการทรานส์ฟอร์มธุรกิจ:', color: '#e2e8f0', size: 'xs', wrap: true },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '💡 5 วิธีนำ AI เพิ่มยอดขายและลดต้นทุนองค์กร 2026', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '📑 เจาะลึก e-KYC & OCR ยกระดับความปลอดภัยธุรกิจ', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '🤖 ทำไมเว็บไซต์ยุคใหม่ต้องติดตั้ง AI Chatbot ปิดการขาย', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '🚀 สรุปแนวทางทำ SEO ให้เว็บไซต์ติดหน้าแรก Google', color: '#cbd5e1', size: 'xxs' }
            ]
          }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          { type: 'button', style: 'primary', color: '#2563eb', height: 'sm', action: { type: 'uri', label: 'อ่านบทความทั้งหมดบนเว็บ', uri: 'https://www.thaiaisolution.co.th/#portfolio' } }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// 7. CONSULTATION & CONTACT
function getConsultationFlex() {
  return {
    type: 'flex',
    altText: '📞 ปรึกษาทีมงานฟรี & ขอใบเสนอราคา - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '📞 ปรึกษาผู้เชี่ยวชาญ AI ฟรี!', weight: 'bold', color: '#38bdf8', size: 'lg' },
          { type: 'text', text: 'บริษัท ไทยเอไอ โซลูชั่น จำกัด (บริการ 24 ชม.)', color: '#4ade80', size: 'xs', weight: 'bold', margin: 'xs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'md',
        contents: [
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: 'สายด่วน:', color: '#94a3b8', size: 'xs', flex: 3 },
              { type: 'text', text: '097-132-8145 (24 ชม.)', color: '#4ade80', size: 'xs', weight: 'bold', flex: 7 }
            ]
          },
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: 'เลขนิติบุคคล:', color: '#94a3b8', size: 'xs', flex: 3 },
              { type: 'text', text: '0905569007271', color: '#38bdf8', size: 'xs', weight: 'bold', flex: 7 }
            ]
          },
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: 'อีเมล:', color: '#94a3b8', size: 'xs', flex: 3 },
              { type: 'text', text: 'thaiaisolution@outlook.com', color: '#cbd5e1', size: 'xs', flex: 7 }
            ]
          },
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: 'สำนักงาน:', color: '#94a3b8', size: 'xs', flex: 3 },
              { type: 'text', text: '149/8 ถ.เก้าแสน ต.บ่อยาง อ.เมืองสงขลา จ.สงขลา', color: '#cbd5e1', size: 'xs', wrap: true, flex: 7 }
            ]
          },
          { type: 'separator', color: '#334155' },
          { type: 'text', text: '📄 ออกใบเสนอราคา (Quotation), สัญญาว่าจ้าง และใบกำกับภาษีถูกต้องตามกฎหมาย 100%', color: '#a7f3d0', size: 'xxs', wrap: true }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          { type: 'button', style: 'primary', color: '#16a34a', height: 'sm', action: { type: 'uri', label: '📞 กดโทรหาเจ้าหน้าที่ทันที', uri: 'tel:0971328145' } },
          { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'message', label: '📑 ขอใบเสนอราคา', text: 'ขอใบเสนอราคา' } },
          { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'uri', label: '🌐 เยี่ยมชมเว็บไซต์บริษัท', uri: 'https://www.thaiaisolution.co.th' } }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// Send Reply Helper
async function replyMessage(replyToken, messages) {
  if (!LINE_ACCESS_TOKEN) {
    console.error('Missing LINE_CHANNEL_ACCESS_TOKEN');
    return;
  }
  const payload = {
    replyToken: replyToken,
    messages: Array.isArray(messages) ? messages : [messages]
  };
  try {
    const response = await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('LINE Reply API error:', response.status, errorText);
    }
  } catch (err) {
    console.error('Failed to send LINE reply:', err);
  }
}

// Main Webhook Handler
export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'active',
      service: 'Thai AI Solution - LINE Official Bot 7-Box Webhook',
      company: 'THAI AI SOLUTION CO., LTD.',
      taxId: '0905569007271',
      phone: '097-132-8145',
      domain: 'thaiaisolution.co.th',
      time: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const events = req.body?.events || [];

  for (const event of events) {
    const replyToken = event.replyToken;

    // Follow event
    if (event.type === 'follow') {
      await replyMessage(replyToken, [
        {
          type: 'text',
          text: 'สวัสดีครับ! ยินดีต้อนรับสู่ LINE Official ของ บริษัท ไทยเอไอ โซลูชั่น จำกัด (THAI AI SOLUTION) 🤖✨\n\nเราคือผู้เชี่ยวชาญด้านการพัฒนาซอฟต์แวร์ เว็บไซต์ โมบายล์แอป ระบบ ERP/CRM และทำการตลาดออนไลน์ โดยมีจุดเด่นคือ "ติดตั้งระบบ AI อัจฉริยะในทุกบริการ"\n\nท่านสามารถแตะเลือกเมนูบริการ 7 ช่องด้านล่าง หรือพิมพ์สอบถามได้ตลอด 24 ชม. ครับ 👇',
          quickReply: defaultQuickReplies
        },
        getProductFlex()
      ]);
      continue;
    }

    // Message event
    if (event.type === 'message' && event.message?.type === 'text') {
      const text = (event.message.text || '').trim().toLowerCase();

      // 1. Box 1: AI Chatbot
      if (text.includes('ai chatbot') || text.includes('chatbot') || text.includes('แชทบอท')) {
        await replyMessage(replyToken, getChatbotFlex());
      }

      // 2. Box 2: Voice Bot
      else if (text.includes('voice bot') || text.includes('voice') || text.includes('เสียงอัตโนมัติ') || text.includes('บอทเสียง')) {
        await replyMessage(replyToken, getVoiceBotFlex());
      }

      // 3. Box 3: e-KYC & OCR
      else if (text.includes('ekyc') || text.includes('e-kyc') || text.includes('ocr') || text.includes('สแกน') || text.includes('ยืนยันตัวตน') || text.includes('สลิป')) {
        await replyMessage(replyToken, getOcrFlex());
      }

      // 4. Box 4: Product / Services
      else if (text.includes('สินค้าและบริการ') || text.includes('product') || text.includes('สินค้า') || text.includes('บริการ') || text.includes('สนใจทำเว็บไซต์') || text.includes('สนใจระบบ erp') || text.includes('สนใจทำโมบายล์แอป') || text.includes('สนใจทำการตลาด')) {
        await replyMessage(replyToken, getProductFlex());
      }

      // 5. Box 5: Solution
      else if (text.includes('โซลูชัน') || text.includes('solution') || text.includes('ธุรกิจ')) {
        await replyMessage(replyToken, getSolutionFlex());
      }

      // 6. Box 6: Blog
      else if (text.includes('บทความ') || text.includes('blog') || text.includes('ความรู้') || text.includes('สาระ')) {
        await replyMessage(replyToken, getBlogFlex());
      }

      // 7. Box 7: Consultation & Contact
      else if (text.includes('ปรึกษา') || text.includes('ติดต่อ') || text.includes('เบอร์') || text.includes('โทร') || text.includes('บริษัท') || text.includes('นิติบุคคล') || text.includes('ที่อยู่') || text.includes('tax')) {
        await replyMessage(replyToken, getConsultationFlex());
      }

      // Quotation
      else if (text.includes('ใบเสนอราคา') || text.includes('เสนอราคา') || text.includes('quotation')) {
        await replyMessage(replyToken, {
          type: 'text',
          text: '📄 **การขอใบเสนอราคาอย่างเป็นทางการ (Quotation)**\n\nท่านสามารถแจ้งข้อมูลเบื้องต้นให้เจ้าหน้าที่ได้เลยครับ:\n1. ชื่อผู้ติดต่อ และชื่อบริษัท/ร้านค้า\n2. เบอร์โทรศัพท์ และอีเมล\n3. บริการ/ระบบ AI ที่ต้องการ\n4. งบประมาณที่ตั้งไว้เบื้องต้น\n\nทีมงานจะจัดทำใบเสนอราคาพร้อมเอกสารรับรองส่งให้ทางอีเมลโดยเร็วที่สุดครับ!\n\n🌐 กรอกผ่านหน้าเว็บ: https://www.thaiaisolution.co.th/#contact\n📞 โทรด่วน: 097-132-8145 (24 ชม.)',
          quickReply: defaultQuickReplies
        });
      }

      // Price / Estimator
      else if (text.includes('ราคา') || text.includes('ประเมิน') || text.includes('เท่าไหร่') || text.includes('cost')) {
        await replyMessage(replyToken, {
          type: 'text',
          text: '💰 **สรุปอัตราค่าบริการมาตรฐาน (Thai AI Solution):**\n\n• 🌐 เว็บไซต์ & E-Commerce: เริ่มต้น ฿28,000\n• 📱 โมบายล์แอป & LINE LIFF: เริ่มต้น ฿58,000\n• 🏢 ซอฟต์แวร์ ERP / CRM องค์กร: เริ่มต้น ฿85,000\n• 🚀 การตลาดออนไลน์ AI Marketing: เริ่มต้น ฿18,000/ด.\n• 🤖 AI Chatbot อัจฉริยะ: เริ่มต้น ฿18,000\n• 📑 e-KYC & AI OCR สแกนเอกสาร: เริ่มต้น ฿25,000\n\n🧮 คำนวณราคาแบบ Real-time: https://www.thaiaisolution.co.th/#estimator\n📞 โทรสอบถาม: 097-132-8145',
          quickReply: defaultQuickReplies
        });
      }

      // AI Natural Language Intelligence & Fallback
      else {
        const aiReply = await generateAIResponse(event.message.text);
        await replyMessage(replyToken, {
          type: 'text',
          text: aiReply,
          quickReply: defaultQuickReplies
        });
      }
    }
  }

  return res.status(200).json({ success: true });
}