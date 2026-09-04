import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { changeRequestStatusExamplePayload } from "../../examplePayloads";
import { changeRequestStatusInputs } from "../../inputs";
import { changeRequestStatusOutputSchema } from "../../outputSchemas";
import type { RequestTransitionCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const changeRequestStatus = action({
  display: {
    label: "Change Request Status",
    description:
      "Change the lifecycle status of a request in Arena PLM system.",
  },
  inputs: changeRequestStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeRequestStatusOutputSchema,
  }),
  examplePayload: changeRequestStatusExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const transitionPayload: RequestTransitionCreateVo = {
        request: {
          guid: params.requestGuid,
        },
        status: params.status as RequestTransitionCreateVo["status"],
      };
      if (params.fromStatus) {
        transitionPayload.fromStatus =
          params.fromStatus as RequestTransitionCreateVo["fromStatus"];
      }
      if (params.comment) {
        transitionPayload.comment = params.comment;
      }
      if (params.resolutionNotes) {
        transitionPayload.resolutionNotes = params.resolutionNotes;
      }
      if (params.resolutionCode) {
        transitionPayload.resolutionCode = params.resolutionCode;
      }
      if (params.deferralCode) {
        transitionPayload.deferralCode = params.deferralCode;
      }
      if (params.deferDeadlineDateTime) {
        transitionPayload.deferDeadlineDateTime = params.deferDeadlineDateTime;
      }
      context.logger.info(
        `Changing request ${params.requestGuid} status to ${params.status}`,
        {
          requestGuid: params.requestGuid,
          fromStatus: params.fromStatus,
          toStatus: params.status,
        },
      );
      const { data } = await client.post(
        "/requests/statuschanges",
        transitionPayload,
      );
      context.logger.info("Successfully changed request status");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Change Request Status");
    }
  },
});
