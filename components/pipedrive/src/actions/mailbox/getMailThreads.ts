import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, paginationLimitInput, paginationStartInput } from "../../inputs";

export const getMailThreads = action({
  display: {
    label: "Get Mail Threads",
    description: "Gets mail threads.",
  },
  perform: async (context, { connection, folder, start, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/mailbox/mailThreads", {
      params: { folder, start, limit },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    folder: input({
      label: "Folder",
      type: "string",
      required: true,
      default: "inbox",
      model: [
        { label: "Inbox", value: "inbox" },
        { label: "Drafts", value: "drafts" },
        { label: "Sent", value: "sent" },
        { label: "Archive", value: "archive" },
      ],
      clean: util.types.toString,
      comments: "The type of folder to fetch",
    }),
    start: paginationStartInput,
    limit: paginationLimitInput,
  },
});
