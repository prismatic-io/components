import type { TriggerPayload } from "@prismatic-io/spectral";
import { pollingTrigger, trigger, util } from "@prismatic-io/spectral";
import crypto from "node:crypto";
import { createClient } from "./client";
import { pollChangesTriggerExamplePayload } from "./examplePayloads";
import {
  connectionInput,
  events,
  owner as ownerInput,
  pollChangesInputs,
  repo as repoInput,
  webhookSecretInput,
} from "./inputs";
import type { GithubIssueRecord, PollingState } from "./interfaces/PollingState";
import { paginateResults } from "./utils";

const validateWebhookSignature = (payload: TriggerPayload, secret?: string) => {
  if (!secret) {
    return;
  }

  const headers = util.types.lowerCaseHeaders(payload.headers);
  const signature = headers["x-hub-signature-256"];
  const body = util.types.toString(payload.rawBody.data);
  const computedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== `sha256=${computedSignature}`) {
    throw new Error(
      "The included signing signature does not match the configured GitHub signing key. Rejecting.",
    );
  }
};

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Github for webhooks you configure.",
  },
  perform: async (context, payload, params) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({ payload });
    }

    validateWebhookSignature(payload, params.webhookSecret);

    return Promise.resolve({ payload });
  },
  inputs: { webhookSecret: webhookSecretInput },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});

export const eventWebhook = trigger({
  display: {
    label: "Event Webhook",
    description:
      "Automatically create and manage GitHub webhooks for specified events. Webhooks are created on deployment and removed when the instance is deleted.",
  },
  perform: async (context, payload) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({ payload });
    }

    
    const flowKey = context.flow.id;
    const storedSecret = context.crossFlowState[`${flowKey}_secret`];

    validateWebhookSignature(
      payload,
      storedSecret ? util.types.toString(storedSecret) : undefined,
    );

    return Promise.resolve({ payload });
  },
  inputs: {
    connection: connectionInput,
    owner: ownerInput,
    repo: repoInput,
    events,
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  webhookLifecycleHandlers: {
    create: async (context, params) => {
      const client = createClient(params.connection, context.debug.enabled);
      const webhookUrl = context.webhookUrls[context.flow.name];
      const flowKey = context.flow.id;

      
      const webhookSecret = crypto.randomBytes(32).toString("hex");

      
      const { data } = await client.post(
        `/repos/${params.owner}/${params.repo}/hooks`,
        {
          name: "web",
          config: {
            url: webhookUrl,
            content_type: "json",
            insecure_ssl: "0",
            secret: webhookSecret,
          },
          events: params.events,
          active: true,
        },
      );

      
      context.crossFlowState[flowKey] = data.id;
      context.crossFlowState[`${flowKey}_secret`] = webhookSecret;

      context.logger.info(
        `Created webhook ${data.id} for ${params.owner}/${
          params.repo
        } with events: ${params.events.join(", ")}`,
      );
    },
    delete: async (context, params) => {
      const client = createClient(params.connection, context.debug.enabled);
      const flowKey = context.flow.id;

      
      const webhookId = context.crossFlowState[flowKey];

      if (!webhookId) {
        context.logger.warn(
          `No webhook ID found in crossFlowState for flow ${context.flow.name} (${flowKey})`,
        );
        return;
      }

      
      await client.delete(
        `/repos/${params.owner}/${params.repo}/hooks/${webhookId}`,
      );

      
      context.crossFlowState[flowKey] = undefined;
      context.crossFlowState[`${flowKey}_secret`] = undefined;

      context.logger.info(
        `Deleted webhook ${webhookId} for ${params.owner}/${params.repo}`,
      );
    },
  },
});

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated issues (including pull requests) in a GitHub repository on a configured schedule.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    
    
    
    
    const client = createClient(params.connection, context.debug.enabled);
    const issues = await paginateResults<GithubIssueRecord>(
      client,
      `/repos/${params.owner}/${params.repo}/issues`,
      true,
      { since: lastPolledAt, sort: "updated", direction: "asc", state: "all" },
    );

    
    
    
    
    const lastPolledAtDate = new Date(lastPolledAt);
    const created: GithubIssueRecord[] = [];
    const updated: GithubIssueRecord[] = [];

    for (const issue of issues) {
      const createdValue = issue.created_at;
      const createdAtDate =
        typeof createdValue === "string" ? new Date(createdValue) : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && params.showNewRecords !== false) created.push(issue);
      else if (!isNew && params.showUpdatedRecords !== false)
        updated.push(issue);
    }

    context.polling.setState({ lastPolledAt: now });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled GitHub ${params.owner}/${params.repo} issues: ${issues.length} fetched, ${created.length} created, ${updated.length} updated`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});

export default { webhook, eventWebhook, pollChangesTrigger };
