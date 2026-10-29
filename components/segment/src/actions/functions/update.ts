import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  code,
  connectionInput,
  description,
  functionId,
  functionSettings,
  logoUrl,
  name,
  region,
} from "../../inputs";
import { getFunctionExamplePayload } from "../../examplePayloads";

export const updateFunction = action({
  display: {
    label: "Update Function",
    description: "Updates a Function.",
  },
  inputs: {
    connectionInput,
    region,
    functionId,
    code,
    settings: functionSettings,
    displayName: {
      ...name,
      comments: "A display name for this Function.",
      label: "Display Name",
    },
    logoUrl,
    description,
  },
  perform: async (
    context,
    {
      connectionInput,
      region,
      functionId,
      code,
      description,
      displayName,
      logoUrl,
      settings,
    },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.patch(
      `/functions/${functionId}`,
      {
        code: code || undefined,
        description: description || undefined,
        displayName: displayName || undefined,
        logoUrl: logoUrl || undefined,
        settings: settings || undefined,
      },
      {
        headers: {
          "Content-Type": "application/vnd.segment.v1+json",
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getFunctionExamplePayload,
  },
});
