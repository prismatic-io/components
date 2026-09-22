export interface InlineDSDatabase {
  id: string;
  object: string;
  title?: {
    plain_text: string;
  }[];
}
export interface InlineDSDataSource {
  id: string;
  object: string;
  title?: {
    plain_text: string;
  }[];
}
export interface InlineDSPage {
  id: string;
  object: string;
  properties?: Record<
    string,
    {
      id?: string;
      type?: string;
      title?: {
        plain_text: string;
      }[];
    }
  >;
}
