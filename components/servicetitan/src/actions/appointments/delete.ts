import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { appointmentId, connection } from "../../inputs";

export const deleteAppointment = action({
  display: {
    label: "Delete Appointment",
    description: "Delete appointment by ID",
  },
  inputs: {
    connection,
    appointmentId,
  },
  perform: async (context, { connection, appointmentId }) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.delete(`/appointments/${appointmentId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: {},
  },
});
