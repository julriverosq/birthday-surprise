"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import type { BirthdaySurprise } from "@/lib/types";
import PolaroidCard from "@/components/PolaroidCard";

interface Props {
  data: BirthdaySurprise;
}

export default function VistaFinal({ data }: Props) {
  const polaroidRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!polaroidRef.current) return;

    try {
      const canvas = await html2canvas(polaroidRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], "feliz-cumpleanos.png", { type: "image/png" });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Feliz Cumpleaños ${data.recipient_name}`,
          });
        } else {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "feliz-cumpleanos.png";
          link.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch {
      // User cancelled share or not supported
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full min-h-screen bg-dark-bg gap-6 px-4 md:px-6 py-8 md:py-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div ref={polaroidRef} className="scale-90 md:scale-100">
        <PolaroidCard
          image={data.polaroid_image}
          senderName={data.sender_name}
          recipientName={data.recipient_name}
          message={data.message}
        />
      </div>

      <div className="flex gap-3 md:gap-4 mt-4">
        <button
          onClick={() => (window.location.href = "/crear")}
          className="flex items-center justify-center px-4 md:px-6 h-[44px] md:h-[48px] border border-gray-500 rounded-[10px] text-[14px] md:text-[15px] font-medium text-white hover:bg-white/10 transition-colors"
        >
          Crear
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center px-5 md:px-6 h-[44px] md:h-[48px] bg-primary rounded-[10px] text-white text-[14px] md:text-[15px] font-semibold hover:opacity-90 transition-opacity"
        >
          Compartir
        </button>
      </div>

      <p className="text-[11px] md:text-[13px] text-gray-500 mt-6 md:mt-8 text-center">
        Diseño creado por Juli. y enviado con cariño
      </p>
    </motion.div>
  );
}
