export interface Message {
  role: "user" | "assistant";
  content: string;
}
export interface ChatRequest {
  model: string;
  messages: Message[];
  system?: string;
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}
export interface ChatResponse {
  id: string;
  type: "message";
  role: "assistant";
  content: {
    text: string;
    type: "text";
  }[];
  model: string;
  stop_reason: string;
  stop_sequence: number | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}
export interface CountTokensResponse {
  input_tokens: number;
}
