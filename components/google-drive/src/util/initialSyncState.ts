import { type ActionContext, util } from "@prismatic-io/spectral";
import {
  ACTIVITY_SYNC_HANDOFF_KEY_PREFIX,
  INITIAL_SYNC_COMPLETED_KEY_PREFIX,
} from "../constants";
export const getActivitySyncHandoffKey = (context: ActionContext): string =>
  `${ACTIVITY_SYNC_HANDOFF_KEY_PREFIX}:${context.flow.stableId}:${context.stepId}`;
export const resolveActivitySyncHandoff = (context: ActionContext): string =>
  util.types.toString(
    context.instanceState?.[getActivitySyncHandoffKey(context)],
  );
export const getInitialSyncCompletedKey = (context: ActionContext): string =>
  `${INITIAL_SYNC_COMPLETED_KEY_PREFIX}:${context.flow.stableId}:${context.stepId}`;
export const isInitialSyncCompleted = (context: ActionContext): boolean =>
  Boolean(context.instanceState?.[getInitialSyncCompletedKey(context)]);
