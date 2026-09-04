import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createQualityProcessStepAffectedUrlExamplePayload } from "../../examplePayloads";
import { createQualityProcessStepAffectedUrlInputs } from "../../inputs";
import { qualityAffectedSchema } from "../../outputSchemas";
import type { QualityStepAffectedUrlCreateVo } from "../../types";
import { handleArenaError, toOptionalString } from "../../util";
export const createQualityProcessStepAffectedUrl = action({
  display: {
    label: "Create Quality Process Step Affected URL",
    description:
      "Adds a URL Affected Object in a step with a given GUID in a Quality Process with a given GUID from Arena PLM system.",
  },
  inputs: createQualityProcessStepAffectedUrlInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityAffectedSchema,
  }),
  examplePayload: createQualityProcessStepAffectedUrlExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: QualityStepAffectedUrlCreateVo = {
        guid: toOptionalString(params.guid),
        affected: {
          link: params.link,
          display: toOptionalString(params.display),
          description: toOptionalString(params.description),
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
        "Create Quality Process Step Affected URL",
      );
    }
  },
});
