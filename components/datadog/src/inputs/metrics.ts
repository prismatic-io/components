import { input, util } from "@prismatic-io/spectral";
import { METRIC_TYPE_OPTIONS } from "../constants";
import type { MetricIntakeType } from "../types";
import { toOptionalNumber, toOptionalString } from "../utils";
import { connection } from "./common";


export const metricName = input({
  label: "Metric Name",
  type: "string",
  required: true,
  placeholder: "Enter metric name",
  comments:
    "The name of the timeseries metric (e.g., system.load.1, custom.my_metric).",
  example: "system.load.1",
  dataSource: "selectMetric",
  clean: util.types.toString,
});





export const metricSeries = input({
  label: "Metric Series",
  type: "code",
  required: true,
  language: "json",
  comments:
    'JSON array of metric series to submit. Each series must include "metric" (name) and "points" (array of {timestamp, value}). Optional fields: type, interval, unit, tags, resources.',
  example: JSON.stringify(
    [
      {
        metric: "system.load.1",
        type: 3,
        points: [{ timestamp: 1636629071, value: 0.7 }],
        resources: [{ name: "dummyhost", type: "host" }],
        tags: ["environment:production"],
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});


export const metricType = input({
  label: "Metric Type",
  type: "string",
  required: false,
  model: METRIC_TYPE_OPTIONS,
  comments:
    "The type of metric. Gauge is the default if unspecified. Count and Rate types require an interval.",
  clean: (value: unknown): MetricIntakeType | undefined =>
    value ? (util.types.toNumber(value) as MetricIntakeType) : undefined,
});


export const metricValue = input({
  label: "Value",
  type: "string",
  required: true,
  placeholder: "Enter metric value",
  comments: "The numeric value for the metric data point (64-bit float).",
  example: "0.7",
  clean: util.types.toNumber,
});


export const metricTimestamp = input({
  label: "Timestamp",
  type: "string",
  required: false,
  placeholder: "Enter Unix timestamp in seconds",
  comments:
    "Unix timestamp in seconds. Defaults to the current time if not provided. Must be within 10 minutes in the future or 1 hour in the past.",
  example: "1636629071",
  clean: toOptionalNumber,
});


export const metricTags = input({
  label: "Tags",
  type: "string",
  required: false,
  collection: "valuelist",
  comments:
    'Tags associated with the metric. Each tag is a string in "key:value" format.',
  example: "environment:production",
  clean: (value: unknown) => value as string[],
});


export const metricUnit = input({
  label: "Unit",
  type: "string",
  required: false,
  placeholder: "Enter metric unit",
  comments: "The unit of the metric value (e.g., byte, second, request).",
  example: "byte",
  clean: toOptionalString,
});


export const metricInterval = input({
  label: "Interval",
  type: "string",
  required: false,
  placeholder: "Enter interval in seconds",
  comments:
    "The interval in seconds. Required if the metric type is rate or count.",
  example: "60",
  clean: toOptionalNumber,
});


export const resourceName = input({
  label: "Resource Name",
  type: "string",
  required: false,
  placeholder: "Enter resource name",
  comments:
    "The name of the resource to associate with this metric (e.g., hostname).",
  example: "my-host",
  clean: toOptionalString,
});


export const resourceType = input({
  label: "Resource Type",
  type: "string",
  required: false,
  placeholder: "Enter resource type",
  comments: 'The type of resource (e.g., "host").',
  example: "host",
  clean: toOptionalString,
});


export const metricsFrom = input({
  label: "From",
  type: "string",
  required: true,
  placeholder: "Enter Unix timestamp in seconds",
  comments:
    "Unix timestamp (seconds) from which to list active metrics. Metrics reported after this time are returned.",
  example: "1636629071",
  clean: util.types.toNumber,
});


export const metricsHost = input({
  label: "Host",
  type: "string",
  required: false,
  placeholder: "Enter hostname to filter by",
  comments:
    "Hostname to filter the list of active metrics. Only metrics reported by this host are returned.",
  example: "my-host",
  clean: toOptionalString,
});


export const metricsTagFilter = input({
  label: "Tag Filter",
  type: "string",
  required: false,
  placeholder: "Enter tag filter expression",
  comments:
    'Filter metrics by tag. Supports boolean expressions (e.g., "env:production AND role:web").',
  example: "env:production",
  clean: toOptionalString,
});


export const metricsQuery = input({
  label: "Query",
  type: "string",
  required: true,
  placeholder: "Enter metric name search query",
  comments:
    'Search query to find metrics by name prefix. The "metrics:" prefix is added automatically.',
  example: "system.cpu",
  clean: util.types.toString,
});





export const submitMetricsInputs = {
  connection,
  metricSeries,
};

export const submitSingleMetricInputs = {
  connection,
  metricName,
  metricValue,
  metricTimestamp,
  metricType,
  metricTags,
  metricUnit,
  metricInterval,
  resourceName,
  resourceType,
};

export const listMetricsInputs = {
  connection,
  metricsFrom,
  metricsHost,
  metricsTagFilter,
};

export const searchMetricsInputs = {
  connection,
  metricsQuery,
};
