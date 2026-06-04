import { action } from "@prismatic-io/spectral";
import { updateUserInputs } from "../../inputs/users";
import { createClient } from "../../client";
import { NO_CONTENT_RESPONSE } from "../../constants";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Updates a user.",
  },
  perform: async (
    context,
    {
      connection,
      userId,
      name,
      password,
      active,
      email,
      AssignUserRoleIds,
      UnassignUserRoleIds,
      custom_quickjoin_id,
      custom_quicksupport_id,
      sso_customer_id,
      license_key,
      log_sessions,
      show_comment_window,
      tfa_enforced,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    await client.put(`/users/${userId}`, {
      email,
      name,
      AssignUserRoleIds,
      UnassignUserRoleIds,
      password,
      active,
      log_sessions,
      show_comment_window,
      custom_quicksupport_id,
      custom_quickjoin_id,
      license_key,
      sso_customer_id,
      tfa_enforced,
    });

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: updateUserInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});
