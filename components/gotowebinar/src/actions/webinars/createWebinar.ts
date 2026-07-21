import { action } from "@prismatic-io/spectral";
import { CREATE_WEBINAR_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { createGotoWebinarClient } from "../../client";
import { createWebinarInputs } from "../../inputs";
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
      experienceType,
      webinarType,
      emailSettings,
      additionalFields,
      subject,
      description,
    },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars`;
    const emailSettingsPayload = {
      confirmationEmail: emailSettings.confirmationEmail,
      reminderEmail: emailSettings.reminderEmail,
      absenteeFollowUpEmail: emailSettings.absenteeFollowUpEmail,
      attendeeFollowUpEmail: emailSettings.attendeeFollowUpEmail,
    };
    const payload = {
      subject,
      description,
      times,
      timeZone,
      type: webinarType,
      locale: additionalFields.locale,
      isPasswordProtected: additionalFields.isPasswordProtected,
      recordingAssetKey: additionalFields.recordingAssetKey,
      isOndemand: additionalFields.isOndemand,
      isBreakout: additionalFields.isBreakout,
      experienceType,
      emailSettings:
        Object.keys(emailSettingsPayload).length > 0
          ? emailSettingsPayload
          : undefined,
    };
    const { data } = await client.post(url, payload);
    return {
      data,
    };
  },
});
