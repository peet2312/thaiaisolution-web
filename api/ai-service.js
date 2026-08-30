// ai-service.js - Thai AI Solution Multi-Engine AI (Claude, Gemini & Smart Fallback)

const SYSTEM_INSTRUCTION = `คุณคือ "AI Assistant ผู้เชี่ยวชาญของ บริษัท ไทยเอไอ โซลูชั่น จำกัด (THAI AI SOLUTION CO., LTD.)"
หน้าที่ของคุณคือให้คำปรึกษา แนะนำบริการ ประเมินราคาเบื้องต้น ตอบคำถามเทคนิค และแนะนำการติดต่อทีมงานอย่างเป็นมืออาชีพ

ข้อมูลบริษัท:
- ชื่อบริษัท: บริษัท ไทยเอไอ โซลูชั่น จำกัด (THAI AI SOLUTION CO., LTD.)
- ทะเบียนนิติบุคคล: 0905569007271 (จดทะเบียนถูกต้องตามประมวลกฎหมายแพ่งและพาณิชย์ ออกใบกำกับภาษีได้ 100%)
- วัตถุประสงค์หลัก:
  * (8) การเขียนโปรแกรมคอมพิวเตอร์ (Software Development, AI, Web, Mobile)
  * (9) การบริหารจัดการสิ่งอำนวยความสะดวกคอมพิวเตอร์ (Cloud, DevOps, Infrastructure)
  * (10) ให้คำปรึกษาทางด้านคอมพิวเตอร์ (IT & AI Consulting)
- เบอร์โทรศัพท์ติดต่อด่วน: 097-132-8145 (บริการตลอด 24 ชั่วโมง)
- อีเมล: thaiaisolution@outlook.com
- เว็บไซต์: https://www.thaiaisolution.co.th
- ลิงก์คำนวณราคาออนไลน์: https://www.thaiaisolution.co.th/#estimator
- ที่ตั้ง: 149/8 ถ.เก้าแสน ต.บ่อยาง อ.เมืองสงขลา จ.สงขลา 90000

บริการและราคามาตรฐาน:
1. เว็บไซต์ & E-Commerce: เริ่มต้น ฿28,000 - ฿35,000 (รองรับ SEO, ระบบชำระเงิน, Responsive)
2. โมบายล์แอปพลิเคชัน & LINE LIFF / Mini App: เริ่มต้น ฿58,000 (iOS, Android, Cross-Platform)
3. ระบบ AI Chatbot อัจฉริยะ (LINE OA / Web / FB): เริ่มต้น ฿18,000 (เชื่อมต่อ RAG, ตอบ 24 ชม., โอนสายแอดมิน)
4. AI Voice Bot (ระบบตอบรับและโทรออกอัตโนมัติ): สำหรับ Call Center, ยืนยันนัดหมาย, แจ้งเตือนยอด
5. e-KYC & AI Document OCR (สแกนเอกสาร/สลิป/บัตรประชาชน): เริ่มต้น ฿25,000
6. ซอฟต์แวร์ ERP / CRM / Dashboard องค์กร: เริ่มต้น ฿85,000
7. การตลาดออนไลน์ AI Marketing (Ads, SEO, Contents): เริ่มต้น ฿3,900 - ฿18,000/เดือน

แนวทางการตอบ:
- ตอบด้วยภาษาไทยที่สุภาพ กระชับ เข้าใจง่าย และให้ข้อมูลที่เป็นประโยชน์
- หากลูกค้าสอบถามราคา ให้บอกช่วงราคาเบื้องต้นและแนะนำให้เข้าไปประเมินราคาละเอียดที่หน้าเว็บ หรือขอใบเสนอราคา
- หากลูกค้าสอบถามข้อมูลทางเทคนิค (เช่น Cloud, RAG, OCR, Docker, Kubernetes) ให้อธิบายตามหลักวิศวกรรมซอฟต์แวร์อย่างน่าเชื่อถือ`;

/**
 * Generate intelligent response using Claude (Anthropic), Gemini, or Smart Fallback
 */
