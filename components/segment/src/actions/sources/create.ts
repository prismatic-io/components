import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  enabled,
  metadataId,
  region,
  settings,
  slug,
} from "../../inputs";
import { getSourceExamplePayload } from "../../examplePayloads";

export const createSource = action({
  display: {
    label: "Create Source",
    description: "Creates a new Source.",
  },
  inputs: {
    connectionInput,
    region,
    slug: {
      ...slug,
      required: true,
    },
    enabled: {
      ...enabled,
      comments: "Enable to allow this Source to send data. Defaults to true.",
      default: "true",
      required: true,
    },
    metadataId,
    settings: {
      ...settings,
      required: false,
    },
  },
  perform: async (
    context,
    { connectionInput, region, slug, enabled, metadataId, settings },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.post(
      `/sources`,
      {
        slug: slug || undefined,
        enabled: enabled === "" ? undefined : util.types.toBool(enabled),
        metadataId: metadataId || undefined,
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
    data: getSourceExamplePayload,
  },
});
