export interface CreateTimeEntryBody {
  description: string;
  tags: Tag[];
  start: number | undefined;
  billable: boolean;
  duration: number | undefined;
  assignee: number | undefined;
  tid: string;
}

interface Tag {
  name: string;
  tag_bg: string;
  tag_fg: string;
}
