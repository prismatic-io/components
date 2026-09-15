import type { Address, ExternalData } from "./common";
interface Tenant {
  id: number;
  name: string;
  accountCode: string | null;
  franchiseId: string | null;
  conceptCode: string | null;
  modifiedOn: string;
}
export interface BusinessUnits {
  id: number;
  active: boolean;
  name: string;
  officialName: string | null;
  email: string | null;
  currency: string | null;
  phoneNumber: string | null;
  invoiceHeader: string | null;
  invoiceMessage: string | null;
  defaultTaxRate: number | null;
  authorizationParagraph: string | null;
  acknowledgementParagraph: string | null;
  address: Address | null;
  materialSku: string | null;
  quickbooksClass: string | null;
  accountCode: string | null;
  franchiseId: string | null;
  conceptCode: string | null;
  corporateContractNumber: string | null;
  tenant: Tenant | null;
  createdOn: string;
  modifiedOn: string;
  externalData: ExternalData[] | null;
}
export interface UserRoles {
  id: number;
  active: boolean;
  name: string;
  createdOn: string;
  employeeType: string;
}
