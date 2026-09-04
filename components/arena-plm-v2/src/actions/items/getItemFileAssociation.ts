import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getItemFileAssociationExamplePayload } from "../../examplePayloads";
import { getItemFileAssociationInputs } from "../../inputs";
import { itemFileSchema } from "../../outputSchemas";
import type { ItemFileVo } from "../../types";
import { handleArenaError } from "../../util";
export const getItemFileAssociation = action({
  display: {
    label: "Get Item File Association",
    description: "Returns details of a specific file association with an item.",
  },
  inputs: getItemFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemFileSchema,
  }),
  examplePayload: getItemFileAssociationExamplePayload,
  perform: async (
    context,
    { connection, itemGuid, itemFileAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Retrieving item file association details", {
        itemGuid,
        itemFileAssociationGuid,
      });
      const response = await client.get(
        `/items/${itemGuid}/files/${itemFileAssociationGuid}`,
      );
      const fileAssociation: ItemFileVo = response.data;
      context.logger.info("Item file association retrieved successfully", {
        itemGuid,
        itemFileAssociationGuid,
        associationGuid: fileAssociation.guid,
        fileName: fileAssociation.file?.name,
        fileGuid: fileAssociation.file?.guid,
        primary: fileAssociation.primary,
        latestEditionAssociation: fileAssociation.latestEditionAssociation,
      });
      return { data: fileAssociation };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        `Get Item File Association (${itemGuid}/${itemFileAssociationGuid})`,
      );
    }
  },
});
