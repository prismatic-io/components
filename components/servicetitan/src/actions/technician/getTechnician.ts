import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getTechnicianExamplePayload } from "../../examplePayloads";
import { getTechnicianInputs } from "../../inputs";
import { getTechnicianOutputSchema } from "../../outputSchemas";
export const getTechnician = action({
  display: {
    label: "Get Technician",
    description: "Retrieve a technician by ID.",
  },
  inputs: getTechnicianInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTechnicianOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, technicianId }) => {
    const client = createClient(connection, "settings", context.debug.enabled);
    const { data } = await client.get(`/technicians/${technicianId}`);
    return {
      data,
    };
  },
  examplePayload: getTechnicianExamplePayload,
});
