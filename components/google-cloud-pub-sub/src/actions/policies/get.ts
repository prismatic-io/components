import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, requestedPolicyVersion, resource } from "../../inputs";

export const getPolicy = action({
  display: {
    description: "Gets the access control policy for a resource.",
    label: "Get Policy",
  },
  inputs: {
    connectionInput,
    resource,
    requestedPolicyVersion,
  },
  perform: async (_context, { connectionInput, resource, requestedPolicyVersion }) => {
    const client = createClient(connectionInput);
    const { data } = await client.projects.schemas.getIamPolicy({
      resource,
      "options.requestedPolicyVersion": requestedPolicyVersion || undefined,
    });
    return {
      data,
    };
  },
});
