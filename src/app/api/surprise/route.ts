import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("surprises")
    .insert({
      sender_name: body.sender_name,
      recipient_name: body.recipient_name,
      message: body.message,
      polaroid_image: body.polaroid_image,
      audio: body.audio,
      candle_positions: body.candle_positions,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/regalo/${data.id}`;

  return NextResponse.json({ id: data.id, link });
}
