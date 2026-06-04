export const MAX_PAGE_SIZE = 200;

export const GENERAL_DELETE_MESSAGE = {
  data: {
    message: "Action performed successfully.",
  },
};

export const MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS = ["True", "False"].map(
  (value) => ({ value: value.toLowerCase(), label: value }),
);

export const TRUE = "true";

export const FALSE = "false";

export const WEBINAR_TYPE_MODEL = [
  { value: "single_session", label: "Single Session" },
  { value: "series", label: "Series" },
  { value: "sequence", label: "Sequence" },
];

export const AVAILABLE_LOCALES_FOR_WEBINAR_MODEL = [
  { value: "en_US", label: "English (United States)" },
  { value: "fr_FR", label: "French (France)" },
  { value: "de_DE", label: "German (Germany)" },
  { value: "es_ES", label: "Spanish (Spain)" },
  { value: "it_IT", label: "Italian (Italy)" },
  { value: "zh_CN", label: "Chinese (China)" },
];

export const AVAILABLE_EXPERIENCES_MODEL = [
  { value: "CLASSIC", label: "Classic" },
  { value: "SIMULIVE", label: "Simulive" },
  { value: "BROADCAST", label: "Broadcast" },
];

export const EVENT_NAMES_MODEL = [
  { value: "registrant.added", label: "Registrant Added" },
  { value: "registrant.joined", label: "Registrant Joined" },
  { value: "webinar.created", label: "Webinar Created" },
  { value: "webinar.changed", label: "Webinar Changed" },
];

export const USER_SUBSCRIPTION_STATUS_MODEL = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];
