"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  image: string;
  senderName: string;
  recipientName: string;
  message: string;
}

const imageMap: Record<string, string> = {
  Parientes: "/Parientes.svg",
  amigos: "/amigos.svg",
  elegante: "/elegante.svg",
};

export default function PolaroidCard({
  image,
  senderName,
  recipientName,
  message,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        className="w-[340px] bg-white rounded-[4px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-4 pb-6 cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={isHovered ? { rotateY: 360 } : { rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image area */}
        <div className="w-[308px] h-[308px] bg-[#F4F1EE] flex flex-col items-center justify-center overflow-hidden rounded-sm">
          {image && imageMap[image] ? (
            <Image
              src={imageMap[image]}
              alt="Polaroid"
              width={308}
              height={308}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                  fill="#B0BEC5"
                />
              </svg>
              <span className="text-[13px] text-[#90A4AE] mt-2">
                Tu foto irá aquí
              </span>
            </>
          )}
        </div>

        {/* Message */}
        <div className="flex items-center justify-center pt-[18px] pb-[14px]">
          <span className="font-handwriting text-[28px] leading-[34px] text-foreground">
            {message || "Tu mensaje aquí"}
          </span>
        </div>

        {/* Names */}
        <div className="flex items-end justify-between px-4 pt-[6px]">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-semibold tracking-[0.1em] uppercase text-[#A09890]">
              Para
            </span>
            <span className="font-handwriting text-[20px] font-medium text-foreground">
              {recipientName || "..."}
            </span>
          </div>
          <div className="w-[80px] h-[1px] bg-[#E0D8D0] mb-2" />
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-semibold tracking-[0.1em] uppercase text-[#A09890]">
              De
            </span>
            <span className="font-handwriting text-[20px] font-medium text-foreground">
              {senderName || "..."}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
