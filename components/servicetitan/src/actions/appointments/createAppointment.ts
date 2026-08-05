import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAppointmentExamplePayload as createAppointmentExamplePayload } from "../../examplePayloads";
import { createAppointmentInputs } from "../../inputs";
export const createAppointment = action({
  display: {
    label: "Create Appointment",
    description: "Adds a new appointment to an existing job",
  },
  inputs: createAppointmentInputs,
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
  examplePayload: createAppointmentExamplePayload,
});
