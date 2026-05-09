"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PolaroidCard from "@/components/PolaroidCard";

interface Props {
  image: string;
  senderName: string;
  recipientName: string;
  message: string;
}

export default function FloatingPreview({
  image,
  senderName,
  recipientName,
  message,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Mini floating preview - bottom right */}
      <button
        onClick={() => setExpanded(true)}
        className="fixed bottom-4 right-4 z-40 w-[80px] h-[100px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
      >
        <div className="w-full h-full scale-[0.22] origin-top-left">
          <div className="w-[340px]">
            <PolaroidCard
              image={image}
              senderName={senderName}
              recipientName={recipientName}
              message={message}
            />
          </div>
        </div>
        <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </button>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <PolaroidCard
                image={image}
                senderName={senderName}
                recipientName={recipientName}
                message={message}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
