import type { Assignment, OracleHcmListResponse } from "../types";
const assignmentExample: Assignment = {
  AssignmentId: 300100551559732,
  AssignmentName: "Software Engineer - E955160008186257",
  AssignmentNumber: "E955160008186257",
  DepartmentName: "Engineering",
  GradeCode: "IC3",
  GradeName: "Individual Contributor 3",
  JobCode: "ENG001",
  JobName: "Software Engineer",
  LegalEmployerName: "Acme Corporation US LLC",
  LocationCode: "US-NYC",
  LocationName: "New York Office",
  ManagerName: "John Doe",
  PositionCode: "ENG-LEAD-001",
  PositionName: "Engineering Lead",
  PrimaryAssignmentFlag: true,
  StartDate: "2023-01-15",
  WorkerType: "E",
  FullPartTime: "F",
};
export const listAssignmentsExamplePayload: {
  data: OracleHcmListResponse<Assignment>;
} = {
  data: {
    items: [assignmentExample],
    count: 1,
    hasMore: false,
    limit: 25,
    offset: 0,
  },
};
export const getAssignmentExamplePayload: {
  data: Assignment;
} = {
  data: assignmentExample,
};
