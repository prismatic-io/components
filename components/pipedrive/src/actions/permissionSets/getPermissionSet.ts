import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, permissionSetIdInput } from "../../inputs";

export const getPermissionSet = action({
  display: {
    label: "Get Permission Set",
    description: "Gets one permission set.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/permissionSets/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: permissionSetIdInput,
  },
});
