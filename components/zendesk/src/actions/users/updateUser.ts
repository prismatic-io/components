import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { updateUserExamplePayload } from "../../examplePayloads";
import { updateUserInputs } from "../../inputs";
import { updateUserOutputSchema } from "../../outputSchemas";
import { isRole } from "../../util";
export const updateUser = action({
  display: {
    label: "Update User",
    description: "Update a user by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    const userRoleString = params.accountSettings.userRole;
    const { result } = await client.users.update(
      util.types.toInt(params.userId),
      {
        user: {
          name: params.contactInfo.userName,
          email: params.contactInfo.userEmail,
          phone: params.contactInfo.userPhone,
          external_id: params.externalId,
          notes: params.profileDetails.userNotes,
          details: params.profileDetails.userDetails,
          moderator: params.accountSettings.isModerator,
          alias: params.profileDetails.userAlias,
          role: isRole(userRoleString) ? userRoleString : undefined,
          time_zone: params.profileDetails.userTimeZone,
          verified: params.accountSettings.isVerified,
          organization_id: params.organizationId,
        },
      },
    );
    return {
      data: result,
    };
  },
  examplePerform: async (
    _context,
    params,
  ): Promise<{
    data: unknown;
  }> => {
    const { userRole: role } = params.accountSettings;
    const {
      userName: name,
      userEmail: email,
      userPhone: phone,
    } = params.contactInfo;
    const { userAlias: alias } = params.profileDetails;
    const organizationId = params.organizationId;
    return {
      data: {
        ...updateUserExamplePayload.data,
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
        ...(alias ? { alias } : {}),
        ...(isRole(role) ? { role } : {}),
        ...(organizationId ? { organization_id: organizationId } : {}),
        ...(params.accountSettings.isVerified === undefined
          ? {}
          : { verified: params.accountSettings.isVerified }),
      },
    };
  },
  inputs: updateUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateUserOutputSchema,
  }),
  examplePayload: updateUserExamplePayload,
});
