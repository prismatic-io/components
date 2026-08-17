import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { GOOGLE_ANALYTICS_COLLECT_EVENTS_URL } from "../consts";
import { sendMeasurementProtocolEventsExamplePayload } from "../examplePayloads";
import { apiSecret, appInstanceId, events, firebaseAppId } from "../inputs";
import { sendMeasurementProtocolEventsOutputSchema } from "../outputSchemas";
export const sendMeasurementProtocolEvents = action({
  display: {
    label: "Send Measurement Protocol Events",
    description:
      "Sends Measurement Protocol Events to the Google Analytics GA4 account.",
  },
  performSafety: "notAllowed",
  perform: async (
    _context,
    { firebaseAppId, events, appInstanceId, apiSecret },
  ) => {
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    ...sendMeasurementProtocolEventsExamplePayload,
  }),
  inputs: {
    firebaseAppId,
    appInstanceId,
    apiSecret,
    events,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: sendMeasurementProtocolEventsOutputSchema,
  }),
  examplePayload: sendMeasurementProtocolEventsExamplePayload,
});
export default { sendMeasurementProtocolEvents };
