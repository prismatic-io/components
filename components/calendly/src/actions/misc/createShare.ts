import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createShareOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { createShareInputs } from "../../inputs";
import { createShareExamplePayload } from "../../examplePayloads";
export const createShare = action({
  display: {
    label: "Create Share",
    description:
      "Creates an endpoint for the Customize Once and Share feature.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      eventType,
      name,
      duration,
      periodType,
      startDate,
      endDate,
      maxBookingTime,
      hideLocation,
      locationConfigurations,
      availabilityRule,
    },
  ) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const body = {
      event_type: eventType,
      name: name,
      duration: duration ? util.types.toInt(duration) : undefined,
      period_type: periodType,
      start_date: startDate,
      end_date: endDate,
      max_booking_time: maxBookingTime
        ? util.types.toInt(maxBookingTime)
        : undefined,
      hide_location: hideLocation,
      location_configurations: locationConfigurations || undefined,
      availability_rule: availabilityRule || undefined,
    };
    const { data } = await client.post("/shares", body);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createShareExamplePayload.data,
  }),
  inputs: createShareInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createShareOutputSchema,
  }),
  examplePayload: createShareExamplePayload,
});
