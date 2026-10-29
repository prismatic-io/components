import { dataSource, type Element } from "@prismatic-io/spectral";
import { createToastClient } from "../client";
import { selectJobInputs as inputs } from "../inputs/dataSources";

export const selectJob = dataSource({
  display: {
    label: "Select Job",
    description: "Select a job from a list of jobs.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection, restaurantExternalId }) => {
    const client = await createToastClient(
      connection,
      false,
      restaurantExternalId,
    );

    const { data } = await client.get(`/labor/v1/jobs`);

    const objects = (data as { guid: string; title: string }[]).map<Element>(
      (job) => ({
        key: job.guid,
        label: job.title,
      }),
    );

    return { result: objects };
  },
});
