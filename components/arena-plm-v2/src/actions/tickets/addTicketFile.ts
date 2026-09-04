import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addTicketFileExamplePayload } from "../../examplePayloads";
import { addTicketFileInputs } from "../../inputs";
import { fileAssociationSchema } from "../../outputSchemas";
import type { FileAssociationCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const addTicketFile = action({
  display: {
    label: "Add Ticket File",
    description: "Link a file to a ticket in Arena PLM system.",
  },
  inputs: addTicketFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationSchema,
  }),
  examplePayload: addTicketFileExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: FileAssociationCreateVo = {
        file: { guid: params.fileGuid },
      };
      const { data } = await client.post(
        `/tickets/${params.ticketGuid}/files`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Ticket File");
    }
  },
});
