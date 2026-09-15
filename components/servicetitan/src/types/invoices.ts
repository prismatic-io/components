import type { Address, AssignedTo, Batch, CustomField } from "./common";
interface Account {
  id: number;
  name: string | null;
  number: string | null;
  type: string | null;
  detailType: string | null;
}
interface ItemGroup {
  rootId: number;
  name: string | null;
}
interface Item {
  id: number;
  description: string | null;
  quantity: string | null;
  cost: string | null;
  totalCost: string | null;
  inventoryLocation: string | null;
  price: string | null;
  type: string;
  skuName: string | null;
  skuId: number;
  total: string | null;
  inventory: boolean;
  taxable: boolean;
  generalLedgerAccount: Account | null;
  costOfSaleAccount: Account | null;
  assetAccount: Account | null;
  membershipTypeId: number;
  itemGroup: ItemGroup | null;
  displayName: string | null;
  soldHours: number | null;
  modifiedOn: string;
  serviceDate: string | null;
  order: number;
  businessUnit: AssignedTo | null;
}
interface EmployeeInfo {
  id: number;
  name: string | null;
  modifiedOn: string;
}
interface InvoiceJob {
  id: number;
  number: string | null;
  type: string | null;
}
interface Royalty {
  status: string | null;
  date: string | null;
  sentOn: string | null;
  memo: string | null;
}
interface SalesTaxCode {
  id: number;
  name: string | null;
  taxRate: number;
}
export interface Invoice {
  id: number;
  syncStatus: string | null;
  summary: string | null;
  referenceNumber: string | null;
  invoiceDate: string | null;
  dueDate: string | null;
  subTotal: string | null;
  salesTax: string | null;
  salesTaxCode: SalesTaxCode | null;
  total: string | null;
  balance: string | null;
  invoiceType: AssignedTo | null;
  customer: AssignedTo | null;
  customerAddress: Address | null;
  location: AssignedTo | null;
  locationAddress: Address | null;
  businessUnit: AssignedTo | null;
  termName: string | null;
  createdBy: string | null;
  batch: Batch | null;
  depositedOn: string | null;
  createdOn: string;
  modifiedOn: string | null;
  adjustmentToId: number | null;
  job: InvoiceJob | null;
  projectId: number | null;
  royalty: Royalty | null;
  employeeInfo: EmployeeInfo | null;
  commissionEligibilityDate: string | null;
  sentStatus: string;
  reviewStatus: string;
  assignedTo: AssignedTo | null;
  items: Item[] | null;
  customFields: CustomField[] | null;
}
