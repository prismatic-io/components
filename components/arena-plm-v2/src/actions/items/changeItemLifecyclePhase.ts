import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { changeItemLifecyclePhaseExamplePayload } from "../../examplePayloads";
import { changeItemLifecyclePhaseInputs } from "../../inputs";
import { changeItemLifecyclePhaseOutputSchema } from "../../outputSchemas";
import type {
  ItemLifecycleChangeResponseVo,
  LifecycleChangeVo,
} from "../../types";
import { handleArenaError } from "../../util";
export const changeItemLifecyclePhase = action({
  display: {
    label: "Change Item Lifecycle Phase",
    description:
      "Release a new revision of an item to a target lifecycle phase (Design or Production).",
  },
  inputs: changeItemLifecyclePhaseInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeItemLifecyclePhaseOutputSchema,
  }),
  examplePayload: changeItemLifecyclePhaseExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemGuid,
      toLifecyclePhaseGuid,
      revisionNumber,
      notes,
      proceedOnNotice,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Changing item lifecycle phase", {
        itemGuid,
        toLifecyclePhaseGuid,
        revisionNumber,
        proceedOnNotice,
      });
      const requestBody: LifecycleChangeVo = {
        item: {
          guid: itemGuid,
        },
        toLifecyclePhase: {
          guid: toLifecyclePhaseGuid,
        },
      };
      if (revisionNumber) {
        requestBody.revisionNumber = revisionNumber;
      }
      if (notes) {
        requestBody.notes = notes;
      }
      if (proceedOnNotice !== undefined) {
        requestBody.proceedOnNotice = proceedOnNotice;
      }
      const response = await client.post(
        "/items/lifecyclephasechanges",
        requestBody,
      );
      const result: ItemLifecycleChangeResponseVo = response.data;
      context.logger.info("Item lifecycle phase changed successfully", {
        itemGuid,
        effectiveRevisionGuid: result.effectiveRevItem?.guid,
        supersededRevisionGuid: result.supersededRevItem?.guid,
        workingRevisionGuid: result.workingRevItem?.guid,
      });
      return { data: result };
    } catch (error) {
      handleArenaError(error, context.logger, "Change Item Lifecycle Phase");
    }
  },
});
