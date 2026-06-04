import { action } from "@prismatic-io/spectral";
import getWorkItemInputs from "../../inputs/workitems/getWorkItem";
import { createKarbonClient } from "../../client";
import { cleanOdata } from "../../utils";
import { getWorkItemExamplePayload } from "../../examplePayloads";

export const getWorkItem = action({
  display: {
    label: "Get Work Item",
    description: "Gets a Work Item by Work Item key",
  },
  inputs: {
    ...getWorkItemInputs,
  },
  perform: async (context, { connection, workItemkey }) => {
    const client = createKarbonClient(connection, context.debug.enabled);
    const response = await client.get(`/v3/WorkItems/${workItemkey}`);
    return { data: cleanOdata(response.data) };
  },
  examplePayload: getWorkItemExamplePayload,
});
