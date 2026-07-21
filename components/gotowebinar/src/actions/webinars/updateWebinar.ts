import { action } from "@prismatic-io/spectral";
import { UPDATE_WEBINAR_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { createGotoWebinarClient } from "../../client";
import { updateWebinarInputs } from "../../inputs";
import { GENERAL_DELETE_MESSAGE } from "../../constants";
export const updateWebinar = action({
  display: {
    label: "Update Webinar",
    description: "Updates a specific webinar.",
  },
  inputs: updateWebinarInputs,
  examplePayload: UPDATE_WEBINAR_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    {
      subject,
      emailSettings,
      times,
      locale,
      description,
      connection,
      webinarKey,
      notifyParticipants,
    },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars/${webinarKey}`;
    const payload = {
      subject,
      description,
      times,
      locale,
      emailSettings: {
        confirmationEmail: emailSettings.confirmationEmail,
        reminderEmail: emailSettings.reminderEmail,
        absenteeFollowUpEmail: emailSettings.absenteeFollowUpEmail,
        attendeeFollowUpEmail: emailSettings.attendeeFollowUpEmail,
      },
    };
    const params = {
      notifyParticipants,
    };
    await client.put(url, payload, { params });
    return GENERAL_DELETE_MESSAGE;
  },
});
