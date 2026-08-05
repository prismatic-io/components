import { input } from "@prismatic-io/spectral";
import {
  cleanBooleanInput,
  cleanCodeInput,
  cleanStringInput,
  mapBooleanModelInput,
} from "../util";
import {
  businessUnitId,
  campaignId,
  connection,
  customerId,
  customFields,
  customQueryParams,
  externalData,
  fetchAll,
  includeTotal,
  jobId,
  jobTypeId,
  locationId,
  pagination,
  priority,
  projectId,
  sort,
  summary,
  tagTypeIds,
} from "./common";
const appointments = input({
  label: "Appointments",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    [
      {
        start: "string",
        end: "string",
        arrivalWindowStart: "string",
        arrivalWindowEnd: "string",
        technicianIds: [0],
      },
    ],
    null,
    2,
  ),
  comments: "List of appointment information",
  clean: cleanCodeInput,
});
const jobGeneratedLeadSource = input({
  label: "Job Generated Lead Source",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    {
      jobId: 0,
      employeeId: 0,
    },
    null,
    2,
  ),
  comments:
    "Object that contains: JobId: ID of the job from which this job was generated EmployeeId: ID of the office user or technician",
  clean: cleanCodeInput,
});
const invoiceSignatureIsRequired = input({
  label: "Invoice Signature Is Required",
  type: "string",
  required: false,
  comments:
    "Optional model that informs if invoice should requires a signature or not if not informed will follow the rules for location and job type",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});
const customerPo = input({
  label: "Customer PO",
  type: "string",
  required: false,
  comments: "Customer PO",
  clean: cleanStringInput,
  default: "",
});
const externalDataApplicationGuid = input({
  label: "External Data Application Guid",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA",
  required: true,
  comments:
    "Format - guid. If this guid is provided, external data corresponding to this application guid will be returned.",
  placeholder: "6B29FC40-CA47-1067-B31D-00DD010662DA",
  clean: cleanStringInput,
});
const shouldUpdateInvoiceItems = input({
  label: "Should Update Invoice Items",
  type: "string",
  required: false,
  comments:
    "If set to true, update the business unit of invoice items on job's invoice",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});
const reasonId = input({
  label: "Reason ID",
  type: "string",
  required: true,
  comments: "ID of job cancel reason",
  example: "1088",
  placeholder: "1088",
  clean: cleanStringInput,
  dataSource: "selectJobCancelReason",
});
const jobMemo = input({
  label: "Job Memo",
  type: "text",
  required: true,
  comments: "Memo of job cancel reason",
  example: "string",
  placeholder: "string",
  clean: cleanStringInput,
});
export const createJobInputs = {
  connection,
  customerId,
  locationId,
  businessUnitId: {
    ...businessUnitId,
    required: true,
    comments: "ID of the job's business unit",
  },
  jobTypeId: {
    ...jobTypeId,
    required: true,
    comments: "ID of the job's type",
  },
  priority: {
    ...priority,
    required: true,
    comments: "Priority of the job",
  },
  campaignId: {
    ...campaignId,
    required: true,
    comments: "ID of the job's campaign",
  },
  appointments,
  jobGeneratedLeadSource,
  projectId,
  summary: {
    ...summary,
    required: false,
    comments: "Job summary",
  },
  customFields: {
    ...customFields,
    comments: "Custom fields for the job",
  },
  tagTypeIds: {
    ...tagTypeIds,
    comments: "Tag type IDs for the job",
  },
  externalData,
  invoiceSignatureIsRequired,
  customerPo,
};
export const getJobInputs = {
  connection,
  jobId,
  externalDataApplicationGuid: {
    ...externalDataApplicationGuid,
    required: false,
  },
};
export const listJobsInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const listJobCancelReasonsInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const updateJobInputs = {
  connection,
  jobId,
  customerId: {
    ...customerId,
    required: false,
  },
  locationId: {
    ...locationId,
    required: false,
  },
  businessUnitId: {
    ...businessUnitId,
    comments: "ID of the job's business unit",
  },
  jobGeneratedLeadSource,
  jobTypeId: {
    ...jobTypeId,
    comments: "ID of the job's type",
  },
  priority: {
    ...priority,
    comments: "Priority of the job",
  },
  campaignId: {
    ...campaignId,
    comments: "ID of the job's campaign",
  },
  summary: {
    ...summary,
    required: false,
    comments: "Job summary",
  },
  shouldUpdateInvoiceItems,
  customFields: {
    ...customFields,
    comments: "Custom fields for the job",
  },
  tagTypeIds: {
    ...tagTypeIds,
    comments: "Tag type IDs for the job",
  },
  externalData,
  customerPo,
};
export const cancelJobInputs = {
  connection,
  jobId,
  reasonId,
  memo: jobMemo,
};
