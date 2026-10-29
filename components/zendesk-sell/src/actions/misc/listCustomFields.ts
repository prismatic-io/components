import { action, input, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { listCustomFieldsExamplePayload } from "../../examplePayloads";
import { connection } from "../../inputs";

export const listCustomFields = action({
  display: {
    label: "List Custom Fields",
    description:
      "Returns all custom fields associated with the specified resource type.",
  },
  perform: async (context, { connection, resourceType }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.get(`/${resourceType}/custom_fields`, {
        headers: { Accept: "application/json" },
      });

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection,
    resourceType: input({
      label: "Resource Type",
      comments:
        "Specifies the type for which custom fields should be returned.",
      type: "string",
      required: true,
      model: [
        { label: "lead", value: "lead" },
        { label: "contact", value: "contact" },
        { label: "deal", value: "deal" },
        { label: "prospect_and_customer", value: "prospect_and_customer" },
      ],
      clean: util.types.toString,
    }),
  },
  examplePayload: listCustomFieldsExamplePayload,
});

export default { listCustomFields };
