import { input, util } from "@prismatic-io/spectral";
import type { CollectorType } from "../types";
import { toOptionalString } from "../util";
import { connectionInput, fetchAll, page, perPage, extraBody } from "./common";
import { surveyId } from "./surveys";





export const collectorId = input({
  label: "Collector ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the collector.",
  example: "1234567890",
  placeholder: "Enter collector ID",
  dataSource: "selectCollector",
  clean: util.types.toString,
});

export const collectorName = input({
  label: "Collector Name",
  type: "string",
  required: false,
  comments: "The name of the collector.",
  example: "Email Invite - January",
  placeholder: "Enter collector name",
  clean: toOptionalString,
});






export const collectorType = input({
  label: "Collector Type",
  type: "string",
  required: true,
  default: "weblink",
  model: [
    { label: "Web Link", value: "weblink" as CollectorType },
    { label: "Email", value: "email" as CollectorType },
    { label: "Social Media", value: "social" as CollectorType },
    { label: "Embedded", value: "embedded" as CollectorType },
    { label: "Popup", value: "popup" as CollectorType },
  ],
  comments:
    "Type of collector. Note: Non-weblink collectors may require a paid plan.",
  placeholder: "Select collector type",
  clean: util.types.toString,
});

export const collectorRedirectUrl = input({
  label: "Redirect URL",
  type: "string",
  required: false,
  comments: "URL to redirect respondents to after completing the survey.",
  example: "https://example.com/thank-you",
  placeholder: "Enter redirect URL",
  clean: toOptionalString,
});

export const collectorThankYouMessage = input({
  label: "Thank You Message",
  type: "text",
  required: false,
  comments: "Message shown to respondents after completing the survey.",
  example: "Thank you for your feedback!",
  placeholder: "Enter thank you message",
  clean: toOptionalString,
});

export const collectorCloseDate = input({
  label: "Close Date",
  type: "string",
  required: false,
  comments: "Date/time to close the collector (ISO 8601 format).",
  example: "2026-12-31T23:59:59+00:00",
  placeholder: "Enter close date (ISO 8601 format)",
  clean: toOptionalString,
});

export const allowMultipleResponses = input({
  label: "Allow Multiple Responses",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, respondents can submit multiple responses.",
  clean: util.types.toBool,
});

export const allowMultipleResponsesModel = input({
  label: "Allow Multiple Responses",
  type: "string",
  required: false,
  model: [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ],
  comments: "When true, respondents can submit multiple responses.",
  clean: toOptionalString,
});





export const listCollectorsInputs = {
  connection: connectionInput,
  surveyId,
  fetchAll,
  page,
  perPage,
};

export const getCollectorInputs = {
  connection: connectionInput,
  collectorId,
};

export const createCollectorInputs = {
  connection: connectionInput,
  surveyId,
  type: collectorType,
  name: collectorName,
  thankYouMessage: collectorThankYouMessage,
  closeDate: collectorCloseDate,
  redirectUrl: collectorRedirectUrl,
  allowMultipleResponses,
  extraBody,
};

export const updateCollectorInputs = {
  connection: connectionInput,
  collectorId,
  name: collectorName,
  thankYouMessage: collectorThankYouMessage,
  closeDate: collectorCloseDate,
  redirectUrl: collectorRedirectUrl,
  allowMultipleResponsesModel,
  extraBody,
};

export const deleteCollectorInputs = {
  connection: connectionInput,
  collectorId,
};

export const getCollectorStatsInputs = {
  connection: connectionInput,
  collectorId,
};

export const selectCollectorInputs = {
  connection: connectionInput,
  surveyId: { ...surveyId, dataSource: undefined },
};
