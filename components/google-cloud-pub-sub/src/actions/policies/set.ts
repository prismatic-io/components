import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, policy, resource } from "../../inputs";

export const setPolicy = action({
  display: {
    description: "Sets the access control policy on the specified resource.",
    label: "Set Policy",
  },
  inputs: {
    connectionInput,
    resource,
    policy,
  },
  perform: async (_context, { connectionInput, resource, policy }) => {
    const client = createClient(connectionInput);
    const { data } = await client.projects.schemas.setIamPolicy({
      resource,
      requestBody: {
        policy: policy || undefined,
      },
    });
    return {
      data,
    };
  },
});
