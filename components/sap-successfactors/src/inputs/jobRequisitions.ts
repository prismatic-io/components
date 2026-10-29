import { input, util } from "@prismatic-io/spectral";
import { $select, additionalInputs, connection } from "./common";

export const jobReqId = input({
  label: "Job Requisition ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the job requisition.",
  placeholder: "Enter a job requisition ID",
  example: "1234-5678",
  clean: util.types.toString,
});

const templateId = input({
  label: "Template ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier for the job requisition template to base the requisition on.",
  placeholder: "Enter a template ID",
  example: "1234-5678",
  clean: util.types.toString,
});

export const getJobRequisitionInputs = {
  connection,
  jobReqId,
  $select,
};

export const deleteJobRequisitionInputs = {
  connection,
  jobReqId: {
    ...jobReqId,
    comments: "The unique identifier for the job requisition to delete.",
  },
};

export const createJobRequisitionInputs = {
  connection,
  templateId,
  additionalInputs: {
    ...additionalInputs,
    required: false,
    comments:
      "The required fields for the selected template, as a JSON object.",
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
};

export const updateJobRequisitionInputs = {
  connection,
  jobReqId,
  additionalInputs: {
    ...additionalInputs,
    required: false,
    comments: "The template fields to update, as a JSON object.",
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
};
