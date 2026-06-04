import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getPersonFieldDetails = action({
  display: {
    label: "Get Person Field Details",
    description: "Gets details of a specific field for a person.",
  },
  perform: async (context, { connection, fieldId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/personFields/${fieldId}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    fieldId: input({
      label: "Field ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The ID of the field to fetch details for a person",
    }),
  },
});
