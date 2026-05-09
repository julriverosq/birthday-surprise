"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PolaroidCard from "@/components/PolaroidCard";
import FloatingPreview from "@/components/FloatingPreview";

const options = [
  { id: "amigos", label: "Amigos", desc: "Ramo colorido y casual", src: "/amigos.svg" },
  { id: "Parientes", label: "Parientes", desc: "Arreglo cálido y familiar", src: "/Parientes.svg" },
  { id: "elegante", label: "Elegante", desc: "Para alguien mayor o autoridad", src: "/elegante.svg" },
];

interface Props {
  selected: string;
  onSelect: (id: string) => void;
  senderName: string;
  recipientName: string;
  message: string;
  onNext: () => void;
  onBack: () => void;
}

export default function ElegirPolaroid({ selected, onSelect, senderName, recipientName, message, onNext, onBack }: Props) {
  return (
    <motion.div
      className="flex w-full h-screen overflow-hidden max-md:flex-col max-md:h-auto max-md:min-h-screen max-md:overflow-visible"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="w-[660px] shrink-0 flex flex-col justify-center px-[80px] py-[40px] bg-white max-md:w-full max-md:px-6 max-md:py-8">
        <span className="text-[#5E7CE2] text-[14px] font-semibold tracking-wide uppercase mb-2">
          PASO 2 DE 4
        </span>
        <div className="h-[3px] flex gap-1 mb-8 w-[480px] max-md:w-full max-md:mb-6">
          <div className="flex-[2] bg-[#5E7CE2] rounded-full" />
          <div className="flex-[2] bg-gray-200 rounded-full" />
        </div>

        <h2 className="font-display text-[42px] leading-[50px] text-foreground mb-3 max-md:text-[28px] max-md:leading-[34px]">
          Elige una imagen
        </h2>
        <p className="text-[#8B7B6B] text-[16px] leading-[24px] mb-8 max-w-[500px] max-md:text-[14px] max-md:mb-5">
          Escoge la foto polaroid que acompañará tu regalo. Se mostrará en
          la tarjeta final.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8 max-md:grid-cols-2 max-md:gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                selected === opt.id ? "border-[#5E7CE2] bg-[#5E7CE2]/5" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image src={opt.src} alt={opt.label} width={120} height={120} className="w-[120px] h-[120px] object-cover rounded-lg mb-2" />
              <span className="text-[14px] font-semibold text-foreground">{opt.label}</span>
              <span className="text-[12px] text-[#8B7B6B]">{opt.desc}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-4 mt-10 max-md:mt-6 max-md:gap-3">
          <button onClick={onBack} className="flex items-center justify-center w-[130px] h-[52px] border border-gray-300 rounded-[10px] text-[15px] font-medium text-foreground hover:bg-gray-50 transition-colors max-md:flex-1 max-md:w-auto">
            Atrás
          </button>
          <button onClick={onNext} disabled={!selected} className="flex items-center justify-center w-[160px] h-[52px] bg-[#5E7CE2] rounded-[10px] text-white text-[16px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed max-md:flex-1 max-md:w-auto">
            Siguiente
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#E8E4F0] flex flex-col items-center justify-center gap-4 min-h-screen max-md:hidden">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#5E7CE2]" />
          <span className="text-[13px] font-medium text-foreground uppercase tracking-wide">VISTA PREVIA EN VIVO</span>
        </div>
        <PolaroidCard image={selected} senderName={senderName} recipientName={recipientName} message={message} />
        <p className="text-[13px] text-[#8B7B6B]">La vista previa se actualiza automáticamente</p>
      </div>

      <div className="hidden max-md:block">
        <FloatingPreview image={selected} senderName={senderName} recipientName={recipientName} message={message} />
      </div>
    </motion.div>
  );
}
