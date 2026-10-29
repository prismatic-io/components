export interface OfficeDataSources {
  id: number;
  name: string;
  location: Location;
  primary_contact_user_id: number;
  parent_id: number;
  parent_office_external_id: string;
  child_ids: number[];
  child_office_external_ids: string[];
  external_id: string;
}

export interface Location {
  name: string;
}
