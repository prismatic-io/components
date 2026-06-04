import type { ActionContext, Connection } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { deleteInstanceWebhooks } from "./index";

export const onInstanceDelete = async (
  context: ActionContext,
  { connection }: { connection: Connection },
) => {
  await deleteInstanceWebhooks(createClient(connection), context.webhookUrls);

  return;
};
