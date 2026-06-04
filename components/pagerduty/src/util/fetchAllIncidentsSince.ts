import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { ENDPOINTS } from "../constants";
import type { PagerDutyIncident } from "../types";
import { fetchAllWithPagination } from "./fetchAllWithPagination";











export const fetchAllIncidentsSince = async (
  client: HttpClient,
  since: string,
): Promise<PagerDutyIncident[]> => {
  const result = await fetchAllWithPagination({
    client,
    configVars: { since },
    endpoint: ENDPOINTS.INCIDENTS,
    objectKey: "incidents",
  });
  return Array.isArray(result.incidents)
    ? (result.incidents as PagerDutyIncident[])
    : [];
};
