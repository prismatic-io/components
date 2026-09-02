export interface ContactProperties {
  createdate: string;
  email: string;
  firstname: string;
  lastname: string;
  hs_lastmodifieddate: string;
  hs_object_id: number;
}
export interface Contact {
  id: number;
  properties: ContactProperties;
  pipeline: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}
