"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
  onNext: () => void;
}

const steps = [
  "Escribe los nombres y un mensaje",
  "Elige un arreglo de flores para el polaroid",
  "Escoge una de las 3 canciones",
  "Coloca las velas en el pastel",
];

const images = [
  "/paso 1.png",
  "/paso 2.png",
  "/paso 3.png",
  "/paso 4.png",
  "/paso 5.png",
];

export default function Bienvenida({ onNext }: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex w-full h-screen overflow-hidden max-md:flex-col max-md:h-auto max-md:min-h-screen max-md:overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Left Column */}
      <div className="w-[660px] shrink-0 flex flex-col justify-center px-[80px] py-[80px] gap-6 max-md:w-full max-md:px-6 max-md:py-8">
        <h1 className="font-display text-[48px] leading-[56px] text-foreground max-md:text-[32px] max-md:leading-[38px]">
          Sigue los pasos para crear un regalo de cumpleaños
        </h1>

        <div className="flex flex-col gap-3 pt-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#5E7CE21A] flex items-center justify-center shrink-0">
                <span className="text-[#5E7CE2] text-[13px] font-bold">
                  {i + 1}
                </span>
              </div>
              <span className="text-[#6B5D4F] text-[15px]">{step}</span>
            </div>
          ))}
        </div>

        <p className="text-[#6B5D4F] text-[15px]">
          Comparte el link y sorprende
        </p>

        <button
          onClick={onNext}
          className="flex items-center justify-center gap-2 w-[205px] h-[56px] bg-[#5E7CE2] rounded-[12px] text-white text-[17px] font-semibold hover:opacity-90 transition-opacity max-md:w-full"
        >
          Empezar
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Right Column - Film-strip carousel (no dots) */}
      <div className="flex-1 bg-[#F9F8F8] flex items-center justify-center min-h-screen relative overflow-hidden max-md:hidden">
        <div className="flex items-center gap-4 h-[70%]">
          {/* Previous image - partially visible */}
          <div className="w-[120px] h-[270px] relative rounded-md overflow-hidden opacity-40 shrink-0">
            <Image
              src={images[(currentImage - 1 + images.length) % images.length]}
              alt="Anterior"
              fill
              className="object-cover"
            />
          </div>

          {/* Current image - center, fully visible */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              className="w-[420px] h-[280px] relative rounded-md overflow-hidden shadow-lg shrink-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={images[currentImage]}
                alt={`Paso ${currentImage + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Next image - partially visible */}
          <div className="w-[120px] h-[270px] relative rounded-md overflow-hidden opacity-40 shrink-0">
            <Image
              src={images[(currentImage + 1) % images.length]}
              alt="Siguiente"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile - image carousel on top */}
      <div className="hidden max-md:flex max-md:flex-col max-md:items-center max-md:order-first max-md:pt-8 max-md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="relative w-full h-[220px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={images[currentImage]}
              alt={`Paso ${currentImage + 1}`}
              fill
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentImage ? "bg-[#5E7CE2]" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
