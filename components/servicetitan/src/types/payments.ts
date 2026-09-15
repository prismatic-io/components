import type { Batch, CustomField } from "./common";
interface AppliedTo {
  appliedId: number;
  appliedTo: number;
  appliedAmount: string | null;
  appliedOn: string | null;
  appliedBy: string | null;
  appliedToReferenceNumber: string | null;
}
interface BusinessUnit {
  id: number;
  name: string | null;
}
interface GeneralLedgerAccount {
  id: number;
  name: string | null;
  number: string | null;
  type: string | null;
  detailType: string | null;
}
export interface Payment {
  id: number;
  syncStatus: string | null;
  referenceNumber: string | null;
  date: string | null;
  type: string | null;
  typeId: string | null;
  total: string | null;
  unappliedAmount: string | null;
  memo: string | null;
  customer: BusinessUnit | null;
  businessUnit: BusinessUnit | null;
  batch: Batch | null;
  createdBy: string | null;
  generalLedgerAccount: GeneralLedgerAccount | null;
  appliedTo: AppliedTo[] | null;
  customFields: CustomField[] | null;
  authCode: string | null;
  checkNumber: string | null;
  modifiedOn: string;
  createdOn: string;
}
