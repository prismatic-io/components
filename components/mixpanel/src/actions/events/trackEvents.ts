import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { trackEventsInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { trackEventsExamplePayload } from "../../examplePayloads";
import { ingestionAckOutputSchema } from "../../outputSchemas";
export const trackEvents = action({
  display: {
    label: "Track Events",
    description: "Track events to Mixpanel from client devices.",
  },
  inputs: trackEventsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ingestionAckOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, events, deliveryOptions, region, useProjectToken },
  ) => {
    const client = createClient(
      region,
      connection,
      useProjectToken ? Authorization.Token : Authorization.Account,
      context.debug.enabled,
    );
    const { data } = await client.post("/track", events, {
      params: {
        ip: deliveryOptions.ip,
        verbose: deliveryOptions.verbose,
        redirect: deliveryOptions.redirect,
        img: deliveryOptions.img,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => trackEventsExamplePayload,
  examplePayload: trackEventsExamplePayload,
});
