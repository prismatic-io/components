import { action } from "@prismatic-io/spectral";
import { DELETE_WEBINAR_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { createGotoWebinarClient } from "../../client";
import { deleteWebinarInputs } from "../../inputs/webinars/deleteWebinarInputs";
import { GENERAL_DELETE_MESSAGE } from "../../constants";

export const cancelWebinar = action({
  display: {
    label: "Cancel Webinar",
    description: "Cancels a specific webinar.",
  },
  inputs: deleteWebinarInputs,
  examplePayload: DELETE_WEBINAR_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    { connection, webinarKey, deleteAll, sendCancellationEmail },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars/${webinarKey}`;
    const params = {
      sendCancellationEmail,
      deleteAll,
    };

    await client.delete(url, { params });
    return GENERAL_DELETE_MESSAGE;
  },
});
