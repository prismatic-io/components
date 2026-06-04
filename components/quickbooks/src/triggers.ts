import {
  pollingTrigger,
  type TriggerPayload,
  trigger,
} from "@prismatic-io/spectral";
import { POLL_RESOURCE_CONFIG } from "./constants";
import { pollChangesExamplePayload } from "./examplePayloads/polling";
import { connectionInput } from "./inputs";
import { pollChangesInputs } from "./inputs/polling";
import type { PollingState, QuickBooksRecord } from "./types";
import { parseQuickBooksWebhook, parseWebhookBody } from "./util";
import { fetchQuickBooksRecordsSince } from "./util/polling";

export const webhook = trigger({
  display: {
    label: "Entity Change Events",
    description:
      "Receive webhook notifications from QuickBooks when entity changes occur.",
  },
  perform: async (context, payload) => {
    const { logger } = context;
    const webhookData = parseWebhookBody(payload);
    const normalizedOutput = parseQuickBooksWebhook(webhookData, logger);
    logger.info(
      `Processed QuickBooks webhook: ${normalizedOutput.eventCount} event(s), ` +
        `format: ${normalizedOutput.format}, ` +
        `first event: ${normalizedOutput.entity}.${normalizedOutput.operation}`,
    );

    const finalPayload: TriggerPayload = {
      ...payload,
      body: {
        ...payload.body,
        data: normalizedOutput,
      },
    };

    return Promise.resolve({
      payload: finalPayload,
    });
  },
  inputs: { connection: connectionInput },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Polls QuickBooks Online's Query API for entity records modified at or after the last poll. Records with `Metadata.CreateTime` after the last poll go to the `created` bucket; older records modified since the last poll go to `updated`.",
  },
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    const { records, truncated } = await fetchQuickBooksRecordsSince(
      params.connection,
      config.entity,
      lastPolledAt,
      context.debug.enabled,
    );

    const lastPolledAtDate = new Date(lastPolledAt);
    const created: QuickBooksRecord[] = [];
    const updated: QuickBooksRecord[] = [];

    for (const record of records) {
      const createTime = record.MetaData?.CreateTime;
      const createdAtDate =
        typeof createTime === "string" ? new Date(createTime) : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && params.showNewRecords !== false) created.push(record);
      else if (!isNew && params.showUpdatedRecords !== false)
        updated.push(record);
    }

    
    
    
    let nextCursor = now;
    if (truncated) {
      const latestUpdated = records
        .map((r) => r.MetaData?.LastUpdatedTime)
        .filter((t): t is string => typeof t === "string")
        .sort()
        .pop();
      nextCursor = latestUpdated ?? lastPolledAt;
      context.logger.warn(
        `Polling truncated at the page cap for QuickBooks ${config.entity}. Advancing cursor to ${nextCursor}; next poll will resume from there.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled QuickBooks ${config.entity}: ${records.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});

export default { webhook, pollChangesTrigger };
