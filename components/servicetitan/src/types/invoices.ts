import type { Address, AssignedTo, Batch, CustomField } from "./common";
export interface Invoice {
  id: number;
  syncStatus: string;
  summary: string;
  referenceNumber: string;
  invoiceDate: string;
  dueDate: string;
  subTotal: string;
  salesTax: string;
  salesTaxCode: SalesTaxCode;
  total: string;
  balance: string;
  invoiceType: AssignedTo;
  customer: AssignedTo;
  customerAddress: Address;
  location: AssignedTo;
  locationAddress: Address;
  businessUnit: AssignedTo;
  termName: string;
  createdBy: string;
  batch: Batch;
  depositedOn: string;
  createdOn: string;
  modifiedOn: string;
  adjustmentToId: number;
  job: InvoiceJob;
  projectId: number;
  royalty: Royalty;
  employeeInfo: EmployeeInfo;
  commissionEligibilityDate: string;
  sentStatus: string;
  reviewStatus: string;
  assignedTo: AssignedTo;
  items: Item[];
  customFields: CustomField[];
}
interface SalesTaxCode {
  id: number;
  name: string;
  taxRate: number;
}
interface EmployeeInfo {
  id: number;
  name: string;
  modifiedOn: string;
}
interface Item {
  id: number;
  description: string;
  quantity: string;
  cost: string;
  totalCost: string;
  inventoryLocation: string;
  price: string;
  type: string;
  skuName: string;
  skuId: number;
  total: string;
  inventory: boolean;
  taxable: boolean;
  generalLedgerAccount: Account;
  costOfSaleAccount: Account;
  assetAccount: Account;
  membershipTypeId: number;
  itemGroup: ItemGroup;
  displayName: string;
  soldHours: number;
  modifiedOn: string;
  serviceDate: string;
  order: number;
  businessUnit: AssignedTo;
}
interface Account {
  id: number;
  name: string;
  number: string;
  type: string;
  detailType: string;
}
interface ItemGroup {
  rootId: number;
  name: string;
}
interface InvoiceJob {
  id: number;
  number: string;
  type: string;
}
interface Royalty {
  status: string;
  date: string;
  sentOn: string;
  memo: string;
}
