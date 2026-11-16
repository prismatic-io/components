export interface ListItem {
  id: string;
  fields: { Title: string };
}

export interface SiteList {
  id: string;
  name: string;
  displayName?: string;
}
