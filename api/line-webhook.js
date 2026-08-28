const LINE_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || 'yP1CscBeAmqnLS17FQlt4in3Oq3QzRtMZCSGedFrneSyZ0+tDFwNTHwPTuQi6mr4VbDfaEqBExYTV2TUM5d97UaEbKg1/XI04/guVk81I6P9HILfdml5bCEMdSDrP+VULWf3nB3tyUBAf/YcSxTEAgdB04t89/1O/w1cDnyilFU=';

// Default Quick Reply bar attached to messages
const defaultQuickReplies = {
  items: [
    { type: 'action', action: { type: 'message', label: '🌐 เว็บไซต์ & ร้านค้า', text: 'สนใจทำเว็บไซต์' } },
    { type: 'action', action: { type: 'message', label: '🏢 ซอฟต์แวร์ ERP/CRM', text: 'สนใจระบบ ERP/CRM' } },
    { type: 'action', action: { type: 'message', label: '📱 โมบายล์แอป / LINE', text: 'สนใจทำโมบายล์แอป' } },
    { type: 'action', action: { type: 'message', label: '🚀 ยิงแอด & SEO', text: 'สนใจทำการตลาดออนไลน์' } },
    { type: 'action', action: { type: 'message', label: '💰 สรุปราคาบริการ', text: 'ประเมินราคา' } },
    { type: 'action', action: { type: 'message', label: '📑 ขอใบเสนอราคา', text: 'ขอใบเสนอราคา' } },
    { type: 'action', action: { type: 'uri', label: '📞 โทร 097-132-8145', uri: 'tel:0971328145' } },
    { type: 'action', action: { type: 'message', label: '🏢 ข้อมูลบริษัท', text: 'ข้อมูลบริษัท' } }
  ]
};

// 1. Web Service Detail Flex Message
function getWebDetailFlex() {
  return {
    type: 'flex',
    altText: '🌐 บริการพัฒนาเว็บไซต์ & E-Commerce - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '🌐 พัฒนาเว็บไซต์ & E-Commerce', weight: 'bold', color: '#38bdf8', size: 'lg' },
          { type: 'text', text: 'เริ่มต้น ฿28,000 | ระยะเวลา 15 - 25 วันทำการ', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'md',
        contents: [
          {
            type: 'text',
            text: 'รับทำเว็บไซต์องค์กร เว็บแอปพลิเคชัน และระบบร้านค้าออนไลน์ ดีไซน์พรีเมียมทันสมัย รองรับมือถือ 100%',
            color: '#e2e8f0', size: 'xs', wrap: true
          },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '✨ ฟีเจอร์มาตรฐาน:', color: '#38bdf8', size: 'xs', weight: 'bold' },
              { type: 'text', text: '• พัฒนาด้วย Next.js, React, Tailwind CSS (เร็ว เสถียร)', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• โครงสร้างรองรับ SEO ติดหน้าแรก Google', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• ระบบชำระเงิน PromptPay QR / บัตรเครดิต Gateway', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• ระบบจัดการหลังบ้าน (Admin CMS Dashboard)', color: '#cbd5e1', size: 'xxs' }
            ]
          },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '🤖 ระบบ AI ที่ติดตั้งให้ในตัว:', color: '#c084fc', size: 'xs', weight: 'bold' },
              { type: 'text', text: '• AI แนะนำสินค้าตรงใจรายบุคคล (Personalization)', color: '#e2e8f0', size: 'xxs' },
              { type: 'text', text: '• AI Chatbot ตอบลูกค้าและสรุปออเดอร์ 24 ชม.', color: '#e2e8f0', size: 'xxs' }
            ]
          }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          {
            type: 'button', style: 'primary', color: '#2563eb', height: 'sm',
            action: { type: 'uri', label: 'ดูตัวอย่างหน้าเว็บจริง', uri: 'https://www.thaiaisolution.co.th/#portfolio' }
          },
          {
            type: 'button', style: 'secondary', color: '#1e293b', height: 'sm',
            action: { type: 'message', label: 'ขอใบเสนอราคาทำเว็บไซต์', text: 'ขอใบเสนอราคาทำเว็บไซต์' }
          }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// 2. ERP Detail Flex Message
