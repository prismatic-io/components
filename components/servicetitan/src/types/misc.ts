import type { Address, ExternalData } from "./common";
export interface BusinessUnits {
  id: number;
  active: boolean;
  name: string;
  officialName: string;
  email: string;
  currency: string;
  phoneNumber: string;
  invoiceHeader: string;
  invoiceMessage: string;
  defaultTaxRate: number;
  authorizationParagraph: string;
  acknowledgementParagraph: string;
  address: Address;
  materialSku: string;
  quickbooksClass: string;
  accountCode: string;
  franchiseId: string;
  conceptCode: string;
  corporateContractNumber: string;
  tenant: Tenant;
  createdOn: string;
  modifiedOn: string;
  externalData: ExternalData[];
}
export interface UserRoles {
  id: number;
  active: boolean;
  name: string;
  createdOn: string;
  employeeType: string;
}
export interface Tenant {
  id: number;
  name: string;
  accountCode: string;
  franchiseId: string;
  conceptCode: string;
  modifiedOn: string;
}
