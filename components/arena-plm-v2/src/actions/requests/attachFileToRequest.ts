import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { attachFileToRequestExamplePayload } from "../../examplePayloads";
import { attachFileToRequestInputs } from "../../inputs";
import { fileAssociationSchema } from "../../outputSchemas";
import type { FileAssociationCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const attachFileToRequest = action({
  display: {
    label: "Attach File to Request",
    description: "Attach a new file to a request in Arena PLM system.",
  },
  inputs: attachFileToRequestInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationSchema,
  }),
  examplePayload: attachFileToRequestExamplePayload,
  perform: async (context, { connection, requestGuid, fileGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const requestPayload: FileAssociationCreateVo = {
        file: { guid: fileGuid },
      };
      context.logger.info(
        `Attaching file ${fileGuid} to request ${requestGuid}`,
      );
      const { data } = await client.post(
        `/requests/${requestGuid}/files`,
        requestPayload,
      );
      context.logger.info(
        `Successfully attached file to request: ${data?.guid || "N/A"}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Attach File to Request");
    }
  },
});
