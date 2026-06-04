import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { LIST_SESSION_ATTENDEES_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { listSessionAttendeesInputs } from "../../inputs/attendees/listSessionAttendeesInputs";

export const listSessionAttendees = action({
  display: {
    label: "List Session Attendees",
    description:
      "Retrieve details for all attendees of a specific webinar session.",
  },
  inputs: listSessionAttendeesInputs,
  examplePayload: LIST_SESSION_ATTENDEES_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    { connection, webinarKey, sessionKey },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars/${webinarKey}/sessions/${sessionKey}/attendees`;

    const { data } = await client.get(url);
    return {
      data,
    };
  },
});
