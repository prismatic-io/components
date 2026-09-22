export interface NotionPage {
  id: string;
  object: string;
  created_time: string;
  last_edited_time: string;
  [key: string]: unknown;
}
export interface NotionUser {
  id: string;
  name?: string;
  type?: string;
}
