import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createTicketExamplePayload } from "../../examplePayloads";
import { createTicketInputs } from "../../inputs";
import { ticketSchema } from "../../outputSchemas";
import type { TicketCreateVo } from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const createTicket = action({
  display: {
    label: "Create Ticket",
    description: "Create a new ticket in Arena PLM system.",
  },
  inputs: createTicketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ticketSchema,
  }),
  examplePayload: createTicketExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: TicketCreateVo = {
        template: { guid: params.templateGuid },
        title: params.title,
        number: params.number || undefined,
        numberSequencePrefix: params.numberSequencePrefix
          ? { value: params.numberSequencePrefix }
          : undefined,
        additionalAttributes: resolveAdditionalAttributes(params, context),
      };
      context.logger.info("Creating ticket in Arena", {
        ticketTitle: params.title,
        hasTemplate: !!params.templateGuid,
        hasNumber: !!params.number,
        hasNumberSequencePrefix: !!params.numberSequencePrefix,
        attributeCount: requestPayload.additionalAttributes?.length || 0,
        hasAttributeDefinitions: !!(
          params.attributeDefinitions &&
          Array.isArray(params.attributeDefinitions) &&
          params.attributeDefinitions.length > 0
        ),
        attributeDefinitionCount: Array.isArray(params.attributeDefinitions)
          ? params.attributeDefinitions.length
          : 0,
      });
      const { data } = await client.post("/tickets", requestPayload);
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Ticket");
    }
  },
});
