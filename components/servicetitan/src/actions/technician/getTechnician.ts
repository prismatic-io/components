import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getTechnicianExamplePayload } from "../../examplePayloads";
import { getTechnicianInputs } from "../../inputs";
export const getTechnician = action({
  display: {
    label: "Get Technician",
    description: "Retrieve a Technician by ID",
  },
  inputs: getTechnicianInputs,
  perform: async (context, { connection, technicianId }) => {
    const client = createClient(connection, "settings", context.debug.enabled);
    const { data } = await client.get(`/technicians/${technicianId}`);
    return {
      data,
    };
  },
  examplePayload: getTechnicianExamplePayload,
});
