export interface CompanyProperties {
  createdate: string;
  domain: string | null;
  hs_lastmodifieddate: string;
  hs_object_id: number;
  name: string;
}

export interface Company {
  id: number;
  properties: CompanyProperties;
  pipeline: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}
