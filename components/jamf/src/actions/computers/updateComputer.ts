import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateComputerExamplePayload } from "../../examplePayloads";
import { updateComputerInputs } from "../../inputs";

export const updateComputer = action({
  display: {
    label: "Update Computer",
    description:
      "Update specific fields of a computer inventory record. Only the provided fields are modified.",
  },
  inputs: updateComputerInputs,
  perform: async (context, { connection, resourceId, computerUpdateBody }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.patch(
      `/v3/computers-inventory-detail/${resourceId}`,
      computerUpdateBody,
    );
    return { data: `Successfully updated computer ${resourceId}` };
  },
  examplePayload: updateComputerExamplePayload,
});
