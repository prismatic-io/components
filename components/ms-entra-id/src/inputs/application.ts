import { input, util } from "@prismatic-io/spectral";
import {
  additionalProperties,
  connection,
  eventualConsistencyLevelHeader,
  getAllPaginatedResults,
  odataParams,
  uniqueName,
  useAsUpsert,
} from "./common";

const displayName = input({
  label: "Display Name",
  type: "string",
  required: true,
  comments: "The display name of the application.",
  example: "My Application",
  placeholder: "Enter display name",
  clean: util.types.toString,
});

export const createApplicationInputs = {
  connection,
  displayName,
  additionalProperties: input({
    ...additionalProperties,
    comments: `${additionalProperties.comments} See [Create Application API](https://learn.microsoft.com/en-us/graph/api/application-post-applications).`,
  }),
};

const applicationObjectId = input({
  label: "Application Object ID",
  type: "string",
  required: true,
  comments: "The ID of the application to delete.",
  example: "03ef14b0-ca33-4840-8f4f-d6e91916010e",
  placeholder: "Enter Application Object ID",
  clean: util.types.toString,
  dataSource: "selectApplication",
});

export const deleteApplicationInputs = {
  connection,
  applicationObjectId,
};

export const getApplicationInputs = {
  connection,
  applicationObjectId: input({
    ...applicationObjectId,
    comments: "The ID of the application to read.",
  }),
};

export const listApplicationsInputs = {
  connection,
  $count: odataParams.$count,
  $expand: odataParams.$expand,
  $filter: odataParams.$filter,
  $orderby: odataParams.$orderby,
  $search: odataParams.$search,
  $select: odataParams.$select,
  $top: odataParams.$top,
  getAllPaginatedResults,
  eventualConsistencyLevelHeader,
};

export const upsertApplicationInputs = {
  connection,
  uniqueName: input({
    ...uniqueName,
    comments: "The unique name of the application to update or create.",
    placeholder: "MyApplication",
    example: "MyApplication",
  }),
  useAsUpsert: input({
    ...useAsUpsert,
    comments:
      "When true, creates a new application if it does not exist. When false, only updates an existing application.",
  }),
  displayName,
  additionalProperties: input({
    ...additionalProperties,
    comments: `${additionalProperties.comments} See [Upsert Application API](https://learn.microsoft.com/en-us/graph/api/application-upsert).`,
  }),
};
