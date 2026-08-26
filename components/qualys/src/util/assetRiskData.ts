import { util } from "@prismatic-io/spectral";
import {
  DEFAULT_CLASSIC_PAGE_SIZE,
  MS_PER_DAY,
  TRURISK_HIGH_THRESHOLD,
  TRURISK_MEDIUM_THRESHOLD,
  TRURISK_SEVERE_THRESHOLD,
} from "../constants";
import type {
  ClassicHost,
  ClassicHostResponse,
  DerivedRiskData,
  FetchClassicHostRiskDataOptions,
  HostRiskData,
} from "../types";
import { ensureArray, parseXml } from "./xml";
export const deriveTruRiskBand = (
  score: number,
): DerivedRiskData["truRiskBand"] => {
  if (score >= TRURISK_SEVERE_THRESHOLD) return "Severe";
  if (score >= TRURISK_HIGH_THRESHOLD) return "High";
  if (score >= TRURISK_MEDIUM_THRESHOLD) return "Medium";
  return "Low";
};
export const fetchClassicHostRiskData = async ({
  client,
  pageSize,
  fetchAll,
}: FetchClassicHostRiskDataOptions): Promise<HostRiskData[]> => {
  const limit = fetchAll
    ? DEFAULT_CLASSIC_PAGE_SIZE
    : pageSize || DEFAULT_CLASSIC_PAGE_SIZE;
  const allHosts: HostRiskData[] = [];
  let idMin: string | undefined;
  let hasMore = true;
  while (hasMore) {
    const params: Record<string, string> = {
      action: "list",
      truncation_limit: util.types.toString(limit),
      show_trurisk: "1",
      show_trurisk_factors: "1",
      host_metadata: "all",
    };
    if (idMin) params.id_min = idMin;
    const response = await client.get<string>("/api/2.0/fo/asset/host/", {
      params,
    });
    const parsed = await parseXml<ClassicHostResponse>(response.data);
    const hosts = ensureArray(
      parsed.HOST_LIST_OUTPUT?.RESPONSE?.HOST_LIST?.HOST,
    );
    allHosts.push(...hosts.map(deriveRiskData));
    const truncation = parsed.HOST_LIST_OUTPUT?.RESPONSE?.TRUNCATION?.$?.last;
    if (!fetchAll || !truncation) {
      hasMore = false;
    } else {
      idMin = truncation;
    }
  }
  return allHosts;
};
export const deriveRiskData = (host: ClassicHost): HostRiskData => {
  const truRiskScore = util.types.toInt(host.TRURISK_SCORE);
  const vulnCounts = host.VULN_COUNT || {};
  const s1 = util.types.toInt(vulnCounts.VULN_COUNT_SEVERITY_1);
  const s2 = util.types.toInt(vulnCounts.VULN_COUNT_SEVERITY_2);
  const s3 = util.types.toInt(vulnCounts.VULN_COUNT_SEVERITY_3);
  const s4 = util.types.toInt(vulnCounts.VULN_COUNT_SEVERITY_4);
  const s5 = util.types.toInt(vulnCounts.VULN_COUNT_SEVERITY_5);
  let daysSinceLastScan: number | null = null;
  if (host.LAST_SCAN_DATETIME) {
    const lastScan = new Date(host.LAST_SCAN_DATETIME);
    if (!Number.isNaN(lastScan.getTime())) {
      daysSinceLastScan = Math.floor(
        (Date.now() - lastScan.getTime()) / MS_PER_DAY,
      );
    }
  }
  const derived: DerivedRiskData = {
    truRiskBand: deriveTruRiskBand(truRiskScore),
    totalVulnerabilityCount: s1 + s2 + s3 + s4 + s5,
    daysSinceLastScan,
  };
  return {
    id: host.ID || "",
    ip: host.IP || "",
    dns: host.DNS || "",
    os: host.OS || "",
    truRiskScore,
    vulnCounts: {
      severity1: s1,
      severity2: s2,
      severity3: s3,
      severity4: s4,
      severity5: s5,
    },
    lastScanDate: host.LAST_SCAN_DATETIME || "",
    derived,
  };
};
