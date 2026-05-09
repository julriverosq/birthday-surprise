"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CakeSvg from "@/components/CakeSvg";
import CandleSvg from "@/components/CandleSvg";
import FloatingPreview from "@/components/FloatingPreview";
import type { CandlePosition } from "@/lib/types";

const audioLabels: Record<string, string> = {
  "happy-birthday": "Happy Birthday",
  instrumental: "Instrumental",
  "las-manianitas": "Las Mañanitas",
};

interface Props {
  link: string;
  candlePositions: CandlePosition[];
  senderName: string;
  recipientName: string;
  audio: string;
  polaroidImage: string;
  message: string;
}

export default function LinkGenerado({ link, candlePositions, senderName, recipientName, audio, polaroidImage, message }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="flex w-full min-h-screen max-md:flex-col"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="w-[660px] shrink-0 flex flex-col justify-center px-[80px] py-[80px] bg-white max-md:w-full max-md:px-6 max-md:py-8">
        <span className="text-[#5E7CE2] text-[14px] font-semibold tracking-wide uppercase mb-2">
          LISTO
        </span>
        <div className="h-[3px] flex items-center gap-2 mb-8 w-[480px] max-md:w-full">
          <div className="flex-1 bg-[#5E7CE2] rounded-full h-[3px]" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6BCB77" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="font-display text-[42px] leading-[50px] text-foreground mb-3 max-md:text-[28px] max-md:leading-[34px]">
          Tu regalo está listo
        </h2>
        <p className="text-[#8B7B6B] text-[16px] mb-8 max-w-[500px] max-md:text-[14px] max-md:mb-6">
          Copia el link y envíalo por WhatsApp, mensaje o donde quieras.
        </p>

        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden mb-8 max-w-[500px]">
          <span className="flex-1 px-5 py-4 text-[15px] text-foreground truncate font-mono">
            {link || "Generando enlace..."}
          </span>
          <button onClick={handleCopy} disabled={!link} className="px-7 py-4 bg-[#5E7CE2] text-white text-[15px] font-semibold hover:opacity-90 disabled:opacity-40">
            {copied ? "¡Copiado!" : "Copiar"}
          </button>
        </div>

        <button onClick={() => (window.location.href = "/crear")} className="flex items-center justify-center w-fit px-8 h-[52px] border border-gray-300 rounded-[10px] text-[15px] font-medium text-foreground hover:bg-gray-50 max-md:w-full">
          Crear otro regalo
        </button>
      </div>

      {/* Right Column - simulates recipient view */}
      <div className="flex-1 bg-[#0A192F] flex flex-col items-center justify-center gap-4 min-h-screen relative max-md:hidden">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#5E7CE2]" />
          <span className="text-[13px] font-medium text-foreground uppercase tracking-wide">VISTA PREVIA EN VIVO</span>
        </div>
        {audio && (
          <div className="absolute top-6 right-6 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5E7CE2" strokeWidth="2"><path d="M9 18V5l12-2v13M9 18c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3zM21 16c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3z" /></svg>
            <span className="text-[14px] text-foreground">{audioLabels[audio]} sonando...</span>
          </div>
        )}
        <p className="text-[13px] text-gray-400">{senderName} te envió un regalo</p>
        <div className="relative w-[420px] h-[420px]">
          <CakeSvg className="w-full h-full" />
          {candlePositions.map((pos, i) => (
            <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
              <CandleSvg />
            </div>
          ))}
        </div>
        <h2 className="font-handwriting text-[42px] text-white">Feliz Cumpleaños {recipientName}</h2>
      </div>

      <div className="hidden max-md:block">
        <FloatingPreview image={polaroidImage} senderName={senderName} recipientName={recipientName} message={message} />
      </div>
    </motion.div>
  );
}
