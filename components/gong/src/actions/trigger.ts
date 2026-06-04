import { input, trigger } from "@prismatic-io/spectral";

export const webhook = trigger({
  display: {
    label: `Process Automation Trigger`,
    description: `Trigger for handling process automations from Gong`,
  },
  perform: async (_context, payload) => {
    await Promise.resolve();
    return {
      payload,
    };
  },
  inputs: {
    rules: input({
      label: "Automation Rules",
      type: "jsonForm",
      required: true,
    }),
  },
  synchronousResponseSupport: "valid",
  scheduleSupport: "valid",
});

export default { webhook };
