import { action, outputSchema } from "@prismatic-io/spectral";
import { listSupportedTimezonesOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { listSupportedTimezonesExamplePayload } from "../../examplePayloads";
import { listSupportedTimezonesInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const listSupportedTimezones = action({
  display: {
    label: "List Supported Timezones",
    description: "Lists supported timezones for the current user.",
  },
  inputs: listSupportedTimezonesInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      computeEndpointBasedOnConnection(params.connection, "/me/outlook/supportedTimeZones"),
    );
    return { data };
  },
  examplePerform: async () => listSupportedTimezonesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSupportedTimezonesOutputSchema,
  }),
  examplePayload: listSupportedTimezonesExamplePayload,
});
