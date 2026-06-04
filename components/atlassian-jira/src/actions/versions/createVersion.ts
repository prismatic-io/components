import { action, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { createVersionExamplePayload } from "../../examplePayloads";
import {
  archived,
  connectionInput,
  description,
  dynamicValues,
  fieldValues,
  projectId,
  projectKey,
  releaseDate,
  released,
  startDate,
  versionName,
} from "../../inputs";

export const createVersion = action({
  display: {
    label: "Create Version",
    description: "Create a new version.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.post("/version", {
      description: util.types.toString(params.description) || undefined,
      name: util.types.toString(params.versionName),
      archived: util.types.toBool(params.archived) || undefined,
      released: util.types.toBool(params.released) || undefined,
      startDate: params.startDate ? util.types.toString(params.startDate) : undefined,
      releaseDate: params.releaseDate ? util.types.toString(params.releaseDate) : undefined,
      project: util.types.toString(params.projectKey) || undefined,
      projectId: util.types.toInt(params.projectId) || undefined,
      ...params.dynamicValues,
      ...params.fieldValues,
    });

    return {
      data,
    };
  },
  inputs: {
    jiraConnection: connectionInput,
    description,
    versionName,
    archived,
    released,
    startDate,
    releaseDate,
    projectKey,
    projectId,
    dynamicValues,
    fieldValues,
  },
  examplePayload: createVersionExamplePayload,
});
