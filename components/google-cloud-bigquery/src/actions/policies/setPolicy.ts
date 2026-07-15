import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { setPolicyInputs } from "../../inputs";
export const setPolicy = action({
  display: {
    description: "Sets the access control policy on the specified resource.",
    label: "Set Policy",
  },
  inputs: setPolicyInputs,
  perform: async (
    _context,
    { connectionInput, resource, policy, updateMask },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.tables.setIamPolicy({
      resource,
      requestBody: {
        policy,
        updateMask,
      },
    });
    return {
      data,
    };
  },
});
