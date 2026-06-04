import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { defaultInputs } from "../../inputs/general";
import { getAccountTenantIdsExamplePayload } from "../../examplePayloads/account";

export const getAccountTenantIds = action({
  display: {
    label: "Get Account Tenant IDs",
    description: "Returns the account's tenant IDs.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get("/account/TenantIds");

    return {
      data,
    };
  },
  inputs: defaultInputs,
  examplePayload: getAccountTenantIdsExamplePayload,
});
