import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getComputerExamplePayload } from "../../examplePayloads";
import { getComputerInputs } from "../../inputs";
import type { ComputerInventory } from "../../types";

export const getComputer = action({
  display: {
    label: "Get Computer",
    description: "Get a single computer inventory record by ID.",
  },
  inputs: getComputerInputs,
  perform: async (context, { connection, resourceId, section }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<ComputerInventory>(
      `/v3/computers-inventory/${resourceId}`,
      { params: { section }, paramsSerializer: { indexes: null } },
    );
    return { data };
  },
  examplePayload: getComputerExamplePayload,
});