function getErpDetailFlex() {
  return {
    type: 'flex',
    altText: '🏢 ซอฟต์แวร์ ERP / CRM องค์กร - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '🏢 ซอฟต์แวร์ ERP & CRM องค์กร', weight: 'bold', color: '#c084fc', size: 'lg' },
          { type: 'text', text: 'เริ่มต้น ฿85,000 | ระยะเวลา 30 - 45 วันทำการ', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'md',
        contents: [
          {
            type: 'text',
            text: 'ออกแบบและเขียนโปรแกรมระบบบริหารจัดการคลังสินค้า บัญชี บุคลากร หรือจัดซื้อตาม Workflow ขององค์กร 100%',
            color: '#e2e8f0', size: 'xs', wrap: true
          },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '✨ ฟีเจอร์มาตรฐาน:', color: '#c084fc', size: 'xs', weight: 'bold' },
              { type: 'text', text: '• Dashboard บริหารข้อมูลแบบ Real-time', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• กำหนดสิทธิ์ผู้ใช้งานหลายระดับ (Multi-role Access)', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• ส่งออกข้อมูล Excel, PDF รายงานอัตโนมัติ', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• เชื่อมต่อ API ภายนอกและระบบบัญชีเดิม', color: '#cbd5e1', size: 'xxs' }
            ]
          },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '🤖 ระบบ AI ที่ติดตั้งให้ในตัว:', color: '#38bdf8', size: 'xs', weight: 'bold' },
              { type: 'text', text: '• AI OCR สแกนสลิปโอนเงิน/ใบกำกับภาษีลงระบบอัตโนมัติ', color: '#e2e8f0', size: 'xxs' },
              { type: 'text', text: '• AI พยากรณ์สินค้าใกล้หมดและวิเคราะห์ยอดขาย', color: '#e2e8f0', size: 'xxs' }
            ]
          }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          {
            type: 'button', style: 'primary', color: '#7c3aed', height: 'sm',
            action: { type: 'uri', label: 'ดูตัวอย่างระบบ ERP', uri: 'https://www.thaiaisolution.co.th/#services' }
          },
          {
            type: 'button', style: 'secondary', color: '#1e293b', height: 'sm',
            action: { type: 'message', label: 'ขอใบเสนอราคาทำ ERP/CRM', text: 'ขอใบเสนอราคาทำ ERP/CRM' }
          }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// 3. Mobile App Detail Flex Message
function getMobileDetailFlex() {
  return {
    type: 'flex',
    altText: '📱 โมบายล์แอป & LINE LIFF - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '📱 โมบายล์แอป & LINE LIFF', weight: 'bold', color: '#06b6d4', size: 'lg' },
          { type: 'text', text: 'เริ่มต้น ฿58,000 | ระยะเวลา 25 - 35 วันทำการ', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'md',
        contents: [
          {
            type: 'text',
            text: 'พัฒนาแอปมือถือ iOS, Android (Flutter / React Native) และระบบสมาชิกลูกค้า สะสมแต้ม คูปองบน LINE LIFF',
            color: '#e2e8f0', size: 'xs', wrap: true
          },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '✨ ฟีเจอร์มาตรฐาน:', color: '#06b6d4', size: 'xs', weight: 'bold' },
              { type: 'text', text: '• ระบบสมาชิก สะสมแต้ม แลกของรางวัล', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• ระบบจองคิวออนไลน์ ล็อคเวลาอัตโนมัติ', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• Push Notification แจ้งเตือนสถานะคำสั่งซื้อ', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• ใช้งานผ่าน LINE ได้ทันที ไม่ต้องโหลดแอปเพิ่ม', color: '#cbd5e1', size: 'xxs' }
            ]
          },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '🤖 ระบบ AI ที่ติดตั้งให้ในตัว:', color: '#38bdf8', size: 'xs', weight: 'bold' },
              { type: 'text', text: '• AI คัดเลือกคูปองโปรโมชันที่เหมาะกับลูกค้าแต่ละราย', color: '#e2e8f0', size: 'xxs' },
              { type: 'text', text: '• AI ช่วยตอบและแจ้งเตือนผ่าน LINE อัตโนมัติ', color: '#e2e8f0', size: 'xxs' }
            ]
          }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          {
            type: 'button', style: 'primary', color: '#0891b2', height: 'sm',
            action: { type: 'uri', label: 'ดูตัวอย่างแอปมือถือ', uri: 'https://www.thaiaisolution.co.th/#portfolio' }
          },
          {
            type: 'button', style: 'secondary', color: '#1e293b', height: 'sm',
            action: { type: 'message', label: 'ขอใบเสนอราคาทำโมบายล์แอป', text: 'ขอใบเสนอราคาทำโมบายล์แอป' }
          }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// 4. Marketing Detail Flex Message
