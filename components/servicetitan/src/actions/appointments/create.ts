import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAppointmentResponse as createAppointmentResponse } from "../../examplePayloads";
import {
  arrivalWindowEnd,
  arrivalWindowStart,
  connection,
  end,
  jobId,
  specialInstructions,
  start,
  technicianId,
} from "../../inputs";

export const createAppointment = action({
  display: {
    label: "Create Appointment",
    description: "Adds a new appointment to an existing job",
  },
  inputs: {
    connection,
    jobId,
    start: {
      ...start,
      required: true,
    },
    end: {
      ...end,
      required: true,
    },
    arrivalWindowStart,
    arrivalWindowEnd,
    technicianId,
    specialInstructions,
  },
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
  examplePayload: {
    data: createAppointmentResponse,
  },
});
