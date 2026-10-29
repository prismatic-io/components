export interface DealProperties {
  createdate: string;
  dealname: string;
  dealstage: string;
  pipeline: string;
  amount: string;
  closedate: string;
  hs_lastmodifieddate: string;
  hs_object_id: number;
}

export interface Deal {
  id: number;
  properties: DealProperties;
  pipeline: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}
