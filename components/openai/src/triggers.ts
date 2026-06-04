import { trigger } from "@prismatic-io/spectral";

export const toolFlowTrigger = trigger({
  display: {
    label: "Tool Flow Trigger",
    description: "Marks this flow as a tool that can be called by AI agents",
  },
  inputs: {},
  perform: async (context, payload) => {
    return Promise.resolve({ payload });
  },

  synchronousResponseSupport: "valid",

  scheduleSupport: "invalid",
});

export default { toolFlowTrigger };