function getMarketingDetailFlex() {
  return {
    type: 'flex',
    altText: '🚀 การตลาดออนไลน์ AI Marketing - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '🚀 ทำการตลาดออนไลน์ AI Marketing', weight: 'bold', color: '#f43f5e', size: 'lg' },
          { type: 'text', text: 'เริ่มต้น ฿18,000 / เดือน | รายงานสด 24 ชม.', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'md',
        contents: [
          {
            type: 'text',
            text: 'ยิงโฆษณาครอบคลุม Google Ads, Facebook, TikTok, LINE Ads และทำ SEO ติดหน้าแรก เพิ่มยอดขายด้วยการวิเคราะห์ข้อมูล AI',
            color: '#e2e8f0', size: 'xs', wrap: true
          },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '✨ ขอบเขตการทำงาน:', color: '#f43f5e', size: 'xs', weight: 'bold' },
              { type: 'text', text: '• วางแผนกลุ่มเป้าหมาย (Audience Targeting)', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• ทำ SEO ทั้ง On-page และ Technical SEO', color: '#cbd5e1', size: 'xxs' },
              { type: 'text', text: '• รายงานสรุปผลยอดขายและ ROI ผ่าน Live Dashboard', color: '#cbd5e1', size: 'xxs' }
            ]
          },
          {
            type: 'box', layout: 'vertical', spacing: 'xs',
            contents: [
              { type: 'text', text: '🤖 ระบบ AI ที่ติดตั้งให้ในตัว:', color: '#38bdf8', size: 'xs', weight: 'bold' },
              { type: 'text', text: '• AI Budget Optimizer ช่วยปรับงบโฆษณา Real-time', color: '#e2e8f0', size: 'xxs' },
              { type: 'text', text: '• AI ช่วยสร้าง Copywriting และรูปภาพโฆษณา CTR สูง', color: '#e2e8f0', size: 'xxs' }
            ]
          }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          {
            type: 'button', style: 'primary', color: '#e11d48', height: 'sm',
            action: { type: 'uri', label: 'ปรึกษาแผนการตลาดบนเว็บ', uri: 'https://www.thaiaisolution.co.th/#contact' }
          },
          {
            type: 'button', style: 'secondary', color: '#1e293b', height: 'sm',
            action: { type: 'message', label: 'ขอใบเสนอราคาการตลาดออนไลน์', text: 'ขอใบเสนอราคาการตลาดออนไลน์' }
          }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// 5. Price Estimator Table Flex Message
function getEstimatorFlexMessage() {
  return {
    type: 'flex',
    altText: '💰 สรุปราคาค่าบริการมาตรฐาน - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '💰 สรุปอัตราค่าบริการมาตรฐาน', weight: 'bold', color: '#38bdf8', size: 'md' },
          { type: 'text', text: 'บริษัท ไทยเอไอ โซลูชั่น จำกัด (ราคาตลาดจริง)', color: '#94a3b8', size: 'xxs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: '🌐 1. เว็บไซต์ & E-Commerce', color: '#f1f5f9', size: 'xs', flex: 7 },
              { type: 'text', text: '฿28,000', color: '#38bdf8', size: 'xs', weight: 'bold', align: 'end', flex: 4 }
            ]
          },
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: '🏢 2. ซอฟต์แวร์ ERP / CRM', color: '#f1f5f9', size: 'xs', flex: 7 },
              { type: 'text', text: '฿85,000', color: '#c084fc', size: 'xs', weight: 'bold', align: 'end', flex: 4 }
            ]
          },
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: '📱 3. โมบายล์แอป & LINE LIFF', color: '#f1f5f9', size: 'xs', flex: 7 },
              { type: 'text', text: '฿58,000', color: '#06b6d4', size: 'xs', weight: 'bold', align: 'end', flex: 4 }
            ]
          },
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: '🚀 4. การตลาด AI Marketing', color: '#f1f5f9', size: 'xs', flex: 7 },
              { type: 'text', text: '฿18,000/ด.', color: '#f43f5e', size: 'xs', weight: 'bold', align: 'end', flex: 4 }
            ]
          },
          {
            type: 'separator', margin: 'md', color: '#334155'
          },
          {
            type: 'text',
            text: '💡 ฟังก์ชัน AI เพิ่มเติม: AI Chatbot (+฿18,000), AI OCR สแกนเอกสาร (+฿25,000), AI ทำนายสต็อก (+฿30,000)',
            color: '#94a3b8', size: 'xxs', wrap: true
          }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          {
            type: 'button', style: 'primary', color: '#8b5cf6', height: 'sm',
            action: { type: 'uri', label: '🧮 คำนวณราคาแบบละเอียดบนเว็บ', uri: 'https://www.thaiaisolution.co.th/#estimator' }
          },
          {
            type: 'button', style: 'secondary', color: '#1e293b', height: 'sm',
            action: { type: 'message', label: '📑 ขอใบเสนอราคาอย่างเป็นทางการ', text: 'ขอใบเสนอราคา' }
          }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// 6. Company Info Flex Message
