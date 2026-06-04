import type { ActionContext } from "@prismatic-io/spectral";

export const warnDeprecatedInputs = (
  context: ActionContext,
  actionName: string,
  includeAll: boolean | undefined,
): void => {
  if (!includeAll) return;
  context.logger.warn(
    `[smartsheet] \`${actionName}\`: includeAll input is DEPRECATED and ignored. ` +
      `Smartsheet sunsets offset pagination on 2026-06-03. ` +
      `This action now returns all items via the migrated pagination strategy.`,
  );
};
