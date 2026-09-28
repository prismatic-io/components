import { describe, expect, it } from "vitest";
import { ensureArray } from "./xml";
import {
  toOptionalString,
  toOptionalNumber,
  asStringArray,
  toNonEmptyArray,
} from "./cleanInput";
import { normalizeTicket } from "./remediationTickets";
import { deriveRiskData } from "./assetRiskData";
import { normalizeScan } from "./scans";
import {
  toQualysAssetTimestamp,
  splitAssetsByChangeType,
  resolveChangedAssetItems,
} from "./assets";
import type { ClassicTicket, ClassicHost, ClassicScan } from "../types";
import type { QualysAsset } from "../types/assets";
describe("ensureArray", () => {
  it("returns empty array for undefined", () => {
    expect(ensureArray(undefined)).toEqual([]);
  });
  it("returns empty array for null", () => {
    expect(ensureArray(null)).toEqual([]);
  });
  it("wraps a single value in an array", () => {
    expect(ensureArray("one")).toEqual(["one"]);
  });
  it("returns an array unchanged", () => {
    expect(ensureArray(["a", "b"])).toEqual(["a", "b"]);
  });
});
describe("toOptionalString", () => {
  it("returns string for truthy value", () => {
    expect(toOptionalString("hello")).toBe("hello");
  });
  it("returns undefined for empty string", () => {
    expect(toOptionalString("")).toBeUndefined();
  });
  it("returns undefined for null", () => {
    expect(toOptionalString(null)).toBeUndefined();
  });
});
describe("toOptionalNumber", () => {
  it("returns number for numeric string", () => {
    expect(toOptionalNumber("42")).toBe(42);
  });
  it("returns undefined for empty string", () => {
    expect(toOptionalNumber("")).toBeUndefined();
  });
  it("returns undefined for null", () => {
    expect(toOptionalNumber(null)).toBeUndefined();
  });
});
describe("asStringArray", () => {
  it("converts array of values to string array", () => {
    expect(asStringArray([1, "two", 3])).toEqual(["1", "two", "3"]);
  });
  it("returns empty array for non-array", () => {
    expect(asStringArray("not an array")).toEqual([]);
  });
  it("returns empty array for undefined", () => {
    expect(asStringArray(undefined)).toEqual([]);
  });
});
describe("toNonEmptyArray", () => {
  it("returns array for valid non-empty array", () => {
    expect(toNonEmptyArray([1, 2], "items")).toEqual([1, 2]);
  });
  it("throws for empty array", () => {
    expect(() => toNonEmptyArray([], "items")).toThrow(
      "items must be a non-empty JSON array.",
    );
  });
});
describe("normalizeTicket", () => {
  const fullTicket: ClassicTicket = {
    NUMBER: "53",
    CREATION_DATETIME: "2005-06-28T13:32:02Z",
    DUE_DATETIME: "2005-08-24T08:55:53Z",
    CURRENT_STATE: "OPEN",
    INVALID: "0",
    ASSIGNEE: { NAME: "John", EMAIL: "john@example.com", LOGIN: "jdoe" },
    DETECTION: {
      IP: "10.0.1.100",
      DNSNAME: "server.example.com",
      SERVICE: "https / tcp / 443",
    },
    VULNINFO: {
      TITLE: "SSL Expired",
      TYPE: "VULN",
      QID: "38173",
      SEVERITY: "4",
      STANDARD_SEVERITY: "3",
      CVE_ID_LIST: { CVE_ID: ["CVE-2024-001", "CVE-2024-002"] },
      VENDOR_REF_LIST: { VENDOR_REF: "KB123" },
    },
    STATS: {
      FIRST_FOUND_DATETIME: "2005-06-20T09:00:00Z",
      LAST_FOUND_DATETIME: "2005-06-28T12:00:00Z",
      LAST_SCAN_DATETIME: "2005-06-28T12:00:00Z",
    },
  };
  it("maps all fields from correct XML paths", () => {
    const result = normalizeTicket(fullTicket);
    expect(result).toEqual({
      number: "53",
      creationDatetime: "2005-06-28T13:32:02Z",
      dueDatetime: "2005-08-24T08:55:53Z",
      state: "OPEN",
      invalid: "0",
      assigneeName: "John",
      assigneeEmail: "john@example.com",
      ip: "10.0.1.100",
      dnsName: "server.example.com",
      service: "https / tcp / 443",
      qid: "38173",
      severity: "4",
      type: "VULN",
      title: "SSL Expired",
      cveIds: ["CVE-2024-001", "CVE-2024-002"],
      vendorRefs: ["KB123"],
      firstFoundDatetime: "2005-06-20T09:00:00Z",
      lastFoundDatetime: "2005-06-28T12:00:00Z",
      lastScanDatetime: "2005-06-28T12:00:00Z",
    });
  });
  it("handles minimal ticket with missing optional fields", () => {
    const result = normalizeTicket({ NUMBER: "1" });
    expect(result.number).toBe("1");
    expect(result.assigneeName).toBeUndefined();
    expect(result.ip).toBeUndefined();
    expect(result.qid).toBeUndefined();
    expect(result.cveIds).toEqual([]);
    expect(result.vendorRefs).toEqual([]);
  });
  it("handles single CVE (not array) via ensureArray", () => {
    const ticket: ClassicTicket = {
      VULNINFO: { CVE_ID_LIST: { CVE_ID: "CVE-2024-999" } },
    };
    const result = normalizeTicket(ticket);
    expect(result.cveIds).toEqual(["CVE-2024-999"]);
  });
});
describe("deriveRiskData", () => {
  it("computes risk band and vuln counts from XML-shaped host", () => {
    const host: ClassicHost = {
      ID: "123",
      IP: "10.0.0.1",
      DNS: "host.example.com",
      OS: "Ubuntu 22.04",
      TRURISK_SCORE: "750",
      TRURISK_SCORE_FACTORS: {
        VULN_COUNT: [
          { $: { qds_severity: "1" }, _: "10" },
          { $: { qds_severity: "2" }, _: "5" },
          { $: { qds_severity: "3" }, _: "3" },
          { $: { qds_severity: "4" }, _: "2" },
          { $: { qds_severity: "5" }, _: "1" },
        ],
      },
      LAST_ACTIVITY: "2024-01-15T10:00:00Z",
    };
    const result = deriveRiskData(host);
    expect(result.id).toBe("123");
    expect(result.truRiskScore).toBe(750);
    expect(result.derived.truRiskBand).toBe("High");
    expect(result.vulnCounts).toEqual({
      severity1: 10,
      severity2: 5,
      severity3: 3,
      severity4: 2,
      severity5: 1,
    });
    expect(result.derived.totalVulnerabilityCount).toBe(21);
    expect(result.derived.daysSinceLastActivity).toBeGreaterThan(0);
  });
  it("returns Severe for score >= 850", () => {
    const result = deriveRiskData({ TRURISK_SCORE: "900" });
    expect(result.derived.truRiskBand).toBe("Severe");
  });
  it("returns Medium for score >= 500 and < 700", () => {
    const result = deriveRiskData({ TRURISK_SCORE: "550" });
    expect(result.derived.truRiskBand).toBe("Medium");
  });
  it("returns Low for score < 500", () => {
    const result = deriveRiskData({ TRURISK_SCORE: "100" });
    expect(result.derived.truRiskBand).toBe("Low");
  });
  it("handles missing vuln counts", () => {
    const result = deriveRiskData({ ID: "1" });
    expect(result.vulnCounts.severity1).toBe(0);
    expect(result.derived.totalVulnerabilityCount).toBe(0);
  });
  it("returns null daysSinceLastActivity when LAST_ACTIVITY is missing", () => {
    const result = deriveRiskData({ ID: "1" });
    expect(result.derived.daysSinceLastActivity).toBeNull();
  });
});
describe("normalizeScan", () => {
  it("maps nested XML fields to flat object", () => {
    const scan: ClassicScan = {
      REF: "scan/123.456",
      TITLE: "Weekly Scan",
      TYPE: "On-Demand",
      STATUS: { STATE: "Finished" },
      LAUNCH_DATETIME: "2024-01-01T00:00:00Z",
      DURATION: "00:15:00",
      TARGET: "10.0.0.0/24",
      PROCESSED: "1",
      OPTION_PROFILE: { TITLE: "Standard" },
    };
    expect(normalizeScan(scan)).toEqual({
      ref: "scan/123.456",
      title: "Weekly Scan",
      type: "On-Demand",
      state: "Finished",
      launchDatetime: "2024-01-01T00:00:00Z",
      duration: "00:15:00",
      target: "10.0.0.0/24",
      processed: "1",
      optionProfile: "Standard",
    });
  });
  it("handles missing optional fields", () => {
    const scan: ClassicScan = { REF: "scan/1" };
    const result = normalizeScan(scan);
    expect(result.ref).toBe("scan/1");
    expect(result.state).toBeUndefined();
    expect(result.optionProfile).toBeUndefined();
  });
});
describe("toQualysAssetTimestamp", () => {
  it("truncates seconds from ISO timestamp", () => {
    expect(toQualysAssetTimestamp("2024-01-15T10:30:45Z")).toBe(
      "2024-01-15T10:30Z",
    );
  });
  it("handles timestamp already at minute precision", () => {
    expect(toQualysAssetTimestamp("2024-01-15T10:30Z")).toBe(
      "2024-01-15T10:30Z",
    );
  });
});
describe("splitAssetsByChangeType", () => {
  const makeAsset = (id: number, createdDate: string): QualysAsset => ({
    assetId: id,
    createdDate,
  });
  const watermark = "2024-06-01T00:00Z";
  it("splits assets into created and updated buckets", () => {
    const newAsset = makeAsset(1, "2024-06-15T00:00:00Z");
    const oldAsset = makeAsset(2, "2024-01-01T00:00:00Z");
    const result = splitAssetsByChangeType([newAsset, oldAsset], watermark, {
      showNewRecords: true,
      showUpdatedRecords: true,
    });
    expect(result.createdRecords).toEqual([newAsset]);
    expect(result.updatedRecords).toEqual([oldAsset]);
  });
  it("respects showNewRecords toggle", () => {
    const newAsset = makeAsset(1, "2024-06-15T00:00:00Z");
    const result = splitAssetsByChangeType([newAsset], watermark, {
      showNewRecords: false,
      showUpdatedRecords: true,
    });
    expect(result.createdRecords).toEqual([]);
  });
  it("respects showUpdatedRecords toggle", () => {
    const oldAsset = makeAsset(1, "2024-01-01T00:00:00Z");
    const result = splitAssetsByChangeType([oldAsset], watermark, {
      showNewRecords: true,
      showUpdatedRecords: false,
    });
    expect(result.updatedRecords).toEqual([]);
  });
  it("treats asset with missing createdDate as updated", () => {
    const asset: QualysAsset = { assetId: 1 };
    const result = splitAssetsByChangeType([asset], watermark, {
      showNewRecords: true,
      showUpdatedRecords: true,
    });
    expect(result.createdRecords).toEqual([]);
    expect(result.updatedRecords).toEqual([asset]);
  });
});
describe("resolveChangedAssetItems", () => {
  it("flattens created and updated into tagged items", () => {
    const a1: QualysAsset = { assetId: 1 };
    const a2: QualysAsset = { assetId: 2 };
    const result = resolveChangedAssetItems({
      createdRecords: [a1],
      updatedRecords: [a2],
    });
    expect(result).toEqual([
      { changeType: "created", asset: a1 },
      { changeType: "updated", asset: a2 },
    ]);
  });
  it("returns empty array for undefined input", () => {
    expect(resolveChangedAssetItems(undefined)).toEqual([]);
  });
  it("handles missing arrays", () => {
    const result = resolveChangedAssetItems({
      createdRecords: [],
      updatedRecords: [],
    });
    expect(result).toEqual([]);
  });
});