function getCompanyInfoFlexMessage() {
  return {
    type: 'flex',
    altText: '🏢 ข้อมูลบริษัท ไทยเอไอ โซลูชั่น จำกัด (THAI AI SOLUTION)',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: 'บริษัท ไทยเอไอ โซลูชั่น จำกัด', weight: 'bold', color: '#38bdf8', size: 'md' },
          { type: 'text', text: 'THAI AI SOLUTION CO., LTD.', color: '#94a3b8', size: 'xxs', weight: 'bold' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'md',
        contents: [
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: 'เลขนิติบุคคล:', color: '#94a3b8', size: 'xs', flex: 4 },
              { type: 'text', text: '0905569007271', color: '#38bdf8', size: 'xs', weight: 'bold', flex: 7 }
            ]
          },
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: 'เบอร์โทร:', color: '#94a3b8', size: 'xs', flex: 4 },
              { type: 'text', text: '097-132-8145 (24 ชม.)', color: '#4ade80', size: 'xs', weight: 'bold', flex: 7 }
            ]
          },
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: 'อีเมล:', color: '#94a3b8', size: 'xs', flex: 4 },
              { type: 'text', text: 'thaiaisolution@outlook.com', color: '#cbd5e1', size: 'xs', flex: 7 }
            ]
          },
          {
            type: 'box', layout: 'horizontal',
            contents: [
              { type: 'text', text: 'สำนักงานใหญ่:', color: '#94a3b8', size: 'xs', flex: 4 },
              { type: 'text', text: 'เลขที่ 149/8 ถนนเก้าแสน ต.บ่อยาง อ.เมืองสงขลา จ.สงขลา', color: '#cbd5e1', size: 'xs', wrap: true, flex: 7 }
            ]
          },
          {
            type: 'separator', color: '#334155'
          },
          {
            type: 'text',
            text: '🛡️ มาตรฐานนิติบุคคล: ทะเบียนถูกต้องตามกรมพัฒนาธุรกิจการค้า ออกใบเสร็จและใบกำกับภาษีได้ 100%',
            color: '#a7f3d0', size: 'xxs', wrap: true
          }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          {
            type: 'button', style: 'primary', color: '#2563eb', height: 'sm',
            action: { type: 'uri', label: '🌐 เยี่ยมชมเว็บไซต์บริษัท', uri: 'https://www.thaiaisolution.co.th' }
          },
          {
            type: 'button', style: 'secondary', color: '#1e293b', height: 'sm',
            action: { type: 'uri', label: '📞 โทรหาเจ้าหน้าที่ทันที', uri: 'tel:0971328145' }
          }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

