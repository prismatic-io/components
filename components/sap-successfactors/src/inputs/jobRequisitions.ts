import { input, util } from "@prismatic-io/spectral";
import { $select, additionalInputs, connection } from "./general";

export const jobReqId = input({
  label: "Job Requisition ID",
  type: "string",
  required: true,
  comments: "The ID of the job requisition to retrieve",
  placeholder: "1234-5678",
  example: "1234-5678",
  clean: util.types.toString,
});

const templateId = input({
  label: "Template ID",
  type: "string",
  required: true,
  comments: "The ID of the job requisition template to use",
  placeholder: "1234-5678",
  example: "1234-5678",
  clean: util.types.toString,
});

export const getJobRequisitionInputs = {
  jobReqId,
  $select,
  connection,
};

export const deleteJobRequisitionInputs = {
  jobReqId: {
    ...jobReqId,
    comments: "The ID of the job requisition to delete",
  },
  connection,
};

export const createJobRequisitionInputs = {
  templateId,
  additionalInputs: {
    ...additionalInputs,
    required: false,
    comments: "The required fields for the selected template",
    example: JSON.stringify(
      {
        country: "US",
        state: "CA",
        city: "San Francisco",
        "recruiter/userName": "jdoe",
      },
      null,
      2,
    ),
  },
  connection,
};

export const updateJobRequisitionInputs = {
  jobReqId,
  additionalInputs: {
    ...additionalInputs,
    required: false,
    comments: "The template fields to update",
    example: JSON.stringify(
      {
        country: "US",
        state: "CA",
        city: "San Francisco",
        "recruiter/userName": "jdoe",
      },
      null,
      2,
    ),
  },
  connection,
};
