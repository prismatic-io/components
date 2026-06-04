export interface AirtableBase {
  id: string;
  name: string;
  permissionLevel: string;
}

export interface PollingState {
  lastPolledAt?: string;
}

export interface AirtableRecord {
  id: string;
  createdTime: string;
  fields: Record<string, unknown>;
}

export interface AirtableTable {
  id: string;
  primaryFieldId: string;
  name: string;
  description: string;
  fields: {
    id: string;
    type: string;
    name: string;
    description: string;
  }[];
  views: {
    id: string;
    type:
      | "grid"
      | "form"
      | "calendar"
      | "gallery"
      | "kanban"
      | "timeline"
      | "block";
    name: string;
    visibleFieldIds: string[];
  }[];
}
