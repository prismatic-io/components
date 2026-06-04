import { action, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { updateVersionExamplePayload } from "../../examplePayloads";
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
  versionId,
  versionName,
} from "../../inputs";

export const updateVersion = action({
  display: {
    label: "Update Version",
    description: "Update an existing version by ID.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.put("/version", {
      id: params.versionId,
      description: util.types.toString(params.description) || undefined,
      name: util.types.toString(params.versionName) || undefined,
      archived: util.types.toBool(params.archived) || undefined,
      released: util.types.toBool(params.released) || undefined,
      startDate: params.startDate ? util.types.toString(params.startDate) : undefined,
      releaseDate: params.releaseDate ? util.types.toString(params.releaseDate) : undefined,
      project: util.types.toString(params.projectKey) || undefined,
      projectId: params.projectId || undefined,
      ...params.dynamicValues,
      ...params.fieldValues,
    });
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    versionId,
    description,
    versionName: { ...versionName, required: false },
    archived,
    released,
    startDate,
    releaseDate,
    projectKey,
    projectId,
    dynamicValues,
    fieldValues,
  },
  examplePayload: updateVersionExamplePayload,
});
