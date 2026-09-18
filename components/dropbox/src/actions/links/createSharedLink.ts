import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { createSharedLinkExamplePayload } from "../../examplePayloads";
import { createSharedLinkInputs, shared_folder_id } from "../../inputs";
import { createSharedLinkOutputSchema } from "../../outputSchemas";
import { checkDebug, handleDropboxError, pathBasename } from "../../util";
export const createSharedLink = action({
  display: {
    label: "Create Shared Link",
    description:
      "Create a shared link with custom settings. If no settings are given then the default visibility is RequestedVisibility.public (The resolved visibility, though, may depend on other aspects such as team and shared folder settings).",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { dropboxConnection, teamMemberId, userType, path, audience, linkSettings },
  ) => {
    checkDebug(
      {
        dropboxConnection,
        teamMemberId,
        userType,
        path,
        audience,
        linkSettings,
      },
      context,
    );
    const dbx = createAuthorizedClient(
      dropboxConnection,
      userType,
      teamMemberId,
    );
    try {
      const result = await dbx.sharingCreateSharedLinkWithSettings({
        path,
        settings: {
          access: (linkSettings.access as any) || undefined,
          allow_download: linkSettings.allow_download || undefined,
          audience: (audience as any) || undefined,
          expires: linkSettings.expires || undefined,
          link_password: linkSettings.link_password || undefined,
          require_password: linkSettings.require_password || undefined,
        },
      });
      return {
        data: result,
      };
    } catch (err) {
      handleDropboxError(err, [shared_folder_id]);
    }
  },
  examplePerform: async (
    _context,
    { path },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createSharedLinkExamplePayload,
      result: {
        ...createSharedLinkExamplePayload.result,
        name: pathBasename(path),
        path_lower: path.toLowerCase(),
      },
    },
  }),
  inputs: createSharedLinkInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createSharedLinkOutputSchema,
  }),
  examplePayload: {
    data: createSharedLinkExamplePayload,
  },
});
