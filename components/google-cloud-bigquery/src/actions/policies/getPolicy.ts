import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, options, resource } from "../../inputs";

export const getPolicy = action({
  display: {
    description: "Gets the access control policy for a resource.",
    label: "Get Policy",
  },
  inputs: {
    connectionInput,
    resource,
    options,
  },
  perform: async (_context, { connectionInput, resource, options }) => {
    const client = createClient(connectionInput);
    const { data } = await client.tables.getIamPolicy({
      resource,
      requestBody: {
        options,
      },
    });
    return {
      data,
    };
  },
});
