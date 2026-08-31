import { action, outputSchema } from "@prismatic-io/spectral";
import { createBoxHttpClient } from "../../client";
import { SHARED_LINK_FIELD } from "../../constants";
import { addSharedLinkToFolderExamplePayload } from "../../examplePayloads";
import { addSharedLinkToFolderInputs } from "../../inputs";
import { addSharedLinkToFolderOutputSchema } from "../../outputSchemas";
import { sharedLinkVanityUrl } from "../../util";
export const addSharedLinkToFolder = action({
  display: {
    label: "Add Shared Link to Folder",
    description: "Adds a shared link to a folder.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const folderId = params.folderId;
    const sharedLink = params.sharedLink;
    const sharedLinkAccess = params.sharedLinkAccess;
    const sharedLinkPassword = params.additionalFields.sharedLinkPassword
      ? params.additionalFields.sharedLinkPassword
      : null;
    const sharedLinkVanityName = params.additionalFields.sharedLinkVanityName
      ? params.additionalFields.sharedLinkVanityName
      : null;
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
      folderId,
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
      ...addSharedLinkToFolderExamplePayload.data.shared_link.permissions,
      ...(sharedLinkPermissions as Record<string, unknown>),
      can_edit: false,
    };
    return {
      data: {
        ...addSharedLinkToFolderExamplePayload.data,
        id: folderId,
        shared_link: {
          ...addSharedLinkToFolderExamplePayload.data.shared_link,
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
  inputs: addSharedLinkToFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addSharedLinkToFolderOutputSchema,
  }),
  examplePayload: addSharedLinkToFolderExamplePayload,
});
