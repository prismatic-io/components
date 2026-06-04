import { action } from "@prismatic-io/spectral";
import { connectionInput } from "../../inputs";

export const updateTimeEntry = action({
  display: {
    label: "Delete Instanced Webhooks",
    description: "Delete instanced webhooks.",
  },
  perform: async () => {
    return Promise.resolve({ data: "" });
  },
  inputs: {
    clickUpConnection: connectionInput,
  },
});
