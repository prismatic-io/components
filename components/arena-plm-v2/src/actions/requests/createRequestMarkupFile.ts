import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createRequestMarkupFileExamplePayload } from "../../examplePayloads";
import { createRequestMarkupFileInputs } from "../../inputs";
import { requestMarkupSchema } from "../../outputSchemas";
import type { RequestMarkupCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const createRequestMarkupFile = action({
  display: {
    label: "Create Request Markup File",
    description: "Create a markup file for a request in Arena PLM system.",
  },
  inputs: createRequestMarkupFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requestMarkupSchema,
  }),
  examplePayload: createRequestMarkupFileExamplePayload,
  perform: async (context, { connection, requestGuid, markupGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const requestPayload: RequestMarkupCreateVo = {
        markup: { guid: markupGuid },
      };
      context.logger.info(
        `Creating markup file ${markupGuid} for request ${requestGuid}`,
      );
      const { data } = await client.post(
        `/requests/${requestGuid}/markupfiles`,
        requestPayload,
      );
      context.logger.info(
        `Successfully created markup file for request: ${data?.guid || "N/A"}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create Request Markup File");
    }
  },
});
