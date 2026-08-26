import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
export interface ClassicVulnCount {
  VULN_COUNT_SEVERITY_1?: string;
  VULN_COUNT_SEVERITY_2?: string;
  VULN_COUNT_SEVERITY_3?: string;
  VULN_COUNT_SEVERITY_4?: string;
  VULN_COUNT_SEVERITY_5?: string;
}
export interface ClassicHost {
  ID?: string;
  IP?: string;
  TRACKING_METHOD?: string;
  DNS?: string;
  NETBIOS?: string;
  OS?: string;
  LAST_SCAN_DATETIME?: string;
  TRURISK_SCORE?: string;
  ASSET_RISK_SCORE?: string;
  VULN_COUNT?: ClassicVulnCount;
}
export interface ClassicHostResponse {
  HOST_LIST_OUTPUT?: {
    RESPONSE?: {
      HOST_LIST?: {
        HOST?: ClassicHost | ClassicHost[];
      };
      TRUNCATION?: {
        $?: {
          last: string;
        };
      };
      WARNING?: {
        TEXT?: string;
      };
    };
  };
}
export interface DerivedRiskData {
  truRiskBand: "Severe" | "High" | "Medium" | "Low";
  totalVulnerabilityCount: number;
  daysSinceLastScan: number | null;
}
export interface VulnCounts {
  severity1: number;
  severity2: number;
  severity3: number;
  severity4: number;
  severity5: number;
}
export interface FetchClassicHostRiskDataOptions {
  client: HttpClient;
  pageSize?: number;
  fetchAll: boolean;
}
export interface HostRiskData {
  id: string;
  ip: string;
  dns: string;
  os: string;
  truRiskScore: number;
  vulnCounts: VulnCounts;
  lastScanDate: string;
  derived: DerivedRiskData;
}
