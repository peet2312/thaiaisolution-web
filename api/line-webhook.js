const LINE_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || '';

const defaultQuickReplies = {
  items: [
    { type: 'action', action: { type: 'message', label: '🌐 บริการทั้งหมด', text: 'บริการทั้งหมด' } },
    { type: 'action', action: { type: 'message', label: '💰 ประเมินราคา', text: 'ประเมินราคา' } },
    { type: 'action', action: { type: 'message', label: '📑 ขอใบเสนอราคา', text: 'ขอใบเสนอราคา' } },
    { type: 'action', action: { type: 'uri', label: '📞 โทร 24 ชม.', uri: 'tel:0971328145' } },
    { type: 'action', action: { type: 'message', label: '🏢 ข้อมูลบริษัท', text: 'ข้อมูลบริษัท' } }
  ]
};

function getServicesFlexMessage() {
  return {
    type: 'flex',
    altText: '🌟 บริการพัฒนาซอฟต์แวร์และ AI ครบวงจร - บริษัท ไทยเอไอ โซลูชั่น จำกัด',
    contents: {
      type: 'carousel',
      contents: [
        {
          type: 'bubble',
          header: {
            type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
            contents: [
              { type: 'text', text: '🌐 เว็บไซต์ & E-Commerce', weight: 'bold', color: '#38bdf8', size: 'md' },
              { type: 'text', text: 'เริ่มต้น ฿28,000', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
            ]
          },
          body: {
            type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
            contents: [
              { type: 'text', text: 'เว็บไซต์บริษัท ร้านค้าออนไลน์ รองรับ SEO ความเร็วสูง พร้อมติดตั้งระบบ AI แนะนำสินค้าและแชทบอทปิดการขาย 24 ชม.', color: '#cbd5e1', size: 'xs', wrap: true },
              { type: 'separator', margin: 'md', color: '#334155' },
              { type: 'text', text: '✨ ติดตั้ง AI: Personalization & Smart Chatbot', color: '#06b6d4', size: 'xxs', wrap: true }
            ]
          },
          footer: {
            type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
            contents: [
              { type: 'button', style: 'primary', color: '#2563eb', height: 'sm', action: { type: 'uri', label: 'ดูตัวอย่างบนเว็บ', uri: 'https://www.thaiaisolution.co.th/#services' } },
              { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'message', label: 'สนใจทำเว็บไซต์', text: 'สนใจทำเว็บไซต์' } }
            ]
          }
        },
        {
          type: 'bubble',
          header: {
            type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
            contents: [
              { type: 'text', text: '🏢 ซอฟต์แวร์ ERP / CRM', weight: 'bold', color: '#c084fc', size: 'md' },
              { type: 'text', text: 'เริ่มต้น ฿85,000', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
            ]
          },
          body: {
            type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
            contents: [
              { type: 'text', text: 'ระบบคลังสินค้า บัญชี และงานเอกสารตาม Workflow พร้อม AI OCR สแกนสลิปและใบกำกับภาษีอัตโนมัติ', color: '#cbd5e1', size: 'xs', wrap: true },
              { type: 'separator', margin: 'md', color: '#334155' },
              { type: 'text', text: '✨ ติดตั้ง AI: Document OCR & Stock Forecast', color: '#a855f7', size: 'xxs', wrap: true }
            ]
          },
          footer: {
            type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
            contents: [
              { type: 'button', style: 'primary', color: '#7c3aed', height: 'sm', action: { type: 'uri', label: 'ดูรายละเอียดระบบ', uri: 'https://www.thaiaisolution.co.th/#services' } },
              { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'message', label: 'สนใจระบบ ERP/CRM', text: 'สนใจระบบ ERP/CRM' } }
            ]
          }
        },
        {
          type: 'bubble',
          header: {
            type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
            contents: [
              { type: 'text', text: '📱 โมบายล์แอป & LINE LIFF', weight: 'bold', color: '#06b6d4', size: 'md' },
              { type: 'text', text: 'เริ่มต้น ฿58,000', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
            ]
          },
          body: {
            type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
            contents: [
              { type: 'text', text: 'พัฒนาแอป iOS & Android และ LINE LIFF ระบบสะสมแต้ม คูปอง จองคิว พร้อมผู้ช่วย AI', color: '#cbd5e1', size: 'xs', wrap: true },
              { type: 'separator', margin: 'md', color: '#334155' },
              { type: 'text', text: '✨ ติดตั้ง AI: Personalization & Notifications', color: '#06b6d4', size: 'xxs', wrap: true }
            ]
          },
          footer: {
            type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
            contents: [
              { type: 'button', style: 'primary', color: '#0891b2', height: 'sm', action: { type: 'uri', label: 'ดูรายละเอียดแอป', uri: 'https://www.thaiaisolution.co.th/#services' } },
              { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'message', label: 'สนใจทำโมบายล์แอป', text: 'สนใจทำโมบายล์แอป' } }
            ]
          }
        },
        {
          type: 'bubble',
          header: {
            type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
            contents: [
              { type: 'text', text: '🚀 AI Digital Marketing', weight: 'bold', color: '#f43f5e', size: 'md' },
              { type: 'text', text: 'เริ่มต้น ฿18,000/เดือน', color: '#c084fc', size: 'xs', weight: 'bold', margin: 'xs' }
            ]
          },
          body: {
            type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
            contents: [
              { type: 'text', text: 'ยิงโฆษณา Google, Facebook, TikTok, LINE Ads และทำ SEO ติดหน้าแรก พร้อม AI ปรับงบ Real-time', color: '#cbd5e1', size: 'xs', wrap: true },
              { type: 'separator', margin: 'md', color: '#334155' },
              { type: 'text', text: '✨ ติดตั้ง AI: Budget Optimizer & Live Report', color: '#f43f5e', size: 'xxs', wrap: true }
            ]
          },
          footer: {
            type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
            contents: [
              { type: 'button', style: 'primary', color: '#e11d48', height: 'sm', action: { type: 'uri', label: 'ดูรายละเอียดการตลาด', uri: 'https://www.thaiaisolution.co.th/#services' } },
              { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'message', label: 'สนใจทำการตลาดออนไลน์', text: 'สนใจทำการตลาดออนไลน์' } }
            ]
          }
        }
      ]
    },
    quickReply: defaultQuickReplies
  };
}

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
          { type: 'box', layout: 'horizontal', contents: [ { type: 'text', text: 'เลขนิติบุคคล:', color: '#94a3b8', size: 'xs', flex: 4 }, { type: 'text', text: '0905569007271', color: '#38bdf8', size: 'xs', weight: 'bold', flex: 7 } ] },
          { type: 'box', layout: 'horizontal', contents: [ { type: 'text', text: 'เบอร์โทร:', color: '#94a3b8', size: 'xs', flex: 4 }, { type: 'text', text: '097-132-8145 (24 ชม.)', color: '#4ade80', size: 'xs', weight: 'bold', flex: 7 } ] },
          { type: 'box', layout: 'horizontal', contents: [ { type: 'text', text: 'อีเมล:', color: '#94a3b8', size: 'xs', flex: 4 }, { type: 'text', text: 'thaiaisolution@outlook.com', color: '#cbd5e1', size: 'xs', flex: 7 } ] },
          { type: 'box', layout: 'horizontal', contents: [ { type: 'text', text: 'สำนักงาน:', color: '#94a3b8', size: 'xs', flex: 4 }, { type: 'text', text: 'เลขที่ 149/8 ถนนเก้าแสน ต.บ่อยาง อ.เมืองสงขลา จ.สงขลา', color: '#cbd5e1', size: 'xs', wrap: true, flex: 7 } ] }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          { type: 'button', style: 'primary', color: '#2563eb', height: 'sm', action: { type: 'uri', label: '🌐 เยี่ยมชมเว็บไซต์บริษัท', uri: 'https://www.thaiaisolution.co.th' } },
          { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'uri', label: '📞 โทรหาเจ้าหน้าที่ทันที', uri: 'tel:0971328145' } }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

