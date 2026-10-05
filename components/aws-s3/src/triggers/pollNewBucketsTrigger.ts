import { pollingTrigger } from "@prismatic-io/spectral";
import { createS3Client } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollNewBucketsTriggerExamplePayload } from "../examplePayloads";
import { pollNewBucketsTriggerInputs } from "../inputs";
import type { PolledBucket, PolledBucketChange } from "../types";
import {
  listBucketsCreatedSince,
  readLastPolledAt,
  resolvePolledBucketChanges,
} from "../utils";
export const pollNewBucketsTrigger = pollingTrigger({
  display: {
    label: "New Buckets",
    description:
      "Checks for new buckets in Amazon S3 on a configured schedule.",
  },
  inputs: pollNewBucketsTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PolledBucketChange[] =>
      resolvePolledBucketChanges(
        payload.body.data as PolledBucket[] | undefined,
      ),
  },
  perform: async (
    context,
    payload,
    {
      accessKey,
      awsRegion,
      lookBackDate,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
    },
  ) => {
    const now = new Date().toISOString();
    const { since, inclusive } = readLastPolledAt(context, now, lookBackDate);
    const s3 = await createS3Client({
      awsConnection: accessKey,
      awsRegion,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
      logger: context.logger,
      debug: context.debug.enabled,
    });
    const changes = await listBucketsCreatedSince(s3, since, inclusive);
    context.polling.setState({ lastPolledAt: now });
    return {
      payload: { ...payload, body: { data: changes } },
      polledNoChanges: changes.length === 0,
    };
  },
  examplePayload: pollNewBucketsTriggerExamplePayload,
});
