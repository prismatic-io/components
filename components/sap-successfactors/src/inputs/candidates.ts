import { input, util } from "@prismatic-io/spectral";
import { createCandidateInfoExample } from "../exampleInputs";
import { toOptionalString } from "../util";
import { $select, additionalInputs, connection } from "./general";

export const candidateId = input({
  label: "Candidate ID",
  type: "string",
  required: true,
  comments: "The ID of the candidate to retrieve",
  placeholder: "1234-5678",
  example: "1234-5678",
  clean: util.types.toString,
  dataSource: "selectCandidate",
});

const firstName = input({
  label: "First Name",
  type: "string",
  required: true,
  comments: "The first name of the candidate",
  placeholder: "John",
  example: "John",
  clean: util.types.toString,
});

const lastName = input({
  label: "Last Name",
  type: "string",
  required: true,
  comments: "The last name of the candidate",
  placeholder: "Doe",
  example: "Doe",
  clean: util.types.toString,
});

const primaryEmail = input({
  label: "Primary Email",
  type: "string",
  required: true,
  comments: "The primary email address of the candidate",
  placeholder: "test@test.com",
  example: "test@test.com",
  clean: util.types.toString,
});

const country = input({
  label: "Country",
  type: "string",
  required: true,
  comments: "The country where the candidate is located",
  placeholder: "United States",
  example: "United States",
  clean: util.types.toString,
});

export const getCandidateInputs = {
  candidateId,
  $select,
  connection,
};

export const createCandidateInputs = {
  firstName,
  lastName,
  primaryEmail,
  country,
  additionalInputs: {
    ...additionalInputs,
    example: JSON.stringify(createCandidateInfoExample, null, 2),
  },
  connection,
};

export const updateCandidateInputs = {
  candidateId,
  firstName: {
    ...firstName,
    required: false,
    clean: toOptionalString,
  },
  lastName: {
    ...lastName,
    required: false,
    clean: toOptionalString,
  },
  primaryEmail: {
    ...primaryEmail,
    required: false,
    clean: toOptionalString,
  },
  country: {
    ...country,
    required: false,
    clean: toOptionalString,
  },
  additionalInputs: {
    ...additionalInputs,
    example: JSON.stringify(createCandidateInfoExample, null, 2),
  },
  connection,
};
