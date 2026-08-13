export interface CustomRecord {
  id: number;
  [key: string]: unknown;
}
export interface OdooRecord extends CustomRecord {
  create_date?: string;
  write_date?: string;
}
