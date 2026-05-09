"use client";

import { useState } from "react";
import Bienvenida from "@/components/crear/Bienvenida";
import NombresYMensaje from "@/components/crear/NombresYMensaje";
import ElegirPolaroid from "@/components/crear/ElegirPolaroid";
import ElegirAudio from "@/components/crear/ElegirAudio";
import ColocacionVelas from "@/components/crear/ColocacionVelas";
import LinkGenerado from "@/components/crear/LinkGenerado";
import type { CandlePosition } from "@/lib/types";

export default function CrearPage() {
  const [step, setStep] = useState(0);
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [polaroidImage, setPolaroidImage] = useState("");
  const [audio, setAudio] = useState("");
  const [candlePositions, setCandlePositions] = useState<CandlePosition[]>([]);
  const [generatedLink, setGeneratedLink] = useState("");

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleGenerateLink = async () => {
    next();
    try {
      const res = await fetch("/api/surprise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_name: senderName,
          recipient_name: recipientName,
          message,
          polaroid_image: polaroidImage,
          audio,
          candle_positions: candlePositions,
        }),
      });
      const data = await res.json();
      setGeneratedLink(data.link);
    } catch {
      setGeneratedLink("Error al generar enlace");
    }
  };

  const steps = [
    <Bienvenida key="bienvenida" onNext={next} />,
    <NombresYMensaje
      key="nombres"
      senderName={senderName}
      setSenderName={setSenderName}
      recipientName={recipientName}
      setRecipientName={setRecipientName}
      message={message}
      setMessage={setMessage}
      polaroidImage={polaroidImage}
      onNext={next}
    />,
    <ElegirPolaroid
      key="polaroid"
      selected={polaroidImage}
      onSelect={setPolaroidImage}
      senderName={senderName}
      recipientName={recipientName}
      message={message}
      onNext={next}
      onBack={back}
    />,
    <ElegirAudio
      key="audio"
      selected={audio}
      onSelect={setAudio}
      senderName={senderName}
      recipientName={recipientName}
      message={message}
      polaroidImage={polaroidImage}
      onNext={next}
      onBack={back}
    />,
    <ColocacionVelas
      key="velas"
      positions={candlePositions}
      onPositionsChange={setCandlePositions}
      senderName={senderName}
      audio={audio}
      onNext={handleGenerateLink}
      onBack={back}
    />,
    <LinkGenerado
      key="link"
      link={generatedLink}
      candlePositions={candlePositions}
      senderName={senderName}
      recipientName={recipientName}
      audio={audio}
      polaroidImage={polaroidImage}
      message={message}
    />,
  ];

  return <main className="flex flex-1 min-h-screen">{steps[step]}</main>;
}
