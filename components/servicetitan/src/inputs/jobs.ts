import { input, util } from "@prismatic-io/spectral";
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
  clean: util.types.toObject,
});
const jobGeneratedLeadSource = input({
  label: "Job Generated Lead Source",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      jobId: 0,
      employeeId: 0,
    },
    null,
    2,
  ),
  comments:
    "The lead source that generated this job. Provide jobId (the job this one was generated from) and employeeId (the office user or technician credited).",
  clean: cleanCodeInput,
});
const invoiceSignatureIsRequired = input({
  label: "Invoice Signature Is Required",
  type: "string",
  required: false,
  comments:
    "When true, the invoice for this job requires a signature. When left empty, the location and job type rules apply.",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});
const customerPo = input({
  label: "Customer PO",
  type: "string",
  example: "PO-10025",
  required: false,
  comments: "The customer's purchase order number to record on the job.",
  placeholder: "Enter a purchase order number",
  clean: cleanStringInput,
  default: "",
});
const externalDataApplicationGuid = input({
  label: "External Data Application GUID",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA",
  required: true,
  comments:
    "Format - guid. If this guid is provided, external data corresponding to this application guid will be returned.",
  placeholder: "Enter an application GUID",
  clean: util.types.toString,
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
  placeholder: "Enter a job cancel reason ID",
  clean: util.types.toNumber,
  dataSource: "selectJobCancelReason",
});
const jobMemo = input({
  label: "Job Memo",
  type: "text",
  required: true,
  comments: "Memo of job cancel reason",
  example: "Customer rescheduled to a later date",
  placeholder: "Enter a memo",
  clean: util.types.toString,
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
