import { action, outputSchema } from "@prismatic-io/spectral";
import isEqual from "lodash.isequal";
import { createAuthorizedClient } from "../../auth";
import { MAX_LIST_FOLDER_LIMIT } from "../../constants";
import { listChangesExamplePayload } from "../../examplePayloads";
import { listChangesInputs } from "../../inputs";
import { listChangesOutputSchema } from "../../outputSchemas";
import type { CursorData, ListChangesResult } from "../../types";
import {
  checkDebug,
  getLegacyStateKey,
  getNewStateKey,
  resolveCursorState,
} from "../../util";
export const listChanges = action({
  display: {
    label: "List Changes",
    description:
      "List changes that have been made to files in this folder since the last time this action was run.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const dbx = createAuthorizedClient(
      params.dropboxConnection,
      params.userType,
      params.teamMemberId,
    );
    const { value: cursorData, isLegacy } = resolveCursorState(context);
    const legacyCleanup = isLegacy
      ? { instanceState: { [getLegacyStateKey(context)]: null } }
      : {};
    const newStateKey = getNewStateKey(context);
    checkDebug(params, context);
    if (
      cursorData &&
      isEqual(
        {
          path: cursorData.path,
          recursive: cursorData.recursive,
          includeDeleted: cursorData.includeDeleted,
        },
        {
          path: params.directoryPath,
          recursive: params.recursive,
          includeDeleted: params.includeDeleted,
        },
      )
    ) {
      const response = await dbx.filesListFolderContinue({
        cursor: cursorData.cursor,
      });
      const newCursorData: CursorData = {
        cursor: response.result.cursor,
        path: params.directoryPath,
        recursive: params.recursive,
        includeDeleted: params.includeDeleted,
      };
      return {
        data: response.result as ListChangesResult,
        crossFlowState: { [newStateKey]: newCursorData },
        ...legacyCleanup,
      };
    }
    const response = await dbx.filesListFolderGetLatestCursor({
      path: params.directoryPath,
      recursive: params.recursive,
      include_deleted: params.includeDeleted,
      limit: MAX_LIST_FOLDER_LIMIT,
    });
    context.logger.info(
      "First time running, or settings have changed. Subsequent runs will show changes that occurred since the previous run.",
    );
    const newCursorData: CursorData = {
      cursor: response.result.cursor,
      path: params.directoryPath,
      recursive: params.recursive,
      includeDeleted: params.includeDeleted,
    };
    return {
      data: {
        entries: [],
        cursor: response.result.cursor,
        has_more: false,
      },
      crossFlowState: { [newStateKey]: newCursorData },
      ...legacyCleanup,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
    crossFlowState: Record<string, unknown>;
  }> => ({
    data: listChangesExamplePayload,
    crossFlowState: {},
  }),
  inputs: listChangesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangesOutputSchema,
  }),
  examplePayload: {
    data: listChangesExamplePayload,
    crossFlowState: {},
  },
});
