import { createKarbonClient } from "../../client";
import { dataSource, type Element } from "@prismatic-io/spectral";
import type { WorkItem } from "../../interfaces/WorkItem";
import { connection } from "../../inputs/shared";
import { getPaginatedData } from "../../utils";

export const selectWorkItem = dataSource({
  display: {
    label: "Select Work Item",
    description: "Select a Work Item from a dropdown menu",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createKarbonClient(connection, false);
    const data = await getPaginatedData<WorkItem>({
      client,
      endpoint: "/v3/WorkItems",
      getAllData: true,
      pagination: {},
    });
    const workItems = data.value || [];
    const objects = workItems.map<Element>((workItem) => ({
      key: workItem.WorkItemKey,
      label: workItem.Title,
    }));

    return { result: objects };
  },
});
