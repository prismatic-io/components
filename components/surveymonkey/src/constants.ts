import type { RegionKey } from "./types";


export const BASE_URL = "https://api.surveymonkey.com/v3";

export const REGIONS: Record<RegionKey, { label: string; baseUrl: string }> = {
  us: {
    label: "United States",
    baseUrl: "https://api.surveymonkey.com/v3",
  },
  eu: {
    label: "European Union",
    baseUrl: "https://api.eu.surveymonkey.com/v3",
  },
  ca: {
    label: "Canada",
    baseUrl: "https://api.surveymonkey.ca/v3",
  },
};

export const MAX_PAGE_SIZE = 100;

export const WEBHOOK_EVENT_TYPES = [
  
  { label: "Response Completed", key: "response_completed" },
  { label: "Response Created", key: "response_created" },
  { label: "Response Updated", key: "response_updated" },
  { label: "Response Deleted", key: "response_deleted" },
  { label: "Response Disqualified", key: "response_disqualified" },
  { label: "Response Over Quota", key: "response_overquota" },
  
  { label: "Survey Created", key: "survey_created" },
  { label: "Survey Updated", key: "survey_updated" },
  { label: "Survey Deleted", key: "survey_deleted" },
  
  { label: "Collector Created", key: "collector_created" },
  { label: "Collector Updated", key: "collector_updated" },
  { label: "Collector Deleted", key: "collector_deleted" },
];
