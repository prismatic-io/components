import type { Firestore } from "firebase-admin/firestore";

export interface QueryDocsParams {
  db: Firestore;
  collection: string;
  queryOperatorCode: string;
  orderBy?: string;
}
