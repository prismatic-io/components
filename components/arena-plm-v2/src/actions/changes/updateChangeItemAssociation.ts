import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateChangeItemAssociationExamplePayload } from "../../examplePayloads";
import { updateChangeItemAssociationInputs } from "../../inputs";
import { changeItemAssociationSchema } from "../../outputSchemas";
import type { ChangeItemAssociationViewVo } from "../../types";
import { handleArenaError, toOptionalString } from "../../util";
export const updateChangeItemAssociation = action({
  display: {
    label: "Update Change Item Association",
    description:
      "Updates modification information for an item on a change with a given change-item association GUID, included in a change with a given GUID.",
  },
  inputs: updateChangeItemAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeItemAssociationSchema,
  }),
  examplePayload: updateChangeItemAssociationExamplePayload,
  perform: async (
    context,
    {
      connection,
      changeGuid,
      changeItemAssociationGuid,
      filesViewIncluded,
      filesViewNotes,
      sourcingViewIncluded,
      sourcingViewNotes,
      specsViewIncluded,
      specsViewNotes,
      bomViewIncluded,
      bomViewNotes,
      newRevisionNumber,
      newLifecyclePhase,
      materialEffectivityDateTime,
      retrainingRequired,
      dispositionAttributeJson,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const createViewObject = (
        included?: boolean,
        notes?: string,
      ): ChangeItemAssociationViewVo | undefined => {
        const view: ChangeItemAssociationViewVo = {
          includedInThisChange:
            included === undefined || included === null ? undefined : included,
          notes: toOptionalString(notes),
        };
        return view.includedInThisChange === undefined &&
          view.notes === undefined
          ? undefined
          : view;
      };
      const filesView = createViewObject(filesViewIncluded, filesViewNotes);
      const sourcingView = createViewObject(
        sourcingViewIncluded,
        sourcingViewNotes,
      );
      const specsView = createViewObject(specsViewIncluded, specsViewNotes);
      const bomView = createViewObject(bomViewIncluded, bomViewNotes);
      const requestPayload = {
        filesView,
        sourcingView,
        specsView,
        bomView,
        newRevisionNumber: newRevisionNumber || undefined,
        newLifecyclePhase: newLifecyclePhase
          ? { guid: newLifecyclePhase }
          : undefined,
        materialEffectivityDateTime: materialEffectivityDateTime || undefined,
        retrainingRequired: retrainingRequired ?? undefined,
        dispositionAttributes: Array.isArray(dispositionAttributeJson)
          ? dispositionAttributeJson
          : dispositionAttributeJson &&
              typeof dispositionAttributeJson === "object"
            ? [dispositionAttributeJson]
            : undefined,
      };
      context.logger.info("Updating change item association in Arena", {
        changeGuid: changeGuid,
        changeItemAssociationGuid: changeItemAssociationGuid,
        hasFilesView: !!filesView,
        hasSourcingView: !!sourcingView,
        hasSpecsView: !!specsView,
        hasBomView: !!bomView,
        hasNewRevisionNumber: !!newRevisionNumber,
        hasNewLifecyclePhase: !!newLifecyclePhase,
        hasMaterialEffectivity: !!materialEffectivityDateTime,
        retrainingRequired: retrainingRequired,
        dispositionAttributeCount:
          requestPayload.dispositionAttributes?.length || 0,
        hasDispositionAttributeJson: !!dispositionAttributeJson,
      });
      const { data, status } = await client.put(
        `/changes/${changeGuid}/items/${changeItemAssociationGuid}`,
        requestPayload,
      );
      context.logger.info("Change item association updated successfully", {
        changeGuid: changeGuid,
        changeItemAssociationGuid: changeItemAssociationGuid,
        responseGuid: data.guid,
        statusCode: status,
      });
      return {
        data,
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Change Item Association");
    }
  },
});
