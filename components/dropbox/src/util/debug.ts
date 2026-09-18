import type { ActionContext } from "@prismatic-io/spectral";
export const checkDebug = (params: unknown, context: ActionContext): void => {
  if (context.debug.enabled) {
    context.logger.debug("Params", params);
  }
};
