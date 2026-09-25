import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { createUserExamplePayload } from "../../examplePayloads";
import { createUserInputs } from "../../inputs";
import { createUserOutputSchema } from "../../outputSchemas";
import { isRole } from "../../util";
export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    const { userRole } = params.accountSettings;
    const optionalItems = Object.fromEntries(
      Object.entries({
        email: params.userEmail,
        phone: params.userPhone,
        external_id: params.externalId,
        notes: params.profileDetails.userNotes,
        details: params.profileDetails.userDetails,
        moderator: params.accountSettings.isModerator,
        alias: params.profileDetails.userAlias,
        verified: params.accountSettings.isVerified,
        organization_id: params.organizationId,
      }).filter(([, value]) => Boolean(value)),
    );
    const { result } = await client.users.create({
      user: {
        ...optionalItems,
        ...(isRole(userRole) ? { userRole } : {}),
        name: params.userName,
      },
    });
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
    const name = params.userName;
    const email = params.userEmail;
    const phone = params.userPhone;
    const { userAlias: alias } = params.profileDetails;
    const { isVerified: verified } = params.accountSettings;
    const organizationId = params.organizationId;
    return {
      data: {
        ...createUserExamplePayload.data,
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
        ...(alias ? { alias } : {}),
        ...(verified ? { verified } : {}),
        ...(organizationId ? { organization_id: organizationId } : {}),
      },
    };
  },
  inputs: createUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createUserOutputSchema,
  }),
  examplePayload: createUserExamplePayload,
});
