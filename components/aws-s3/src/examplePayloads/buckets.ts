import type {
  Bucket,
  DeleteBucketCommandOutput,
  HeadBucketCommandOutput,
} from "@aws-sdk/client-s3";
export const headBucketExamplePayload: {
  data: HeadBucketCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "A6R8PTRGRVGVB123",
      extendedRequestId:
        "O1lqC0pMNa1+juScFrJbqgtJDQgkqvkcWDvLPfmcZBQNbxe+Bl4JE0WeIuswg/123456==",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
  },
};
export const deleteBucketExamplePayload: {
  data: DeleteBucketCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 204,
      requestId: "CBD415E7",
      extendedRequestId:
        "WXvHrStedS7jFJZVw0Pt1LH3K3Nn99XFGuyELkK7UQANs3IOHs9GsR=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
  },
};
export const listBucketsExamplePayload: {
  data: Bucket[];
} = {
  data: [
    {
      Name: "bucket-1",
      CreationDate: new Date("2024-03-08T23:30:22.000Z"),
    },
  ],
};
export const getBucketLocationExamplePayload: {
  data: string;
} = { data: "us-east-1" };
