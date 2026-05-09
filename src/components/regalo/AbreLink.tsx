"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PolaroidCard from "@/components/PolaroidCard";
import FloatingPreview from "@/components/FloatingPreview";
import type { BirthdaySurprise } from "@/lib/types";

interface Props {
  data: BirthdaySurprise;
  onNext: () => void;
}

export default function AbreLink({ data, onNext }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      className="flex flex-col md:flex-row w-full min-h-screen cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onNext}
    >
      {/* Main content - White bg on mobile, left column on desktop */}
      <div className="w-full md:w-[660px] shrink-0 flex flex-col justify-center px-6 md:px-20 py-12 md:py-20 bg-white min-h-screen md:min-h-0">
        <div className="flex items-center gap-2 pb-3">
          <div className="w-[6px] h-[6px] rounded-full bg-primary" />
          <span className="text-[13px] text-text-secondary">
            {data.sender_name} te envió un regalo
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="font-display text-[36px] md:text-[48px] leading-[40px] md:leading-[52px] text-foreground">
            Feliz Cumpleaños,
          </h1>
          <span className="font-handwriting text-[64px] md:text-[84px] font-medium leading-[72px] md:leading-[96px] text-foreground pl-[6px]">
            {data.recipient_name}.
          </span>
        </div>

        <p className="text-[15px] md:text-[16px] leading-[24px] text-text-secondary pt-6 max-w-[480px]">
          {isMobile
            ? `Toca la pantalla para revelar la sorpresa que ${data.sender_name} preparó para ti.`
            : `Haz click en la pantalla para revelar la sorpresa que ${data.sender_name} preparó para ti.`}
        </p>
      </div>

      {/* Right Column - Dark - Desktop only */}
      <div className="hidden md:flex flex-1 bg-dark-bg items-center justify-center min-h-screen">
        <div className="-rotate-2">
          <PolaroidCard
            image={data.polaroid_image}
            senderName={data.sender_name}
            recipientName={data.recipient_name}
            message={data.message}
          />
        </div>
      </div>

      {/* Floating polaroid preview - Mobile only */}
      <div className="md:hidden">
        <FloatingPreview
          image={data.polaroid_image}
          senderName={data.sender_name}
          recipientName={data.recipient_name}
          message={data.message}
        />
      </div>
    </motion.div>
  );
}
