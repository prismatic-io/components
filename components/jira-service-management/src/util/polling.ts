import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type {
  OpsAlertChange,
  OpsAlertChangesObject,
  OpsAlertSummary,
  ServiceRequest,
  ServiceRequestChange,
  ServiceRequestChangesObject,
} from "../types";
import { getOpsPaginatedData, getPaginatedData } from "./pagination";
export const resolveServiceRequestChanges = (
  data: ServiceRequestChangesObject | undefined,
): ServiceRequestChange[] =>
  (data ?? []).map(
    (record): ServiceRequestChange => ({ changeType: "created", record }),
  );
export const resolveOpsAlertChanges = (
  data: OpsAlertChangesObject | undefined,
): OpsAlertChange[] =>
  (data ?? []).map(
    (record): OpsAlertChange => ({ changeType: "created", record }),
  );
export const fetchNewRequestsSince = async (
  client: HttpClient,
  lastPolledAtMs: number,
  serviceDeskId?: string | null,
): Promise<ServiceRequest[]> => {
  const { data } = await getPaginatedData<ServiceRequest>(
    client,
    "/request",
    true,
    {
      params: { serviceDeskId },
    },
  );
  return ((data.values as ServiceRequest[]) ?? []).filter(
    (r: ServiceRequest) => {
      const ms = r.createdDate?.epochMillis;
      return typeof ms === "number" && ms > lastPolledAtMs;
    },
  );
};
export const fetchNewOpsAlertsSince = async (
  client: HttpClient,
  lastPolledAtMs: number,
  additionalQuery?: string | null,
): Promise<OpsAlertSummary[]> => {
  const createdAtFilter = `createdAt > ${lastPolledAtMs}`;
  const query = additionalQuery
    ? `${createdAtFilter} AND ${additionalQuery}`
    : createdAtFilter;
  const { data } = await getOpsPaginatedData<OpsAlertSummary>(
    client,
    "/v1/alerts",
    true,
    {
      params: { query },
    },
  );
  return data.values ?? [];
};
