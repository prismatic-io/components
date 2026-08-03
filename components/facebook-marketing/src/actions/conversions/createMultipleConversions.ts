import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createMultipleConversionsResponse } from "../../examplePayloads";
import { createMultipleConversionsInputs } from "../../inputs";
import { validateConversionsConnection } from "../../util";
export const createMultipleConversions = action({
  display: {
    label: "Create Multiple Conversions",
    description:
      "Create multiple conversion events for a pixel. Requires the Conversions API Access Token connection.",
  },
  perform: async (context, { pixelId, connection, version, events }) => {
    validateConversionsConnection(connection);
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.post(`/${pixelId}/events`, {
      data: events,
    });
    return {
      data,
    };
  },
  inputs: createMultipleConversionsInputs,
  examplePayload: createMultipleConversionsResponse,
});
