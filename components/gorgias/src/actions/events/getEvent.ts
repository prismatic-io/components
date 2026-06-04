import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getEventInputs as inputs } from "../../inputs/events";
import type { GetEventResponse } from "../../interfaces/events";
import { getEventExamplePayload as examplePayload } from "../../examplePayloads/events";

export const getEvent = action({
  display: {
    label: "Get Event",
    description: "Retrieve an event.",
  },
  perform: async (context, { connection, id }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).get<GetEventResponse>(`/events/${id}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
