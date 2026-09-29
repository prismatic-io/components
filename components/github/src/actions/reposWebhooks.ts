import { action, input, outputSchema, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { AxiosInstance } from "axios";
import { createClient } from "../client";
import {
  DEFAULT_PAGE_SIZE,
  LINK_HEADER_NEXT,
  WEBHOOK_DEFAULTS,
} from "../constants";
import {
  reposCreateWebhookExamplePayload,
  reposDeleteInstanceWebhooksExamplePayload,
  reposDeleteWebhookExamplePayload,
  reposListWebhooksExamplePayload,
} from "../examplePayloads";
import {
  connectionInput,
  events as eventsInput,
  hookIdInput,
  owner as ownerInput,
  repo as repoInput,
  reposCreateWebhookInputs,
  reposDeleteInstanceWebhooksInputs,
  reposDeleteWebhookInputs,
  reposListWebhooksInputs,
  webhookSecretInput,
} from "../inputs";
import {
  reposCreateWebhookOutputSchema,
  reposListWebhooksOutputSchema,
} from "../outputSchemas";
interface GitHubWebhook {
  id: number;
  name: string;
  active: boolean;
  events: string[];
  config: {
    url: string;
  };
}
interface FetchWebhooksInput {
  client: HttpClient;
  owner: string;
  repo: string;
  showOnlyInstanceWebhooks: boolean;
  instanceWebhookUrls: string[];
}
const fetchWebhooks = async ({
  client,
  owner,
  repo,
  showOnlyInstanceWebhooks,
  instanceWebhookUrls,
}: FetchWebhooksInput) => {
  let webhooks: GitHubWebhook[] = [];
  const per_page = DEFAULT_PAGE_SIZE;
  let page = 1;
  let link = "";
  do {
    const response = await client.get(`/repos/${owner}/${repo}/hooks`, {
      params: { per_page, page },
    });
    webhooks = [
      ...webhooks,
      ...(showOnlyInstanceWebhooks
        ? response.data.filter((webhook: GitHubWebhook) =>
            instanceWebhookUrls.includes(webhook.config.url),
          )
        : response.data),
    ];
    page += 1;
    link = response.headers["link"];
  } while (link && link.includes(LINK_HEADER_NEXT));
  return webhooks;
};
const reposListWebhooks = action({
  display: {
    label: "Repos List Webhooks",
    description: "List webhooks of a repository",
  },
  examplePayload: reposListWebhooksExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: reposListWebhooksOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const webhooks = await fetchWebhooks({
      client,
      owner: params.owner,
      repo: params.repo,
      showOnlyInstanceWebhooks: params.showOnlyInstanceWebhooks,
      instanceWebhookUrls,
    });
    return { data: webhooks };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: reposListWebhooksExamplePayload.data,
  }),
  inputs: reposListWebhooksInputs,
});
const reposCreateWebhook = action({
  display: {
    label: "Repos Create Webhook",
    description: "Create a repository webhook",
  },
  examplePayload: reposCreateWebhookExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: reposCreateWebhookOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${params.owner}/${params.repo}/hooks`,
      {
        name: WEBHOOK_DEFAULTS.name,
        config: {
          url: params.callbackUrl,
          content_type: WEBHOOK_DEFAULTS.contentType,
          insecure_ssl: WEBHOOK_DEFAULTS.insecureSsl,
          secret: params.webhookSecret,
        },
        events: params.events,
        active: true,
      },
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { callbackUrl, events },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...reposCreateWebhookExamplePayload.data,
      events,
      config: {
        ...reposCreateWebhookExamplePayload.data.config,
        url: callbackUrl,
      },
    },
  }),
  inputs: reposCreateWebhookInputs,
});
const reposDeleteWebhook = action({
  display: {
    label: "Repos Delete Webhook",
    description: "Delete a repository webhook by ID",
  },
  examplePayload: reposDeleteWebhookExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${params.owner}/${params.repo}/hooks/${params.hookId}`,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: reposDeleteWebhookExamplePayload.data,
  }),
  inputs: reposDeleteWebhookInputs,
});
const reposDeleteInstanceWebhooks = action({
  display: {
    label: "Repos Delete Instance Webhooks",
    description: "Delete all webhooks pointed at this instance",
  },
  examplePayload: reposDeleteInstanceWebhooksExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const webhooks = await fetchWebhooks({
      client,
      owner: params.owner,
      repo: params.repo,
      showOnlyInstanceWebhooks: true,
      instanceWebhookUrls,
    });
    for (const webhook of webhooks) {
      console.info(`Deleting webhook ${webhook.id}`);
      await client.delete(
        `/repos/${params.owner}/${params.repo}/hooks/${webhook.id}`,
      );
    }
    return { data: {} };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: reposDeleteInstanceWebhooksExamplePayload.data,
  }),
  inputs: reposDeleteInstanceWebhooksInputs,
});
export default {
  reposCreateWebhook,
  reposDeleteInstanceWebhooks,
  reposDeleteWebhook,
  reposListWebhooks,
};
