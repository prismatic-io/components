import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
interface ClassicVulnCountElement {
  $?: {
    qds_severity?: string;
  };
  _?: string;
}
export interface ClassicHost {
  ID?: string;
  IP?: string;
  TRACKING_METHOD?: string;
  DNS?: string;
  NETBIOS?: string;
  OS?: string;
  LAST_ACTIVITY?: string;
  TRURISK_SCORE?: string;
  ASSET_RISK_SCORE?: string;
  TRURISK_SCORE_FACTORS?: {
    VULN_COUNT?: ClassicVulnCountElement | ClassicVulnCountElement[];
  };
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
  daysSinceLastActivity: number | null;
}
interface VulnCounts {
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
  lastActivityDate: string;
  derived: DerivedRiskData;
}
