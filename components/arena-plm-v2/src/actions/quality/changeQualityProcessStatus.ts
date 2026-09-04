import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { changeQualityProcessStatusExamplePayload } from "../../examplePayloads";
import { changeQualityProcessStatusInputs } from "../../inputs";
import { changeQualityProcessStatusOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const changeQualityProcessStatus = action({
  display: {
    label: "Change Quality Process Status",
    description:
      "Change the status of a quality process or one of its steps in Arena PLM system. Supports both quality process level status changes and individual step status changes.",
  },
  inputs: changeQualityProcessStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeQualityProcessStatusOutputSchema,
  }),
  examplePayload: changeQualityProcessStatusExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      if (params.requestType === "qualityStatus") {
        if (!params.status) {
          throw new Error(
            "Status is required when Request Type is 'Quality Process Status Change'",
          );
        }
        const payload = {
          qualityProcess: {
            guid: params.qualityProcessGuid,
            status: params.status,
          },
          ...(params.comment && { comment: params.comment }),
        };
        if (context.debug.enabled) {
          context.logger.debug(
            "Quality process status change request payload",
            {
              payloadKeys: Object.keys(payload),
            },
          );
        }
        const response = await client.post(
          "/qualityprocesses/statuschanges",
          payload,
        );
        context.logger.info("Successfully changed quality process status", {
          qualityProcessGuid: params.qualityProcessGuid,
          newStatus: params.status,
        });
        return {
          data: response.data,
        };
      }
      if (params.requestType === "stepWorkflow") {
        if (!params.stepGuid) {
          throw new Error(
            "Step GUID is required when Request Type is 'Quality Step Workflow'",
          );
        }
        if (!params.status) {
          throw new Error(
            "Status is required when Request Type is 'Quality Step Workflow'",
          );
        }
        const payload = {
          qualityProcess: {
            guid: params.qualityProcessGuid,
            step: {
              guid: params.stepGuid,
              status: params.status,
            },
          },
          ...(params.comment && { comment: params.comment }),
        };
        if (context.debug.enabled) {
          context.logger.debug("Quality step workflow change request payload", {
            payloadKeys: Object.keys(payload),
          });
        }
        const response = await client.post(
          "/qualityprocesses/statuschanges",
          payload,
        );
        context.logger.info("Successfully changed quality step status", {
          qualityProcessGuid: params.qualityProcessGuid,
          stepGuid: params.stepGuid,
          newStatus: params.status,
        });
        return {
          data: response.data,
        };
      }
      throw new Error(`Invalid request type: ${params.requestType}`);
    } catch (error) {
      handleArenaError(error, context.logger, "Change Quality Process Status");
    }
  },
});
