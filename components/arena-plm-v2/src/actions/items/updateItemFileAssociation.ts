import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateItemFileAssociationExamplePayload } from "../../examplePayloads";
import { updateItemFileAssociationInputs } from "../../inputs";
import { itemFileSchema } from "../../outputSchemas";
import type { ItemFileUpdateVo, ItemFileVo } from "../../types";
import { handleArenaError } from "../../util";
export const updateItemFileAssociation = action({
  display: {
    label: "Update Item File Association",
    description:
      "Update metadata of an item file association (latestEditionAssociation, primary).",
  },
  inputs: updateItemFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemFileSchema,
  }),
  examplePayload: updateItemFileAssociationExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemGuid,
      itemFileAssociationGuid,
      latestEditionAssociation,
      primary,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Updating item file association", {
        itemGuid,
        itemFileAssociationGuid,
        latestEditionAssociation,
        primary,
      });
      const requestBody: ItemFileUpdateVo = {};
      if (latestEditionAssociation !== undefined) {
        requestBody.latestEditionAssociation = latestEditionAssociation;
      }
      if (primary !== undefined) {
        requestBody.primary = primary;
      }
      const response = await client.put(
        `/items/${itemGuid}/files/${itemFileAssociationGuid}`,
        requestBody,
      );
      const fileAssociation: ItemFileVo = response.data;
      context.logger.info("Item file association updated successfully", {
        itemGuid,
        itemFileAssociationGuid,
        associationGuid: fileAssociation.guid,
        fileName: fileAssociation.file?.name,
        primary: fileAssociation.primary,
        latestEditionAssociation: fileAssociation.latestEditionAssociation,
      });
      return { data: fileAssociation };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        `Update Item File Association (${itemGuid}/${itemFileAssociationGuid})`,
      );
    }
  },
});
