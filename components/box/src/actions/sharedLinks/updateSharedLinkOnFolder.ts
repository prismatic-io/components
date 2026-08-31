import { action, outputSchema } from "@prismatic-io/spectral";
import { createBoxHttpClient } from "../../client";
import { SHARED_LINK_FIELD } from "../../constants";
import { updateSharedLinkOnFolderExamplePayload } from "../../examplePayloads";
import { updateSharedLinkOnFolderInputs } from "../../inputs";
import { updateSharedLinkOnFolderOutputSchema } from "../../outputSchemas";
import { sharedLinkVanityUrl } from "../../util";
export const updateSharedLinkOnFolder = action({
  display: {
    label: "Update Shared Link on Folder",
    description: "Updates a shared link on a folder.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const folderId = params.folderId;
    const sharedLink = params.sharedLink;
    const sharedLinkAccess = params.sharedLinkAccess;
    const sharedLinkPassword =
      params.additionalFields.sharedLinkPassword || null;
    const sharedLinkVanityName =
      params.additionalFields.sharedLinkVanityName || null;
    let sharedLinkPermissions =
      params.additionalFields.sharedLinkPermissions || {};
    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );
    sharedLinkPermissions = {
      ...sharedLinkPermissions,
      can_edit: false,
    };
    const { data } = await client.put(
      `/folders/${folderId}`,
      {
        shared_link: {
          url: sharedLink,
          access: sharedLinkAccess,
          password: sharedLinkPassword,
          permissions: sharedLinkPermissions,
          vanity_name: sharedLinkVanityName,
        },
      },
      {
        params: {
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
      folderId,
      sharedLink,
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
      ...updateSharedLinkOnFolderExamplePayload.data.shared_link.permissions,
      ...(sharedLinkPermissions as Record<string, unknown>),
      can_edit: false,
    };
    return {
      data: {
        ...updateSharedLinkOnFolderExamplePayload.data,
        id: folderId,
        shared_link: {
          ...updateSharedLinkOnFolderExamplePayload.data.shared_link,
          url: sharedLink,
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
  inputs: updateSharedLinkOnFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateSharedLinkOnFolderOutputSchema,
  }),
  examplePayload: updateSharedLinkOnFolderExamplePayload,
});
