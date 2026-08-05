import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAppointmentExamplePayload } from "../../examplePayloads";
import { getAppointmentInputs } from "../../inputs";
export const getAppointment = action({
  display: {
    label: "Get Appointment",
    description: "Retrieve an appointment by ID",
  },
  inputs: getAppointmentInputs,
  perform: async (context, { connection, appointmentId }) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.get(`/appointments/${appointmentId}`);
    return {
      data,
    };
  },
  examplePayload: getAppointmentExamplePayload,
});
