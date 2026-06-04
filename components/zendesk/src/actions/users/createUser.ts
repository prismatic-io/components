import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import {
  userRole,
  userName,
  userEmail,
  userExternalIdInput,
  userPhone,
  userNotes,
  userDetails,
  isModerator,
  userAlias,
  isVerified,
  organizationId,
  connectionInput,
} from "../../inputs";
import { isRole } from "../../helper";
import { createUserPayload } from "../../examplePayloads";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    const userRole = util.types.toString(params.userRole);
    const optionalItems = Object.fromEntries(
      Object.entries({
        email: util.types.toString(params.userEmail),
        phone: util.types.toString(params.userPhone),
        external_id: util.types.toString(params.externalId) || undefined,
        notes: util.types.toString(params.userNotes),
        details: util.types.toString(params.userDetails),
        moderator: util.types.toBool(params.isModerator),
        alias: util.types.toString(params.userAlias),
        verified: util.types.toBool(params.isVerified),
        organization_id: util.types.toInt(params.organizationId),
      }).filter(([, value]) => Boolean(value)),
    );

    const { result } = await client.users.create({
      user: {
        ...optionalItems,
        ...(isRole(userRole) ? { userRole } : {}),
        name: util.types.toString(params.userName),
      },
    });

    return {
      data: result,
    };
  },
  inputs: {
    userName,
    userEmail,
    userRole,
    userPhone,
    externalId: userExternalIdInput,
    userNotes,
    userDetails,
    isModerator,
    userAlias,
    isVerified,
    organizationId,
    zendeskConnection: connectionInput,
  },
  examplePayload: {
    data: createUserPayload as unknown,
  },
});
