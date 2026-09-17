import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CHANGE_LIST_KIND, CHANGES_PAGE_SIZE } from "../../constants";
import { listChangesExamplePayload } from "../../examplePayloads";
import { listChangesInputs } from "../../inputs";
import { listChangesOutputSchema } from "../../outputSchemas";
import {
  getDriveQueryParams,
  getListChangesLegacyStateKey,
  getListChangesNewStateKey,
  resolveListChangesPageToken,
} from "../../util";
export const listChanges = action({
  display: {
    label: "List Changes",
    description:
      "List changes made to files in Google Drive since the last time this step ran (up to 1000)",
  },
  inputs: listChangesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection);
    const { value: pageToken, isLegacy } = resolveListChangesPageToken(context);
    const newStateKey = getListChangesNewStateKey(context);
    const legacyCleanup = isLegacy
      ? { instanceState: { [getListChangesLegacyStateKey(context)]: null } }
      : {};
    if (pageToken) {
      const { data } = await client.changes.list({
        pageSize: CHANGES_PAGE_SIZE,
        pageToken,
        ...getDriveQueryParams(params.driveId),
      });
      return {
        data,
        crossFlowState: { [newStateKey]: data.newStartPageToken },
        ...legacyCleanup,
      };
    }
    const {
      data: { startPageToken },
    } = await client.changes.getStartPageToken(
      getDriveQueryParams(params.driveId),
    );
    context.logger.info(
      "First time running. Subsequent runs will show changes that occurred since the previous run.",
    );
    return {
      data: {
        kind: CHANGE_LIST_KIND,
        newStartPageToken: startPageToken,
        changes: [],
      },
      crossFlowState: { [newStateKey]: startPageToken },
      ...legacyCleanup,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
    crossFlowState?: Record<string, unknown>;
    instanceState?: Record<string, unknown>;
  }> => ({
    data: listChangesExamplePayload.data,
  }),
  examplePayload: listChangesExamplePayload,
});
