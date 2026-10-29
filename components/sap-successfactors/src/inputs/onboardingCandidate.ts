import { input, util } from "@prismatic-io/spectral";
import { createCandidateInfoExample } from "../exampleInputs";
import {
  $select,
  additionalInputs,
  connection,
  defaultListInputs,
} from "./common";

const applicantId = input({
  label: "Applicant ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the onboarding applicant.",
  placeholder: "Enter an applicant ID",
  example: "1234-5678",
  clean: util.types.toString,
});

export const createOnboardingCandidateInfoInputs = {
  connection,
  additionalInputs: {
    ...additionalInputs,
    example: JSON.stringify(createCandidateInfoExample, null, 2),
  },
};

export const getOnboardingCandidateInfoInputs = {
  connection,
  applicantId,
  $select,
};

export const deleteOnboardingCandidateInfoInputs = {
  connection,
  applicantId,
};

export const updateOnboardingCandidateInfoInputs = {
  connection,
  applicantId,
};

export const listOnboardingCandidateInfoInputs = defaultListInputs;
