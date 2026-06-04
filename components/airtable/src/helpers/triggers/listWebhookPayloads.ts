import type {
  ListWebhookPayloadsParams,
  ListWebhookPayloadsResponse,
} from "../../interfaces";

export const listWebhookPayloads = async ({
  client,
  baseId,
  webhookId,
  lastCursor,
  logger,
  debug,
}: ListWebhookPayloadsParams) => {
  const allPayloads: ListWebhookPayloadsResponse["payloads"] = [];
  let currentCursor = lastCursor;
  let mightHaveMore = true;
  if (debug) {
    logger.info(
      `Fetching webhook payloads (starting cursor: ${currentCursor || "null"})`,
    );
  }

  while (mightHaveMore) {
    const url = currentCursor
      ? `/v0/bases/${baseId}/webhooks/${webhookId}/payloads?cursor=${currentCursor}`
      : `/v0/bases/${baseId}/webhooks/${webhookId}/payloads`;

    const { data: payloadData } =
      await client.get<ListWebhookPayloadsResponse>(url);

    allPayloads.push(...payloadData.payloads);
    currentCursor = payloadData.cursor;
    mightHaveMore = payloadData.mightHaveMore;

    if (debug) {
      logger.debug(
        `Fetched ${payloadData.payloads.length} payloads (cursor: ${currentCursor}, mightHaveMore: ${mightHaveMore})`,
      );
    }
  }
  return {
    allPayloads,
    currentCursor,
  };
};
