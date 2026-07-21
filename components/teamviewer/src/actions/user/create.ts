import { action } from "@prismatic-io/spectral";
import { createUserInputs } from "../../inputs/users";
import { createClient } from "../../client";
import { createUserExamplePayload } from "../../examplePayloads/users";
export const createUser = action({
  display: {
    label: "Create User",
    description: "Creates a user.",
  },
  perform: async (
    context,
    {
      connection,
      userRoleId,
      customQuickJoinId,
      customQuickSupportId,
      email,
      name,
      license,
      ssoCustomerId,
      additionalFields,
      password,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/users", {
      email,
      password,
      userRoleId,
      name,
      language: "english",
      subscribe_newsletter: additionalFields.subscribeNewsletter,
      log_sessions: additionalFields.logSessions,
      show_comment_window: additionalFields.showCommentWindow,
      custom_quicksupport_id: customQuickSupportId,
      custom_quickjoin_id: customQuickJoinId,
      license_key: license.licenseKey,
      meeting_license_key: license.meetingLicenseKey,
      sso_customer_id: ssoCustomerId,
      ignorePredefinedRole: additionalFields.ignorePredefinedRole,
    });
    return {
      data,
    };
  },
  inputs: createUserInputs,
  examplePayload: createUserExamplePayload,
});
