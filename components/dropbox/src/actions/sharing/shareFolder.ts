import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { shareFolderExamplePayload } from "../../examplePayloads";
import { shareFolderInputs } from "../../inputs";
import { shareFolderOutputSchema } from "../../outputSchemas";
import { checkDebug, handleDropboxError, pathBasename } from "../../util";
export const shareFolder = action({
  display: {
    label: "Share Folder",
    description:
      "Share a folder with collaborators. Most sharing will be completed synchronously. Large folders will be completed asynchronously.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    checkDebug(params, context);
    const dbx = createAuthorizedClient(
      params.dropboxConnection,
      params.userType,
      params.teamMemberId,
    );
    try {
      const data = await dbx.sharingShareFolder({
        path: params.path,
        force_async: params.force_async,
        access_inheritance: params.sharingPolicies.access_inheritance as any,
        acl_update_policy: params.sharingPolicies.acl_update_policy as any,
        member_policy: params.sharingPolicies.member_policy as any,
        shared_link_policy: params.sharingPolicies.shared_link_policy as any,
        viewer_info_policy: params.sharingPolicies.viewer_info_policy as any,
        actions: params.actions as any,
      });
      return {
        data,
      };
    } catch (err) {
      handleDropboxError(err, [params.path]);
    }
  },
  examplePerform: async (
    _context,
    { path },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...shareFolderExamplePayload,
      result: {
        ...shareFolderExamplePayload.result,
        name: pathBasename(path),
        path_lower: path.toLowerCase(),
      },
    },
  }),
  inputs: shareFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: shareFolderOutputSchema,
  }),
  examplePayload: {
    data: shareFolderExamplePayload,
  },
});