// 7. All Services Carousel
function getServicesCarouselFlex() {
  return {
    type: 'flex',
    altText: '🌟 แคตตาล็อกบริการ Thai AI Solution',
    contents: {
      type: 'carousel',
      contents: [
        getWebDetailFlex().contents,
        getErpDetailFlex().contents,
        getMobileDetailFlex().contents,
        getMarketingDetailFlex().contents
      ]
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
      service: 'Thai AI Solution - LINE Official Bot Webhook',
      company: 'THAI AI SOLUTION CO., LTD.',
      taxId: '0905569007271',
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

    // Follow event (When user adds LINE friend)
    if (event.type === 'follow') {
      await replyMessage(replyToken, [
        {
          type: 'text',
          text: 'สวัสดีครับ! ยินดีต้อนรับสู่ LINE Official ของ บริษัท ไทยเอไอ โซลูชั่น จำกัด (THAI AI SOLUTION) 🤖✨\n\nเราคือผู้เชี่ยวชาญด้านการพัฒนาเว็บไซต์ ซอฟต์แวร์ธุรกิจ ERP/CRM โมบายล์แอป และทำการตลาดออนไลน์ โดยมีจุดเด่นคือ "ติดตั้งระบบ AI อัจฉริยะในทุกบริการ"\n\nแตะเลือกดูบริการจากเมนูด้านล่าง หรือพิมพ์สอบถามได้ตลอด 24 ชม. ครับ 👇',
          quickReply: defaultQuickReplies
        },
        getServicesCarouselFlex()
      ]);
      continue;
    }

    // Message event
    if (event.type === 'message' && event.message?.type === 'text') {
      const text = (event.message.text || '').trim().toLowerCase();

      // 1. Specific Services
      if (text.includes('สนใจทำเว็บไซต์') || text.includes('ทำเว็บ') || text.includes('เว็บ') || text.includes('website') || text.includes('e-commerce') || text.includes('ร้านค้า')) {
        await replyMessage(replyToken, getWebDetailFlex());
      } else if (text.includes('สนใจระบบ erp') || text.includes('erp') || text.includes('crm') || text.includes('โปรแกรม') || text.includes('ซอฟต์แวร์') || text.includes('คลังสินค้า') || text.includes('สต็อก') || text.includes('บัญชี')) {
        await replyMessage(replyToken, getErpDetailFlex());
      } else if (text.includes('สนใจทำโมบายล์แอป') || text.includes('แอป') || text.includes('app') || text.includes('mobile') || text.includes('liff') || text.includes('ios') || text.includes('android')) {
        await replyMessage(replyToken, getMobileDetailFlex());
      } else if (text.includes('สนใจทำการตลาด') || text.includes('การตลาด') || text.includes('marketing') || text.includes('ยิงแอด') || text.includes('ads') || text.includes('seo') || text.includes('โฆษณา')) {
        await replyMessage(replyToken, getMarketingDetailFlex());
      }

      // 2. Price / Estimator
      else if (text.includes('ราคา') || text.includes('ประเมิน') || text.includes('เท่าไหร่') || text.includes('estimator') || text.includes('cost') || text.includes('ค่าใช้จ่าย')) {
        await replyMessage(replyToken, getEstimatorFlexMessage());
      }

      // 3. Company Info / Tax / Contact
      else if (text.includes('บริษัท') || text.includes('นิติบุคคล') || text.includes('ที่อยู่') || text.includes('เบอร์') || text.includes('ติดต่อ') || text.includes('โทร') || text.includes('tax') || text.includes('เลขทะเบียน')) {
        await replyMessage(replyToken, getCompanyInfoFlexMessage());
      }

      // 4. Quotation Request
      else if (text.includes('ใบเสนอราคา') || text.includes('เสนอราคา') || text.includes('ขอใบเสนอ') || text.includes('quotation') || text.includes('จ้างงาน')) {
        await replyMessage(replyToken, {
          type: 'text',
          text: '📄 **การขอใบเสนอราคาอย่างเป็นทางการ (Quotation)**\n\nท่านสามารถแจ้งข้อมูลเบื้องต้นให้เจ้าหน้าที่ได้เลยครับ:\n1. ชื่อผู้ติดต่อ และชื่อบริษัท/ร้านค้า\n2. เบอร์โทรศัพท์ และอีเมล\n3. บริการที่สนใจ (เว็บไซต์ / ERP / โมบายล์แอป / การตลาด AI)\n4. งบประมาณ หรือฟังก์ชันที่ต้องการเป็นพิเศษ\n\nทีมงานจะจัดทำใบเสนอราคาพร้อมรายละเอียดส่งให้ทางอีเมลโดยเร็วที่สุดครับ!\n\n🌐 กรอกผ่านหน้าเว็บ: https://www.thaiaisolution.co.th/#contact\n📞 โทรด่วน: 097-132-8145 (24 ชม.)',
          quickReply: defaultQuickReplies
        });
      }

      // 5. Timeline / Delivery
      else if (text.includes('กี่วัน') || text.includes('ระยะเวลา') || text.includes('เสร็จเมื่อไหร่') || text.includes('timeline')) {
        await replyMessage(replyToken, {
          type: 'text',
          text: '⏱️ **ระยะเวลาการพัฒนาโดยประมาณ:**\n\n• 🌐 เว็บไซต์ & E-Commerce: **15 - 25 วันทำการ**\n• 📱 โมบายล์แอป & LINE LIFF: **25 - 35 วันทำการ**\n• 🏢 ซอฟต์แวร์ ERP / CRM องค์กร: **30 - 45 วันทำการ**\n• 🚀 แคมเปญการตลาด AI Marketing: **เริ่มงานได้ใน 3 - 5 วัน**\n\n*ระยะเวลาอาจปรับเปลี่ยนตามฟังก์ชัน AI ที่ลูกค้าเลือกเพิ่มเติมครับ*',
          quickReply: defaultQuickReplies
        });
      }

      // 6. Payment & Milestones
      else if (text.includes('จ่ายเงิน') || text.includes('งวด') || text.includes('ชำระเงิน') || text.includes('มัดจำ') || text.includes('หัก ณ ที่จ่าย')) {
        await replyMessage(replyToken, {
          type: 'text',
          text: '💳 **เงื่อนไขการชำระเงินมาตรฐาน:**\n\n• แบ่งชำระเป็น **3 - 4 งวด** ตาม Milestone การส่งมอบงาน\n• งวดที่ 1: มัดจำเริ่มงาน 30 - 40% (หลังเซ็นสัญญา)\n• งวดกลาง: หลังตรวจรับงานดีไซน์ UX/UI และฟังก์ชันระบบ\n• งวดสุดท้าย: หลังส่งมอบงานและผ่านการทดสอบ (UAT) 100%\n\n✅ มีสัญญาว่าจ้างและออกใบเสร็จรับเงิน/ใบกำกับภาษีถูกต้องตามกฎหมาย (นิติบุคคลหัก ณ ที่จ่าย 3% ได้)',
          quickReply: defaultQuickReplies
        });
      }

      // 7. General Knowledge-based Smart Fallback
      else {
        await replyMessage(replyToken, {
          type: 'text',
          text: `สวัสดีครับ! ทีมงาน บริษัท ไทยเอไอ โซลูชั่น จำกัด (THAI AI SOLUTION) ยินดีให้บริการครับ 😊\n\nเราได้รับข้อความ "${event.message.text}" เรียบร้อยแล้วครับ\n\nเจ้าหน้าที่ผู้เชี่ยวชาญจะติดต่อกลับโดยเร็วที่สุด หรือท่านสามารถเลือกแตะดูข้อมูลด่วนจากเมนูด้านล่างได้ทันทีครับ 👇`,
          quickReply: defaultQuickReplies
        });
      }
    }
  }

  return res.status(200).json({ success: true });
}