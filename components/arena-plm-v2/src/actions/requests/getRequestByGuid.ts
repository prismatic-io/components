import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getRequestByGuidExamplePayload } from "../../examplePayloads";
import { getRequestByGuidInputs } from "../../inputs";
import { requestShortSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getRequestByGuid = action({
  display: {
    label: "Get Request by GUID",
    description:
      "Retrieve detailed information of a request by its GUID from Arena PLM system.",
  },
  inputs: getRequestByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requestShortSchema,
  }),
  examplePayload: getRequestByGuidExamplePayload,
  perform: async (
    context,
    { connection, requestGuid, includeEmptyAdditionalAttributes },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = { includeEmptyAdditionalAttributes };
      context.logger.info("Retrieving request from Arena", {
        requestGuid,
        includeEmptyAdditionalAttributes,
        queryParamCount: Object.keys(queryParams).length,
      });
      const { data } = await client.get(`/requests/${requestGuid}`, {
        params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      });
      context.logger.info("Request retrieved successfully", {
        requestGuid: data?.guid,
        requestNumber: data?.number,
        requestTitle: data?.title,
        hasAdditionalAttributes: !!(
          data?.additionalAttributes && data.additionalAttributes.length > 0
        ),
      });
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Request by GUID");
    }
  },
});
