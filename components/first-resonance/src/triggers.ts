import { trigger } from "@prismatic-io/spectral";

export const firstResonanceTrigger = trigger({
  display: {
    label: "Trigger",
    description: "Receive a webhook from ION",
  },
  perform: async (_context, payload, _params) => {
    return await Promise.resolve({
      payload,
    });
  },
  inputs: {},
  synchronousResponseSupport: "valid",
  scheduleSupport: "valid",
});

export default { firstResonanceTrigger };
