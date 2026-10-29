export interface ListActionResults {
  d: {
    results: Record<string, unknown>[] | Record<string, unknown>;
  };
}

export interface ActionResults {
  d: Record<string, unknown>;
}
