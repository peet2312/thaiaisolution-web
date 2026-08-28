import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw, Layers, ShieldCheck, Terminal, Cpu, CheckCircle } from 'lucide-react';

export default function AIAssistantPage({ t, setPage }) {
  const [activeMode, setActiveMode] = useState('general');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      mode: 'general',
      text: 'สวัสดีครับ! ยินดีต้อนรับสู่ศูนย์ผู้ช่วย AI บริษัท ไทยเอไอ โซลูชั่น จำกัด (THAI AI SOLUTION CO., LTD.)\nผมพร้อมให้คำปรึกษาเกี่ยวกับบริการทำเว็บไซต์, การพัฒนาซอฟต์แวร์ AI, การจัดการ Cloud และการตลาดออนไลน์ 24 ชั่วโมง สอบถามได้ทันทีครับ!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  const modePrompts = {
    general: [
      "บริษัทให้บริการอะไรบ้าง และมีเลขทะเบียนนิติบุคคลอะไร?",
      "สนใจทำเว็บแอปพลิเคชันระบบองค์กร ราคาประมาณเท่าไหร่?",
      "ขั้นตอนการเริ่มโปรเจกต์และขอใบเสนอราคาทำอย่างไร?",
      "มีบริการดูแลระบบตลอด 24 ชั่วโมงไหม?"
    ],
    architect: [
      "แนะนำสถาปัตยกรรม Cloud ที่รองรับ 100k ผู้ใช้งาน/วัน",
      "การจัดการ Kubernetes และ Docker ทำอย่างไรให้ปลอดภัย?",
      "มีบริการย้ายระบบจาก On-Premise สู่ AWS/GCP หรือไม่?",
      "การวางระบบ CI/CD Pipeline ช่วยลด Downtime ได้อย่างไร?"
    ],
    ai_expert: [
      "อยากสร้าง AI Chatbot ตอบคำถามจากเอกสาร PDF ของบริษัท (RAG)",
      "ระบบ Document OCR สแกนใบเสร็จและบัตรประชาชนแม่นยำแค่ไหน?",
      "Agentic AI ทำงานอย่างไร และประยุกต์ใช้กับธุรกิจอะไรได้บ้าง?",
      "อยากติดตั้ง AI ภายในเครื่องเซิร์ฟเวอร์ตัวเอง (Local LLM) ทำได้ไหม?"
    ],
    compliance: [
      "เลขทะเบียนนิติบุคคล 0905569007271 ออกใบกำกับภาษีได้ไหม?",
      "วัตถุประสงค์ข้อ (8), (9), (10) คืออะไร?",
      "การพัฒนาซอฟต์แวร์มีมาตรฐานความปลอดภัยข้อมูลและ PDPA อย่างไร?",
      "ขอหนังสือรับรองบริษัทและตราประทับนิติบุคคลได้จากที่ไหน?"
    ]
  };

  const handleSend = (queryText) => {
    const text = (queryText || input).trim();
    if (!text) return;

    const newMsgs = [...messages, { role: 'user', text, mode: activeMode }];
    setMessages(newMsgs);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('ราคา') || lower.includes('cost') || lower.includes('budget') || lower.includes('แพ็กเกจ')) {
        reply = '💰 การประเมินงบประมาณขึ้นอยู่กับสเกลโครงการครับ:\n- เซลเพจปิดการขาย: เริ่มต้น ฿18,000\n- เว็บไซต์บริษัท (Corporate): เริ่มต้น ฿35,000\n- ร้านค้าออนไลน์ (E-Commerce): เริ่มต้น ฿55,000\n- ซอฟต์แวร์ AI / Web App: เริ่มต้น ฿65,000\n- การตลาดออนไลน์ FB/Google/TikTok/SEO: เริ่มต้น ฿3,900/เดือน\n\nท่านสามารถไปที่หน้า "คำนวณราคา & ขอใบเสนอราคา" เพื่อเลือกสเปกและออกเอกสารจำลองได้ทันทีครับ!';
      } else if (lower.includes('ทะเบียน') || lower.includes('0905569007271') || lower.includes('กฎหมาย') || lower.includes('นิติบุคคล')) {
        reply = '🏛️ ข้อมูลการจดทะเบียนนิติบุคคล:\nบริษัท ไทยเอไอ โซลูชั่น จำกัด จดทะเบียนตามประมวลกฎหมายแพ่งและพาณิชย์ เลขทะเบียนนิติบุคคล 0905569007271 พร้อมวัตถุประสงค์ข้อ (8) เขียนโปรแกรม (9) จัดการสิ่งอำนวยความสะดวกคอมพิวเตอร์ และ (10) ให้คำปรึกษาทางด้านคอมพิวเตอร์ สามารถออกใบกำกับภาษีได้ 100% ครับ';
      } else if (lower.includes('ai') || lower.includes('chatbot') || lower.includes('rag') || lower.includes('ocr')) {
        reply = '🤖 ความเชี่ยวชาญด้าน AI:\nทีมวิศวกรของเราเชี่ยวชาญการต่อยอด Enterprise RAG, Private Document OCR, Voice Agents, Vision Intelligence และการเชื่อมต่อ Large Language Models (LLM) เข้ากับฐานข้อมูลภายในองค์กรอย่างปลอดภัยตามมาตรฐานความปลอดภัย';
      } else {
        reply = `✨ ขอบคุณสำหรับคำถามครับ! ในส่วนของ "${text}" ทีมงานวิศวกรซอฟต์แวร์และที่ปรึกษา AI ของ บริษัท ไทยเอไอ โซลูชั่น จำกัด ยินดีช่วยออกแบบโซลูชันให้ตรงกับโจทย์ธุรกิจของท่านที่สุด ให้บริการ 24 ชม. ติดต่อโดยตรงที่เบอร์ 097-132-8145 หรืออีเมล thaiaisolution@outlook.com ครับ`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: reply, mode: activeMode }]);
      setIsTyping(false);
    }, 600);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const aiContent = t.aiStudioPage || t.aiPage || {
    badge: 'AI Consultant Workspace',
    title: 'ศูนย์ผู้ช่วย AI อัจฉริยะ (Thai AI Studio)',
    subtitle: 'ทดลองใช้งานระบบ AI ปรึกษาขอบเขตงาน สถาปัตยกรรมระบบ และสอบถามข้อมูลบริษัทได้ตลอด 24 ชั่วโมง',
    modes: []
  };

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-brand-700">
          <Bot className="w-3.5 h-3.5 text-brand-600" />
          <span>{aiContent.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {aiContent.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          {aiContent.subtitle}
        </p>
      </div>

      {/* Modes Filter Pills */}
      {aiContent.modes && aiContent.modes.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {aiContent.modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeMode === mode.id
                  ? 'bg-gradient-to-r from-brand-600 to-blue-600 text-white shadow-md shadow-brand-600/25'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {mode.name}
            </button>
          ))}
        </div>
      )}

      {/* Studio Chat Terminal Window */}
      <div className="sge-card rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-2xl flex flex-col h-[580px]">
        {/* Terminal Title Bar */}
        <div className="bg-slate-100 px-4 sm:px-6 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="text-xs font-mono text-slate-700 font-bold flex items-center gap-2">
              <span>thai-ai-studio: ~/{activeMode}</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-blue-50 text-brand-700 border border-blue-200">
                ACTIVE
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              setMessages([
                {
                  role: 'assistant',
                  mode: activeMode,
                  text: 'เริ่มต้นบทสนทนาใหม่เรียบร้อยครับ มีเรื่องบริการไอที เว็บ หรือระบบ AI หัวข้อไหนที่ต้องการให้ผมวิเคราะห์เพิ่มเติมไหมครับ?'
                }
              ])
            }
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            title="รีเซ็ตการสนทนา"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-brand-700 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-brand-600 to-blue-600 text-white shadow-md shadow-brand-600/10'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                }`}
              >
                {msg.text}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-brand-700 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 border border-slate-200 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Prompts for this mode */}
        <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 overflow-x-auto flex gap-2 no-scrollbar">
          {(modePrompts[activeMode] || modePrompts.general).map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-white hover:bg-slate-200 text-slate-700 hover:text-brand-700 border border-slate-200 transition-colors font-medium shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
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
              placeholder="พิมพ์คำถามหรือโจทย์โปรเจกต์ของคุณที่นี่..."
              className="flex-1 bg-slate-50 border border-slate-300 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md shadow-brand-600/20"
            >
              <Send className="w-4 h-4" />
              <span>ส่งข้อความ</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
