import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAppointmentExamplePayload } from "../../examplePayloads";
import { getAppointmentInputs } from "../../inputs";
import { getAppointmentOutputSchema } from "../../outputSchemas";
export const getAppointment = action({
  display: {
    label: "Get Appointment",
    description: "Retrieve an appointment by ID.",
  },
  inputs: getAppointmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAppointmentOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, appointmentId }) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.get(`/appointments/${appointmentId}`);
    return {
      data,
    };
  },
  examplePayload: getAppointmentExamplePayload,
});
