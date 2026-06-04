export interface UpdateTimeEntryBody {
  description: string;
  tags: Tag[];
  tag_action: string;
  start: number | undefined;
  end: number | undefined;
  tid: string;
  billable: boolean;
  duration: number | undefined;
}

interface Tag {
  name: string;
  tag_bg: string;
  tag_fg: string;
}
