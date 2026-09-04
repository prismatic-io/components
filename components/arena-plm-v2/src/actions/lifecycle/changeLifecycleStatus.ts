import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { changeLifecycleStatusExamplePayload } from "../../examplePayloads";
import { changeLifecycleStatusInputs } from "../../inputs";
import { changeLifecycleStatusOutputSchema } from "../../outputSchemas";
import type {
  ChangeLifecycleStatusType,
  ChangeLifecycleTransitionCreateVo,
  ChangeLifecycleTransitionFullVo,
  SingleValueVo,
} from "../../types";
import { getRecordString, handleArenaError, isRecord } from "../../util";
export const changeLifecycleStatus = action({
  display: {
    label: "Change Lifecycle Status",
    description:
      "Move a change to a new lifecycle phase by updating its status in Arena PLM system.",
  },
  inputs: changeLifecycleStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeLifecycleStatusOutputSchema,
  }),
  examplePayload: changeLifecycleStatusExamplePayload,
  perform: async (
    context,
    {
      connection,
      changeGuid,
      status,
      fromStatus,
      comment,
      administrators,
      adminNeedConfig,
      implementationStatus,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const isValidValue = (value: unknown): boolean => {
        if (value === null || value === undefined || value === "") {
          return false;
        }
        if (isRecord(value) && Object.keys(value).length === 0) {
          return false;
        }
        return true;
      };
      const transitionPayload: ChangeLifecycleTransitionCreateVo = {
        change: { guid: changeGuid },
        status: status as ChangeLifecycleStatusType,
        fromStatus: fromStatus as ChangeLifecycleStatusType | undefined,
        comment,
        adminNeedConfig,
      };
      if (isValidValue(administrators) && Array.isArray(administrators)) {
        transitionPayload.administrators = (administrators as unknown[]).map(
          (admin) => ({
            guid: getRecordString(admin, "guid") ?? util.types.toString(admin),
          }),
        );
      }
      if (
        isRecord(implementationStatus) &&
        Object.keys(implementationStatus).length > 0
      ) {
        transitionPayload.implementationStatus =
          implementationStatus as SingleValueVo;
      }
      if (context.debug.enabled) {
        context.logger.debug("Change lifecycle transition request payload", {
          payloadKeys: Object.keys(transitionPayload),
        });
      }
      const { data } = await client.post<ChangeLifecycleTransitionFullVo>(
        "/changes/statuschanges",
        transitionPayload,
      );
      context.logger.info("Successfully changed change lifecycle status", {
        changeGuid,
        newStatus: status,
        changeNumber: data.change?.number,
      });
      return {
        data,
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Change Lifecycle Status");
    }
  },
});
