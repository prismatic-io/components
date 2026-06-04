import { action } from "@prismatic-io/spectral";
import { createKarbonClient } from "../../client";
import listWorkItemsInputs from "../../inputs/workitems/listWorkItems";
import { getPaginatedData } from "../../utils";
import { listWorkItemsExamplePayload } from "../../examplePayloads";
import type { WorkItem } from "../../interfaces/WorkItem";

export const listWorkItems = action({
  display: {
    label: "List Work Items",
    description: "Receive a list of work items from your tenant",
  },
  inputs: {
    ...listWorkItemsInputs,
  },
  perform: async (
    context,
    { connection, $filter, $top, $skip, $orderby, getAllData },
  ) => {
    const client = createKarbonClient(connection, context.debug.enabled);
    const data = await getPaginatedData<WorkItem>({
      pagination: { $top, $skip },
      client,
      endpoint: "/v3/WorkItems",
      getAllData,
      $filter,
      $orderby,
    });
    return { data };
  },
  examplePayload: listWorkItemsExamplePayload,
});
