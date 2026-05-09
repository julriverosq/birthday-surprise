"use client";

import { motion } from "framer-motion";
import PolaroidCard from "@/components/PolaroidCard";
import FloatingPreview from "@/components/FloatingPreview";

interface Props {
  senderName: string;
  setSenderName: (v: string) => void;
  recipientName: string;
  setRecipientName: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  polaroidImage: string;
  onNext: () => void;
}

export default function NombresYMensaje({
  senderName,
  setSenderName,
  recipientName,
  setRecipientName,
  message,
  setMessage,
  polaroidImage,
  onNext,
}: Props) {
  const canContinue = senderName.trim() && recipientName.trim();

  return (
    <motion.div
      className="flex w-full h-screen overflow-hidden max-md:flex-col max-md:h-auto max-md:min-h-screen max-md:overflow-visible"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="w-[660px] shrink-0 flex flex-col justify-center px-[80px] py-[40px] bg-white max-md:w-full max-md:px-6 max-md:py-8">
        <span className="text-[#5E7CE2] text-[14px] font-semibold tracking-wide uppercase mb-2">
          PASO 1 DE 4
        </span>
        <div className="h-[3px] flex gap-1 mb-8 w-[480px] max-md:w-full">
          <div className="flex-1 bg-[#5E7CE2] rounded-full" />
          <div className="flex-[3] bg-gray-200 rounded-full" />
        </div>

        <h2 className="font-display text-[42px] leading-[50px] text-foreground mb-3 max-md:text-[28px] max-md:leading-[34px]">
          Personaliza tu regalo
        </h2>
        <p className="text-[#8B7B6B] text-[16px] leading-[24px] mb-10 max-w-[500px] max-md:text-[14px] max-md:mb-6">
          Hazlo único. Ingresa los nombres y escribe un mensaje especial
          para esa persona.
        </p>

        <div className="flex flex-col gap-6 max-w-[500px]">
          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-semibold text-foreground">
              Tu nombre (Remitente)
            </span>
            <div className="relative">
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Fran"
                className="w-full border border-gray-300 rounded-full px-5 py-3.5 text-[16px] focus:outline-none focus:border-[#5E7CE2] transition-colors"
              />
              {senderName.trim() && (
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-semibold text-foreground">
              Nombre del destinatario
            </span>
            <div className="relative">
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Juli"
                className="w-full border border-gray-300 rounded-full px-5 py-3.5 text-[16px] focus:outline-none focus:border-[#5E7CE2] transition-colors"
              />
              {recipientName.trim() && (
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold tracking-wide uppercase text-[#5E7CE2]">
                MENSAJE ESPECIAL
              </span>
              <span className="text-[12px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                {message.length} / 20
              </span>
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 20))}
              placeholder="Te quiero"
              maxLength={20}
              className="w-full border border-gray-300 rounded-full px-5 py-3.5 text-[16px] focus:outline-none focus:border-[#5E7CE2] transition-colors"
            />
            <span className="text-[12px] text-[#8B7B6B]">
              Mínimo 2 caracteres, máximo 20
            </span>
          </label>
        </div>

        <button
          onClick={onNext}
          disabled={!canContinue}
          className="mt-10 flex items-center justify-center w-[160px] h-[52px] bg-[#5E7CE2] rounded-[10px] text-white text-[16px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed max-md:w-full max-md:mt-6"
        >
          Siguiente
        </button>
      </div>

      {/* Right Column */}
      <div className="flex-1 bg-[#E8E4F0] flex flex-col items-center justify-center gap-4 min-h-screen max-md:hidden">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#5E7CE2]" />
          <span className="text-[13px] font-medium text-foreground uppercase tracking-wide">
            VISTA PREVIA EN VIVO
          </span>
        </div>
        <PolaroidCard
          image={polaroidImage}
          senderName={senderName}
          recipientName={recipientName}
          message={message}
        />
        <p className="text-[13px] text-[#8B7B6B]">
          La vista previa se actualiza automáticamente
        </p>
      </div>

      <div className="hidden max-md:block">
        <FloatingPreview image={polaroidImage} senderName={senderName} recipientName={recipientName} message={message} />
      </div>
    </motion.div>
  );
}
