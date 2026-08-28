import React from 'react';
import { Award, CheckCircle, TrendingUp, ExternalLink, Sparkles, Building2, ShieldCheck } from 'lucide-react';

export default function CaseStudies({ t }) {
  const caseData = [
    {
      title: "ระบบ Enterprise AI Document OCR & Verification",
      category: "ซอฟต์แวร์ปัญญาประดิษฐ์ (วัตถุประสงค์ 8)",
      desc: "พัฒนาระบบสแกนเอกสารสัญญาและใบแจ้งหนี้อัตโนมัติด้วย AI Vision & Deep Learning เชื่อมต่อเข้าระบบ ERP ขององค์กรแบบเรียลไทม์",
      metrics: "ลดเวลาประมวลผลจาก 2 ชั่วโมง เหลือเพียง 3 วินาที/เอกสาร",
      impact: "ประหยัดต้นทุนค่าแรง 85% และความแม่นยำสูงถึง 99.4%",
      tech: ["Python", "PyTorch", "FastAPI", "React", "Docker"]
    },
    {
      title: "Smart Cloud Logistics & Warehouse Platform (SaaS)",
      category: "เว็บเพจและระบบเครือข่ายอัจฉริยะ",
      desc: "ออกแบบและพัฒนาเว็บแอปพลิเคชันบริหารคลังสินค้าอัจฉริยะ เชื่อมต่อ API ขนส่งชั้นนำ เครือข่าย IoT เซ็นเซอร์ และระบบพิมพ์ใบปะหน้าอัตโนมัติ",
      metrics: "รองรับคำสั่งซื้อกว่า 100,000+ รายการต่อวัน",
      impact: "ลดข้อผิดพลาดในการจัดส่งสินค้าลง 98%",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"]
    },
    {
      title: "Multi-Cloud Migration & 24/7 Managed Infrastructure",
      category: "การจัดการสิ่งอำนวยความสะดวกคอมพิวเตอร์ (วัตถุประสงค์ 9)",
      desc: "วางโครงสร้างพื้นฐานระบบคลาวด์แบบ High Availability บน Google Cloud และ AWS พร้อมระบบ Kubernetes Auto-scaling และ 24/7 Alert Monitoring",
      metrics: "SLA Uptime 99.99% ตลอดทั้งปี",
      impact: "ประหยัดค่าใช้จ่าย Server รายเดือนลง 35%",
      tech: ["Kubernetes", "Google Cloud", "AWS", "Terraform", "Grafana"]
    }
  ];

  return (
    <section id="solutions" className="py-24 relative bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.caseStudies.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.caseStudies.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.caseStudies.subtitle}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseData.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800 hover:border-cyan-400/40 relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Metrics Callout */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>{item.metrics}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {item.impact}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                  {item.tech.map((tItem, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
