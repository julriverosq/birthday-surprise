"use client";

import { motion } from "framer-motion";

interface Props {
  lit?: boolean;
  className?: string;
}

export default function CandleSvg({ lit = true, className }: Props) {
  return (
    <div className={`flex flex-col items-center ${className || ""}`}>
      {lit && (
        <motion.div
          className="w-[12px] h-[18px] shrink-0"
          animate={{ opacity: [1, 0.7, 1], scale: [1, 0.9, 1] }}
          transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
        >
          <svg
            width="12"
            height="18"
            viewBox="0 0 24 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2 C12 2 4 14 4 22 C4 28 7.5 34 12 34 C16.5 34 20 28 20 22 C20 14 12 2 12 2Z"
              fill="#F5A623"
            />
            <path
              d="M12 10 C12 10 7 18 7 24 C7 28 9 32 12 32 C15 32 17 28 17 24 C17 18 12 10 12 10Z"
              fill="#FFD93D"
            />
            <path
              d="M12 16 C12 16 9.5 21 9.5 25 C9.5 28 10.5 30 12 30 C13.5 30 14.5 28 14.5 25 C14.5 21 12 16 12 16Z"
              fill="#FFF8E7"
            />
          </svg>
        </motion.div>
      )}
      <div className="w-[1px] h-[4px] bg-[#3D2B1F] rounded-[1px] shrink-0" />
      <div className="w-[9px] h-[50px] shrink-0 rounded-t-[1px] overflow-hidden">
        <svg
          width="9"
          height="50"
          viewBox="0 0 18 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="18" height="100" fill="#FFFFFF" rx="2" />
          <line x1="-2" y1="8" x2="10" y2="-2" stroke="#E84B7A" strokeWidth="3" />
          <line x1="2" y1="16" x2="14" y2="6" stroke="#4A9FD9" strokeWidth="3" />
          <line x1="4" y1="26" x2="18" y2="14" stroke="#6BBF3B" strokeWidth="3" />
          <line x1="2" y1="36" x2="18" y2="22" stroke="#F5A623" strokeWidth="3" />
          <line x1="-2" y1="44" x2="14" y2="32" stroke="#E84B7A" strokeWidth="3" />
          <line x1="2" y1="52" x2="18" y2="40" stroke="#4A9FD9" strokeWidth="3" />
          <line x1="0" y1="62" x2="18" y2="48" stroke="#6BBF3B" strokeWidth="3" />
          <line x1="-2" y1="70" x2="14" y2="58" stroke="#F5A623" strokeWidth="3" />
          <line x1="2" y1="78" x2="18" y2="66" stroke="#E84B7A" strokeWidth="3" />
          <line x1="0" y1="88" x2="18" y2="74" stroke="#4A9FD9" strokeWidth="3" />
          <line x1="-2" y1="96" x2="14" y2="84" stroke="#6BBF3B" strokeWidth="3" />
          <line x1="2" y1="104" x2="18" y2="92" stroke="#F5A623" strokeWidth="3" />
        </svg>
      </div>
      <div className="w-[11px] h-[2.5px] bg-[#E0E0E0] rounded-b-[1.5px] shrink-0" />
    </div>
  );
}
