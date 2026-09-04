import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateTicketExamplePayload } from "../../examplePayloads";
import { updateTicketInputs } from "../../inputs";
import { ticketSchema } from "../../outputSchemas";
import type { TicketUpdateVo } from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const updateTicket = action({
  display: {
    label: "Update Ticket",
    description: "Update an existing ticket in Arena PLM system.",
  },
  inputs: updateTicketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ticketSchema,
  }),
  examplePayload: updateTicketExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: TicketUpdateVo = {
        title: params.title || undefined,
        description: params.description || undefined,
        assignee: params.assigneeGuid
          ? { guid: params.assigneeGuid }
          : undefined,
        fixVersion: params.fixVersion || undefined,
        foundOn: params.foundOn || undefined,
        priority: params.priority || undefined,
        additionalAttributes: resolveAdditionalAttributes(params, context),
      };
      context.logger.info("Updating ticket in Arena", {
        ticketGuid: params.ticketGuid,
        hasTitle: !!params.title,
        hasDescription: !!params.description,
        hasAssignee: !!params.assigneeGuid,
        hasFixVersion: !!params.fixVersion,
        hasFoundOn: !!params.foundOn,
        hasPriority: !!params.priority,
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
      const { data } = await client.put(
        `/tickets/${params.ticketGuid}`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Ticket");
    }
  },
});
