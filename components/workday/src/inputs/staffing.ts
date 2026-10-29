import { input, util } from "@prismatic-io/spectral";
import { SERVICES, WORKDAY_API_DOCS_URL } from "../constants";
import { cleanStringInput } from "../util";
import {
  extraBody,
  connection,
  paginationQueryStringInputs,
  extraParameters,
  workerId,
} from "./common";

const effectiveDateJobChange = input({
  label: "Effective Date",
  comments:
    "The effective date of the job change. Format: ISO 8601 date-time (YYYY-MM-DDTHH:mm:ss.sssZ).",
  type: "string",
  example: "2024-06-01T07:00:00.000Z",
  placeholder: "Enter effective date",
  required: true,
  clean: (value: unknown) => util.types.toDate(value),
});

const effectiveDateOrgAssignment = input({
  label: "Effective Date",
  comments:
    "The effective date of the organization assignment change. Format: ISO 8601 date-time (YYYY-MM-DDTHH:mm:ss.sssZ).",
  type: "string",
  example: "2024-06-01T07:00:00.000Z",
  placeholder: "Enter effective date",
  required: true,
  clean: (value: unknown) => util.types.toDate(value),
});

const jobChangeJobId = input({
  label: "Job ID",
  comments:
    "Workday ID of the worker's position before the effective date. Retrieve using GET /values/jobChangesGroup/jobs with the worker query parameter.",
  type: "string",
  example: "2a4c6e8a0c3e45f7b9d1f3a5c7e9b1d3",
  placeholder: "Enter job ID",
  required: true,
  clean: util.types.toString,
});

const supervisoryOrganizationId = input({
  label: "Supervisory Organization ID",
  comments:
    "Workday ID of the supervisory organization for the worker as of the effective date. Retrieve using GET /values/jobChangesGroup/supervisoryOrganization.",
  type: "string",
  example: "f5074d9b65654ba68d2c4fafb5a1e4fd",
  placeholder: "Enter supervisory organization ID",
  required: false,
  clean: cleanStringInput,
});

const locationId = input({
  label: "Location ID",
  comments:
    "Workday ID of the new location for the worker as of the effective date. Retrieve using GET /values/jobChangesGroup/locations.",
  type: "string",
  example: "98915f9116884d2e95027cfc506d4760",
  placeholder: "Enter location ID",
  required: false,
  clean: cleanStringInput,
});

const orgAssignmentJobId = input({
  label: "Job ID",
  comments:
    "Workday ID of the worker's job (position) to change. Retrieve using GET /values/organizationAssignmentChangesGroup/jobs with the worker query parameter.",
  type: "string",
  example: "2a4c6e8a0c3e45f7b9d1f3a5c7e9b1d3",
  placeholder: "Enter job ID",
  required: true,
  clean: util.types.toString,
});

const positionId = input({
  label: "Position ID",
  comments:
    "Workday ID of the worker's position as of the effective date. Retrieve using GET /values/organizationAssignmentChangesGroup/positions.",
  type: "string",
  example: "2a4c6e8a0c3e45f7b9d1f3a5c7e9b1d3",
  placeholder: "Enter position ID",
  required: false,
  clean: cleanStringInput,
});

const reasonId = input({
  label: "Reason ID",
  comments:
    "Workday ID of the change job reason. Retrieve using GET /values/jobChangesGroup/reason.",
  type: "string",
  example: "6b8d0f2b4d5f47a9c1e3a5c7e9a1c3e5",
  placeholder: "Enter reason ID",
  required: true,
  clean: util.types.toString,
});

const getStaffingWorkersParamsComments = `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.staffing.slice(1)}/get-/workers).`;

const getWorkerExplicitSkillsParamsComments = `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.staffing.slice(1)}/get-/workers/-ID-/explicitSkills).`;

const initiateJobChangeExtraBodyComments = `${extraBody.comments} See [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.staffing.slice(1)}/post-/workers/-ID-/jobChanges) for more information.`;

const initiateJobChangeExtraBodyExample = JSON.stringify(
  {
    template: {
      id: "5c7e9a1b3d5f47a9b1c3e5a7c9e1b3d5",
    },
  },
  null,
  2,
);

const initiateOrganizationAssignmentChangeExtraBodyComments = `${extraBody.comments} Company, cost center, region, and other organizations are set after initiation with the PATCH /organizationAssignmentChanges/{ID} subresource endpoints. See [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.staffing.slice(1)}/post-/workers/-ID-/organizationAssignmentChanges) for more information.`;

const initiateOrganizationAssignmentChangeExtraBodyExample = JSON.stringify(
  {
    descriptor: "Organization assignment change for Logan McNeil",
  },
  null,
  2,
);

export const getStaffingWorkerByIdInputs = { connection, workerId };

export const getStaffingWorkersInputs = {
  connection,
  ...paginationQueryStringInputs,
  extraParameters: {
    ...extraParameters,
    comments: getStaffingWorkersParamsComments,
  },
};

export const getWorkerExplicitSkillsInputs = {
  connection,
  workerId,
  ...paginationQueryStringInputs,
  extraParameters: {
    ...extraParameters,
    comments: getWorkerExplicitSkillsParamsComments,
  },
};

export const getWorkerServiceDatesInputs = {
  connection,
  workerId,
  ...paginationQueryStringInputs,
};

export const initiateJobChangeInputs = {
  connection,
  workerId,
  effectiveDate: effectiveDateJobChange,
  jobId: jobChangeJobId,
  reasonId,
  supervisoryOrganizationId,
  locationId,
  extraBody: {
    ...extraBody,
    comments: initiateJobChangeExtraBodyComments,
    example: initiateJobChangeExtraBodyExample,
  },
};

export const initiateOrganizationAssignmentChangeInputs = {
  connection,
  workerId,
  effectiveDate: effectiveDateOrgAssignment,
  jobId: orgAssignmentJobId,
  positionId,
  extraBody: {
    ...extraBody,
    comments: initiateOrganizationAssignmentChangeExtraBodyComments,
    example: initiateOrganizationAssignmentChangeExtraBodyExample,
  },
};
