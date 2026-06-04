import { input, util } from "@prismatic-io/spectral";
import {
  accountId,
  company,
  connection,
  email,
  externalId,
  firstName,
  lastName,
  locale,
  phone,
  title,
} from "./common";

const accountType = input({
  label: "Account Type",
  type: "string",
  required: true,
  placeholder: "Select account type",
  model: [
    "FREE",
    "PRO",
    "TEAM",
    "TEAM_TRIAL",
    "ENTERPRISE",
    "ENTERPRISE_TRIAL",
    "GLOBAL",
    "GLOBAL_TRIAL",
  ].map((model) => {
    return {
      value: model,
      label: model,
    };
  }),
  comments: "The type of account to be created.",
  clean: util.types.toString,
});

const countryCode = input({
  label: "Country Code",
  type: "string",
  required: true,
  placeholder: "Enter country code",
  example: "US",
  comments: "The country code of the account.",
  clean: util.types.toString,
});

const numSeats = input({
  label: "Number of Seats",
  type: "string",
  required: true,
  placeholder: "Enter number of seats",
  example: "10",
  comments: "The number of seats.",
  clean: util.types.toNumber,
});

const trialDuration = input({
  label: "Trial Duration Days",
  type: "string",
  required: false,
  placeholder: "Enter trial duration",
  example: "30",
  comments: "Account trial duration (in days).",
  clean: util.types.toNumber,
});

export const createAccountInputs = {
  connection,
  accountType,
  countryCode,
  externalId,
  locale,
  trialDuration,
  email,
  firstName: {
    ...firstName,
    required: true,
  },
  lastName: {
    ...lastName,
    required: true,
  },
  phone,
  title,
  numSeats,
  company,
};

export const getAccountInputs = {
  connection,
  accountId,
};
