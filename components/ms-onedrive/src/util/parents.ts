import { type ActionLogger, util } from "@prismatic-io/spectral";
import { SKIPPABLE_PARENT_STATUSES } from "../constants";
import type { ParentRef } from "../types";
import { nameOrId } from "./elements";

export const listForParent = async <T>(
  parent: ParentRef,
  options: { kind: string; canSkip: boolean; logger: ActionLogger },
  list: () => Promise<T[]>,
): Promise<T[]> => {
  try {
    return await list();
  } catch (error) {
    const status = (error as { response?: { status?: unknown } } | undefined)
      ?.response?.status;
    if (
      options.canSkip &&
      util.types.isNumber(status) &&
      SKIPPABLE_PARENT_STATUSES.includes(util.types.toNumber(status))
    ) {
      options.logger.warn(
        `Skipped ${options.kind} ${nameOrId(parent.label, parent.id)}: Microsoft Graph answered ${status}.`,
      );
      return [];
    }
    throw error;
  }
};
