import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { LIST_ALL_ATTEENDEES_FOR_ALL_WEBINAR_SESSIONS_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { listAllAttendeesInputs } from "../../inputs/attendees/listAllAttendeesInputs";

export const listAttendees = action({
  display: {
    label: "List All Attendees for all Webinar Sessions",
    description:
      "Returns all attendees for all sessions of the specified webinar.",
  },
  inputs: listAllAttendeesInputs,
  examplePayload: LIST_ALL_ATTEENDEES_FOR_ALL_WEBINAR_SESSIONS_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    { connection, webinarKey },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars/${webinarKey}/performance`;

    const { data } = await client.get(url);
    return {
      data,
    };
  },
});
