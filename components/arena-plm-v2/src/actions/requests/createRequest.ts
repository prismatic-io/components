import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createRequestExamplePayload } from "../../examplePayloads";
import { createRequestInputs } from "../../inputs";
import { requestShortSchema } from "../../outputSchemas";
import type { RequestCreateVo } from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const createRequest = action({
  display: {
    label: "Create Request",
    description: "Create a new request in Arena PLM system.",
  },
  inputs: createRequestInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requestShortSchema,
  }),
  examplePayload: createRequestExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: RequestCreateVo = {
        title: params.title,
        problem: params.problem,
        requestedAction: params.requestedAction,
        category: params.categoryGuid
          ? { guid: params.categoryGuid }
          : undefined,
        numberSequencePrefix: params.numberSequencePrefix
          ? { value: params.numberSequencePrefix }
          : undefined,
        evaluatorGroup: params.evaluatorGroupGuid
          ? { guid: params.evaluatorGroupGuid }
          : undefined,
        requestCode: params.requestCode,
        creatorParticipation: params.creatorParticipation,
        supplierVisibility: params.supplierVisibility,
        additionalAttributes: resolveAdditionalAttributes(params, context),
      };
      context.logger.info("Creating new request in Arena");
      const { data } = await client.post("/requests", requestPayload);
      context.logger.info(
        `Successfully created request with GUID: ${data?.guid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create Request");
    }
  },
});
