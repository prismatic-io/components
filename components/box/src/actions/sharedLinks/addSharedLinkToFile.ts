import { action, outputSchema } from "@prismatic-io/spectral";
import { createBoxHttpClient } from "../../client";
import { SHARED_LINK_FIELD } from "../../constants";
import { addSharedLinkToFileExamplePayload } from "../../examplePayloads";
import { addSharedLinkToFileInputs } from "../../inputs";
import { addSharedLinkToFileOutputSchema } from "../../outputSchemas";
import { sharedLinkVanityUrl } from "../../util";
export const addSharedLinkToFile = action({
  display: {
    label: "Add Shared Link to File",
    description: "Adds a shared link to a file.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const fileId = params.fileId;
    const sharedLink = params.fields;
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
    const body = {
      shared_link: {
        access: sharedLinkAccess,
        password: sharedLinkPassword,
        permissions: sharedLinkPermissions,
        vanity_name: sharedLinkVanityName,
      },
    };
    const { data } = await client.put(`/files/${fileId}`, body, {
      params: {
        sharedLink,
        fields: SHARED_LINK_FIELD,
      },
    });
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
      ...addSharedLinkToFileExamplePayload.data.shared_link.permissions,
      ...(sharedLinkPermissions as Record<string, unknown>),
    };
    return {
      data: {
        ...addSharedLinkToFileExamplePayload.data,
        id: fileId,
        shared_link: {
          ...addSharedLinkToFileExamplePayload.data.shared_link,
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
  inputs: addSharedLinkToFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addSharedLinkToFileOutputSchema,
  }),
  examplePayload: addSharedLinkToFileExamplePayload,
});
