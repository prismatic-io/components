import { input, util } from "@prismatic-io/spectral";
import { cursor, fetchAll, idempotencyKey, squareConnection, version } from "./common";

const jobId = input({
  label: "Job ID",
  placeholder: "Enter Job ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the job.",
  example: "1yJlHapkseYnNPETIU1B",
  dataSource: "selectJob",
  clean: util.types.toString,
});

const jobTitle = input({
  label: "Job Title",
  placeholder: "Enter job title",
  type: "string",
  required: true,
  comments: "The designation for the job role (for example, Cashier, Server, Manager).",
  example: "Cashier",
  clean: util.types.toString,
});

const isTipEligible = input({
  label: "Is Tip Eligible",
  type: "boolean",
  required: false,
  comments: "When true, employees in this job role are eligible to receive tips.",
  example: "true",
  default: "true",
  clean: util.types.toBool,
});

export const retrieveJobInputs = {
  squareConnection,
  jobId,
};

export const createJobInputs = {
  squareConnection,
  jobTitle,
  idempotencyKey: {
    ...idempotencyKey,
    required: true,
    comments: "A unique string that identifies this CreateJob request.",
  },
  isTipEligible,
};

export const listJobsInputs = {
  squareConnection,
  fetchAll,
  cursor,
};

export const updateJobInputs = {
  squareConnection,
  jobId,
  jobTitle: {
    ...jobTitle,
    required: false,
    comments: "Updated job title. Only include if changing the title.",
  },
  isTipEligible: {
    ...isTipEligible,
    required: false,
    comments:
      "When true, employees in this job role are eligible to receive tips. Only include if changing tip eligibility.",
  },
  version,
};
