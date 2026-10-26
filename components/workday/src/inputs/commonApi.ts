import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import {
  connection,
  instanceDescriptor,
  instanceHref,
  instanceId,
  paginationQueryStringInputs,
  extraParameters,
  organizationTypeId,
  workerId,
} from "./common";
const organizationId = input({
  label: "Organization ID",
  comments: "Identifies the Workday organization.",
  type: "string",
  placeholder: "Enter organization ID",
  example: "cb550da820584750aae8f807882fa79a",
  required: true,
  clean: util.types.toString,
  dataSource: "selectOrganization",
});
const customerId = input({
  label: "Customer ID",
  comments: "Identifies the customer account.",
  type: "string",
  required: true,
  example: "8f2e4d6c1b3a49e7a5c0d9f8e7b6a5c4",
  placeholder: "Enter customer ID",
  clean: util.types.toString,
});
const supervisoryOrganizationId = input({
  label: "Supervisory Organization ID",
  comments:
    "Supervisory organization assigned to the worker as of the effective date.",
  type: "string",
  example: "123$456",
  placeholder: "Enter supervisory organization ID",
  required: true,
  clean: util.types.toString,
});
const jobChangeReasonId = input({
  label: "Job Change Reason ID",
  comments: "Identifies the reason used in a Change Job business process.",
  type: "string",
  example: "123$456",
  placeholder: "Enter job change reason ID",
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
  comments: "The date this business process takes effect. Format: YYYY-MM-DD.",
  type: "string",
  example: "2022-01-01",
  placeholder: "Enter effective date (YYYY-MM-DD)",
  required: true,
  clean: (value: unknown) => util.types.toDate(value),
});
const proposedOrganizations = structuredObjectInput({
  label: "Proposed Organizations",
  comments:
    "Organizations with staffing behavior assigned to the position as a result of this event. Each row identifies one organization.",
  collection: "valuelist",
  required: true,
  inputs: {
    id: input({
      label: "ID",
      comments: "Identifies the Workday organization.",
      type: "string",
      required: false,
      example: "cb550da820584750aae8f807882fa79a",
      placeholder: "Enter organization ID",
      clean: cleanStringInput,
    }),
    descriptor: input({
      label: "Descriptor",
      comments: "Display name of the organization.",
      type: "string",
      required: false,
      example: "Global Modern Services",
      placeholder: "Enter organization descriptor",
      clean: cleanStringInput,
    }),
  },
});
const proposedBusinessTitle = input({
  label: "Proposed Business Title",
  comments:
    "New business title for the worker as of the effective date. If there is no business title override, this field defaults to the job title or job profile name.",
  type: "string",
  example: "Senior Product Manager",
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
  organizationTypeId: {
    ...organizationTypeId,
    comments:
      "Optional organization type used to filter the Organization ID dropdown. Not sent with this request.",
  },
  organizationId,
};
export const getWorkerBusinessTitleChangesInputs = {
  connection,
  workerId,
  ...paginationQueryStringInputs,
};
export const listOrganizationsInputs = {
  connection,
  organizationTypeId: {
    ...organizationTypeId,
    required: true,
    clean: util.types.toString,
  },
  ...paginationQueryStringInputs,
  extraParameters,
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
