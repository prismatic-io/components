import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateRequestExamplePayload } from "../../examplePayloads";
import { updateRequestInputs } from "../../inputs";
import { requestShortSchema } from "../../outputSchemas";
import type { RequestUpdateVo } from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const updateRequest = action({
  display: {
    label: "Update Request",
    description: "Update an existing request in Arena PLM system.",
  },
  inputs: updateRequestInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requestShortSchema,
  }),
  examplePayload: updateRequestExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: RequestUpdateVo = {
        title: params.title,
        problem: params.problem,
        requestedAction: params.requestedAction,
        category: params.categoryGuid
          ? { guid: params.categoryGuid }
          : undefined,
        numberSequencePrefix: params.numberSequencePrefix
          ? { value: params.numberSequencePrefix }
          : undefined,
        requestCode: params.requestCode,
        supplierVisibility: params.supplierVisibility,
        additionalAttributes: resolveAdditionalAttributes(params, context),
      };
      context.logger.info(`Updating request with GUID: ${params.requestGuid}`);
      const { data } = await client.put(
        `/requests/${params.requestGuid}`,
        requestPayload,
      );
      context.logger.info(
        `Successfully updated request: ${params.requestGuid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Update Request");
    }
  },
});
