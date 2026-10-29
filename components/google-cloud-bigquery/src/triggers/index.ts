import { trigger } from "@prismatic-io/spectral";
import { pollChangesTrigger } from "./pollChangesTrigger";

export const myTrigger = trigger({
  display: {
    label: "PubSub Notification",
    description:
      "Receive PubSub notifications from Google Cloud when events occur.",
  },
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
      response: { statusCode: 200, contentType: "application/json" },
    });
  },
  inputs: {},
  synchronousResponseSupport: "valid",
  scheduleSupport: "valid",
});

export { pollChangesTrigger };

export default { myTrigger, pollChangesTrigger };
