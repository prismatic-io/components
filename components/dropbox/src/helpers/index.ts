import type { ActionContext } from "@prismatic-io/spectral";
import { LIST_CHANGES_CURSOR_STATE_KEY_PREFIX } from "../constants";
import type { CursorData, ResolvedCursorState } from "../interfaces";
import { getBase64FromUrl } from "../util";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getStepName = (context: ActionContext): string =>
  (context.executionFrame as { stepName: string }).stepName;

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
