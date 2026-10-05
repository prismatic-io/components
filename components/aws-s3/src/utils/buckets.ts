import {
  type Bucket,
  ListBucketsCommand,
  type S3Client,
} from "@aws-sdk/client-s3";
import { LIST_BUCKETS_MAX_BUCKETS } from "../constants";
export const listAllBuckets = async (s3: S3Client): Promise<Bucket[]> => {
  const buckets: Bucket[] = [];
  let continuationToken: string | undefined;
  do {
    const response = await s3.send(
      new ListBucketsCommand({
        MaxBuckets: LIST_BUCKETS_MAX_BUCKETS,
        ContinuationToken: continuationToken,
      }),
    );
    buckets.push(...(response.Buckets ?? []));
    continuationToken = response.ContinuationToken;
  } while (continuationToken);
  return buckets;
};
