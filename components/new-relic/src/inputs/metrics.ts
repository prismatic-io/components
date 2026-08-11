import { input, util } from "@prismatic-io/spectral";
import { toKeyValueObject, toOptionalString } from "../util";
import { connectionInput, timestamp } from "./common";
const metricName = input({
  label: "Metric Name",
  type: "string",
  example: "memory.heap",
  placeholder: "Enter metric name",
  required: true,
  comments: "The name of the metric to report.",
  clean: util.types.toString,
});
const metricType = input({
  label: "Metric Type",
  type: "string",
  model: [
    { label: "Count", value: "count" },
    { label: "Distribution", value: "distribution" },
    { label: "Gauge", value: "gauge" },
    { label: "Summary", value: "summary" },
    { label: "Unique Count", value: "uniqueCount" },
  ],
  example: "gauge",
  required: true,
  comments:
    "The type of metric to report. See [metric data types](https://docs.newrelic.com/docs/data-apis/understand-data/metric-data/metric-data-type/) for details.",
  clean: util.types.toString,
});
const metricValue = input({
  label: "Metric Value",
  type: "string",
  example: "2.3",
  placeholder: "Enter metric value",
  required: false,
  comments: "The numeric value to report for the metric.",
  clean: toOptionalString,
});
const attributes = input({
  label: "Attributes",
  type: "string",
  example: "memory.heap",
  required: false,
  collection: "keyvaluelist",
  comments:
    "A map of key-value pairs associated with this specific metric. Values can be strings, JSON numbers, or booleans. Keys are case-sensitive and must be less than 255 characters.",
  clean: toKeyValueObject,
});
export const sendMetricsInputs = {
  metricName,
  metricType,
  metricValue,
  attributes,
  timestamp,
  newRelicConnection: connectionInput,
};
