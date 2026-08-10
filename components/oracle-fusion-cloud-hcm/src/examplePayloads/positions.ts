import type { Element } from "@prismatic-io/spectral";
import type { OracleHcmListResponse, Position } from "../types";
const positionExample: Position = {
  PositionId: 300100012340010,
  Name: "Engineering Lead",
  PositionCode: "ENG-LEAD-001",
  BusinessUnitId: 300100012340800,
  DepartmentId: 300100012340002,
  JobId: 300100012340001,
  LocationId: 300100012340003,
  ActiveStatus: "A",
  EffectiveStartDate: "2021-01-01",
  EffectiveEndDate: "4712-12-31",
};
export const listPositionsExamplePayload: {
  data: OracleHcmListResponse<Position>;
} = {
  data: {
    items: [positionExample],
    count: 1,
    hasMore: false,
    limit: 25,
    offset: 0,
  },
};
export const getPositionExamplePayload: {
  data: Position;
} = { data: positionExample };
export const selectPositionExamplePayload: {
  result: Element[];
} = {
  result: [
    { key: "300100012340010", label: "ENG-LEAD-001 - Engineering Lead" },
  ],
};
