import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  code,
  connectionInput,
  description,
  functionSettings,
  logoUrl,
  name,
  region,
  resourceType,
} from "../../inputs";
import { getFunctionExamplePayload } from "../../examplePayloads";

export const createFunction = action({
  display: {
    label: "Create Function",
    description: "Creates a Function.",
  },
  inputs: {
    connectionInput,
    region,
    code: {
      ...code,
      required: true,
    },
    displayName: {
      ...name,
      comments: "A display name for this Function.",
      label: "Display Name",
      required: true,
    },
    resourceType,
    settings: functionSettings,
    logoUrl,
    description,
  },
  perform: async (
    context,
    {
      connectionInput,
      region,
      code,
      description,
      displayName,
      logoUrl,
      settings,
      resourceType,
    },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.post(
      `/functions`,
      {
        code: code || undefined,
        description: description || undefined,
        displayName: displayName || undefined,
        logoUrl: logoUrl || undefined,
        settings: settings || undefined,
        resourceType: resourceType || undefined,
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
