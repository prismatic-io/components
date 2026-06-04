import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { deleteRegistrantInputs } from "../../inputs/registrants/deleteRegistrantInputs";
import { GENERAL_DELETE_MESSAGE } from "../../constants";

export const deleteRegistrant = action({
  display: {
    label: "Delete Registrant",
    description:
      "Removes a webinar registrant from current registrations for" +
      " the specified webinar. The webinar must be a scheduled, future webinar.",
  },
  inputs: deleteRegistrantInputs,
  examplePayload: GENERAL_DELETE_MESSAGE,
  perform: async (
    { debug: { enabled: debug } },
    { connection, webinarKey, registrantKey },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars/${webinarKey}/registrants/${registrantKey}`;

    await client.delete(url);

    return GENERAL_DELETE_MESSAGE;
  },
});
