import type { DuroRecord } from "./DuroRecord";


export interface PollConnection {
  edges?: { cursor?: string; node?: DuroRecord }[];
  pageInfo?: { hasNextPage?: boolean; endCursor?: string };
}
