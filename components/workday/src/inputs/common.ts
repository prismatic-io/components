import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanDate } from "../util";
import {
  connection,
  instanceDescriptor,
  instanceHref,
  instanceId,
  paginationQueryStringInputs,
  params,
  workerId,
} from "./shared";

const organizationId = input({
  label: "Organization ID",
  comments: "Identifies the Workday organization.",
  type: "string",
  placeholder: "Enter organization ID",
  example: "",
  required: true,
  clean: util.types.toString,
  dataSource: "selectOrganization",
});

const customerId = input({
  label: "Customer ID",
  comments: "Identifies the customer account.",
  type: "string",
  required: true,
  example: "",
  placeholder: "Enter customer ID",
  clean: util.types.toString,
});


const supervisoryOrganizationId = input({
  label: "Supervisory Organization ID",
  comments:
    "Supervisory organization assigned to the worker as of the effective date.",
  type: "string",
  example: "123$456",
  placeholder: "123$456",
  required: true,
  clean: util.types.toString,
});

const jobChangeReasonId = input({
  label: "Job Change Reason ID",
  comments: "Identifies the reason used in a Change Job business process.",
  type: "string",
  example: "123$456",
  placeholder: "123$456",
  required: true,
  clean: util.types.toString,
});

const moveManagersTeam = input({
  label: "Move Managers Team",
  comments: "When true, also moves subordinate teams to the new manager.",
  type: "boolean",
  default: "false",
  required: true,
  clean: util.types.toBool,
});

const effective = input({
  label: "Effective Date",
  comments: "The date this business process takes effect.",
  type: "string",
  example: "2022-01-01",
  placeholder: "Enter effective date (YYYY-MM-DD)",
  required: true,
  clean: (value: unknown) => cleanDate(value, "Effective Date"),
});

const proposedOrganizations = input({
  label: "Proposed Organizations",
  comments:
    "Organizations with staffing behavior assigned to the position as a result of this event.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        id: "string",
        href: "string",
        descriptor: "Lorem ipsum dolor sit ame",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanCodeInput(value, "Proposed Organizations"),
});


const proposedBusinessTitle = input({
  label: "Proposed Business Title",
  comments:
    "New business title for the worker as of the effective date. If there is no business title override, this field defaults to the job title or job profile name.",

  type: "string",
  example: "",
  placeholder: "Enter proposed business title",
  required: true,
  clean: util.types.toString,
});

export const getCustomerByIdInputs = {
  connection,
  customerId,
};

export const getOrganizationByIdInputs = {
  connection,
  organizationId,
};

export const getWorkerBusinessTitleChangesInputs = {
  connection,
  workerId,
  ...paginationQueryStringInputs,
};

export const listOrganizationsInputs = {
  connection,
  params,
};

export const postJobChangesInputs = {
  connection,
  workerId,
  supervisoryOrganizationId,
  jobChangeReasonId,
  moveManagersTeam,
  effective,
  proposedOrganizations,
  instanceId,
  instanceHref,
  instanceDescriptor,
};

export const postWorkerBusinessTitleChangeInputs = {
  connection,
  workerId,
  proposedBusinessTitle,
  instanceId,
  instanceHref,
  instanceDescriptor,
};
