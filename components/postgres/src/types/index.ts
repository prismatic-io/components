export type CursorValue = string | number | Date;
export type PollTableRow = Record<string, unknown>;
export interface PaginationState extends Record<string, unknown> {
  cursor: CursorValue;
}
export interface PollingState extends Record<string, unknown> {
  cursor: CursorValue;
  cursorField: string;
  tableName: string;
  inFlightCursor?: CursorValue;
}
export type PageSplit =
  | {
      kind: "drained";
      emit: PollTableRow[];
    }
  | {
      kind: "more";
      emit: PollTableRow[];
      nextCursor: CursorValue;
    }
  | {
      kind: "tie";
      tieValue: CursorValue;
    };
export interface ResolveStartCursorParams {
  incoming: CursorValue | undefined;
  state: PollingState;
  params: {
    cursorField: string;
    tableName: string;
    defaultCursorValue: string;
  };
}
