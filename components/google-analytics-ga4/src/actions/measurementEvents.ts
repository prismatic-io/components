import { action } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { GOOGLE_ANALYTICS_COLLECT_EVENTS_URL } from "../consts";
import { sendMeasurementProtocolEventsExamplePayload } from "../examplePayloads";
import { apiSecret, appInstanceId, events, firebaseAppId } from "../inputs";

export const sendMeasurementProtocolEvents = action({
  display: {
    label: "Send Measurement Protocol Events",
    description: "Sends Measurement Protocol Events to your Google Analytics G4 Account",
  },
  perform: async (_context, { firebaseAppId, events, appInstanceId, apiSecret }) => {
    const params = {
      firebase_app_id: firebaseAppId,
      api_secret: apiSecret,
    };

    await createClient({
      baseUrl: GOOGLE_ANALYTICS_COLLECT_EVENTS_URL,
    }).post(
      "/mp/collect",
      {
        app_instance_id: appInstanceId,
        events,
      },
      { params },
    );

    return { data: { message: "Event Sent Successfully" } };
  },
  inputs: {
    firebaseAppId,
    appInstanceId,
    apiSecret,
    events,
  },
  examplePayload: sendMeasurementProtocolEventsExamplePayload,
});

export default { sendMeasurementProtocolEvents };
