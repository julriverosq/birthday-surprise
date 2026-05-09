"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AbreLink from "@/components/regalo/AbreLink";
import PrimeraVista from "@/components/regalo/PrimeraVista";
import VelasApagadas from "@/components/regalo/VelasApagadas";
import VistaFinal from "@/components/regalo/VistaFinal";
import { supabase } from "@/lib/supabase";
import type { BirthdaySurprise } from "@/lib/types";

export default function RegaloPage() {
  const params = useParams();
  const [data, setData] = useState<BirthdaySurprise | null>(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: surprise } = await supabase
        .from("surprises")
        .select("*")
        .eq("id", params.id)
        .single();

      if (surprise) {
        setData(surprise as BirthdaySurprise);
      }
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center min-h-screen bg-background">
        <p className="text-[16px] text-text-secondary">
          Cargando tu sorpresa...
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex flex-1 items-center justify-center min-h-screen bg-background">
        <p className="text-[16px] text-text-secondary">
          Sorpresa no encontrada
        </p>
      </main>
    );
  }

  const next = () => setStep((s) => s + 1);

  const steps = [
    <AbreLink key="abre" data={data} onNext={next} />,
    <PrimeraVista key="primera" data={data} onNext={next} />,
    <VelasApagadas key="velas" data={data} onNext={next} />,
    <VistaFinal key="final" data={data} />,
  ];

  return <main className="flex flex-1 min-h-screen">{steps[step]}</main>;
}
