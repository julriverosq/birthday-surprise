"use client";

import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

const steps = [
  "Escribe los nombres y un mensaje",
  "Elige un arreglo de flores para el polaroid",
  "Escoge una de las 3 canciones",
  "Coloca las velas en el pastel",
];

export default function Bienvenida({ onNext }: Props) {
  return (
    <motion.div
      className="flex w-full min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full md:max-w-[660px] flex flex-col justify-center px-6 md:px-20 py-12 md:py-20 gap-6">
        {/* Image placeholder area - mobile only */}
        <div className="md:hidden w-full h-[180px] bg-[#F0EDED] rounded-lg flex items-center justify-center mb-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C0B8B0" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>

        {/* Dot indicators - mobile only */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>

        <h1 className="font-display text-[32px] md:text-[48px] leading-[38px] md:leading-[56px] text-foreground">
          Sigue los pasos para crear un regalo de cumpleaños
        </h1>

        <div className="flex flex-col gap-3 pt-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                <span className="text-primary text-[13px] font-bold">
                  {i + 1}
                </span>
              </div>
              <span className="text-text-muted text-[15px]">{step}</span>
            </div>
          ))}
        </div>

        <p className="text-text-muted text-[15px]">
          Comparte el link y sorprende
        </p>

        <button
          onClick={onNext}
          className="flex items-center justify-center gap-2 w-full md:w-[205px] h-[56px] bg-primary rounded-[12px] text-white text-[17px] font-semibold hover:opacity-90 transition-opacity"
        >
          Empezar
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
