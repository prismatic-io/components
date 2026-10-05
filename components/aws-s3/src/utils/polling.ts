import { ListObjectsV2Command, type S3Client } from "@aws-sdk/client-s3";
import { LIST_OBJECTS_V2_MAX_KEYS } from "../constants";
import type {
  FileListingCursor,
  FileListingPage,
  FileListingWindow,
  PolledBucket,
  PolledBucketChange,
  PolledFileChange,
  PollingCursorContext,
  PollingState,
  PollingWindow,
} from "../types";
import { listAllBuckets } from "./buckets";
const objectMapper = <T extends object, K extends keyof T & string>(
  object: T,
  key: K,
): Omit<T, K> & Record<K, string> => {
  return {
    ...object,
    [key]: new Date(object[key] as string | number | Date).toISOString(),
  };
};
const floorToSecond = (timestamp: string): string =>
  new Date(Math.floor(Date.parse(timestamp) / 1000) * 1000).toISOString();
export const readLastPolledAt = (
  context: PollingCursorContext,
  now: string,
  lookBackDate: string,
): PollingWindow => {
  const pollState = context.polling.getState() as PollingState;
  const since = pollState.lastPolledAt || lookBackDate || now;
  const inclusive = !pollState.lastPolledAt && Boolean(lookBackDate);
  context.logger.debug(`Polled for changes from: ${since} to ${now}`);
  if (context.debug.enabled) {
    context.logger.debug(`Polling state: ${JSON.stringify(pollState)}`);
  }
  return { since, inclusive };
};
export const resolveFileListingWindow = (
  state: PollingState,
  incoming: FileListingCursor | undefined,
  isBatching: boolean,
  lookBackDate: string,
  now: string,
): FileListingWindow => {
  const inFlight = isBatching ? (incoming ?? state.cursor) : undefined;
  if (inFlight) return inFlight;
  const windowEnd = floorToSecond(now);
  return {
    windowStart: state.lastPolledAt || lookBackDate || windowEnd,
    windowEnd,
  };
};
export const listObjectsInWindow = async (
  s3: S3Client,
  bucket: string,
  { windowStart, windowEnd, startAfter }: FileListingWindow,
  singlePage: boolean,
): Promise<FileListingPage> => {
  const keys: string[] = [];
  let resumeAfter = startAfter;
  do {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        MaxKeys: LIST_OBJECTS_V2_MAX_KEYS,
        StartAfter: resumeAfter,
      }),
    );
    const contents = response.Contents ?? [];
    for (const object of contents) {
      const { Key, LastModified } = objectMapper(object, "LastModified");
      if (
        Key !== undefined &&
        LastModified >= windowStart &&
        LastModified < windowEnd
      ) {
        keys.push(Key);
      }
    }
    resumeAfter = response.IsTruncated
      ? contents[contents.length - 1]?.Key
      : undefined;
  } while (resumeAfter && !singlePage);
  return { keys, startAfter: resumeAfter };
};
export const listBucketsCreatedSince = async (
  s3: S3Client,
  since: string,
  inclusive = false,
): Promise<PolledBucket[]> => {
  const buckets = await listAllBuckets(s3);
  return buckets
    .map((bucket) => objectMapper(bucket, "CreationDate"))
    .filter(({ CreationDate }) =>
      inclusive ? CreationDate >= since : CreationDate > since,
    );
};
export const resolvePolledFileChanges = (
  data: string[] | undefined,
): PolledFileChange[] =>
  (data ?? []).map(
    (record): PolledFileChange => ({ changeType: "changed", record }),
  );
export const resolvePolledBucketChanges = (
  data: PolledBucket[] | undefined,
): PolledBucketChange[] =>
  (data ?? []).map(
    (record): PolledBucketChange => ({ changeType: "created", record }),
  );
