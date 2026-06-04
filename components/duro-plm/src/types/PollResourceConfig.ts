








export interface PollResourceConfig {
  query: string;
  dataPath: string[];
  buildVariables: (first: number, after?: string) => Record<string, unknown>;
  earlyStop: boolean;
}
