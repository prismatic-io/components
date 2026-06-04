import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProjectResponse as createProjectResponse } from "../../examplePayloads";
import {
  actualCompletionDate,
  connection,
  customerId,
  customFields,
  externalData,
  locationId,
  name,
  projectManagerIds,
  start,
  statusId,
  subStatusId,
  summary,
  targetCompletionDate,
} from "../../inputs";

export const createProject = action({
  display: {
    label: "Create Project",
    description: "Create a new project",
  },
  inputs: {
    connection,
    locationId,
    customerId: {
      ...customerId,
      required: false,
      comments: "ID of the project's customer",
    },
    projectManagerIds,
    name: {
      ...name,
      required: false,
      comments: "Name of the project",
    },
    summary: {
      ...summary,
      required: false,
      comments: "Summary of the project",
    },
    statusId,
    subStatusId,
    startDate: { ...start, comments: "Start date of the project" },
    targetCompletionDate,
    actualCompletionDate,
    customFields: {
      ...customFields,
      comments: "Custom fields for the project",
    },
    externalData: {
      ...externalData,
      comments:
        "Optional model that contains a list of external data items that should be attached to this project.",
    },
  },
  perform: async (
    context,
    {
      connection,
      actualCompletionDate,
      customFields,
      customerId,
      externalData,
      locationId,
      name,
      projectManagerIds,
      startDate,
      statusId,
      subStatusId,
      summary,
      targetCompletionDate,
    },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.post(`/projects`, {
      actualCompletionDate,
      customFields,
      customerId,
      externalData,
      locationId,
      name,
      projectManagerIds,
      startDate,
      statusId,
      subStatusId,
      summary,
      targetCompletionDate,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createProjectResponse,
  },
});
