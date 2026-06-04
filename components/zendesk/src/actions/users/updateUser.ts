import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import {
  connectionInput,
  isModerator,
  isVerified,
  organizationId,
  userAlias,
  userDetails,
  userEmail,
  userExternalIdInput,
  userId,
  userName,
  userNotes,
  userPhone,
  userRole,
  userTimeZone,
} from "../../inputs";
import { isRole } from "../../helper";
import { convertBooleanInputIntoUpdateInput } from "../../util";
import { updateUserPayload } from "../../examplePayloads";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Update a user by ID.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    const userRoleString = util.types.toString(params.userRole);

    const { result } = await client.users.update(
      util.types.toInt(params.userId),
      {
        user: {
          name: util.types.toString(params.userName) || undefined,
          email: util.types.toString(params.userEmail) || undefined,
          phone: util.types.toString(params.userPhone) || undefined,
          external_id: util.types.toString(params.externalId) || undefined,
          notes: util.types.toString(params.userNotes) || undefined,
          details: util.types.toString(params.userDetails) || undefined,
          moderator: params.isModerator,
          alias: util.types.toString(params.userAlias) || undefined,
          role: isRole(userRoleString) ? userRoleString : undefined,
          time_zone: util.types.toString(params.userTimeZone) || undefined,
          verified: params.isVerified,
          organization_id: util.types.toInt(params.organizationId) || undefined,
        },
      },
    );

    return {
      data: result,
    };
  },
  inputs: {
    userId: { ...userId, required: true },
    userRole,
    userName: { ...userName, required: false },
    userEmail: { ...userEmail, required: false },
    userPhone,
    externalId: userExternalIdInput,
    userNotes,
    userDetails,
    isModerator: convertBooleanInputIntoUpdateInput(isModerator),
    userAlias,
    userTimeZone,
    isVerified: convertBooleanInputIntoUpdateInput(isVerified),
    organizationId,
    zendeskConnection: connectionInput,
  },
  examplePayload: {
    data: updateUserPayload as unknown,
  },
});
