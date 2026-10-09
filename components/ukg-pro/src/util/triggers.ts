import * as crypto from "node:crypto";
import type {
  EmployeeChange,
  EmployeeChangeRecordChange,
  NewHireStatusChange,
  NewHireStatusRecordChange,
} from "../types";
export const isValidHmacSignature = (
  payload: string,
  signature: string,
  secret: string,
): boolean => {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    );
  } catch {
    return false;
  }
};
export const resolveEmployeeChangeRecords = (
  data: EmployeeChange[] | undefined,
): EmployeeChangeRecordChange[] =>
  (data ?? []).map(
    (record): EmployeeChangeRecordChange => ({ changeType: "changed", record }),
  );
export const resolveNewHireStatusChanges = (
  data: NewHireStatusChange[] | undefined,
): NewHireStatusRecordChange[] =>
  (data ?? []).map(
    (record): NewHireStatusRecordChange => ({
      changeType: record.changeType,
      record,
    }),
  );
