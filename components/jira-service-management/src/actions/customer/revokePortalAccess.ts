import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { revokePortalAccessExamplePayload } from "../../examplePayloads";
import { revokePortalAccessInputs } from "../../inputs";

export const revokePortalAccess = action({
  display: {
    label: "Revoke Portal-Only Access",
    description:
      "Revokes a user's portal-only access so they can no longer log in as a portal customer.",
  },
  inputs: revokePortalAccessInputs,
  perform: async (context, { connection, accountId }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    await client.put(`/customer/user/${accountId}/revoke-portal-only-access`);
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: revokePortalAccessExamplePayload,
});