export async function generateAIResponse(userPrompt, conversationHistory = [], mode = 'general') {
  // 1. Try Anthropic Claude API
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01'
      };
      if (process.env.ANTHROPIC_WORKSPACE_ID) {
        headers['anthropic-workspace-id'] = process.env.ANTHROPIC_WORKSPACE_ID;
      }

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 800,
          system: SYSTEM_INSTRUCTION + `\n\nCurrent Mode: ${mode}`,
          messages: [
            ...conversationHistory.slice(-6).map(m => ({
              role: m.role === 'user' ? 'user' : 'assistant',
              content: m.text || m.content || ''
            })),
            { role: 'user', content: userPrompt }
          ]
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.content?.[0]?.text;
        if (text) return text.trim();
      } else {
        const errData = await res.json().catch(() => ({}));
        console.warn('Anthropic API returned status:', res.status, errData);
      }
    } catch (err) {
      console.error('Error calling Anthropic Claude API:', err.message);
    }
  }

  // 2. Try Google Gemini API
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const contents = [];
      contents.push({
        role: 'user',
        parts: [{ text: `System Instructions:\n${SYSTEM_INSTRUCTION}\n\nCurrent Mode: ${mode}` }]
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'รับทราบครับ ผมพร้อมทำหน้าที่ AI Assistant ของบริษัท ไทยเอไอ โซลูชั่น จำกัด เพื่อช่วยเหลือลูกค้าอย่างดีที่สุดครับ' }]
      });

      for (const msg of conversationHistory.slice(-6)) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text || msg.content || '' }]
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: userPrompt }]
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return candidate.trim();
        }
      }
    } catch (err) {
      console.error('Error calling Gemini API:', err);
    }
  }

  // 3. Smart Fallback Knowledge Engine (No API Key required)
  return generateKnowledgeFallback(userPrompt, mode);
}

/**
 * Intelligent Rule-based & Knowledge Engine Fallback
 */
