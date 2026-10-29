import { input, util } from "@prismatic-io/spectral";
import { createJobApplicationInfoExample } from "../exampleInputs";
import { toOptionalString } from "../util";
import { candidateId } from "./candidates";
import { $select, additionalInputs, connection } from "./common";
import { jobReqId } from "./jobRequisitions";

export const jobApplicationId = input({
  label: "Job Application ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the job application.",
  placeholder: "Enter a job application ID",
  example: "1234-5678",
  clean: util.types.toString,
  dataSource: "selectJobApplication",
});

export const createJobApplicationInputs = {
  connection,
  candidateId: {
    ...candidateId,
    comments:
      "The unique identifier for the candidate the job application is created for.",
  },
  jobReqId: {
    ...jobReqId,
    comments:
      "The unique identifier for the job requisition the job application is created for.",
  },
  additionalInputs: {
    ...additionalInputs,
    example: JSON.stringify(createJobApplicationInfoExample, null, 2),
  },
};

export const updateJobApplicationInputs = {
  connection,
  jobApplicationId,
  candidateId: {
    ...candidateId,
    required: false,
    comments:
      "The unique identifier for the candidate to associate with the job application.",
    clean: toOptionalString,
  },
  jobReqId: {
    ...jobReqId,
    required: false,
    comments:
      "The unique identifier for the job requisition to associate with the job application.",
    clean: toOptionalString,
  },
  additionalInputs: {
    ...additionalInputs,
    example: JSON.stringify(createJobApplicationInfoExample, null, 2),
  },
};

export const getJobApplicationInputs = {
  connection,
  jobApplicationId,
  $select,
};
