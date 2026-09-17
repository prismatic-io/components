import { type ActionContext, util } from "@prismatic-io/spectral";
import { LIST_CHANGES_STATE_KEY_PREFIX } from "../constants";
import type { ResolvedListChangesPageToken } from "../types";
export const getListChangesNewStateKey = (context: ActionContext): string =>
  `${LIST_CHANGES_STATE_KEY_PREFIX}:${context.flow.stableId}:${context.stepId}`;
export const getListChangesLegacyStateKey = (context: ActionContext): string =>
  context.stepId;
export const resolveListChangesPageToken = (
  context: ActionContext,
): ResolvedListChangesPageToken => {
  const fromNew = util.types.toString(
    context.crossFlowState[getListChangesNewStateKey(context)],
  );
  if (fromNew) {
    return { value: fromNew, isLegacy: false };
  }
  const fromLegacy = util.types.toString(
    context.instanceState[getListChangesLegacyStateKey(context)],
  );
  if (fromLegacy) {
    return { value: fromLegacy, isLegacy: true };
  }
  return { value: "", isLegacy: false };
};
