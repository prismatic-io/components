import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { getAttendeeInputs } from "../../inputs/attendees/getAttendeeInputs";
import { GET_ATTENDEE_EXAMPLE_PAYLOAD } from "../../examplePayloads";

export const getAttendee = action({
  display: {
    label: "Get Attendee",
    description:
      "Retrieve registration details for a particular attendee of a specific webinar session",
  },
  inputs: getAttendeeInputs,
  examplePayload: GET_ATTENDEE_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    { connection, webinarKey, sessionKey, registrantKey },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars/${webinarKey}/sessions/${sessionKey}/attendees/${registrantKey}`;

    const { data } = await client.get(url);
    return {
      data,
    };
  },
});
