import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  enabled,
  name,
  region,
  settings,
  slug,
  sourceId,
} from "../../inputs";
import { getSourceExamplePayload } from "../../examplePayloads";

export const updateSource = action({
  display: {
    label: "Update Source",
    description: "Updates an existing Source.",
  },
  inputs: {
    connectionInput,
    region,
    sourceId,
    slug: {
      ...slug,
      required: false,
    },
    enabled: {
      ...enabled,
      comments: "Enable to allow this Source to send data. Defaults to true.",
    },
    name: {
      ...name,
      comments:
        "An optional human-readable name to associate with this Source.",
    },
    settings: {
      ...settings,
      required: false,
    },
  },
  perform: async (
    context,
    { connectionInput, region, slug, enabled, name, settings, sourceId },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.patch(
      `/sources/${sourceId}`,
      {
        slug: slug || undefined,
        enabled: enabled === "" ? undefined : util.types.toBool(enabled),
        name: name || undefined,
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
