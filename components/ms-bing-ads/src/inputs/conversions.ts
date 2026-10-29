import { input, util } from "@prismatic-io/spectral";
import {
  CONVERSION_GOALS_CATEGORIES,
  CONVERSION_SCOPE,
  CONVERSION_STATUS,
  COUNT_TYPE,
} from "../constants";
import { offlineConversionsArrayExample } from "../exampleInputs";
import { cleanOptionalString, mapModel } from "../util";
import { accountIdInput, connectionInput, customerIdInput } from "./common";

const conversionGoalName = input({
  label: "Conversion Goal Name",
  type: "string",
  required: true,
  comments:
    "The conversion goal name. The maximum length of the name is 100, and the name must be unique among all conversion goals belonging to the same customer.",
  placeholder: "Enter conversion goal name",
  example: "My Conversion Goal",
  clean: util.types.toString,
});

const conversionGoalCategory = input({
  label: "Conversion Goal Category",
  type: "string",
  required: true,
  comments:
    "The category that best describes the conversion goal. The category must be a valid Microsoft Advertising category.",
  example: "Purchase",
  model: mapModel(CONVERSION_GOALS_CATEGORIES),
  clean: util.types.toString,
});

const conversionWindowInMinutes = input({
  label: "Conversion Window In Minutes",
  type: "string",
  required: false,
  comments:
    "The length of time in minutes after a click to track conversions. For example, setting this value to 43200 minutes (30 days) means conversions that happen within 30 days after a click are tracked. Past conversions are not affected. The default value is 43200. The minimum value supported is 1 minute, although a shorter conversion window will reduce the number of conversions recorded. The maximum value supported is 129600 minutes (90 days).",
  placeholder: "Enter conversion window in minutes",
  example: "129600",
  clean: cleanOptionalString,
});

const countType = input({
  label: "Count Type",
  type: "string",
  required: false,
  comments:
    "Determines how conversions are recorded within the chosen conversion window.",
  default: "All",
  model: mapModel(COUNT_TYPE),
  clean: util.types.toString,
});

const excludeFromBidding = input({
  label: "Exclude From Bidding",
  type: "boolean",
  required: false,
  comments:
    "Determines whether or not to exclude data otherwise related to this conversion goal from a subset of performance report columns.",
  clean: util.types.toBool,
});

const isEnhancedConversionsEnabled = input({
  label: "Is Enhanced Conversions Enabled",
  type: "boolean",
  required: false,
  comments:
    "Determines whether enhanced conversions are enabled for a conversion goal.",
  clean: util.types.toBool,
});

const conversionScope = input({
  label: "Scope",
  type: "string",
  required: false,
  comments:
    "Determines if the goal applies to all accounts or only the account specified in the required CustomerAccountId header element. When multiple Microsoft Advertising accounts exist, conversions can be tracked across all of them. If associated with one account, conversions will be tracked for that account only.",
  model: mapModel(CONVERSION_SCOPE),
  clean: util.types.toString,
});

const conversionStatus = input({
  label: "Status",
  type: "string",
  required: false,
  comments:
    "Defines the possible user-determined status values of a conversion goal. These are the status values that a user can decide to set, for example a goal can be set to Paused to stop tracking conversions for that goal.",
  model: mapModel(CONVERSION_STATUS),
  clean: util.types.toString,
});

const isExternallyAttributed = input({
  label: "Is Externally Attributed",
  type: "boolean",
  required: false,
  comments:
    "When true, the offline conversion goal uses a custom attribution model and allows importing fractional credit for each MSCLKID.",
  clean: util.types.toBool,
});

const offlineConversionsBody = input({
  label: "Offline Conversions Body",
  placeholder: "Enter offline conversions JSON",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The JSON body that contains the offline conversions to apply to the Microsoft Advertising account.",
  example: JSON.stringify(offlineConversionsArrayExample, null, 2),
  clean: util.types.toObject,
});

export const addOfflineConversionsGoalInputs = {
  accountIdInput: {
    ...accountIdInput,
    comments:
      "The identifier of the ad account that owns or is associated with the entities in the request. This header element must have the same value as the AccountId body element when both are required",
    required: true,
  },
  name: conversionGoalName,
  conversionGoalCategory,
  customerIdInput: {
    ...customerIdInput,
    required: true,
    comments:
      "The identifier of the manager account (customer) the user is accessing or operating from. A user can have access to multiple manager accounts.",
  },
  conversionWindowInMinutes,
  countType,
  excludeFromBidding,
  isEnhancedConversionsEnabled,
  conversionScope,
  conversionStatus,
  isExternallyAttributed,
  connection: connectionInput,
};

export const applyOfflineConversionsInputs = {
  offlineConversionsBody,
  accountIdInput: {
    ...accountIdInput,
    label: "Customer Account Id",
    comments:
      "The identifier of the ad account that owns or is associated with the entities in the request. This header element must have the same value as the AccountId body element when both are required",
    required: true,
  },
  customerIdInput: {
    ...customerIdInput,
    required: true,
    comments:
      "The identifier of the manager account (customer) the user is accessing or operating from. A user can have access to multiple manager accounts.",
  },
  connection: connectionInput,
};
