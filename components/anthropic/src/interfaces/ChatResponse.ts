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
