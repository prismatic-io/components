import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updatePendingHireExamplePayload } from "../../examplePayloads";
import { updatePendingHireInputs } from "../../inputs";







export const updatePendingHire = action({
  display: {
    label: "Update Pending Hire",
    description: "Update an existing pending hire record with new information.",
  },
  inputs: updatePendingHireInputs,
  perform: async (context, { connection, pendingHireId, pendingHireData }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.patch(
      `/personnel/v1/pending-hires/${pendingHireId}`,
      pendingHireData,
    );

    return { data };
  },
  examplePayload: updatePendingHireExamplePayload,
});
