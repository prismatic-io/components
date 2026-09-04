import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createChangeFileAssociationExamplePayload } from "../../examplePayloads";
import { createChangeFileAssociationInputs } from "../../inputs";
import { fileAssociationSchema } from "../../outputSchemas";
import type { FileAssociationCreateVo, FileAssociationVo } from "../../types";
import { handleArenaError } from "../../util";
export const createChangeFileAssociation = action({
  display: {
    label: "Create Change File Association",
    description: "Create a new change file association in Arena PLM system.",
  },
  inputs: createChangeFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationSchema,
  }),
  examplePayload: createChangeFileAssociationExamplePayload,
  perform: async (context, { connection, changeGuid, fileGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Creating change file association", {
        changeGuid,
        fileGuid,
      });
      const requestBody: FileAssociationCreateVo = {
        file: {
          guid: fileGuid,
        },
      };
      const response = await client.post(
        `/changes/${changeGuid}/files`,
        requestBody,
      );
      const fileAssociation: FileAssociationVo = response.data;
      context.logger.info("Change file association created successfully", {
        changeGuid,
        fileGuid,
        associationGuid: fileAssociation.guid,
        fileName: fileAssociation.file?.name,
      });
      return { data: fileAssociation };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        `Create Change File Association (${changeGuid})`,
      );
    }
  },
});