export function generateKnowledgeFallback(prompt, mode = 'general') {
  const lower = (prompt || '').toLowerCase();

  if (lower.includes('ราคา') || lower.includes('cost') || lower.includes('budget') || lower.includes('แพ็กเกจ') || lower.includes('เท่าไหร่')) {
    return `💰 **อัตราค่าบริการและงบประมาณพัฒนา (Thai AI Solution):**\n\n• 🌐 เว็บไซต์ธุรกิจ / E-Commerce: เริ่มต้น ฿28,000 - ฿35,000\n• 📱 โมบายล์แอป & LINE LIFF: เริ่มต้น ฿58,000\n• 🤖 AI Chatbot อัจฉริยะ 24 ชม.: เริ่มต้น ฿18,000\n• 📑 e-KYC & AI OCR สแกนเอกสาร: เริ่มต้น ฿25,000\n• 🏢 ระบบ ERP / CRM / Dashboard องค์กร: เริ่มต้น ฿85,000\n• 🚀 การตลาดออนไลน์ AI Marketing: เริ่มต้น ฿3,900 - ฿18,000/เดือน\n\n🧮 คำนวณราคาแบบ Real-time: https://www.thaiaisolution.co.th/#estimator\n📞 สอบถามด่วน: 097-132-8145`;
  }

  if (lower.includes('0905569007271') || lower.includes('ทะเบียน') || lower.includes('นิติบุคคล') || lower.includes('บริษัท') || lower.includes('ภาษี') || lower.includes('tax')) {
    return `🏛️ **ข้อมูลการจดทะเบียนนิติบุคคล:**\nบริษัท ไทยเอไอ โซลูชั่น จำกัด (THAI AI SOLUTION CO., LTD.)\n• ทะเบียนนิติบุคคล: 0905569007271\n• วัตถุประสงค์: (8) การเขียนโปรแกรมคอมพิวเตอร์, (9) จัดการสิ่งอำนวยความสะดวกคอมพิวเตอร์, (10) ให้คำปรึกษาทางด้านคอมพิวเตอร์\n• ที่ตั้ง: 149/8 ถ.เก้าแสน ต.บ่อยาง อ.เมืองสงขลา จ.สงขลา 90000\n• สามารถออกใบกำกับภาษี, ใบเสนอราคา และสัญญาว่าจ้างได้อย่างถูกต้องตามกฎหมาย 100% ครับ`;
  }

  if (lower.includes('ติดต่อ') || lower.includes('โทร') || lower.includes('เบอร์') || lower.includes('email') || lower.includes('อีเมล') || lower.includes('ที่อยู่')) {
    return `📞 **ช่องทางการติดต่อ บริษัท ไทยเอไอ โซลูชั่น จำกัด:**\n\n• โทรศัพท์: 097-132-8145 (ติดต่อได้ตลอด 24 ชม.)\n• อีเมล: thaiaisolution@outlook.com\n• เว็บไซต์: https://www.thaiaisolution.co.th\n• สำนักงาน: 149/8 ถ.เก้าแสน ต.บ่อยาง อ.เมืองสงขลา จ.สงขลา\n• LINE OA: ติดต่อผ่านห้องแชทนี้ได้ทันทีครับ!`;
  }

  if (lower.includes('ocr') || lower.includes('สแกน') || lower.includes('ekyc') || lower.includes('สลิป') || lower.includes('บัตร')) {
    return `📑 **ระบบ e-KYC & AI OCR สแกนเอกสาร:**\nระบบตรวจจับและสกัดข้อมูลจากบัตรประชาชน, พาสปอร์ต, ทะเบียนบ้าน, ใบเสร็จรับเงิน และสลิปโอนเงินธนาคาร ความแม่นยำสูงกว่า 99.5% พร้อมเชื่อมต่อ API เข้ากับฐานข้อมูลหรือระบบ ERP ของท่านได้ทันที เริ่มต้น ฿25,000 ครับ`;
  }

  if (lower.includes('rag') || lower.includes('chatbot') || lower.includes('แชทบอท') || lower.includes('ai') || lower.includes('บอท')) {
    return `🤖 **ระบบ AI Chatbot & Enterprise RAG:**\nเราพัฒนาแชทบอท AI อัจฉริยะที่สามารถอ่านและเข้าใจเอกสาร PDF, คู่มือ หรือฐานข้อมูลสินค้าของบริษัทคุณ เพื่อตอบคำถามลูกค้าบน LINE OA, Facebook และหน้าเว็บไซต์ได้แม่นยำ 24 ชม. พร้อมระบบส่งต่อแอดมินคนจริง (Handover) เริ่มต้นเพียง ฿18,000 ครับ`;
  }

  if (lower.includes('voice') || lower.includes('เสียง') || lower.includes('โทรออก') || lower.includes('รับสาย') || lower.includes('ivr')) {
    return `🎙️ **ระบบ AI Voice Bot & Smart IVR:**\nระบบเสียงอัตโนมัติ AI ที่พูดภาษาไทยได้อย่างเป็นธรรมชาติ สามารถโทรออกเพื่อยืนยันนัดหมาย, ทวงถามยอดชำระ, หรือรับสายเพื่อคัดกรองปัญหาและตอบคำถามเบื้องต้น พร้อมถอดเสียงและสรุปผลลงระบบ CRM อัตโนมัติครับ`;
  }

  if (lower.includes('ใบเสนอราคา') || lower.includes('เสนอราคา') || lower.includes('quotation')) {
    return `📄 **การขอใบเสนอราคา (Quotation):**\nท่านสามารถแจ้งรายละเอียดโครงการ (ชื่อผู้ติดต่อ, เบอร์โทร, ระบบที่ต้องการ, งบประมาณ) ในแชทนี้ หรือกรอกผ่านแบบฟอร์มหน้าเว็บที่ https://www.thaiaisolution.co.th/#contact\nทีมงานจะจัดส่งใบเสนอราคาพร้อมเอกสารรับรองบริษัทให้ทางอีเมลโดยเร็วที่สุดครับ!`;
  }

  // Default context-aware response
  return `✨ สวัสดีครับ! ขอบคุณที่สอบถามเข้ามาเกี่ยวกับ "${prompt}" ครับ\n\nทีมงานวิศวกรซอฟต์แวร์และที่ปรึกษา AI ของ บริษัท ไทยเอไอ โซลูชั่น จำกัด ยินดีช่วยวิเคราะห์และออกแบบโซลูชันที่ตอบโจทย์ธุรกิจของท่านที่สุด\n\nท่านสามารถ:\n1. โทรปรึกษาด่วนได้ที่เบอร์ 📞 **097-132-8145** (24 ชม.)\n2. คำนวณราคาออนไลน์ได้ที่ 🌐 **https://www.thaiaisolution.co.th/#estimator**\n3. หรือพิมพ์แจ้งสิ่งที่ต้องการให้ดูแลเพิ่มเติมได้เลยครับ! 😊`;
}
