import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addTicketQualityProcessExamplePayload } from "../../examplePayloads";
import { addTicketQualityProcessInputs } from "../../inputs";
import { qualityAssociationSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const addTicketQualityProcess = action({
  display: {
    label: "Add Ticket Quality Process",
    description: "Link a quality process to a ticket in Arena PLM system.",
  },
  inputs: addTicketQualityProcessInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityAssociationSchema,
  }),
  examplePayload: addTicketQualityProcessExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const qualityPayload: {
        guid: string;
        step?: {
          guid: string;
        };
      } = {
        guid: params.qualityProcessGuid,
      };
      if (params.stepGuid) {
        qualityPayload.step = { guid: params.stepGuid };
      }
      const { data } = await client.post(
        `/tickets/${params.ticketGuid}/quality`,
        qualityPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Ticket Quality Process");
    }
  },
});
