export interface Deck {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export interface Card {
  code: string;
  image: string;
  images: {
    svg: string;
    png: string;
  };
  value: string;
  suit: string;
}

export interface Guess {
  val?: string;
  score: number;
  myGuess?: string;
}

export type GuessAction =
  | { type: ">"; score: number }
  | { type: "="; score: number }
  | { type: "<"; score: number }
  | { type: "empty"; score?: number };
