import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  enabled,
  metadataId,
  name,
  region,
  settings,
  sourceId,
} from "../../inputs";
import { getDestinationExamplePayload } from "../../examplePayloads";

export const createDestination = action({
  display: {
    label: "Create Destination",
    description: "Creates a new Destination.",
  },
  inputs: {
    connectionInput,
    region,
    sourceId,
    metadataId,
    name: {
      ...name,
      comments: "Defines the display name of the Destination.",
    },
    enabled: {
      ...enabled,
      comments: "Whether this Destination should receive data.",
    },
    settings: {
      ...settings,
      comments:
        "An optional object that contains settings for the Destination based on the 'required' and 'advanced' settings present in the Destination metadata.",
    },
  },
  perform: async (
    context,
    { connectionInput, region, enabled, name, settings, sourceId, metadataId },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.post(
      `/destinations`,
      {
        sourceId: sourceId || undefined,
        metadataId: metadataId || undefined,
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
    data: getDestinationExamplePayload,
  },
});
