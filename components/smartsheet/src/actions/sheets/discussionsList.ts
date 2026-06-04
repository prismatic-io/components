import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { discussionsListExamplePayload } from "../../examplePayloads";
import { discussionsListInputs } from "../../inputs";

export const discussionsList = action({
  display: {
    label: "List Discussions",
    description: "Lists discussions on a sheet or row.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, rowId, page, pageSize, includeAll },
  ) => {
    const client = createClient(connection, debug);
    const endpoint = rowId
      ? `/sheets/${sheetId}/rows/${rowId}/discussions`
      : `/sheets/${sheetId}/discussions`;
    const { data } = await client.get(endpoint, {
      params: { include: "attachments,comments", page, pageSize, includeAll },
    });
    return { data };
  },
  inputs: discussionsListInputs,
  examplePayload: discussionsListExamplePayload,
});
