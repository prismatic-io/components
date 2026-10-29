import { input, util } from "@prismatic-io/spectral";
import { createCandidateInfoExample } from "../exampleInputs";
import { toOptionalString } from "../util";
import { $select, additionalInputs, connection } from "./common";

export const candidateId = input({
  label: "Candidate ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the candidate.",
  placeholder: "Enter a candidate ID",
  example: "1234-5678",
  clean: util.types.toString,
  dataSource: "selectCandidate",
});

const firstName = input({
  label: "First Name",
  type: "string",
  required: true,
  comments: "The given name of the candidate.",
  placeholder: "Enter a first name",
  example: "John",
  clean: util.types.toString,
});

const lastName = input({
  label: "Last Name",
  type: "string",
  required: true,
  comments: "The family name of the candidate.",
  placeholder: "Enter a last name",
  example: "Doe",
  clean: util.types.toString,
});

const primaryEmail = input({
  label: "Primary Email",
  type: "string",
  required: true,
  comments: "The primary email address used to contact the candidate.",
  placeholder: "Enter an email address",
  example: "john.doe@example.com",
  clean: util.types.toString,
});

const country = input({
  label: "Country",
  type: "string",
  required: true,
  comments: "The country where the candidate resides.",
  placeholder: "Enter a country",
  example: "United States",
  clean: util.types.toString,
});

export const getCandidateInputs = {
  connection,
  candidateId,
  $select,
};

export const createCandidateInputs = {
  connection,
  firstName,
  lastName,
  primaryEmail,
  country,
  additionalInputs: {
    ...additionalInputs,
    example: JSON.stringify(createCandidateInfoExample, null, 2),
  },
};

export const updateCandidateInputs = {
  connection,
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
};
