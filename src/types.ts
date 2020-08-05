import { WriteStream } from "tty";

export interface TermCalOptions {
  context?: WriteStream | { write(text: string): void };
  year?: number;
  separator?: string;
  leaderStyle?: "unicode" | "arrows" | "bars" | "none";
  newlineBetween?: boolean;
}
