import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { getVersionExamplePayload } from "../../examplePayloads";
import { connectionInput, versionId } from "../../inputs";

export const getVersion = action({
  display: {
    label: "Get Version",
    description: "Get the information and metadata of an existing version.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get(`/version/${params.versionId}`);
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    versionId,
  },
  examplePayload: getVersionExamplePayload,
});
