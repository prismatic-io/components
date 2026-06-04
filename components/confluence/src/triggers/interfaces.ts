export interface PollingState {
  lastPolled?: string;
}

export type DateExtractor<T> = (item: T) => string | undefined;
