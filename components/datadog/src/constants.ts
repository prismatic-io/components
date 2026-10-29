export const DATADOG_SITES = [
  { label: "US1 (datadoghq.com)", value: "https://api.datadoghq.com" },
  { label: "US3 (us3.datadoghq.com)", value: "https://api.us3.datadoghq.com" },
  { label: "US5 (us5.datadoghq.com)", value: "https://api.us5.datadoghq.com" },
  { label: "EU (datadoghq.eu)", value: "https://api.datadoghq.eu" },
  { label: "AP1 (ap1.datadoghq.com)", value: "https://api.ap1.datadoghq.com" },
  { label: "AP2 (ap2.datadoghq.com)", value: "https://api.ap2.datadoghq.com" },
  {
    label: "US1-FED (ddog-gov.com)",
    value: "https://api.ddog-gov.com",
  },
];

export const DEFAULT_DATADOG_SITE = DATADOG_SITES[0].value;

export const METRIC_TYPE_OPTIONS = [
  { label: "Unspecified", value: "0" },
  { label: "Count", value: "1" },
  { label: "Rate", value: "2" },
  { label: "Gauge", value: "3" },
];

import type { WebhookEncodeAs } from "./types";

export const WEBHOOK_ENCODE_AS_OPTIONS: {
  label: string;
  value: WebhookEncodeAs;
}[] = [
  { label: "JSON", value: "json" },
  { label: "Form", value: "form" },
];

export const DEFAULT_WEBHOOK_ENCODE_AS: WebhookEncodeAs = "json";

export const WEBHOOK_STATE_KEY_PREFIX = "datadogWebhook";

export const WEBHOOKS_CONFIGURATION_PATH =
  "/api/v1/integration/webhooks/configuration/webhooks";

export const SUBMIT_METRICS_PATH = "/api/v2/series";

export const SEARCH_METRICS_PATH = "/api/v1/search";

export const METRICS_QUERY_PREFIX = "metrics:";
