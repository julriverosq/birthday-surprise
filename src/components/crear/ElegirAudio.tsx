"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import CakeSvg from "@/components/CakeSvg";
import FloatingPreview from "@/components/FloatingPreview";

const options = [
  { id: "las-manianitas", label: "Las Mañanitas", desc: "Tradicional mexicana — 0:60", src: "/las mañanitas.mp3" },
  { id: "happy-birthday", label: "Happy Birthday", desc: "Divertida en inglés — 0:60", src: "/happy-birthday.mp3" },
  { id: "instrumental", label: "Instrumental", desc: "Melodía suave — 0:60", src: "/instrumental.mp3" },
];

interface Props {
  selected: string;
  onSelect: (id: string) => void;
  senderName: string;
  recipientName: string;
  message: string;
  polaroidImage: string;
  onNext: () => void;
  onBack: () => void;
}

export default function ElegirAudio({ selected, onSelect, senderName, recipientName, message, polaroidImage, onNext, onBack }: Props) {
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    setPlaying(null);
  };

  const handlePlay = (id: string, src: string) => {
    stopAudio();
    if (playing === id) return;
    const audio = new Audio(src);
    audio.play();
    audioRef.current = audio;
    setPlaying(id);
    onSelect(id);
    timeoutRef.current = setTimeout(() => { audio.pause(); setPlaying(null); }, 10000);
    audio.onended = () => setPlaying(null);
  };

  const handleNext = () => { stopAudio(); onNext(); };
  const handleBack = () => { stopAudio(); onBack(); };

  return (
    <motion.div
      className="flex w-full h-screen overflow-hidden max-md:flex-col max-md:h-auto max-md:min-h-screen max-md:overflow-visible"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="w-[660px] shrink-0 flex flex-col justify-center px-[80px] py-[40px] bg-white max-md:w-full max-md:px-6 max-md:py-8">
        <span className="text-[#5E7CE2] text-[14px] font-semibold tracking-wide uppercase mb-2">
          PASO 3 DE 4
        </span>
        <div className="h-[3px] flex gap-1 mb-8 w-[480px] max-md:w-full max-md:mb-6">
          <div className="flex-[3] bg-[#5E7CE2] rounded-full" />
          <div className="flex-[1] bg-gray-200 rounded-full" />
        </div>

        <h2 className="font-display text-[42px] leading-[50px] text-foreground mb-3 max-md:text-[28px] max-md:leading-[34px]">
          Elige la música
        </h2>
        <p className="text-[#8B7B6B] text-[16px] mb-8 max-md:text-[14px] max-md:mb-6">
          Sonará 60s antes de apagar las velas
        </p>

        <div className="flex flex-col gap-3 max-w-[540px]">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handlePlay(opt.id, opt.src)}
              className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${
                selected === opt.id ? "border-[#5E7CE2] bg-[#5E7CE2]/5" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${playing === opt.id ? "bg-[#5E7CE2]" : "bg-gray-100"}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={playing === opt.id ? "#FFFFFF" : "#6B5D4F"}>
                  {playing === opt.id ? (<><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></>) : (<path d="M8 5v14l11-7z" />)}
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[16px] font-semibold text-foreground">{opt.label}</p>
                <p className="text-[14px] text-[#8B7B6B]">{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-4 mt-10 max-md:mt-6 max-md:gap-3">
          <button onClick={handleBack} className="flex items-center justify-center w-[130px] h-[52px] border border-gray-300 rounded-[10px] text-[15px] font-medium text-foreground hover:bg-gray-50 transition-colors max-md:flex-1 max-md:w-auto">
            Atrás
          </button>
          <button onClick={handleNext} disabled={!selected} className="flex items-center justify-center w-[160px] h-[52px] bg-[#5E7CE2] rounded-[10px] text-white text-[16px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed max-md:flex-1 max-md:w-auto">
            Siguiente
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#E8E4F0] flex flex-col items-center justify-center gap-4 min-h-screen max-md:hidden">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#5E7CE2]" />
          <span className="text-[13px] font-medium text-foreground uppercase tracking-wide">VISTA PREVIA EN VIVO</span>
        </div>
        {selected && (
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5E7CE2" strokeWidth="2"><path d="M9 18V5l12-2v13M9 18c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3zM21 16c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3z" /></svg>
            <span className="text-[14px] text-foreground">{options.find((o) => o.id === selected)?.label} sonando...</span>
          </div>
        )}
        <p className="text-[13px] text-[#8B7B6B]">{senderName || "..."} te envió un regalo</p>
        <CakeSvg className="w-[420px] h-[420px]" />
      </div>

      <div className="hidden max-md:block">
        <FloatingPreview image={polaroidImage} senderName={senderName} recipientName={recipientName} message={message} />
      </div>
    </motion.div>
  );
}
