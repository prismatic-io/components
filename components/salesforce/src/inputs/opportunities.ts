import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, toOptionalInt } from "../util";
import {
  connectionInput,
  description,
  dynamicValues,
  fieldValues,
  listInputs,
  name,
  recordId,
  version,
} from "./common";
import { accountId, leadSource } from "./fields";

const amount = input({
  label: "Amount",
  type: "string",
  placeholder: "Enter amount",
  example: "38000",
  required: false,
  comments: "The monetary amount associated with the opportunity.",
  clean: cleanStringInput,
});

const stage = input({
  label: "Stage",
  type: "string",
  placeholder: "Select stage",
  example: "Prospecting",
  model: [
    { label: "--None--", value: "none" },
    { label: "Prospecting", value: "Prospecting" },
    { label: "Qualification", value: "Qualification" },
    { label: "Needs Analysis", value: "Needs Analysis" },
    { label: "Value Proposition", value: "Value Proposition" },
    { label: "id. Decision Makers", value: "id. Decision Makers" },
    { label: "Perception Analysis", value: "Perception Analysis" },
    { label: "Proposal/Price Quote", value: "Proposal/Price Quote" },
    { label: "Negotiation/Review", value: "Negotiation/Review" },
    { label: "Closed Won", value: "Closed Won" },
    { label: "Closed Lost", value: "Closed Lost" },
  ],
  required: true,
  comments: "The stage the sale is currently in.",
  clean: util.types.toString,
});

const closeDate = input({
  label: "Close Date",
  type: "string",
  required: true,
  placeholder: "Enter close date (YYYY-MM-DD)",
  example: "2025-12-31",
  comments: "The date the sale is expected to close. Format: YYYY-MM-DD.",
  clean: util.types.toString,
});

const probability = input({
  label: "Probability",
  type: "string",
  required: false,
  placeholder: "Enter probability (0-100)",
  example: "50",
  comments: "The probability of the success of the sale.",
  clean: toOptionalInt,
});

const nextStep = input({
  label: "Next Step",
  type: "string",
  required: false,
  placeholder: "Enter next step",
  comments: "A description of the next action or milestone for the opportunity.",
  example: "Follow up with the client",
  clean: cleanStringInput,
});

const opportunityType = input({
  label: "Opportunity Type",
  type: "string",
  required: true,
  placeholder: "Select opportunity type",
  model: [
    {
      label: "Existing customer - Upgrade",
      value: "Existing customer - Upgrade",
    },
    {
      label: "Existing customer - Replacement",
      value: "Existing customer - Replacement",
    },
    {
      label: "Existing customer - Downgrade",
      value: "Existing customer - Downgrade",
    },
    { label: "New Customer", value: "New Customer" },
  ],
  comments:
    "The category of the opportunity, indicating whether it is for a new or existing customer.",
  clean: util.types.toString,
});

export const createOpportunityInputs = {
  version,
  nextStep,
  dynamicValues,
  fieldValues,
  amount,
  accountId,
  stage,
  opportunityType,
  closeDate,
  leadSource,
  probability,
  description,
  name,
  connection: connectionInput,
};

export const updateOpportunityInputs = {
  recordId: {
    ...recordId,
    dataSource: "selectOpportunity",
  },
  nextStep,
  version,
  dynamicValues,
  fieldValues,
  amount,
  stage,
  accountId,
  opportunityType,
  closeDate,
  leadSource,
  probability,
  description,
  name,
  connection: connectionInput,
};

export const deleteOpportunityInputs = {
  version,
  recordId: {
    ...recordId,
    dataSource: "selectOpportunity",
  },
  connection: connectionInput,
};

export const listOpportunitiesInputs = { ...listInputs };
