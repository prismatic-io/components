import { input, util } from "@prismatic-io/spectral";
import { createJobApplicationInfoExample } from "../exampleInputs";
import { toOptionalString } from "../util";
import { candidateId } from "./candidates";
import { $select, additionalInputs, connection } from "./general";
import { jobReqId } from "./jobRequisitions";

export const jobApplicationId = input({
  label: "Job Application ID",
  type: "string",
  required: true,
  comments: "The ID of the job application to retrieve",
  placeholder: "1234-5678",
  example: "1234-5678",
  clean: util.types.toString,
  dataSource: "selectJobApplication",
});

export const createJobApplicationInputs = {
  candidateId: {
    ...candidateId,
    comments: "The ID of the candidate to create the job application for",
  },
  jobReqId: {
    ...jobReqId,
    comments: "The ID of the job requisition to create the job application for",
  },
  additionalInputs: {
    ...additionalInputs,
    example: JSON.stringify(createJobApplicationInfoExample, null, 2),
  },
  connection,
};

export const updateJobApplicationInputs = {
  jobApplicationId,
  candidateId: {
    ...candidateId,
    required: false,
    comments: "The ID of the candidate to update",
    clean: toOptionalString,
  },
  jobReqId: {
    ...jobReqId,
    required: false,
    comments: "The ID of the job requisition to update",
    clean: toOptionalString,
  },
  additionalInputs: {
    ...additionalInputs,
    example: JSON.stringify(createJobApplicationInfoExample, null, 2),
  },
  connection,
};

export const getJobApplicationInputs = {
  jobApplicationId,
  $select,
  connection,
};