function getEstimatorFlexMessage() {
  return {
    type: 'flex',
    altText: '💰 สรุปราคาและค่าบริการเริ่มต้น - Thai AI Solution',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#0b0f19',
        contents: [
          { type: 'text', text: '💰 สรุปราคาค่าบริการมาตรฐาน', weight: 'bold', color: '#38bdf8', size: 'md' },
          { type: 'text', text: 'ประเมินราคาโปรเจกต์พร้อมติดตั้งระบบ AI', color: '#94a3b8', size: 'xxs' }
        ]
      },
      body: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          { type: 'box', layout: 'horizontal', contents: [ { type: 'text', text: '1. เว็บไซต์ & E-Commerce', color: '#f1f5f9', size: 'xs', flex: 7 }, { type: 'text', text: '฿28,000', color: '#38bdf8', size: 'xs', weight: 'bold', align: 'end', flex: 4 } ] },
          { type: 'box', layout: 'horizontal', contents: [ { type: 'text', text: '2. ซอฟต์แวร์ ERP / CRM', color: '#f1f5f9', size: 'xs', flex: 7 }, { type: 'text', text: '฿85,000', color: '#c084fc', size: 'xs', weight: 'bold', align: 'end', flex: 4 } ] },
          { type: 'box', layout: 'horizontal', contents: [ { type: 'text', text: '3. โมบายล์แอป & LINE LIFF', color: '#f1f5f9', size: 'xs', flex: 7 }, { type: 'text', text: '฿58,000', color: '#06b6d4', size: 'xs', weight: 'bold', align: 'end', flex: 4 } ] },
          { type: 'box', layout: 'horizontal', contents: [ { type: 'text', text: '4. การตลาด AI Marketing', color: '#f1f5f9', size: 'xs', flex: 7 }, { type: 'text', text: '฿18,000/ด.', color: '#f43f5e', size: 'xs', weight: 'bold', align: 'end', flex: 4 } ] },
          { type: 'separator', margin: 'md', color: '#334155' },
          { type: 'text', text: '💡 สามารถกดเลือกฟังก์ชัน AI และคำนวณราคาแบบ Real-time ได้บนเว็บ', color: '#94a3b8', size: 'xxs', wrap: true }
        ]
      },
      footer: {
        type: 'box', layout: 'vertical', backgroundColor: '#111827', spacing: 'sm',
        contents: [
          { type: 'button', style: 'primary', color: '#8b5cf6', height: 'sm', action: { type: 'uri', label: '🧮 คำนวณราคาแบบละเอียดบนเว็บ', uri: 'https://www.thaiaisolution.co.th/#estimator' } },
          { type: 'button', style: 'secondary', color: '#1e293b', height: 'sm', action: { type: 'message', label: '📑 ขอใบเสนอราคา', text: 'ขอใบเสนอราคา' } }
        ]
      }
    },
    quickReply: defaultQuickReplies
  };
}

