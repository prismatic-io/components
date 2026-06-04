import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectQueueExamplePayload } from "../examplePayloads";
import { selectQueueInputs } from "../inputs";
import type { PagedResponse, Queue } from "../types";
import { getPaginatedData, toSortedPicklist } from "../util";



export const selectQueue = dataSource({
  display: {
    label: "Select Queue",
    description:
      "Fetches queues for a service desk and returns them as a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectQueueInputs,
  perform: async (_context, { connection, serviceDeskId }) => {
    const { client } = await createClient(connection, false, true);
    const { data }: { data: PagedResponse<Queue> } =
      await getPaginatedData<Queue>(
        client,
        `/servicedesk/${serviceDeskId}/queue`,
        true,
      );
    const result = toSortedPicklist(
      data.values,
      (q) => q.name,
      (q) => q.id,
    );
    return { result };
  },
  examplePayload: selectQueueExamplePayload,
});
