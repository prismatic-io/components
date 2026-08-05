import type { Batch, CustomField } from "./common";
export interface Payment {
  id: number;
  syncStatus: string;
  referenceNumber: string;
  date: string;
  type: string;
  typeId: string;
  total: string;
  unappliedAmount: string;
  memo: string;
  customer: BusinessUnit;
  businessUnit: BusinessUnit;
  batch: Batch;
  createdBy: string;
  generalLedgerAccount: GeneralLedgerAccount;
  appliedTo: AppliedTo[];
  customFields: CustomField[];
  authCode: string;
  checkNumber: string;
  modifiedOn: string;
  createdOn: string;
}
export interface AppliedTo {
  appliedId: number;
  appliedTo: number;
  appliedAmount: string;
  appliedOn: string;
  appliedBy: string;
  appliedToReferenceNumber: string;
}
export interface BusinessUnit {
  id: number;
  name: string;
}
export interface GeneralLedgerAccount {
  id: number;
  name: string;
  number: string;
  type: string;
  detailType: string;
}
