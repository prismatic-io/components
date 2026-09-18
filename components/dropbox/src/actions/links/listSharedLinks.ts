import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { listSharedLinksExamplePayload } from "../../examplePayloads";
import { listSharedLinksInputs } from "../../inputs";
import { listSharedLinksOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  fetchAllSharedLinks,
  handleDropboxError,
} from "../../util";
export const listSharedLinks = action({
  display: {
    label: "List Shared Links",
    description: "List shared links at the specified path.",
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
      const data = await fetchAllSharedLinks(dbx, {
        path: params.path,
        direct_only: params.direct_only,
        fetchAll: params.fetchAll,
        cursor: params.cursor,
      });
      return { data };
    } catch (err) {
      handleDropboxError(err, [params.path]);
    }
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listSharedLinksExamplePayload,
  }),
  inputs: listSharedLinksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSharedLinksOutputSchema,
  }),
  examplePayload: {
    data: listSharedLinksExamplePayload,
  },
});
