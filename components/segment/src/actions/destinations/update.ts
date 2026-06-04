import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  destinationId,
  enabled,
  name,
  region,
  settings,
} from "../../inputs";
import { getDestinationExamplePayload } from "../../examplePayloads";

export const updateDestination = action({
  display: {
    label: "Update Destination",
    description: "Updates an existing Destination.",
  },
  inputs: {
    connectionInput,
    region,
    destinationId,
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
    { connectionInput, region, destinationId, enabled, name, settings },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.patch(
      `/destinations/${destinationId}`,
      {
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
