import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

export const ping = action({
  display: {
    label: "Ping",
    description: "Send a ping to determine the status of the Mailchimp servers",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get("/ping");
    return { data };
  },
  inputs: { connection: connectionInput },
});

export default ping;
