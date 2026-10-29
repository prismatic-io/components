import { trigger } from "@prismatic-io/spectral";

export const myTrigger = trigger({
  display: {
    label: "PubSub Notification",
    description: "PubSub Notification Trigger Settings",
  },
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
      response: { statusCode: 200, contentType: "application/json" },
    });
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});

export default { myTrigger };
