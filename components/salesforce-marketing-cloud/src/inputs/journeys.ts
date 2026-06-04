import { input, util } from "@prismatic-io/spectral";
import { JOURNEY_STATUS_OPTIONS } from "../constants";
import { toNumberArray, toOptionalNumber, toOptionalString } from "../util";
import { connection, fetchAll, page, pageSize } from "./common";





const journeyId = input({
  label: "Journey ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the journey (interaction).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter journey ID",
  dataSource: "selectJourney",
  clean: util.types.toString,
});

const journeyVersion = input({
  label: "Version",
  type: "string",
  required: false,
  comments:
    "The version number of the journey. Defaults to the latest version.",
  example: "1",
  placeholder: "Enter version number",
  clean: toOptionalNumber,
});

const journeyKey = input({
  label: "Journey Key",
  type: "string",
  required: true,
  comments:
    "The customer key as a GUID (UUID) to be used while referencing this journey.",
  example: "journey-welcome-series-2024",
  placeholder: "Enter journey key",
  clean: util.types.toString,
});

const journeyName = input({
  label: "Journey Name",
  type: "string",
  required: true,
  comments: "The name of this journey.",
  example: "Welcome Series Journey",
  placeholder: "Enter journey name",
  clean: util.types.toString,
});

const journeyDescription = input({
  label: "Journey Description",
  type: "string",
  required: false,
  comments: "A description of this journey.",
  example: "Onboarding journey for new customers",
  placeholder: "Enter journey description",
  clean: toOptionalString,
});

const workflowApiVersion = input({
  label: "Workflow API Version",
  type: "string",
  required: true,
  model: [
    { label: "0.5", value: "0.5" },
    { label: "1.0", value: "1.0" },
  ],
  comments:
    "The Journey Spec version to use for this journey. Possible values: 0.5, 1.0.",
  example: "1.0",
  default: "1.0",
  clean: util.types.toNumber,
});

const journeyStatus = input({
  label: "Status",
  type: "string",
  required: false,
  model: JOURNEY_STATUS_OPTIONS,
  comments: "Filter journeys by status.",
  clean: toOptionalString,
});

const journeyNameFilter = input({
  label: "Name Filter",
  type: "string",
  required: false,
  comments: "Filter journeys by name (partial match).",
  example: "Welcome",
  placeholder: "Enter journey name to search",
  clean: toOptionalString,
});

const journeyExtraBody = input({
  label: "Extra Body",
  type: "code",
  language: "json",
  required: false,
  comments: "Additional properties to include in the request body.",
  example: JSON.stringify(
    {
      description: "Welcome journey for new subscribers",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});





const eventDefinitionKey = input({
  label: "Event Definition Key",
  type: "string",
  required: true,
  comments:
    "The event definition key for the journey entry event. Found in the journey's entry source configuration.",
  example: "APIEvent-abc123-def456",
  placeholder: "Enter event definition key",
  clean: util.types.toString,
});

const eventContactKey = input({
  label: "Contact Key",
  type: "string",
  required: true,
  comments:
    "The contact key (subscriber key) of the contact entering the journey.",
  example: "contact-abc-123",
  placeholder: "Enter contact key",
  clean: util.types.toString,
});

const eventData = input({
  label: "Event Data",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional data to pass to the journey entry event as key-value pairs.",
  example: JSON.stringify(
    {
      EmailAddress: "john.doe@example.com",
      FirstName: "John",
      Product: "Pro Plan",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});





const exitContactKey = input({
  label: "Contact Key",
  type: "string",
  required: true,
  comments: "The contact key of the contact to exit from the journey.",
  example: "contact-abc-123",
  placeholder: "Enter contact key",
  clean: util.types.toString,
});

const exitDefinitionKey = input({
  label: "Definition Key",
  type: "string",
  required: true,
  comments:
    "Customer Key that uniquely identifies the journey. This key is the same for all versions of the journey.",
  example: "journey-welcome-series-2024",
  placeholder: "Enter definition key",
  clean: util.types.toString,
});

const exitVersions = input({
  label: "Versions",
  type: "string",
  required: false,
  comments:
    "One or more versions of a journey from which to remove a contact. Comma-separated list (e.g., '1,2,3'). If not specified, removes from all versions.",
  example: "1,2",
  placeholder: "Enter version numbers (comma-separated)",
  clean: toNumberArray,
});





export const listJourneysInputs = {
  connection,
  journeyStatus,
  journeyNameFilter,
  fetchAll,
  pageSize,
  page,
};

export const getJourneyInputs = {
  connection,
  journeyId,
  journeyVersion,
};

export const deleteJourneyInputs = {
  connection,
  journeyId,
};

export const createJourneyInputs = {
  connection,
  journeyKey,
  journeyName,
  journeyDescription,
  workflowApiVersion,
  journeyExtraBody,
};

export const updateJourneyInputs = {
  connection,
  journeyId,
  journeyKey,
  workflowApiVersion,
  journeyVersion: {
    ...journeyVersion,
    required: true,
    comments: "The version of this journey.",
    clean: util.types.toNumber,
  },
  journeyExtraBody,
};

export const fireEntryEventInputs = {
  connection,
  eventDefinitionKey,
  eventContactKey,
  eventData,
};

export const exitContactFromJourneyInputs = {
  connection,
  exitContactKey,
  exitDefinitionKey,
  exitVersions,
};
