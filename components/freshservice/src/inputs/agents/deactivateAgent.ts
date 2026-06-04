import { input } from "@prismatic-io/spectral";
import { connection } from "../common";
import { agentId } from "./common";

export const deactivateAgentInputs = {
  connection,
  agentId: input({
    ...agentId,
    comments: "Unique ID of the agent to deactivate.",
  }),
};
