import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTicketTemplateAttributesExamplePayload } from "../../examplePayloads";
import { listTicketTemplateAttributesInputs } from "../../inputs";
import { attributeDefinitionFullRepListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTicketTemplateAttributes = action({
  display: {
    label: "List Ticket Template Attributes",
    description:
      "List all attributes for a specific ticket template from Arena PLM system.",
  },
  inputs: listTicketTemplateAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attributeDefinitionFullRepListSchema,
  }),
  examplePayload: listTicketTemplateAttributesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        includePossibleValues: params.includePossibleValues,
        creatableOnly: params.creatableOnly,
        editableOnly: params.editableOnly,
        searchableOnly: params.searchableOnly,
      };
      const { data } = await client.get(
        `/settings/tickets/templates/${params.templateGuid}/attributes`,
        {
          params: queryParams,
        },
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Ticket Template Attributes",
      );
    }
  },
});
