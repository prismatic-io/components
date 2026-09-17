import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { jsonInputClean, toOptionalString, valueListInputClean } from "../util";
import {
  connectionInput,
  regionAndDomain,
  project_id,
  workspace_id,
  where,
  region,
  verbose,
  redirect,
} from "./common";
export const properties = input({
  label: "Properties",
  type: "code",
  language: "json",
  comments:
    "An array of profile property objects. If the profile does not exist, it creates it with these properties. If it does exist, it sets the properties to these values, overwriting existing values. See the [Engage API](https://docs.mixpanel.com/reference/profile-set) documentation for details.",
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
    "An array of profile update objects for batch operations. Each object can use operations like $set, $add, $union, etc. See the [Engage API](https://docs.mixpanel.com/reference/profile-set) documentation for details.",
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
    "An array of profile deletion objects. Permanently deletes profiles from Mixpanel along with all properties. The profile is determined by the $distinct_id. See the [Engage API](https://docs.mixpanel.com/reference/delete-profile) documentation for details.",
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
  clean: toOptionalString,
  comments:
    "A session ID from a previous query result. Using this speeds up API responses and enables pagination through results.",
  placeholder: "Enter session ID",
  required: false,
  example: "1234567890-EXAMPL",
});
export const page = input({
  label: "Page",
  type: "string",
  clean: toOptionalString,
  comments:
    "The page number of results to retrieve (zero-indexed). Required: Must provide session_id when using pagination.",
  placeholder: "Enter page number",
  required: false,
  example: "0",
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments:
    "Session ID from a prior query result and the zero-indexed page to retrieve against it. Provide the session ID when paging.",
  inputs: { session_id, page },
});
export const behaviors = input({
  label: "Behaviors",
  type: "string",
  clean: toOptionalString,
  comments:
    "Event selector for exporting user profiles based on behaviors. Note: Mutually exclusive with filter_by_cohort.",
  placeholder: "Enter behaviors expression",
  required: false,
  example: 'event("Purchase").count() > 5',
});
export const as_of_timestamp = input({
  label: "As Of Timestamp",
  type: "string",
  clean: toOptionalString,
  comments:
    "A Unix timestamp for querying profiles as of a specific time. Required when exporting more than 1k profiles with behaviors parameter.",
  placeholder: "Enter Unix timestamp",
  required: false,
  example: "1609459200",
});
export const filter_by_cohort = input({
  label: "Filter By Cohort",
  type: "string",
  clean: toOptionalString,
  comments:
    'A JSON object containing the cohort ID to filter by. Format: {"id":12345}. Note: Mutually exclusive with behaviors.',
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
export const cohortFilters = structuredObjectInput({
  label: "Cohort & Behavior Filters",
  required: false,
  comments:
    "Behavior-based event selector, cohort filter, and whether to include all users. Behaviors and cohort filter are mutually exclusive; including all users only applies with a cohort filter.",
  inputs: { behaviors, filter_by_cohort, include_all_users },
});
export const queryProfilesInputs = {
  connection: connectionInput,
  regionAndDomain,
  project_id: { ...project_id, required: true, clean: util.types.toString },
  workspace_id,
  distinct_ids,
  where: {
    ...where,
    comments:
      "An expression to filter users by. See [segmentation expressions](https://docs.mixpanel.com/reference/segmentation-expressions) for syntax details.",
  },
  output_properties,
  pagination,
  cohortFilters,
  as_of_timestamp,
};
export const createProfileInputs = {
  connection: connectionInput,
  properties,
  verbose,
  redirect,
  region,
};
export const updateMultipleProfilesInputs = {
  connection: connectionInput,
  propertiesToUpdate,
  verbose,
  redirect,
  region,
};
export const deleteProfileInputs = {
  connection: connectionInput,
  deleteProfiles,
  verbose,
  redirect,
  region,
};
