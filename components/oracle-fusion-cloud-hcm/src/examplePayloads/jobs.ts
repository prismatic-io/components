import type { Element } from "@prismatic-io/spectral";
import type { Job, OracleHcmListResponse } from "../types";
const jobExample: Job = {
  JobId: 300100012340001,
  JobCode: "ENG001",
  Name: "Software Engineer",
  SetId: 300000001,
  ActiveStatus: "A",
  JobFamilyId: 300100012340500,
  EffectiveStartDate: "2020-01-01",
  EffectiveEndDate: null,
  LastUpdateDate: "2024-01-15T08:00:00.000Z",
};
export const listJobsExamplePayload: {
  data: OracleHcmListResponse<Job>;
} = {
  data: { items: [jobExample], count: 1, hasMore: false, limit: 25, offset: 0 },
};
export const getJobExamplePayload: {
  data: Job;
} = { data: jobExample };
export const selectJobExamplePayload: {
  result: Element[];
} = {
  result: [{ key: "300100012340001", label: "ENG001 - Software Engineer" }],
};
