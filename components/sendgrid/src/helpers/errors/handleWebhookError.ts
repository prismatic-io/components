import type { ActionLogger } from "@prismatic-io/spectral";
import type { SendGridError } from "../../types";

export const handleWebhookError = (
  e: unknown,
  operation: string,
  logger: ActionLogger,
): never => {
  const error = e as SendGridError;
  const errorMessage = `Failed to ${operation}: ${error.message}`;

  logger.error(errorMessage);

  if (error.response?.body?.errors) {
    logger.error(
      error.response.body.errors.map((err) => err.message).join(", "),
    );
  }

  throw new Error(`${errorMessage}: ${JSON.stringify(e)}`);
};
