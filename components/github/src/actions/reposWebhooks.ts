import { action, input, util } from "@prismatic-io/spectral";
import type { AxiosInstance } from "axios";
import { createClient } from "../client";
import {
  connectionInput,
  events as eventsInput,
  hookIdInput,
  owner as ownerInput,
  repo as repoInput,
  webhookSecretInput,
} from "../inputs";
import {
  reposCreateWebhookExamplePayload,
  reposListWebhooksExamplePayload,
  reposDeleteWebhookExamplePayload,
  reposDeleteInstanceWebhooksExamplePayload,
} from "../examplePayloads";
import { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

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
  const per_page = 100;
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
  } while (link && link.includes('rel="next"'));

  return webhooks;
};

const reposListWebhooks = action({
  display: {
    label: "Repos List Webhooks",
    description: "List webhooks of a repository",
  },
  examplePayload: reposListWebhooksExamplePayload,
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
  inputs: {
    connection: connectionInput,
    owner: ownerInput,
    repo: repoInput,
    showOnlyInstanceWebhooks: input({
      label: "Show only instance webhooks",
      comments: "When true, shows only webhooks that point to this instance.",
      type: "boolean",
      default: "true",
      clean: util.types.toBool,
    }),
  },
});

const reposCreateWebhook = action({
  display: {
    label: "Repos Create Webhook",
    description: "Create a repository webhook",
  },
  examplePayload: reposCreateWebhookExamplePayload,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${params.owner}/${params.repo}/hooks`,
      {
        name: "web",
        config: {
          url: params.callbackUrl,
          content_type: "json",
          insecure_ssl: "0",
          secret: params.webhookSecret,
        },
        events: params.events,
        active: true,
      },
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    owner: ownerInput,
    repo: repoInput,
    callbackUrl: input({
      label: "Callback URL",
      type: "string",
      required: true,
      placeholder: "Enter callback URL",
      example: "https://your-webhook-endpoint.com/webhook/abc123",
      clean: util.types.toString,
      comments: "The URL where webhook events will be sent.",
    }),
    events: eventsInput,
    webhookSecret: webhookSecretInput,
  },
});

const reposDeleteWebhook = action({
  display: {
    label: "Repos Delete Webhook",
    description: "Delete a repository webhook by ID",
  },
  examplePayload: reposDeleteWebhookExamplePayload,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
      `/repos/${params.owner}/${params.repo}/hooks/${params.hookId}`,
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    owner: ownerInput,
    repo: repoInput,
    hookId: hookIdInput,
  },
});

const reposDeleteInstanceWebhooks = action({
  display: {
    label: "Repos Delete Instance Webhooks",
    description: "Delete all webhooks pointed at this instance",
  },
  examplePayload: reposDeleteInstanceWebhooksExamplePayload,
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
  inputs: {
    connection: connectionInput,
    owner: ownerInput,
    repo: repoInput,
  },
});

export default {
  reposCreateWebhook,
  reposDeleteInstanceWebhooks,
  reposDeleteWebhook,
  reposListWebhooks,
};
