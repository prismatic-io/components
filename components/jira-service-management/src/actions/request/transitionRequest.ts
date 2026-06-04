import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { transitionRequestExamplePayload } from "../../examplePayloads";
import { transitionRequestInputs } from "../../inputs";

export const transitionRequest = action({
  display: {
    label: "Transition Request",
    description: "Transitions a service request to a new status.",
  },
  inputs: transitionRequestInputs,
  perform: async (
    context,
    { connection, issueIdOrKey, transitionId, commentOnTransition },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const body = {
      id: transitionId,
      ...(commentOnTransition && {
        additionalComment: { body: commentOnTransition },
      }),
    };

    await client.post(`/request/${issueIdOrKey}/transition`, body);
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: transitionRequestExamplePayload,
});
