export interface Topic {
  id: number;
  manageable_by?: string;
  position?: number;
  user_segment_id?: number;
  description?: string;
  name: string;
  html_url?: string;
  url?: string;
}
