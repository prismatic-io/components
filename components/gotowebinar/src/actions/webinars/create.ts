import { action } from "@prismatic-io/spectral";
import { CREATE_WEBINAR_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { createGotoWebinarClient } from "../../client";
import { createWebinarInputs } from "../../inputs/webinars/createWebinarInputs";

export const createWebinar = action({
  display: {
    label: "Create Webinar",
    description:
      "Creates a single session webinar, a sequence of webinars, " +
      "or a series of webinars.",
  },
  inputs: createWebinarInputs,
  examplePayload: CREATE_WEBINAR_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      timeZone,
      times,
      locale,
      experienceType,
      isPasswordProtected,
      webinarType,
      absenteeFollowUpEmail,
      attendeeFollowUpEmail,
      confirmationEmail,
      reminderEmail,
      isBreakout,
      isOndemand,
      recordingAssetKey,
      subject,
      description,
    },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars`;
    const emailSettings = {
      confirmationEmail,
      reminderEmail,
      absenteeFollowUpEmail,
      attendeeFollowUpEmail,
    };

    const payload = {
      subject,
      description,
      times,
      timeZone,
      type: webinarType,
      locale,
      isPasswordProtected,
      recordingAssetKey,
      isOndemand,
      isBreakout,
      experienceType,
      emailSettings:
        Object.keys(emailSettings).length > 0 ? emailSettings : undefined,
    };

    const { data } = await client.post(url, payload);
    return {
      data,
    };
  },
});
