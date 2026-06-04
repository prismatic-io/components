import { input } from "@prismatic-io/spectral";

export const jsonMessage = input({
  label: "Message",
  type: "string",
  example:
    '{"service-name": "my-service", "user": {"id": 123, "name": "alice"}}',
  required: false,
  comments:
    "Provide a JSON string containing the message of logs you want to send.",
});

export const codeMessage = input({
  label: "Message",
  type: "code",
  required: true,
  default: `{
  "timestamp": 1562767499238,
  "message": "{"service-name": "my-service", "user": {"id": 123, "name": "alice"}}",
  "service-name": "my-service",
  "user": {
    "id": 123,
    "name": "alice"
  }
}`,
  language: "json",
  comments:
    "Provide a JSON object containing the message of logs you want to send.",
});

export const timestamp = input({
  label: "Timestamp",
  type: "string",
  example: "1562767499238",
  required: true,
  comments: "Provide a valid UNIX timestamp to be passed alongside the logs.",
});

export const metricName = input({
  label: "Metric Name",
  type: "string",
  example: "memory.heap",
  required: true,
  comments: "Provide the name of the metric you would like to report.",
});

export const intervalMS = input({
  label: "Interval MS",
  type: "string",
  example: "10000",
  required: false,
  comments:
    "Provide a number in miliseconds for the length of the time window. This field is required if you are using the 'count', or 'summary' metric types.",
});

export const metricType = input({
  label: "Metric Type",
  type: "string",
  model: [
    {
      label: "Count",
      value: "count",
    },
    {
      label: "Distribution",
      value: "distribution",
    },
    {
      label: "Gauge",
      value: "gauge",
    },
    {
      label: "Summary",
      value: "summary",
    },
    {
      label: "Unique Count",
      value: "uniqueCount",
    },
  ],
  example: "gauge",
  required: true,
  comments:
    "Provide a string value for the type of metric you would like to report. In order to correctly chose this value refer to the list of types here: https://docs.newrelic.com/docs/data-apis/understand-data/metric-data/metric-data-type/",
});

export const metricValue = input({
  label: "Metric Value",
  type: "string",
  example: "2.3",
  required: false,
  comments: "Provide a value to report.",
});

export const attributes = input({
  label: "Attributes",
  type: "string",
  example: "memory.heap",
  required: false,
  collection: "keyvaluelist",
  comments:
    "A map of key value pairs associated with this specific metric. Values can be strings, JSON numbers, or booleans. Keys are case-sensitive and must be less than 255 characters.",
});

export const eventType = input({
  label: "Event Type",
  type: "string",
  example: "Purchase",
  required: true,
  comments:
    "Can be a combination of alphanumeric characters, underscores, and colons",
});

export const additionalAttributes = input({
  label: "Additional Attributes",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Provide any key value pairs to pass with your request body.",
});

export const accountId = input({
  label: "Account Id",
  type: "string",
  example: "8439034",
  required: true,
  comments: "Provide the unique identifier of your New Relic Insights account.",
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});
