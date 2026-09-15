import type { Address, CustomField, ExternalData } from "./common";
export interface Customer {
  id: number;
  active: boolean;
  name: string;
  type: string;
  address: Address;
  customFields: CustomField[];
  balance: number;
  tagTypeIds: number[];
  doNotMail: boolean;
  doNotService: boolean;
  createdOn: string;
  createdById: number;
  modifiedOn: string;
  mergedToId: number | null;
  externalData: ExternalData[];
}
interface PhoneSettings {
  phoneNumber: string;
  doNotText: boolean;
}
export interface ContactCustomer {
  id: number;
  type: string;
  value: string;
  memo: string | null;
  modifiedOn: string;
  phoneSettings: PhoneSettings;
}
