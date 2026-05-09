export interface CandlePosition {
  x: number;
  y: number;
}

export interface BirthdaySurprise {
  id: string;
  sender_name: string;
  recipient_name: string;
  message: string;
  polaroid_image: "Parientes" | "amigos" | "elegante";
  audio: "happy-birthday" | "instrumental" | "las-manianitas";
  candle_positions: CandlePosition[];
  created_at: string;
}
