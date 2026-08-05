import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteAppointmentExamplePayload } from "../../examplePayloads";
import { deleteAppointmentInputs } from "../../inputs";
export const deleteAppointment = action({
  display: {
    label: "Delete Appointment",
    description: "Delete appointment by ID",
  },
  inputs: deleteAppointmentInputs,
  perform: async (context, { connection, appointmentId }) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.delete(`/appointments/${appointmentId}`);
    return {
      data,
    };
  },
  examplePayload: deleteAppointmentExamplePayload,
});