function getWelcomeMessage() {
  return [
    {
      type: 'text',
      text: 'สวัสดีครับ! ยินดีต้อนรับสู่ LINE Official Account ของ บริษัท ไทยเอไอ โซลูชั่น จำกัด (THAI AI SOLUTION) 🤖✨\n\nเราคือผู้เชี่ยวชาญด้านการรับพัฒนาเว็บไซต์ ซอฟต์แวร์ธุรกิจ ERP/CRM โมบายล์แอปพลิเคชัน และทำการตลาดออนไลน์ โดยมีจุดเด่นคือ "ติดตั้งระบบ AI อัจฉริยะในทุกบริการ"\n\nท่านสามารถเลือกดูบริการ หรือสอบถามข้อมูลได้เลยครับ 👇',
      quickReply: defaultQuickReplies
    },
    getServicesFlexMessage()
  ];
}

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

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'active',
      service: 'Thai AI Solution - LINE Official Bot Webhook',
      company: 'THAI AI SOLUTION CO., LTD.',
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

    if (event.type === 'follow') {
      await replyMessage(replyToken, getWelcomeMessage());
      continue;
    }

    if (event.type === 'message' && event.message?.type === 'text') {
      const text = (event.message.text || '').trim().toLowerCase();

      if (text.includes('บริการ') || text.includes('ทำอะไร') || text.includes('services') || text.includes('เมนู')) {
        await replyMessage(replyToken, getServicesFlexMessage());
      } else if (text.includes('ราคา') || text.includes('ประเมิน') || text.includes('เท่าไหร่') || text.includes('estimator') || text.includes('cost')) {
        await replyMessage(replyToken, getEstimatorFlexMessage());
      } else if (text.includes('บริษัท') || text.includes('นิติบุคคล') || text.includes('ที่อยู่') || text.includes('เบอร์') || text.includes('ติดต่อ') || text.includes('โทร')) {
        await replyMessage(replyToken, getCompanyInfoFlexMessage());
      } else if (text.includes('ใบเสนอราคา') || text.includes('เสนอราคา') || text.includes('ใบเสนอ') || text.includes('quotation')) {
        await replyMessage(replyToken, {
          type: 'text',
          text: '📄 ท่านสามารถขอใบเสนอราคาอย่างเป็นทางการได้ทันทีครับ\n\n1. แจ้งชื่อผู้ติดต่อ / บริษัท\n2. เบอร์โทรศัพท์ & อีเมล\n3. บริการและฟังก์ชัน AI ที่ต้องการ\n\nหรือกรอกผ่านหน้าเว็บเพื่อรับข้อเสนอพิเศษ:\n👉 https://www.thaiaisolution.co.th/#contact\n\n📞 โทรด่วน: 097-132-8145 (24 ชม.)',
          quickReply: defaultQuickReplies
        });
      } else if (text.includes('เว็บ') || text.includes('website') || text.includes('e-commerce') || text.includes('ร้านค้า')) {
        await replyMessage(replyToken, {
          type: 'text',
          text: '🌐 **บริการพัฒนาเว็บไซต์ & E-Commerce**\nเริ่มต้น ฿28,000\n\n• ออกแบบ UX/UI หรูหรา ทันสมัย รองรับมือถือ 100%\n• รองรับ SEO ติดหน้าแรก Google\n• ระบบตะกร้าสินค้า ชำระเงิน PromptPay / บัตรเครดิต\n• ✨ ติดตั้ง AI Chatbot ช่วยปิดการขาย และ AI แนะนำสินค้า\n\nสนใจดูตัวอย่างหน้าเว็บจริง:\n👉 https://www.thaiaisolution.co.th/#portfolio',
          quickReply: defaultQuickReplies
        });
      } else if (text.includes('erp') || text.includes('crm') || text.includes('โปรแกรม') || text.includes('ซอฟต์แวร์') || text.includes('สต็อก') || text.includes('คลัง')) {
        await replyMessage(replyToken, {
          type: 'text',
          text: '🏢 **บริการพัฒนาซอฟต์แวร์ ERP / CRM องค์กร**\nเริ่มต้น ฿85,000\n\n• ออกแบบระบบจัดการคลังสินค้า บัญชี และงานเอกสารตาม Workflow 100%\n• Multi-role Access สำหรับทีมงานและผู้บริหาร\n• ✨ ติดตั้ง AI OCR อ่านสลิปและใบกำกับภาษีลงระบบอัตโนมัติ\n• สรุปรายงานและพยากรณ์สต็อกสินค้าด้วย AI\n\nดูรายละเอียดเพิ่มเติม:\n👉 https://www.thaiaisolution.co.th/#services',
          quickReply: defaultQuickReplies
        });
      } else if (text.includes('แอป') || text.includes('app') || text.includes('mobile') || text.includes('liff') || text.includes('ios') || text.includes('android')) {
        await replyMessage(replyToken, {
          type: 'text',
          text: '📱 **บริการพัฒนาโมบายล์แอป & LINE LIFF**\nเริ่มต้น ฿58,000\n\n• พัฒนาแอปรองรับ iOS & Android (Flutter / React Native)\n• พัฒนาระบบสมาชิก สะสมแต้ม จองคิวบน LINE LIFF\n• แจ้งเตือนสถานะคำสั่งซื้อแบบ Real-time\n• ✨ ติดตั้งระบบ AI Assistant คอยช่วยเหลือใน LINE\n\nดูรายละเอียดเพิ่มเติม:\n👉 https://www.thaiaisolution.co.th/#services',
          quickReply: defaultQuickReplies
        });
      } else if (text.includes('การตลาด') || text.includes('marketing') || text.includes('แอด') || text.includes('ads') || text.includes('ยิงแอด') || text.includes('seo')) {
        await replyMessage(replyToken, {
          type: 'text',
          text: '🚀 **บริการทำการตลาดออนไลน์ AI Digital Marketing**\nเริ่มต้น ฿18,000/เดือน\n\n• ยิงโฆษณา Google Ads, Facebook, TikTok และ LINE Ads\n• ปรับแต่ง SEO ให้เว็บไซต์ติดหน้าแรก Google\n• ✨ ติดตั้ง AI Ads Optimizer ช่วยวิเคราะห์และปรับงบ Real-time\n• รายงานสรุปผลยอดขายและ Conversion ผ่าน Live Dashboard\n\nปรึกษาแผนการตลาด:\n👉 https://www.thaiaisolution.co.th/#contact',
          quickReply: defaultQuickReplies
        });
      } else {
        await replyMessage(replyToken, {
          type: 'text',
          text: 'สวัสดีครับ! ขอบคุณที่สอบถามเข้ามาครับ 😊\n\nทีมงาน บริษัท ไทยเอไอ โซลูชั่น จำกัด ได้รับข้อความ "' + (event.message.text || '') + '" เรียบร้อยแล้วครับ\n\nเจ้าหน้าที่ผู้เชี่ยวชาญจะติดต่อกลับโดยเร็วที่สุด หรือท่านสามารถเลือกดูข้อมูลด่วนจากเมนูด้านล่างได้ทันทีครับ 👇',
          quickReply: defaultQuickReplies
        });
      }
    }
  }

  return res.status(200).json({ success: true });
}