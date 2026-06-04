import { action, util } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import {
  connection,
  organization,
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
} from "../../inputs";
import { createShareExamplePayload } from "../../examplePayloads";

export const createShare = action({
  display: {
    label: "Create Share",
    description:
      "Allows you to create an endpoint for the Customize Once and Share feature.",
  },
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
      name: name || undefined,
      duration: duration ? util.types.toInt(duration) : undefined,
      period_type: periodType || undefined,
      start_date: startDate || undefined,
      end_date: endDate || undefined,
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
  inputs: {
    connection,
    organization: { ...organization, dataSource: "organizations" },
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
  examplePayload: createShareExamplePayload,
});
