import { action, outputSchema } from "@prismatic-io/spectral";
import { createBoxHttpClient } from "../../client";
import { SHARED_LINK_FIELD } from "../../constants";
import { updateSharedLinkToFileExamplePayload } from "../../examplePayloads";
import { updateSharedLinkToFileInputs } from "../../inputs";
import { updateSharedLinkToFileOutputSchema } from "../../outputSchemas";
import { sharedLinkVanityUrl } from "../../util";
export const updateSharedLinkToFile = action({
  display: {
    label: "Update Shared Link on File",
    description: "Updates a shared link on a file.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const fileId = params.fileId;
    const sharedLink = params.sharedLink;
    const sharedLinkAccess = params.sharedLinkAccess;
    const sharedLinkPassword =
      params.additionalFields.sharedLinkPassword || null;
    const sharedLinkVanityName =
      params.additionalFields.sharedLinkVanityName || null;
    const sharedLinkPermissions =
      params.additionalFields.sharedLinkPermissions || {};
    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/files/${fileId}`,
      {
        shared_link: {
          access: sharedLinkAccess,
          password: sharedLinkPassword,
          permissions: sharedLinkPermissions,
          vanity_name: sharedLinkVanityName,
        },
      },
      {
        params: {
          sharedLink,
          fields: SHARED_LINK_FIELD,
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    {
      fileId,
      sharedLinkAccess,
      additionalFields: {
        sharedLinkPassword,
        sharedLinkPermissions,
        sharedLinkVanityName,
      },
    },
  ): Promise<{
    data: unknown;
  }> => {
    const permissions = {
      ...updateSharedLinkToFileExamplePayload.data.shared_link.permissions,
      ...(sharedLinkPermissions as Record<string, unknown>),
    };
    return {
      data: {
        ...updateSharedLinkToFileExamplePayload.data,
        id: fileId,
        shared_link: {
          ...updateSharedLinkToFileExamplePayload.data.shared_link,
          access: sharedLinkAccess,
          effective_access: sharedLinkAccess,
          effective_permission: permissions.can_download
            ? "can_download"
            : "can_preview",
          is_password_enabled: Boolean(sharedLinkPassword),
          permissions,
          vanity_url: sharedLinkVanityUrl(sharedLinkVanityName),
        },
      },
    };
  },
  inputs: updateSharedLinkToFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateSharedLinkToFileOutputSchema,
  }),
  examplePayload: updateSharedLinkToFileExamplePayload,
});
