import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { discussionListAttachmentsExamplePayload } from "../../examplePayloads";
import { discussionListAttachmentsInputs } from "../../inputs";

export const discussionListAttachments = action({
  display: {
    label: "List Discussion Attachments",
    description: "Lists all attachments on a discussion.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, discussionId, page, pageSize, includeAll },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(
      `/sheets/${sheetId}/discussions/${discussionId}/attachments`,
      {
        params: { page, pageSize, includeAll },
      },
    );
    return { data };
  },
  inputs: discussionListAttachmentsInputs,
  examplePayload: discussionListAttachmentsExamplePayload,
});
