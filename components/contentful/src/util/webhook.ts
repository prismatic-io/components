import type {
  ActionContext,
  ConfigVarResultCollection,
  Connection,
} from "@prismatic-io/spectral";
import type { Space } from "contentful-management";
import { createClient } from "../client";

export const instanceDeployFunctionality = async (
  context: ActionContext<ConfigVarResultCollection>,
  {
    connection,
    spaceId,
    topics,
  }: { connection: Connection; spaceId: string; topics: string[] },
) => {
  const client = createClient(connection, context);
  const space: Space = await client.getSpace(spaceId);

  await space.createWebhook({
    url: context.webhookUrls[context.flow.name],
    name: `Events Trigger - ${context.flow.name}`,
    topics,
  });
};

export const instanceDeleteFunctionality = async (
  context: ActionContext<ConfigVarResultCollection>,
  { connection, spaceId }: { connection: Connection; spaceId: string },
) => {
  const client = createClient(connection, context);
  const space: Space = await client.getSpace(spaceId);
  const webhooks = await space.getWebhooks();
  const webhook = webhooks.items.find((item) =>
    item.url.includes(context.webhookUrls[context.flow.name]),
  );
  if (webhook) {
    await webhook.delete();
  }
};
