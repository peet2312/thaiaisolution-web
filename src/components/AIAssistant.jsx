import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, HelpCircle, ArrowRight, CornerDownLeft, RefreshCw } from 'lucide-react';

export default function AIAssistant({ t }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'สวัสดีครับ! ผมคือผู้ช่วย AI ประจำ บริษัท ไทยเอไอ โซลูชั่น จำกัด (THAI AI SOLUTION) ยินดีให้คำแนะนำเกี่ยวกับบริการพัฒนาเว็บ, การตลาดออนไลน์, ระบบ AI และการจัดการระบบคลาวด์ 24 ชม. สอบถามผมได้เลยครับ!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  const knowledgeBase = [
    {
      keywords: ['ทะเบียน', 'จดทะเบียน', 'นิติบุคคล', '0905569007271'],
      reply: 'บริษัท ไทยเอไอ โซลูชั่น จำกัด จดทะเบียนถูกต้องตามกฎหมาย เลขทะเบียนนิติบุคคล 0905569007271 ครอบคลุมการพัฒนา Web Applications, Enterprise Cloud Systems และ Network Infrastructure อย่างสมบูรณ์แบบ ออกใบกำกับภาษีได้ 100% ครับ'
    },
    {
      keywords: ['วัตถุประสงค์', '8', '9', '10', 'บริการ', 'ทำอะไรบ้าง', 'ทำอะไร'],
      reply: 'บริษัทเราให้บริการ 3 เสาหลักตามหนังสือรับรอง:\n1. ข้อ (8) การเขียนโปรแกรมคอมพิวเตอร์และระบบ AI (Web, Mobile, LLM, Custom Software)\n2. ข้อ (9) การจัดการสิ่งอำนวยความสะดวกด้านคอมพิวเตอร์ (Cloud Server, DevOps, 24/7 Monitoring)\n3. ข้อ (10) กิจกรรมการให้คำปรึกษาทางด้านคอมพิวเตอร์ (IT Architecture, AI Strategy, Tech Audit)'
    },
    {
      keywords: ['ราคา', 'งบ', 'เท่าไหร่', 'ค่าใช้จ่าย', 'ประเมินราคา', 'แพ็กเกจ'],
      reply: 'ราคาของโครงการขึ้นอยู่กับขอบเขตงานครับ:\n- พัฒนาเว็บแอปพลิเคชัน/ระบบธุรกิจ เริ่มต้นที่ประมาณ ฿45,000 - ฿95,000\n- ติดตั้งระบบ AI / LLM / OCR เริ่มต้นที่ ฿65,000\n- บริการดูแล Cloud Infrastructure เริ่มต้นที่ ฿35,000/ระบบ\nท่านสามารถทดลองคำนวณราคาแบบเรียลไทม์ได้ที่ส่วน "คำนวณราคาโปรเจกต์" (Cost Estimator) ด้านบนของเว็บเราได้ทันทีครับ!'
    },
    {
      keywords: ['cloud', 'เซิร์ฟเวอร์', 'server', 'aws', 'gcp', 'facilities', 'ดูแล'],
      reply: 'ทีมงาน Cloud Architect ของเราพร้อมออกแบบและดูแล Cloud Infrastructure บน AWS, Google Cloud และ Azure ทั้งการเซ็ตอัป Kubernetes, CI/CD, ระบบสำรองข้อมูลอัตโนมัติ และการดูแลความปลอดภัยระบบตลอด 24/7 (SLA 99.99%) ครับ'
    },
    {
      keywords: ['ติดต่อ', 'เบอร์', 'โทร', 'อีเมล', 'ขอใบเสนอราคา', 'นัดหมาย'],
      reply: 'ท่านสามารถติดต่อเราได้ทาง:\n- เบอร์โทรศัพท์: 097-132-8145 (เปิดบริการ 24 ชั่วโมง)\n- อีเมล: thaiaisolution@outlook.com\n- กรอกฟอร์มขอใบเสนอราคาในส่วน "ติดต่อเรา" ด้านล่างของเว็บไซต์ได้ตลอด 24 ชม. ครับ'
    },
    {
      keywords: ['ai', 'chatbot', 'แชทบอท', 'ocr', 'ฉลาด', 'โมเดล'],
      reply: 'เราเชี่ยวชาญการสร้าง Custom AI Solutions สำหรับองค์กร เช่น AI Chatbot เชื่อมต่อฐานข้อมูลบริษัท, Document AI สำหรับสแกนเอกสารและใบเสร็จ (OCR), และการทำ Agentic Workflow ที่ช่วยทำงานอัตโนมัติแบบ end-to-end ครับ'
    }
  ];

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', text: query }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched = knowledgeBase.find((item) =>
        item.keywords.some((kw) => lower.includes(kw.toLowerCase()))
      );

      let responseText = matched
        ? matched.reply
        : `ขอบพระคุณสำหรับข้อสอบถามครับ เรื่อง "${query}" ทางทีมวิศวกรและผู้เชี่ยวชาญของ บริษัท ไทยเอไอ โซลูชั่น จำกัด พร้อมให้คำปรึกษาและออกแบบระบบให้ตรงความต้องการสูงสุด ท่านสามารถเลื่อนลงไปยังส่วน "ติดต่อเรา" เพื่อส่งรายละเอียดหรือขอใบเสนอราคาอย่างเป็นทางการได้เลยครับ`;

      setMessages((prev) => [...prev, { role: 'assistant', text: responseText }]);
      setIsTyping(false);
    }, 700);
  };

  useEffect(() => {
    if (messages.length > 1 || isTyping) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isTyping]);

  return (
    <section id="ai-assistant" className="py-24 relative bg-navy-900/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.aiAssistant.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.aiAssistant.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.aiAssistant.subtitle}
          </p>
        </div>

        {/* Chat Container */}
        <div className="glass-panel rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col h-[560px]">
          {/* Chat Header Bar */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 p-[2px]">
                  <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-navy-950" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  {t.aiAssistant.assistantName}
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-brand-500/20 text-cyan-300 font-mono">
                    AI 2026
                  </span>
                </h4>
                <p className="text-[11px] text-emerald-400 font-medium">
                  {t.aiAssistant.status}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setMessages([
                  {
                    role: 'assistant',
                    text: 'รีเซ็ตบทสนทนาเรียบร้อยครับ มีเรื่องบริการไอที เว็บ หรือ AI ข้อไหนให้ผมช่วยเหลือเพิ่มเติมไหมครับ?'
                  }
                ])
              }
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="รีเซ็ตการสนทนา"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-brand-600/30 border border-brand-400/30 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-md shadow-brand-500/10'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 shadow-md'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-lg bg-brand-600/30 border border-brand-400/30 flex items-center justify-center text-cyan-300 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-800/90 rounded-2xl px-4 py-3 border border-slate-700/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Suggested Prompts */}
          <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 overflow-x-auto flex gap-2 no-scrollbar">
            {t.aiAssistant.suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-3 h-3 text-cyan-400" />
                <span>{q}</span>
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 bg-slate-900/95 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.aiAssistant.placeholder}
                className="flex-1 bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">{t.aiAssistant.sendBtn}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
