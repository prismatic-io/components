import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  SURVEY_ANSWER_MODEL,
  SURVEY_DISSATISFIED_REASON_MODEL,
  SURVEY_SATISFIED_REASON_MODEL,
} from "../constants";
import {
  cleanString,
  toOptionalCustomerId,
  toSurveyAnswer,
  valueListInputClean,
} from "../util";
import {
  connectionInput,
  customerIdInput,
  endDateInput,
  fetchAll,
  managerCustomerIdInput,
  pageSizeInput,
  pageTokenInput,
  startDateInput,
} from "./common";

const customerIds = input({
  label: "Customer IDs",
  placeholder: "Enter customer ID",
  type: "string",
  collection: "valuelist",
  required: false,
  clean: valueListInputClean,
  comments:
    "The Google Ads customer IDs to filter the Local Services report. Leave empty to include all accessible customers.",
});

const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page size and cursor controls for the result set.",
  inputs: {
    pageSizeInput: {
      ...pageSizeInput,
      required: false,
      default: "1000",
    },
    pageTokenInput,
  },
});

export const accountReportsInputs = {
  connection: connectionInput,
  managerCustomerIdInput,
  pagination,
  customerIds,
  startDateInput,
  endDateInput,
};

export const detailedLeadReportsInputs = {
  connection: connectionInput,
  managerCustomerIdInput,
  pagination,
  customerIds,
  startDateInput,
  endDateInput,
};

const optionalManagerCustomerId = {
  ...managerCustomerIdInput,
  required: false,
  clean: toOptionalCustomerId,
};

const leadId = input({
  label: "Lead ID",
  placeholder: "Enter lead ID",
  type: "string",
  required: true,
  example: "1234567890",
  comments:
    "The ID of the Local Services lead, as returned by List Local Services Leads in localServicesLead.id.",
  clean: util.types.toString,
});

const surveyAnswer = input({
  label: "Survey Answer",
  type: "string",
  required: true,
  model: SURVEY_ANSWER_MODEL,
  comments: "How satisfied the business is with the lead.",
  clean: toSurveyAnswer,
});

const satisfiedReason = input({
  label: "Satisfied Reason",
  type: "string",
  required: false,
  model: SURVEY_SATISFIED_REASON_MODEL,
  comments:
    "Why the business is satisfied with the lead. Only for a Very Satisfied or Satisfied answer.",
  clean: cleanString,
});

const dissatisfiedReason = input({
  label: "Dissatisfied Reason",
  type: "string",
  required: false,
  model: SURVEY_DISSATISFIED_REASON_MODEL,
  comments:
    "Why the business is not satisfied with the lead. Only for a Dissatisfied or Very Dissatisfied answer.",
  clean: cleanString,
});

const otherReasonComment = input({
  label: "Other Reason Comment",
  placeholder: "Enter comment",
  type: "string",
  required: false,
  example: "The customer asked for a service outside our area.",
  comments: "Free-form feedback. Required when the reason is Other.",
  clean: cleanString,
});

const conversationText = input({
  label: "Text",
  placeholder: "Enter message text",
  type: "string",
  required: true,
  example: "Thanks for reaching out. We can visit on Tuesday morning.",
  comments: "The text message to append to the lead's conversation.",
  clean: util.types.toString,
});

export const listLocalServicesLeadsInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  fetchAll,
  pageTokenInput,
  managerCustomerId: optionalManagerCustomerId,
  startDateInput: {
    ...startDateInput,
    comments:
      "Only leads created on or after this date, in the account's timezone. Format: MM-DD-YYYY.",
  },
  endDateInput: {
    ...endDateInput,
    comments:
      "Only leads created on or before this date, in the account's timezone. Format: MM-DD-YYYY.",
  },
};

export const listLeadConversationsInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  fetchAll,
  pageTokenInput,
  managerCustomerId: optionalManagerCustomerId,
  leadId: {
    ...leadId,
    required: false,
    comments:
      "Only conversations for this Local Services lead. Leave empty to list conversations for every lead.",
    clean: cleanString,
  },
};

export const provideLeadFeedbackInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  leadId,
  surveyAnswer,
  managerCustomerId: optionalManagerCustomerId,
  satisfiedReason,
  dissatisfiedReason,
  otherReasonComment,
};

export const appendLeadConversationInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  leadId,
  text: conversationText,
  managerCustomerId: optionalManagerCustomerId,
};
