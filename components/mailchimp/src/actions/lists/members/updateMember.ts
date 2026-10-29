import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  listId,
  subscriberHash,
  email,
  language,
  status,
  emailType,
  mergeFields,
  interests,
  vip,
  connectionInput,
  skipMerged,
  marketingPermissionsArray,
} from "../../../inputs";

export const updateMember = action({
  display: {
    label: "Update Member",
    description: "Update a specific member in a given list",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    let marketingPermissions = [];
    if (params.marketingPermissionsArray) {
      try {
        marketingPermissions = JSON.parse(params.marketingPermissionsArray);
      } catch (error) {
        throw new Error(`Error parsing marketing permissions array: ${error}`);
      }
    }
    const { data } = await client.patch(
      `/lists/${params.listId}/members/
        ${params.subscriberHash}`,
      {
        ...(params.email && { email_address: params.email }),
        ...(params.emailType && { email_type: params.emailType }),
        ...(params.status && { status: params.status }),
        ...(Object.keys(params.mergeFields).length > 0 && {
          merge_fields: params.mergeFields,
        }),
        ...(Object.keys(params.interests).length > 0 && {
          interests: params.interests,
        }),
        ...(params.language && { language: params.language }),
        vip: params.vip,
        ...(marketingPermissions.length > 0 && {
          marketing_permissions: marketingPermissions,
        }),
      },
      {
        params: { skip_merge_validation: params.skipMerged },
      },
    );
    return { data };
  },
  inputs: {
    skipMerged,
    listId,
    subscriberHash,
    email: { ...email, required: false },
    language: { ...language, required: false },
    status: { ...status, required: false },
    emailType,
    mergeFields,
    interests,
    vip,
    marketingPermissionsArray,
    connection: connectionInput,
  },
});

export default updateMember;
