import type { WhereFilterOp } from "firebase-admin/firestore";

export interface QueryCondition {
  field: string;
  operator: WhereFilterOp;
  value: unknown;
}
