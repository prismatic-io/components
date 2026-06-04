import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { getEventHistoryInputs } from "../inputs";
import { listAllHistory } from "../utils";
import { getEventHistoryExamplePayload } from "../examplePayloads";

const getEventHistory = action({
  display: {
    label: "Get Event History",
    description:
      "Fetch events that have occurred in the mailbox since the specified startHistoryId.",
  },
  inputs: getEventHistoryInputs,
  perform: async (context, params) => {
    const client = await createClient(params.connection);

    const data = await listAllHistory(
      client,
      {
        userId: params.userId,
        startHistoryId: params.historyId,
        pageToken: params.pageToken,
        maxResults: params.maxResults,
      },
      params.fetchAll,
    );
    return { data };
  },
  examplePayload: getEventHistoryExamplePayload,
});

export default getEventHistory;
