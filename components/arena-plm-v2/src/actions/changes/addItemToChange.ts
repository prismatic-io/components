import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addItemToChangeExamplePayload } from "../../examplePayloads";
import { addItemToChangeInputs } from "../../inputs";
import { changeItemAssociationSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const addItemToChange = action({
  display: {
    label: "Add Item to Change",
    description:
      "Adds an item to a change with a specific GUID in Arena PLM system.",
  },
  inputs: addItemToChangeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeItemAssociationSchema,
  }),
  examplePayload: addItemToChangeExamplePayload,
  perform: async (
    context,
    {
      connection,
      changeGuid,
      newItemRevision,
      newRevisionNumber,
      newLifecyclePhase,
      materialEffectivityDateTime,
      retrainingRequired,
      dispositionAttributeJson,
      filesView,
      sourcingView,
      specsView,
      bomView,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const requestPayload = {
        newItemRevision: newItemRevision
          ? { guid: newItemRevision }
          : undefined,
        newRevisionNumber: newRevisionNumber || undefined,
        newLifecyclePhase: newLifecyclePhase
          ? { guid: newLifecyclePhase }
          : undefined,
        materialEffectivityDateTime: materialEffectivityDateTime || undefined,
        retrainingRequired:
          retrainingRequired === "true"
            ? true
            : retrainingRequired === "false"
              ? false
              : undefined,
        dispositionAttributes: Array.isArray(dispositionAttributeJson)
          ? dispositionAttributeJson
          : dispositionAttributeJson &&
              typeof dispositionAttributeJson === "object"
            ? [dispositionAttributeJson]
            : undefined,
        filesView: filesView || undefined,
        sourcingView: sourcingView || undefined,
        specsView: specsView || undefined,
        bomView: bomView || undefined,
      };
      context.logger.info("Adding item to change in Arena", {
        changeGuid: changeGuid,
        newItemRevision: newItemRevision,
        hasNewRevisionNumber: !!newRevisionNumber,
        hasNewLifecyclePhase: !!newLifecyclePhase,
        hasMaterialEffectivity: !!materialEffectivityDateTime,
        retrainingRequired: requestPayload.retrainingRequired,
        retrainingRequiredInput: retrainingRequired,
        dispositionAttributeCount:
          requestPayload.dispositionAttributes?.length || 0,
        hasDispositionAttributeJson: !!dispositionAttributeJson,
      });
      const { data, status } = await client.post(
        `/changes/${changeGuid}/items`,
        requestPayload,
      );
      context.logger.info("Item added to change successfully", {
        changeGuid: changeGuid,
        responseGuid: data.guid,
        statusCode: status,
      });
      return {
        data,
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Item to Change");
    }
  },
});
