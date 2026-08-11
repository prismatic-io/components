import type { BaseUrlMap } from "./types";
export enum Service {
  API = "API",
  INSIGHTS = "INSIGHTS",
  LOGS = "LOGS",
  METRICS = "METRICS",
}
export const BASE_URLS: Record<Service, BaseUrlMap[string]> = {
  API: {
    US: "https://api.newrelic.com/v2",
    EU: "https://api.eu.newrelic.com/v2",
  },
  INSIGHTS: {
    US: "https://insights-collector.newrelic.com/v1",
    EU: "https://insights-collector.eu01.nr-data.net/v1",
  },
  LOGS: {
    US: "https://log-api.newrelic.com/log/v1",
    EU: "https://log-api.eu.newrelic.com/log/v1",
  },
  METRICS: {
    US: "https://metric-api.newrelic.com/metric/v1",
    EU: "https://metric-api.eu.newrelic.com/metric/v1",
  },
};
