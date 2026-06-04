export interface InlineDSDatabase {
  id: string;
  title?: { plain_text: string }[];
  object: string;
}

export interface InlineDSDataSource {
  id: string;
  title?: { plain_text: string }[];
  object: string;
}

export interface InlineDSPage {
  id: string;
  properties?: Record<
    string,
    {
      id?: string;
      type?: string;
      title?: { plain_text: string }[];
    }
  >;
  object: string;
}

export interface NotionPage {
  id: string;
  object: string;
  created_time: string;
  last_edited_time: string;
  [key: string]: unknown;
}

export interface PollingState {
  lastPolledAt: string;
}
