"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { BirthdaySurprise } from "@/lib/types";
import CakeSvg from "@/components/CakeSvg";
import CandleSvg from "@/components/CandleSvg";

const audioMap: Record<string, string> = {
  "happy-birthday": "/happy-birthday.mp3",
  instrumental: "/instrumental.mp3",
  "las-manianitas": "/las mañanitas.mp3",
};

const audioLabels: Record<string, string> = {
  "happy-birthday": "Happy Birthday",
  instrumental: "Instrumental",
  "las-manianitas": "Las Mañanitas",
};

interface Props {
  data: BirthdaySurprise;
  onNext: () => void;
}

export default function PrimeraVista({ data, onNext }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicEnded, setMusicEnded] = useState(false);

  useEffect(() => {
    const audio = new Audio(audioMap[data.audio]);
    audioRef.current = audio;
    audio.play().catch(() => {});

    const timeout = setTimeout(() => {
      audio.pause();
      setMusicEnded(true);
    }, 60000);

    audio.onended = () => setMusicEnded(true);

    return () => {
      clearTimeout(timeout);
      audio.pause();
    };
  }, [data.audio]);

  useEffect(() => {
    if (musicEnded) {
      onNext();
    }
  }, [musicEnded, onNext]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full min-h-screen bg-dark-bg relative px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Music pill - top */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-2 bg-white rounded-full px-3 md:px-4 py-2 shadow-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5E7CE2" strokeWidth="2">
          <path d="M9 18V5l12-2v13M9 18c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3zM21 16c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3z" />
        </svg>
        <span className="text-[12px] md:text-[14px] text-foreground">
          {audioLabels[data.audio]} sonando...
        </span>
      </div>

      <p className="text-[12px] md:text-[13px] text-gray-400 mb-4 md:mb-6">
        {data.sender_name} te envió un regalo
      </p>

      {/* Cake centered */}
      <div className="relative w-[280px] h-[280px] md:w-[480px] md:h-[480px]">
        <CakeSvg className="w-full h-full" />
        {data.candle_positions.map((pos, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <CandleSvg />
          </div>
        ))}
      </div>

      <h2 className="font-handwriting text-[32px] md:text-[48px] text-white mt-4">
        Feliz Cumpleaños {data.recipient_name}
      </h2>
    </motion.div>
  );
}
