"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { BirthdaySurprise } from "@/lib/types";
import CakeSvg from "@/components/CakeSvg";
import CandleSvg from "@/components/CandleSvg";

const audioLabels: Record<string, string> = {
  "happy-birthday": "Happy Birthday",
  instrumental: "Instrumental",
  "las-manianitas": "Las Mañanitas",
};

interface Props {
  data: BirthdaySurprise;
  onNext: () => void;
}

export default function VelasApagadas({ data, onNext }: Props) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [listening, setListening] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    startListening();
    return () => stopListening();
  }, []);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      setListening(true);

      const detectBlow = () => {
        analyser.getByteFrequencyData(dataArray);
        const average =
          dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        if (average > 50) {
          setCandlesLit(false);
          stopListening();
          setTimeout(onNext, 2000);
          return;
        }

        animFrameRef.current = requestAnimationFrame(detectBlow);
      };

      detectBlow();
    } catch {
      setListening(false);
    }
  };

  const stopListening = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full min-h-screen bg-dark-bg relative px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Music pill */}
      <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 flex items-center gap-2 bg-white rounded-full px-3 md:px-4 py-2 shadow-sm">
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

      {/* Cake centered with blow prompt positioned absolutely to the left (desktop) / top-right (mobile) */}
      <div className="relative">
        {/* Blow prompt - desktop: left side, mobile: top right of cake */}
        <motion.div
          className="absolute -top-16 right-0 md:top-1/2 md:right-full md:-translate-y-1/2 md:mr-6 flex flex-col items-end"
          animate={{ y: ["0%", "-3%", "0%"] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <p className="font-handwriting text-[20px] md:text-[28px] text-[#8B9FE8] italic text-right whitespace-nowrap">
            acércate al micrófono
            <br />y sopla suave...
          </p>
          <svg
            width="60"
            height="24"
            viewBox="0 0 80 30"
            fill="none"
            stroke="#8B9FE8"
            strokeWidth="1.5"
            className="mt-1 md:mt-2 hidden md:block"
          >
            <path d="M5 25 C25 25, 55 15, 75 15" />
            <path d="M68 10 L75 15 L68 20" />
          </svg>
        </motion.div>

        {/* Cake with candles */}
        <div className="relative w-[280px] h-[280px] md:w-[480px] md:h-[480px]">
          <CakeSvg className="w-full h-full" />
          {data.candle_positions.map((pos, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <CandleSvg lit={candlesLit} />
            </div>
          ))}
        </div>
      </div>

      <h2 className="font-handwriting text-[32px] md:text-[48px] text-white mt-4">
        Feliz Cumpleaños {data.recipient_name}
      </h2>

      {!listening && (
        <button
          onClick={onNext}
          className="mt-6 px-6 py-3 bg-gray-700 rounded-[10px] text-white text-[14px] hover:bg-gray-600 transition-colors"
        >
          Omitir (micrófono no disponible)
        </button>
      )}
    </motion.div>
  );
}
