export interface Worker {
  PersonId: number;
  PersonNumber: string;
  DisplayName: string | null;
  FirstName: string | null;
  LastName: string;
  FullName: string | null;
  WorkEmail: string | null;
  CreationDate: string | null;
  LastUpdateDate: string | null;
}
export interface WorkerRecord {
  PersonId: number;
  PersonNumber: string | null;
  DisplayName: string | null;
  FullName: string | null;
  DateOfBirth: string | null;
  CreationDate: string | null;
  LastUpdateDate: string | null;
  workersUniqID: string;
}
export interface Assignment {
  AssignmentId: number;
  AssignmentName: string | null;
  AssignmentNumber: string | null;
  DepartmentName: string;
  GradeCode: string;
  GradeName: string;
  JobCode: string | null;
  JobName: string | null;
  LegalEmployerName: string;
  LocationCode: string;
  LocationName: string;
  ManagerName: string | null;
  PositionCode: string;
  PositionName: string;
  PrimaryAssignmentFlag: boolean;
  StartDate: string;
  WorkerType: string | null;
  FullPartTime: string | null;
}
export interface Department {
  OrganizationId: number;
  Name: string | null;
  OrganizationCode: string | null;
  Status: string | null;
  EffectiveStartDate: string | null;
  EffectiveEndDate: string | null;
  LastUpdateDate: string | null;
}
export interface Job {
  JobId: number;
  JobCode: string | null;
  Name: string;
  SetId: number;
  ActiveStatus: string | null;
  JobFamilyId: number | null;
  EffectiveStartDate: string | null;
  EffectiveEndDate: string | null;
  LastUpdateDate: string | null;
}
export interface LocationAddress {
  Country: string | null;
  AddressUsageType: string | null;
  AddressLine1: string | null;
  TownOrCity: string | null;
  Region1: string | null;
  PostalCode: string | null;
  EffectiveStartDate: string | null;
  EffectiveEndDate: string | null;
}
export interface Location {
  LocationId: number;
  LocationCode: string;
  LocationName: string;
  SetId: number;
  SetCode: string;
  SetName: string;
  ActiveStatus: string | null;
  Description: string | null;
  EffectiveStartDate: string;
  EffectiveEndDate: string;
  LastUpdateDate: string | null;
  addresses?: LocationAddress[];
}
export interface Position {
  PositionId: number;
  Name: string;
  PositionCode: string | null;
  BusinessUnitId: number;
  DepartmentId: number;
  JobId: number;
  LocationId: number | null;
  ActiveStatus: string | null;
  EffectiveStartDate: string;
  EffectiveEndDate: string;
}
export interface Grade {
  GradeId: number;
  GradeCode: string | null;
  GradeName: string | null;
  SetId: number | null;
  ActiveStatus: string | null;
  EffectiveStartDate: string | null;
  EffectiveEndDate: string | null;
}
export interface Absence {
  personAbsenceEntryId: number;
  personId: number;
  absenceTypeId: number;
  absenceType: string | null;
  legalEntityId: number;
  absenceStatusCd: string | null;
  approvalStatusCd: string | null;
  startDate: string | null;
  endDate: string | null;
  duration: number | null;
  unitOfMeasure: string | null;
  assignmentId: number | null;
}
