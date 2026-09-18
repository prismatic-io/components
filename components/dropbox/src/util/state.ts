import type { ActionContext } from "@prismatic-io/spectral";
import {
  LIST_CHANGES_CURSOR_STATE_KEY_PREFIX,
  SYNC_CHANGES_CURSOR_STATE_KEY_PREFIX,
} from "../constants";
import type {
  CursorData,
  ResolvedCursorState,
  SyncCursor,
  SyncSettings,
} from "../types";
import { getBase64FromUrl } from "./encoding";
const getStepName = (context: ActionContext): string =>
  (
    context.executionFrame as {
      stepName: string;
    }
  ).stepName;
export const getNewStateKey = (context: ActionContext): string =>
  `${LIST_CHANGES_CURSOR_STATE_KEY_PREFIX}:${context.flow.stableId}:${getStepName(context)}`;
export const getLegacyStateKey = (context: ActionContext): string => {
  const encodedId = getBase64FromUrl(context.webhookUrls[context.flow.name]);
  return `${getStepName(context)}_${encodedId}`;
};
export const resolveCursorState = (
  context: ActionContext,
): ResolvedCursorState => {
  const fromNew = context.crossFlowState[getNewStateKey(context)] as
    | CursorData
    | undefined;
  if (fromNew) {
    return { value: fromNew, isLegacy: false };
  }
  const fromLegacy = context.instanceState[getLegacyStateKey(context)] as
    | CursorData
    | undefined;
  if (fromLegacy) {
    return { value: fromLegacy, isLegacy: true };
  }
  return { value: undefined, isLegacy: false };
};
export const resolveListChangesCursor = (
  context: ActionContext,
  settings: SyncSettings,
): ResolvedCursorState & {
  key: string;
} => {
  const { value, isLegacy } = resolveCursorState(context);
  const matchesSettings =
    value !== undefined &&
    value.path === settings.path &&
    value.recursive === settings.recursive &&
    value.includeDeleted === settings.includeDeleted;
  return {
    value: matchesSettings ? value : undefined,
    isLegacy,
    key: getNewStateKey(context),
  };
};
export const getSyncCursorStateKey = (context: ActionContext): string =>
  `${SYNC_CHANGES_CURSOR_STATE_KEY_PREFIX}:${context.flow.stableId}`;
export const resolveSyncCursor = (
  context: ActionContext,
  settings: SyncSettings,
): SyncCursor | undefined => {
  const stored = context.crossFlowState[getSyncCursorStateKey(context)] as
    | SyncCursor
    | undefined;
  if (!stored) {
    return undefined;
  }
  const matchesSettings =
    stored.path === settings.path &&
    stored.recursive === settings.recursive &&
    stored.includeDeleted === settings.includeDeleted;
  return matchesSettings ? stored : undefined;
};
