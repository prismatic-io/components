export interface OdataObject<T> {
  [key: string]: unknown;
  odata?: Record<string, unknown>;
  value?: T[];
}
