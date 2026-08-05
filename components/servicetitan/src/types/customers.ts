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
  mergedToId: number;
  externalData: ExternalData[];
}
export interface ContactCustomer {
  id: number;
  type: string;
  value: string;
  memo: string;
  modifiedOn: string;
  phoneSettings: PhoneSettings;
}
interface PhoneSettings {
  phoneNumber: string;
  doNotText: boolean;
}
