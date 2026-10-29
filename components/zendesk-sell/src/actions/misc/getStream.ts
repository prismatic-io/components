import { action, input, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getStreamExamplePayload } from "../../examplePayloads";
import { connection } from "../../inputs";

export const getStream = action({
  display: {
    label: "Get Stream",
    description: "Provides a stream of changes to Zendesk Sell data.",
  },
  perform: async (context, { connection, resource, position, limit }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled, true);
      const params = { position, ...(limit && { limit }) };
      const { data } = await client.get(`/${resource}/stream`, {
        params,
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
    resource: input({
      label: "Resource",
      comments:
        "The resource to get the stream for. Possible values: contacts, deals, leads.",
      placeholder: "Enter resource name",
      example: "contacts",
      type: "string",
      required: true,
      clean: util.types.toString,
    }),
    position: input({
      label: "Position",
      comments:
        "The client position in the Firehose stream. Possible values: top, tail, or a position string from a previous API response.",
      placeholder: "Enter stream position",
      example: "top",
      type: "string",
      required: true,
      clean: util.types.toString,
    }),
    limit: input({
      label: "Limit",
      comments: "Limits maximum number of events in single response.",
      placeholder: "Enter limit",
      example: "100",
      type: "string",
      required: false,
      clean: util.types.toString,
    }),
  },
  examplePayload: getStreamExamplePayload,
});
export default { getStream };
