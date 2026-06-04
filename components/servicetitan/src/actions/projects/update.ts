import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProjectResponse as updateProjectResponse } from "../../examplePayloads";
import {
  actualCompletionDate,
  connection,
  customFields,
  externalData,
  jobsIds,
  name,
  projectId,
  projectManagerIds,
  start,
  statusId,
  subStatusId,
  summary,
  targetCompletionDate,
} from "../../inputs";

export const updateProject = action({
  display: {
    label: "Update Project",
    description: "Update a project",
  },
  inputs: {
    connection,
    projectId: {
      ...projectId,
      required: true,
      comments: "ID of the project to update",
    },
    projectManagerIds,
    jobsIds,
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
      externalData,
      name,
      projectManagerIds,
      startDate,
      statusId,
      subStatusId,
      summary,
      targetCompletionDate,
      jobsIds,
      projectId,
    },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.patch(`/projects/${projectId}`, {
      actualCompletionDate,
      customFields,
      externalData,
      name,
      projectManagerIds,
      startDate,
      statusId,
      subStatusId,
      summary,
      targetCompletionDate,
      jobsIds,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: updateProjectResponse,
  },
});
