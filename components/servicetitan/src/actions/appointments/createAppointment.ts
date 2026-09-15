import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createAppointmentExamplePayload } from "../../examplePayloads";
import { createAppointmentInputs } from "../../inputs";
import { createAppointmentOutputSchema } from "../../outputSchemas";
export const createAppointment = action({
  display: {
    label: "Create Appointment",
    description: "Adds a new appointment to an existing job.",
  },
  inputs: createAppointmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createAppointmentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      arrivalWindowEnd,
      arrivalWindowStart,
      end,
      jobId,
      specialInstructions,
      start,
      technicianId,
    },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.post(`/appointments`, {
      arrivalWindowEnd,
      arrivalWindowStart,
      end,
      jobId,
      specialInstructions,
      start,
      technicianId,
    });
    return {
      data,
    };
  },
  examplePerform: async () => createAppointmentExamplePayload,
  examplePayload: createAppointmentExamplePayload,
});
