"use client";

import { motion } from "framer-motion";
import CakeSvg from "@/components/CakeSvg";
import CandleSvg from "@/components/CandleSvg";
import type { CandlePosition } from "@/lib/types";

const audioLabels: Record<string, string> = {
  "happy-birthday": "Happy Birthday",
  instrumental: "Instrumental",
  "las-manianitas": "Las Mañanitas",
};

interface Props {
  positions: CandlePosition[];
  onPositionsChange: (positions: CandlePosition[]) => void;
  senderName: string;
  audio: string;
  onNext: () => void;
  onBack: () => void;
}

export default function ColocacionVelas({ positions, onPositionsChange, senderName, audio, onNext, onBack }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (positions.length >= 30) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onPositionsChange([...positions, { x, y }]);
  };

  return (
    <motion.div
      className="flex w-full min-h-screen max-md:flex-col"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="w-[660px] shrink-0 flex flex-col justify-center px-[80px] py-[80px] bg-white max-md:w-full max-md:px-6 max-md:py-6">
        <span className="text-[#5E7CE2] text-[14px] font-semibold tracking-wide uppercase mb-2">
          PASO 4 DE 4
        </span>
        <div className="h-[3px] flex mb-8 w-[480px] max-md:w-full max-md:mb-4">
          <div className="flex-1 bg-[#5E7CE2] rounded-full" />
        </div>

        <h2 className="font-display text-[42px] leading-[50px] text-foreground mb-3 max-md:text-[28px] max-md:leading-[34px]">
          Coloca las velas
        </h2>
        <p className="text-[#8B7B6B] text-[16px] leading-[24px] mb-8 max-w-[500px] max-md:text-[14px] max-md:mb-4">
          Haz click sobre la torta y podrás agregarle velas. Puedes colocar
          hasta 30 velas máximo.
        </p>

        {/* Cake inline - Mobile only */}
        <div className="hidden max-md:block relative w-full aspect-square max-w-[320px] mx-auto cursor-crosshair mb-4" onClick={handleClick}>
          <CakeSvg className="w-full h-full" />
          {positions.map((pos, i) => (
            <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
              <CandleSvg />
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-3 border border-gray-200 rounded-lg px-5 py-4 w-fit mb-5">
          <span className="text-[36px] font-bold text-foreground">{positions.length}</span>
          <span className="text-[16px] text-[#8B7B6B]">/ 30 velas</span>
        </div>

        <div className="flex gap-3 mb-10 max-md:mb-6">
          <button onClick={() => onPositionsChange(positions.slice(0, -1))} disabled={positions.length === 0} className="px-5 py-2.5 border border-gray-300 rounded-[8px] text-[14px] font-medium text-foreground hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
            Quitar última
          </button>
          <button onClick={() => onPositionsChange([])} disabled={positions.length === 0} className="px-5 py-2.5 border border-gray-300 rounded-[8px] text-[14px] font-medium text-foreground hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
            Reiniciar
          </button>
        </div>

        <div className="flex gap-4 max-md:gap-3">
          <button onClick={onBack} className="flex items-center justify-center w-[130px] h-[52px] border border-gray-300 rounded-[10px] text-[15px] font-medium text-foreground hover:bg-gray-50 max-md:flex-1 max-md:w-auto">
            Atrás
          </button>
          <button onClick={onNext} disabled={positions.length === 0} className="flex items-center justify-center px-8 h-[52px] bg-[#5E7CE2] rounded-[10px] text-white text-[16px] font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed max-md:flex-1 max-md:w-auto">
            Generar Link
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#E8E4F0] flex flex-col items-center justify-center gap-4 min-h-screen max-md:hidden">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#5E7CE2]" />
          <span className="text-[13px] font-medium text-foreground uppercase tracking-wide">VISTA PREVIA EN VIVO</span>
        </div>
        {audio && (
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5E7CE2" strokeWidth="2"><path d="M9 18V5l12-2v13M9 18c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3zM21 16c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3z" /></svg>
            <span className="text-[14px] text-foreground">{audioLabels[audio]} sonando...</span>
          </div>
        )}
        <p className="text-[13px] text-[#8B7B6B]">{senderName || "..."} te envió un regalo</p>
        <div className="relative w-[420px] h-[420px] cursor-crosshair" onClick={handleClick}>
          <CakeSvg className="w-full h-full" />
          {positions.map((pos, i) => (
            <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
              <CandleSvg />
            </div>
          ))}
        </div>
        <p className="text-[13px] text-[#8B7B6B]">Haz click sobre la torta para colocar velas</p>
      </div>
    </motion.div>
  );
}
