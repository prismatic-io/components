import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getCompanyAddons = action({
  display: {
    label: "Get Company Addons",
    description: "Gets all add-ons for a single company.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/billing/subscriptions/addons");
    return { data };
  },
  inputs: { connection: connectionInput },
});
