import type { Address, CustomField, ExternalData } from "./common";
export interface Location {
  id: number;
  customerId: number;
  active: boolean;
  name: string;
  address: Address;
  customFields: CustomField[];
  createdOn: string;
  createdById: number;
  modifiedOn: string;
  mergedToId: number;
  zoneId: number;
  tagTypeIds: number[];
  externalData: ExternalData[];
  taxZoneId: number;
}
