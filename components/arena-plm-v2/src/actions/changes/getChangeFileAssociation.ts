import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getChangeFileAssociationExamplePayload } from "../../examplePayloads";
import { getChangeFileAssociationInputs } from "../../inputs";
import { fileAssociationSchema } from "../../outputSchemas";
import type { FileAssociationVo } from "../../types";
import { handleArenaError } from "../../util";
export const getChangeFileAssociation = action({
  display: {
    label: "Get Change File Association",
    description:
      "Returns details of a specific file association with a change.",
  },
  inputs: getChangeFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationSchema,
  }),
  examplePayload: getChangeFileAssociationExamplePayload,
  perform: async (
    context,
    { connection, changeGuid, changeFileAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Retrieving change file association details", {
        changeGuid,
        changeFileAssociationGuid,
      });
      const response = await client.get(
        `/changes/${changeGuid}/files/${changeFileAssociationGuid}`,
      );
      const fileAssociation: FileAssociationVo = response.data;
      context.logger.info("Change file association retrieved successfully", {
        changeGuid,
        changeFileAssociationGuid,
        associationGuid: fileAssociation.guid,
        fileName: fileAssociation.file?.name,
        fileGuid: fileAssociation.file?.guid,
      });
      return { data: fileAssociation };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        `Get Change File Association (${changeGuid}/${changeFileAssociationGuid})`,
      );
    }
  },
});
