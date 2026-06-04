import { action } from "@prismatic-io/spectral";
import isEqual from "lodash.isequal";
import { createAuthorizedClient } from "../auth";
import { listChangesExamplePayload } from "../example-payloads";
import {
  getLegacyStateKey,
  getNewStateKey,
  resolveCursorState,
} from "../helpers";
import {
  connectionInput,
  directoryPath,
  includeDeleted,
  recursive,
  teamMemberId,
  userType,
} from "../inputs";
import type { CursorData, ListChangesResult } from "../interfaces";
import { checkDebug } from "../util";

export const listChanges = action({
  display: {
    label: "List Changes",
    description:
      "List changes that have been made to files in this folder since the last time this action was run.",
  },
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
      limit: 2000,
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
  inputs: {
    dropboxConnection: connectionInput,
    directoryPath,
    recursive,
    includeDeleted,
    userType,
    teamMemberId,
  },
  examplePayload: {
    data: listChangesExamplePayload,
    crossFlowState: {},
  },
});
