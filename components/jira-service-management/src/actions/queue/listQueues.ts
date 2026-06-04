import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listQueuesExamplePayload } from "../../examplePayloads";
import { listQueuesInputs } from "../../inputs";
import type { Queue } from "../../types";
import { getPaginatedData } from "../../util";

export const listQueues = action({
  display: {
    label: "List Queues",
    description: "Returns queues for a service desk.",
  },
  inputs: listQueuesInputs,
  perform: async (
    context,
    { connection, serviceDeskId, start, limit, fetchAll },
  ) => {
    const { client } = await createClient(
      connection,
      context.debug.enabled,
      true,
    );
    const { data } = await getPaginatedData<Queue>(
      client,
      `/servicedesk/${serviceDeskId}/queue`,
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listQueuesExamplePayload,
});
