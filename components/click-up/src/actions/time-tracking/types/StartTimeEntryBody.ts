export interface StartTimeEntryBody {
  description: string;
  tags: Tag[];
  tid: string;
  billable: boolean;
}

interface Tag {
  name: string;
}
