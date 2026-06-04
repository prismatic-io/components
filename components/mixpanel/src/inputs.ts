import { input, util } from "@prismatic-io/spectral";
import { jsonInputClean, valueListInputClean } from "./util";
import gcsRegions from "./gcs_regions.json";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Mixpanel connection to use.",
});

export const events = input({
  label: "Events",
  type: "code",
  language: "json",
  comments:
    "An array of event objects to ingest into Mixpanel. Each request accepts up to 2000 events and 2MB uncompressed. See the [Event Ingestion API](https://developer.mixpanel.com/reference/import-events) documentation for details.",
  example: JSON.stringify(
    [
      {
        event: "Signed up",
        properties: {
          time: 1618716477000,
          distinct_id: "91304156-cafc-4673-a237-623d1129c801",
          $insert_id: "29fc2962-6d9c-455d-95ad-95b84f09b9e4",
          ip: "136.24.0.114",
          "Referred by": "Friend",
          URL: "mixpanel.com/signup",
        },
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const ip = input({
  label: "IP",
  type: "string",
  clean: util.types.toString,
  comments:
    "When true, Mixpanel will use the IP address of the incoming request and compute a distinct_id using a hash function if no distinct_id is provided. Set to 1 to enable.",
  placeholder: "Enter 1 to enable IP tracking",
  required: false,
  example: "1",
});

export const verbose = input({
  label: "Verbose",
  type: "string",
  clean: util.types.toString,
  comments:
    "When true, Mixpanel will respond with a detailed JSON object describing the success or failure of the tracking call. Set to 1 to enable verbose responses for debugging.",
  placeholder: "Enter 1 to enable verbose mode",
  required: false,
  example: "1",
});

export const redirect = input({
  label: "Redirect",
  type: "string",
  clean: util.types.toString,
  comments:
    "When provided, Mixpanel will serve a redirect to the given URL as a response. Useful for link tracking in notifications.",
  placeholder: "Enter redirect URL",
  required: false,
  example: "https://example.com/redirect",
});

export const img = input({
  label: "Img",
  type: "string",
  clean: util.types.toString,
  comments:
    "When true, Mixpanel will serve a 1x1 transparent pixel image as a response. Set to 1 to enable pixel tracking for environments without JavaScript support.",
  placeholder: "Enter 1 to enable pixel tracking",
  required: false,
  example: "1",
});

export const properties = input({
  label: "Properties",
  type: "code",
  language: "json",
  comments:
    "An array of profile property objects. If the profile does not exist, it creates it with these properties. If it does exist, it sets the properties to these values, overwriting existing values. See the [Engage API](https://developer.mixpanel.com/reference/profile-set) documentation for details.",
  example: JSON.stringify(
    [
      {
        $token: "725a93138a7d12e00f16912848590ae7",
        $distinct_id: "13793",
        $set: {
          $email: "john.doe@example.com",
          $name: "John Doe",
          plan: "Premium",
        },
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const propertiesToUpdate = input({
  label: "Properties To Update",
  type: "code",
  language: "json",
  comments:
    "An array of profile update objects for batch operations. Each object can use operations like $set, $add, $union, etc. See the [Engage API](https://developer.mixpanel.com/reference/profile-set) documentation for details.",
  example: JSON.stringify(
    [
      {
        $token: "725a93138a7d12e00f16912848590ae7",
        $distinct_id: "13793",
        $add: { "Coins Gathered": 12 },
      },
      {
        $token: "725a93138a7d12e00f16912848590ae7",
        $distinct_id: "13794",
        $add: { "Coins Gathered": 13 },
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const deleteProfiles = input({
  label: "Delete Profiles",
  type: "code",
  language: "json",
  comments:
    "An array of profile deletion objects. Permanently deletes profiles from Mixpanel along with all properties. The profile is determined by the $distinct_id. See the [Engage API](https://developer.mixpanel.com/reference/delete-profile) documentation for details.",
  example: JSON.stringify(
    [
      {
        $token: "725a93138a7d12e00f16912848590ae7",
        $distinct_id: "13793",
        $delete: "",
        $ignore_alias: false,
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const strict = input({
  label: "Strict",
  type: "string",
  clean: util.types.toString,
  comments:
    "When true, Mixpanel will validate the provided records and return per-record error messages for records that fail validation. Set to 1 to enable strict validation.",
  placeholder: "Enter 1 to enable strict validation",
  required: false,
  example: "1",
});

export const region = input({
  label: "Region",
  type: "string",
  clean: util.types.toString,
  comments:
    "The server location to use. Select 'api' for the default US servers or 'api-eu' for EU servers if you are enrolled in EU Data Residency.",
  placeholder: "Select region",
  model: [
    {
      label: "api",
      value: "api",
    },
    {
      label: "api-eu",
      value: "api-eu",
    },
  ],
  required: true,
});

export const regionAndDomain = input({
  label: "Region and Domain",
  type: "string",
  clean: util.types.toString,
  comments:
    "The server location to use. Select 'mixpanel' for the default US servers or 'eu.mixpanel' for EU servers if you are enrolled in EU Data Residency.",
  placeholder: "Select region and domain",
  model: [
    {
      label: "mixpanel",
      value: "mixpanel",
    },
    {
      label: "eu.mixpanel",
      value: "eu.mixpanel",
    },
  ],
  required: true,
});

export const dataAndDomain = input({
  label: "Data and Domain",
  type: "string",
  clean: util.types.toString,
  comments:
    "The server location to use. Select 'data' for the default US servers or 'data-eu' for EU servers if you are enrolled in EU Data Residency.",
  placeholder: "Select data and domain",
  model: [
    {
      label: "data",
      value: "data",
    },
    {
      label: "data-eu",
      value: "data-eu",
    },
  ],
  required: true,
});

export const script = input({
  label: "Script",
  type: "string",
  clean: util.types.toString,
  comments:
    "The JQL script to execute. See the [JQL API](https://developer.mixpanel.com/reference/jql) documentation for query syntax.",
  placeholder: "Enter JQL script",
  required: true,
  example:
    "function main(){return Events(params).groupBy(['name'],mixpanel.reducer.count())}",
});

export const params = input({
  label: "Params",
  type: "code",
  language: "json",
  comments:
    "A JSON object containing parameters that will be made available to the JQL script as the params global variable.",
  example: JSON.stringify(
    {
      from_date: "2024-01-01",
      to_date: "2024-01-31",
      event_name: "Page View",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const project_id = input({
  label: "Project ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The Mixpanel project ID. <strong>Required</strong> when using service account authentication (Username and Password). Find this in Settings > Project Settings in your Mixpanel dashboard.",
  placeholder: "Enter project ID",
  required: false,
  example: "2891273",
});

export const workspace_id = input({
  label: "Workspace ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The ID of the workspace if applicable. Only required for workspace-specific queries.",
  placeholder: "Enter workspace ID",
  required: false,
  example: "3847562",
});

export const funnel_id = input({
  label: "Funnel ID",
  type: "string",
  clean: util.types.toString,
  comments: "The unique identifier of the funnel to retrieve data for.",
  placeholder: "Enter funnel ID",
  dataSource: "funnels",
  required: true,
  example: "7509",
});

export const from_date = input({
  label: "From Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "The start date for querying in YYYY-MM-DD format. This date is inclusive.",
  placeholder: "Enter start date (YYYY-MM-DD)",
  required: true,
  example: "2024-01-01",
});

export const to_date = input({
  label: "To Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "The end date for querying in YYYY-MM-DD format. This date is inclusive.",
  placeholder: "Enter end date (YYYY-MM-DD)",
  required: true,
  example: "2024-01-31",
});

export const length = input({
  label: "Length",
  type: "string",
  clean: util.types.toString,
  comments:
    "The number of units (defined by length_unit) each user has to complete the funnel. Maximum 90 days. Defaults to the value saved in the UI for this funnel.",
  placeholder: "Enter length value",
  required: true,
  example: "7",
});

export const length_unit = input({
  label: "Length Unit",
  type: "string",
  clean: util.types.toString,
  comments:
    "The time unit for the length parameter. Defaults to the value saved in the UI for this funnel.",
  placeholder: "Select length unit",
  model: [
    {
      label: "day",
      value: "day",
    },
    {
      label: "hour",
      value: "hour",
    },
    {
      label: "minute",
      value: "minute",
    },
    {
      label: "seconds",
      value: "seconds",
    },
  ],
  required: false,
  example: "day",
});

export const interval = input({
  label: "Interval",
  type: "string",
  clean: util.types.toString,
  comments:
    "The number of days for each time bucket. Defaults to 1 day per bucket.",
  placeholder: "Enter interval in days",
  required: false,
  example: "1",
});

export const unit = input({
  label: "Unit",
  type: "string",
  clean: util.types.toString,
  comments:
    "An alternate way of specifying the interval. Choose day, week, or month.",
  placeholder: "Select time unit",
  model: [
    {
      label: "day",
      value: "day",
    },
    {
      label: "week",
      value: "week",
    },
    {
      label: "month",
      value: "month",
    },
  ],
  required: false,
  example: "week",
});

export const on = input({
  label: "On",
  type: "string",
  clean: util.types.toString,
  comments:
    "The property expression to segment the event on. See [segmentation expressions](https://developer.mixpanel.com/reference/segmentation-expressions) for syntax details.",
  placeholder: "Enter segmentation expression",
  required: false,
  example: "properties['account_id']",
});

export const where = input({
  label: "Where",
  type: "string",
  clean: util.types.toString,
  comments:
    "An expression to filter events. See [segmentation expressions](https://developer.mixpanel.com/reference/segmentation-expressions) for syntax details.",
  placeholder: "Enter filter expression",
  required: false,
  example: "properties['account_id'] in [1,2,3,4]",
});

export const limit = input({
  label: "Limit",
  type: "string",
  clean: util.types.toString,
  comments:
    "The maximum number of top property values to return. Defaults to 255, maximum 10,000. Only applies when 'on' is specified.",
  placeholder: "Enter limit value",
  required: false,
  example: "100",
});

export const bookmark_id = input({
  label: "Bookmark ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The ID of your Insights report. Find this in the URL: https://mixpanel.com/report/1/insights#report/YOUR_BOOKMARK_ID/example-report",
  placeholder: "Enter bookmark ID",
  required: true,
  example: "8947562",
});

export const event = input({
  label: "Event Name",
  type: "string",
  clean: util.types.toString,
  comments: "The name of the event to filter data by.",
  placeholder: "Enter event name",
  required: false,
  example: "Page View",
});

export const gzipEncoding = input({
  label: "Gzip Encoding",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, the response will be compressed with gzip and Content-Encoding will be set to gzip.",
  required: false,
  example: "false",
});

export const distinct_ids = input({
  label: "Distinct IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of unique identifiers to distinguish individual profiles. Each ID represents a distinct user profile.",
  default: ["user-12345"],
  clean: valueListInputClean,
  example: "user-12345, user-67890",
});

export const output_properties = input({
  label: "Output Properties",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of property names to return in the response. Specifying properties can significantly reduce response size and improve query performance.",
  default: ["$email", "$name"],
  clean: valueListInputClean,
  example: "$last_name, $email, Total Spent",
});

export const session_id = input({
  label: "Session ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "A session ID from a previous query result. Using this speeds up API responses and enables pagination through results.",
  placeholder: "Enter session ID",
  required: false,
  example: "1234567890-EXAMPL",
});

export const page = input({
  label: "Page",
  type: "string",
  clean: util.types.toString,
  comments:
    "The page number of results to retrieve (zero-indexed). <strong>Required:</strong> Must provide session_id when using pagination.",
  placeholder: "Enter page number",
  required: false,
  example: "0",
});

export const behaviors = input({
  label: "Behaviors",
  type: "string",
  clean: util.types.toString,
  comments:
    "Event selector for exporting user profiles based on behaviors. <strong>Note:</strong> Mutually exclusive with filter_by_cohort.",
  placeholder: "Enter behaviors expression",
  required: false,
  example: 'event("Purchase").count() > 5',
});

export const as_of_timestamp = input({
  label: "As Of Timestamp",
  type: "string",
  clean: util.types.toString,
  comments:
    "A Unix timestamp for querying profiles as of a specific time. <strong>Required</strong> when exporting more than 1k profiles with behaviors parameter.",
  placeholder: "Enter Unix timestamp",
  required: false,
  example: "1609459200",
});

export const filter_by_cohort = input({
  label: "Filter By Cohort",
  type: "string",
  clean: util.types.toString,
  comments:
    'A JSON object containing the cohort ID to filter by. Format: {"id":12345}. <strong>Note:</strong> Mutually exclusive with behaviors.',
  placeholder: "Enter cohort filter JSON",
  required: false,
  example: '{"id":12345}',
});

export const include_all_users = input({
  label: "Include All Users",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, includes distinct_ids without user profiles. When false, only includes distinct_ids with user profiles. Only applies when using filter_by_cohort.",
  required: false,
  example: "false",
  default: "true",
});

export const name = input({
  label: "Name",
  type: "string",
  clean: util.types.toString,
  comments: "The unique name that identifies the pipeline.",
  placeholder: "Enter pipeline name",
  required: true,
  dataSource: "pipelines",
  example: "events-daily-export",
});

export const summary = input({
  label: "Summary",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, returns only task count by status without detailed information.",
  required: false,
  example: "false",
  default: "false",
});

export const status = input({
  label: "Status",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of status values to filter tasks. Valid options: pending, running, retried, failed, canceled, timed_out.",
  default: ["pending"],
  clean: valueListInputClean,
  example: "pending, running, retried",
});

export const trial = input({
  label: "Trial",
  type: "string",
  clean: util.types.toString,
  comments:
    "When true, creates a trial pipeline for testing purposes before production deployment.",
  placeholder: "Select trial mode",
  model: [
    {
      label: "True",
      value: "true",
    },
    {
      label: "False",
      value: "false",
    },
    {
      label: "",
      value: "",
    },
  ],
  required: false,
  default: "",
});

export const data_source = input({
  label: "Data Source",
  type: "string",
  clean: util.types.toString,
  comments:
    "The data source type for the pipeline. Currently only 'events' is supported for exporting Mixpanel event data.",
  placeholder: "Select data source",
  model: [
    {
      label: "Events",
      value: "events",
    },
    {
      label: "",
      value: "",
    },
  ],
  required: false,
  default: "events",
});

export const frequency = input({
  label: "Frequency",
  type: "string",
  clean: util.types.toString,
  comments:
    "The export frequency. 'hourly' exports data every hour, 'daily' exports at midnight in the project's timezone. Only applies to indefinite export windows.",
  placeholder: "Select frequency",
  model: [
    {
      label: "daily",
      value: "daily",
    },
    {
      label: "hourly",
      value: "hourly",
    },
    {
      label: "",
      value: "",
    },
  ],
  required: false,
  default: "daily",
});

export const eventArray = input({
  label: "Events",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of event names to whitelist for export. Only these events will be exported from Mixpanel.",
  default: ["Page View"],
  clean: valueListInputClean,
  example: "Signed Up, Purchase, Page View",
});

export const data_format = input({
  label: "Data Format",
  type: "string",
  clean: util.types.toString,
  comments:
    "The file format for exported data. Currently only 'json' is supported for this pipeline type.",
  placeholder: "Select data format",
  model: [
    {
      label: "json",
      value: "json",
    },
    {
      label: "",
      value: "",
    },
  ],
  required: false,
  default: "json",
});

export const gcs_bucket = input({
  label: "GCS Bucket",
  type: "string",
  clean: util.types.toString,
  comments:
    "The Google Cloud Storage bucket name where Mixpanel data will be exported.",
  placeholder: "Enter GCS bucket name",
  required: true,
  example: "my-mixpanel-exports",
});

export const gcs_prefix = input({
  label: "GCS Prefix",
  type: "string",
  clean: util.types.toString,
  comments:
    "The path prefix within the GCS bucket for organizing exported files.",
  placeholder: "Enter GCS prefix path",
  required: false,
  example: "mixpanel/events",
});

export const gcs_region = input({
  label: "GCS Region",
  placeholder: "Select GCS region",
  type: "string",
  required: true,
  comments: "The Google Cloud Storage region where the bucket is located.",
  example: "northamerica-northeast1",
  default: "northamerica-northeast1",
  model: gcsRegions.map((region) => {
    return {
      label: region,
      value: region,
    };
  }),
  clean: util.types.toString,
});

export const distinct_id = input({
  label: "Distinct ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The unique identifier for the user post-identification. Equivalent to $identified_id and will be inferred if not provided.",
  placeholder: "Enter distinct ID",
  required: false,
  example: "user-12345",
});

export const identified_id = input({
  label: "Identified ID",
  type: "string",
  clean: util.types.toString,
  comments: "The identified user ID to merge with the anonymous ID.",
  placeholder: "Enter identified ID",
  required: true,
  example: "user-12345",
});

export const anon_id = input({
  label: "Anon ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The anonymous user ID to merge with the identified ID. Must be in UUID v4 format and not previously merged.",
  placeholder: "Enter anonymous ID (UUID v4)",
  required: true,
  example: "3e2a0d22-7465-4dc3-a2ab-56f8762e1a29",
});

export const project_token = input({
  label: "Project Token",
  type: "string",
  clean: util.types.toString,
  comments:
    "Your Mixpanel project token. Find this in Settings > Project Settings in your Mixpanel dashboard.",
  placeholder: "Enter project token",
  required: true,
  example: "725a93138a7d12e00f16912848590ae7",
});

export const alias = input({
  label: "Alias",
  type: "string",
  clean: util.types.toString,
  comments:
    "A new distinct_id to be merged with the original distinct_id. Each alias can only map to one distinct_id.",
  placeholder: "Enter alias ID",
  required: true,
  example: "user-alias-67890",
});

export const useProjectToken = input({
  label: "Use Project Token",
  type: "boolean",
  clean: util.types.toBool,
  default: "false",
  comments:
    "When true, uses the project token from the connection to authenticate the request instead of service account credentials.",
});
