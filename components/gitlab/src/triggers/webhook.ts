import { trigger, util } from "@prismatic-io/spectral";
import { WEBHOOK_BRANCH_NAMES } from "../constants";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs } from "../inputs";
import { resolveEventBranch, tokensMatch, withoutSecretToken } from "../utils";
export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive events from a manually configured GitLab webhook, branching by event type.",
  },
  allowsBranching: true,
  staticBranchNames: WEBHOOK_BRANCH_NAMES,
  inputs: webhookInputs,
  perform: async (context, payload, { secretToken }) => {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    if (
      secretToken &&
      !context.isSimulatedTestExecution &&
      !tokensMatch(headers["x-gitlab-token"], secretToken)
    ) {
      throw new Error(
        "Webhook request rejected: the X-Gitlab-Token header does not match the configured Secret Token.",
      );
    }
    return Promise.resolve({
      payload: withoutSecretToken(payload),
      branch: resolveEventBranch(headers),
    });
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: webhookExamplePayload,
});
