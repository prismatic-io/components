export type { Application, PollingState } from "./v1/Applications";
export type {
  Address,
  Application as CandidateApplication,
  Attachment,
  CandidateDataSources,
  CandidateParams,
  CurrentStage,
  DesiredSalary,
  Education,
  Employment,
  Location as CandidateLocation,
  ProspectDetail,
  Recruiter,
  Source,
  WorkRemotely,
} from "./v1/Candidates";
export type {
  CustomFieldDataSources,
  CustomFieldOption,
} from "./v1/CustomFields";
export type { DepartmentDataSources } from "./v1/Departments";
export type {
  Budget,
  CloseReason,
  Coordinator,
  HiringTeam,
  JobDataSources,
  Opening,
  ValueClass,
} from "./v1/Jobs";
export type {
  Location as OfficeLocation,
  OfficeDataSources,
} from "./v1/Offices";
export type { UserDataSources } from "./v1/User";

export type {
  V3Application,
  V3ApplicationChange,
  V3ApplicationChangesObject,
  V3Attachment,
  V3Candidate,
  V3CustomField,
  V3Department,
  V3Job,
  V3Office,
  V3PollingCursor,
  V3PollingState,
  V3PollWindowStart,
  V3RejectionReason,
  V3User,
} from "./v3";
