export const EVENT_DELIVERY_SCHEMAS = [
  {
    value: "CloudEventSchemaV1_0",
    label: "Cloud Event Schema",
  },
  {
    value: "EventGridSchema",
    label: "Event Grid Schema",
  },
];

export const API_URL = "https://management.azure.com/";

export const DEFAULT_DELETE_RESPONSE = "DELETED SUCCESSFULLY";

export const publishEventExample = [
  {
    id: "b3ccc7e3-c1cb-49bf-b7c8-0d4e60980616",
    source: "/microsoft/autorest/examples/eventgrid/cloud-events/publish",
    specversion: "1.0",
    data: {
      Property1: "Value1",
      Property2: "Value2",
    },
    type: "Microsoft.Contoso.TestEvent",
    time: "2017-12-04T22:06:09.147165Z",
  },
];

export const DEFAULT_MAX_DELIVERY_ATTEMPTS = 10,
  DEFAULT_EVENT_TIME_TO_LIVE_IN_MINUTES = 5;

export const BRANCH_NAMES = {
  VALIDATION_EVENT: "Validation Event",
  SKIP_EVENT: "Skip Event",
  PROCESS_EVENT: "Process Event",
};

export const VALIDATION_EVENT_TYPE =
  "Microsoft.EventGrid.SubscriptionValidationEvent";
