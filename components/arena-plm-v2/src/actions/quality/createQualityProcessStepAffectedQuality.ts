import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createQualityProcessStepAffectedQualityExamplePayload } from "../../examplePayloads";
import { createQualityProcessStepAffectedQualityInputs } from "../../inputs";
import { qualityAffectedSchema } from "../../outputSchemas";
import type { QualityStepAffectedQualityCreateVo } from "../../types";
import { handleArenaError, toOptionalString } from "../../util";
export const createQualityProcessStepAffectedQuality = action({
  display: {
    label: "Create Quality Process Step Affected Quality",
    description:
      "Adds a Quality Affected Object in a step with a given GUID in a Quality Process with a given GUID from Arena PLM system.",
  },
  inputs: createQualityProcessStepAffectedQualityInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityAffectedSchema,
  }),
  examplePayload: createQualityProcessStepAffectedQualityExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: QualityStepAffectedQualityCreateVo = {
        guid: toOptionalString(params.guid),
        affected: {
          step: {
            guid: params.affectedStepGuid,
          },
        },
      };
      const { data } = await client.post(
        `/qualityprocesses/${params.qualityProcessGuid}/steps/${params.stepGuid}/affected`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Create Quality Process Step Affected Quality",
      );
    }
  },
});
