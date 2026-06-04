import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSupportedTimezonesExamplePayload } from "../../examplePayloads";
import { listSupportedTimezonesInputs } from "../../inputs";




export const listSupportedTimezones = action({
  display: {
    label: "List Supported Timezones",
    description: "Lists supported timezones for the current user.",
  },
  inputs: listSupportedTimezonesInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get("/me/outlook/supportedTimeZones");
    return { data };
  },
  examplePayload: listSupportedTimezonesExamplePayload,
});
