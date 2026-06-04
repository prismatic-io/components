import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listQueueIssuesExamplePayload } from "../../examplePayloads";
import { listQueueIssuesInputs } from "../../inputs";
import type { Issue } from "../../types";
import { getPaginatedData } from "../../util";

export const listQueueIssues = action({
  display: {
    label: "List Queue Issues",
    description: "Returns the issues in a service desk queue.",
  },
  inputs: listQueueIssuesInputs,
  perform: async (
    context,
    { connection, serviceDeskId, queueId, start, limit, fetchAll },
  ) => {
    const { client } = await createClient(
      connection,
      context.debug.enabled,
      true,
    );
    const { data } = await getPaginatedData<Issue>(
      client,
      `/servicedesk/${serviceDeskId}/queue/${queueId}/issue`,
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listQueueIssuesExamplePayload,
});
