import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createQualityProcessExamplePayload } from "../../examplePayloads";
import { createQualityProcessInputs } from "../../inputs";
import { qualityProcessSchema } from "../../outputSchemas";
import type { QualityProcessCreateVo } from "../../types";
import { handleArenaError, toOptionalString } from "../../util";
export const createQualityProcess = action({
  display: {
    label: "Create Quality Process",
    description: "Create a new Quality Process in Arena PLM system.",
  },
  inputs: createQualityProcessInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityProcessSchema,
  }),
  examplePayload: createQualityProcessExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: QualityProcessCreateVo = {
        name: toOptionalString(params.name),
        description: toOptionalString(params.description),
        targetCompletionDateTime: toOptionalString(
          params.targetCompletionDateTime,
        ),
        type: toOptionalString(params.type),
        owner: params.ownerGuid ? { guid: params.ownerGuid } : undefined,
        template: params.templateGuid
          ? {
              guid: params.templateGuid,
              numberFormat: params.numberFormatPrefixGuid
                ? { prefix: { guid: params.numberFormatPrefixGuid } }
                : undefined,
            }
          : undefined,
      };
      const { data } = await client.post("/qualityprocesses", requestPayload);
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Quality Process");
    }
  },
});
