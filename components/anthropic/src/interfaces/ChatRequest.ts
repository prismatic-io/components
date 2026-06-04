import type { Message } from "./Message";

export interface ChatRequest {
  model: string;
  messages: Message[];
  system?: string;
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}
