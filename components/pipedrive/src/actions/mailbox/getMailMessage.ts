import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { cleanNumber } from "../../util";

export const getMailMessage = action({
  display: {
    label: "Get Mail Message",
    description: "Gets one mail message.",
  },
  perform: async (context, { connection, id, includeBody }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/mailbox/mailMessages/${id}`, {
      params: { include_body: includeBody },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: input({
      label: "Id",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The ID of the mail message to fetch",
    }),
    includeBody: input({
      label: "Include Body",
      type: "string",
      default: "1",
      model: [
        { label: "0", value: "0" },
        { label: "1", value: "1" },
      ],
      clean: cleanNumber,
      comments: "Whether to include the full message body or not",
    }),
  },
});
