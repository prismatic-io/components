import { action, outputSchema } from "@prismatic-io/spectral";
import type { files } from "dropbox";
import { createAuthorizedClient } from "../../auth";
import { getTemporaryLinkExamplePayload } from "../../examplePayloads";
import { getTemporaryLinkInputs } from "../../inputs";
import { getTemporaryLinkOutputSchema } from "../../outputSchemas";
import { checkDebug, handleDropboxError, validatePath } from "../../util";
export const getTemporaryLink = action({
  display: {
    label: "Get Temporary Link",
    description: "Get a temporary link to stream content of a file.",
  },
  performSafety: "safe",
  perform: async (context, { dropboxConnection, path, teamMemberId }) => {
    checkDebug(
      {
        dropboxConnection,
        path,
        teamMemberId,
      },
      context,
    );
    const dbx = createAuthorizedClient(
      dropboxConnection,
      teamMemberId ? "user" : undefined,
      teamMemberId,
    );
    validatePath(path);
    try {
      const getTemporaryLinkArg: files.GetTemporaryLinkArg = {
        path,
      };
      const result = await dbx.filesGetTemporaryLink(getTemporaryLinkArg);
      return {
        data: result,
      };
    } catch (err) {
      handleDropboxError(err, [path]);
    }
  },
  inputs: getTemporaryLinkInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTemporaryLinkOutputSchema,
  }),
  examplePayload: { data: getTemporaryLinkExamplePayload },
});
