import { describe, expect, test } from "vitest";
import type { OpsAlertSummary, ServiceRequest } from "../types";
import {
  resolveOpsAlertChanges,
  resolveServiceRequestChanges,
} from "./polling";
const requestA: ServiceRequest = { issueId: "1", issueKey: "HELPDESK-1" };
const requestB: ServiceRequest = { issueId: "2", issueKey: "HELPDESK-2" };
const alertA: OpsAlertSummary = {
  id: "a1",
  message: "Disk full",
  status: "open",
};
describe("resolveServiceRequestChanges", () => {
  test("tags every request as created", () => {
    expect(resolveServiceRequestChanges([requestA, requestB])).toEqual([
      { changeType: "created", record: requestA },
      { changeType: "created", record: requestB },
    ]);
  });
  test("returns [] for empty or undefined data", () => {
    expect(resolveServiceRequestChanges([])).toEqual([]);
    expect(resolveServiceRequestChanges(undefined)).toEqual([]);
  });
});
describe("resolveOpsAlertChanges", () => {
  test("tags every alert as created", () => {
    expect(resolveOpsAlertChanges([alertA])).toEqual([
      { changeType: "created", record: alertA },
    ]);
  });
  test("returns [] for empty or undefined data", () => {
    expect(resolveOpsAlertChanges([])).toEqual([]);
    expect(resolveOpsAlertChanges(undefined)).toEqual([]);
  });
});
