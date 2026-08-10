import type { Element } from "@prismatic-io/spectral";
import type { Grade, OracleHcmListResponse } from "../types";
const gradeExample: Grade = {
  GradeId: 300100012340004,
  GradeCode: "IC3",
  GradeName: "Individual Contributor 3",
  SetId: 300000001,
  ActiveStatus: "A",
  EffectiveStartDate: "2020-01-01",
  EffectiveEndDate: null,
};
export const listGradesExamplePayload: {
  data: OracleHcmListResponse<Grade>;
} = {
  data: {
    items: [gradeExample],
    count: 1,
    hasMore: false,
    limit: 25,
    offset: 0,
  },
};
export const getGradeExamplePayload: {
  data: Grade;
} = { data: gradeExample };
export const selectGradeExamplePayload: {
  result: Element[];
} = {
  result: [{ key: "300100012340004", label: "IC3 - Individual Contributor 3" }],
};
