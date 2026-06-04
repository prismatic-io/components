import { input, util } from "@prismatic-io/spectral";
import { SERVICES } from "../constants";
import { cleanDate } from "../util";
import {
  additionalFields,
  connection,
  paginationQueryStringInputs,
  params,
  workerId,
} from "./shared";

const effectiveDateJobChange = input({
  label: "Effective Date",
  comments: "The effective date of the job change.",
  type: "string",
  example: "2024-06-01T07:00:00.000Z",
  placeholder: "2024-06-01T07:00:00.000Z",
  required: true,
  clean: (value: unknown) => cleanDate(value, "Effective Date"),
});

const effectiveDateOrgAssignment = input({
  label: "Effective Date",
  comments: "The effective date of the organization assignment change.",
  type: "string",
  example: "2024-06-01T07:00:00.000Z",
  placeholder: "2024-06-01T07:00:00.000Z",
  required: true,
  clean: (value: unknown) => cleanDate(value, "Effective Date"),
});

const changeJobWorkerId = input({
  label: "Change Job Worker ID",
  comments:
    "Workday ID of the worker whose job is being changed. Retrieve using GET /values/jobChangesGroup/workers.",
  type: "string",
  example: "",
  placeholder: "Enter change job worker ID",
  required: true,
  clean: util.types.toString,
});

const changeOrgWorkerId = input({
  label: "Change Org Worker ID",
  comments:
    "Workday ID of the worker whose organization assignment is being changed. Retrieve using GET /values/organizationAssignmentChangesGroup/workers.",
  type: "string",
  example: "",
  placeholder: "Enter change org worker ID",
  required: true,
  clean: util.types.toString,
});

const jobChangeJobId = input({
  label: "Job ID",
  comments:
    "Workday ID of the target job or position. Retrieve using GET /values/jobChangesGroup/jobs with the worker query parameter.",
  type: "string",
  example: "",
  placeholder: "Enter job ID",
  required: true,
  clean: util.types.toString,
});

const orgAssignmentJobId = input({
  label: "Job ID",
  comments:
    "Workday ID of the worker's current position. Retrieve using GET /values/organizationAssignmentChangesGroup/jobs with the worker query parameter.",
  type: "string",
  example: "",
  placeholder: "Enter job ID",
  required: true,
  clean: util.types.toString,
});

const reasonId = input({
  label: "Reason ID",
  comments:
    "Workday ID of the change job reason. Retrieve using GET /values/jobChangesGroup/reason.",
  type: "string",
  example: "",
  placeholder: "Enter reason ID",
  required: true,
  clean: util.types.toString,
});

const getStaffingWorkersParamsComments = `${params.comments} See optional (QUERY-STRING PARAMETERS) at https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.staffing.slice(1)}/get-/workers`;

const getWorkerExplicitSkillsParamsComments = `${params.comments} See optional (QUERY-STRING PARAMETERS) at https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.staffing.slice(1)}/get-/workers/-ID-/explicitSkills`;

const initiateJobChangeAdditionalFieldsComments = `${additionalFields.comments} See [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.staffing.slice(1)}/post-/workers/-ID-/jobChanges) for more information.`;

const initiateJobChangeAdditionalFieldsExample = JSON.stringify(
  {
    supervisoryOrganization: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    location: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
  },
  null,
  2,
);

const initiateOrganizationAssignmentChangeAdditionalFieldsComments = `${additionalFields.comments} See [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.staffing.slice(1)}/post-/workers/-ID-/organizationAssignmentChanges) for more information.`;

const initiateOrganizationAssignmentChangeAdditionalFieldsExample =
  JSON.stringify(
    {
      costCenter: {
        id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
      },
      company: {
        id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
      },
      region: {
        id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
      },
    },
    null,
    2,
  );

export const getStaffingWorkerByIdInputs = { connection, workerId };

export const getStaffingWorkersInputs = {
  connection,
  ...paginationQueryStringInputs,
  params: { ...params, comments: getStaffingWorkersParamsComments },
};

export const getWorkerExplicitSkillsInputs = {
  connection,
  workerId,
  ...paginationQueryStringInputs,
  params: { ...params, comments: getWorkerExplicitSkillsParamsComments },
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
  targetWorkerId: changeJobWorkerId,
  jobId: jobChangeJobId,
  reasonId,
  additionalFields: {
    ...additionalFields,
    comments: initiateJobChangeAdditionalFieldsComments,
    example: initiateJobChangeAdditionalFieldsExample,
  },
};

export const initiateOrganizationAssignmentChangeInputs = {
  connection,
  workerId,
  effectiveDate: effectiveDateOrgAssignment,
  targetWorkerId: changeOrgWorkerId,
  jobId: orgAssignmentJobId,
  additionalFields: {
    ...additionalFields,
    comments: initiateOrganizationAssignmentChangeAdditionalFieldsComments,
    example: initiateOrganizationAssignmentChangeAdditionalFieldsExample,
  },
};
