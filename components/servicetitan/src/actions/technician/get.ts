import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getTechnicianResponse } from "../../examplePayloads";
import { connection, technicianId } from "../../inputs";

export const getTechnician = action({
  display: {
    label: "Get Technician",
    description: "Retrieve a Technician by ID",
  },
  inputs: {
    connection,
    technicianId: {
      ...technicianId,
      required: true,
      comments: "The ID of the Technician to retrieve",
    },
  },
  perform: async (context, { connection, technicianId }) => {
    const client = createClient(connection, "settings", context.debug.enabled);
    const { data } = await client.get(`/technicians/${technicianId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getTechnicianResponse,
  },
});
