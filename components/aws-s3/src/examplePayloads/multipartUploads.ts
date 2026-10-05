import type {
  AbortMultipartUploadCommandOutput,
  CompleteMultipartUploadCommandOutput,
  CreateMultipartUploadCommandOutput,
  ListMultipartUploadsCommandOutput,
  ListPartsCommandOutput,
} from "@aws-sdk/client-s3";
import type { UploadPartPayload } from "../types";
export const listMultipartUploadsExamplePayload: {
  data: ListMultipartUploadsCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "MSB2RAFETTBCQ123",
      extendedRequestId: "Ax6cjVx4lugZGOI+yo3dApqbvrtLD3U",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    Bucket: "some-bucket",
    IsTruncated: false,
    KeyMarker: "",
    MaxUploads: 1000,
    NextKeyMarker: "file.txt",
    NextUploadIdMarker: "itQ2Dw8eMZ01dGiwRIj2dwDqpx",
    UploadIdMarker: "",
    Uploads: [
      {
        UploadId: "hbZQmDNtym9xtdh8XwgT7Ys..FkRWJfV0MUgmNWg",
        Key: "new_file.txt",
        Initiated: new Date("2024-01-25T16:06:31.000Z"),
        StorageClass: "STANDARD",
        Owner: {
          ID: "0edc4b00d",
        },
        Initiator: {
          ID: "0edc4b00d",
        },
      },
    ],
  },
};
export const generatePresignedForMultiparUploadsExamplePayload: {
  data: {
    url: string;
    partNumber: number;
  }[];
} = {
  data: [
    {
      url: "https://my-bucket.s3.us-east-2.amazonaws.com/my-file.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256...",
      partNumber: 1,
    },
  ],
};
export const createMultipartUploadExamplePayload: {
  data: CreateMultipartUploadCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "J4Q9AY99DPMR1234",
      extendedRequestId:
        "P59zKeH2C4Jz3VAC1I+12345Gty4d4gyl9JYQmc4udM6bCB6w/MEg8AKKWUuBH1x0EU2dufwkw=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    ServerSideEncryption: "AES256",
    Bucket: "bucket-name",
    Key: "file.txt",
    UploadId:
      "9DWJzLdFIcK05G2Yq.TNhJbCU57dDZyIRlO_tHcdFgYqWQgtu6XdASs7h.DJlcWk2M9vmEx72gXcS8q5SBu_12345ccg-",
  },
};
export const abortMultipartUploadExamplePayload: {
  data: AbortMultipartUploadCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 204,
      requestId: "DZ1ZJB3H2JB1234",
      extendedRequestId:
        "0D9BDVoAGoHqu3dIW4WHmaO4kkiWecrbf0yLRMe/JmUfX7N/12345=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
  },
};
export const uploadPartExamplePayload: {
  data: UploadPartPayload;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "3Z9FSV3QYRYCK123",
      extendedRequestId:
        "nhNCxtYGnVN+nxfdPaCPgAc23cJw2rphbIU1Z5ZUEmUDXIvF+Ra3eUXv2MNdOoWTIKXEym12345=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    ServerSideEncryption: "AES256",
    ETag: '"266b7131485849fcefe583dcce071234"',
    part: {
      ETag: '"266b7131485849fcefe583dcce071234"',
      PartNumber: 1,
    },
  },
};
export const listPartsExamplePayload: {
  data: ListPartsCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "3Z9CNHKT01WVE123",
      extendedRequestId: "AYcUJyiexeUBBf5Uynsj4m1PojM18tHSxlyKMWzjM+123456=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    Bucket: "bucket-name",
    Initiator: {
      ID: "0edc4b00d1bfae1ebe33617c5cfe04e17b6f1fb9c5c2c55796123456",
    },
    IsTruncated: false,
    Key: "image.jpg",
    MaxParts: 1000,
    NextPartNumberMarker: "1",
    Owner: {
      ID: "0edc4b00d1bfae1ebe33617c5cfe04e17b6f1fb9c5c2c55796123456",
    },
    PartNumberMarker: "0",
    Parts: [
      {
        PartNumber: 1,
        LastModified: new Date("2024-03-11T23:47:51.000Z"),
        ETag: '"266b7131485849fcefe583dcce071234"',
        Size: 65338,
      },
    ],
    StorageClass: "STANDARD",
    UploadId:
      "iHtFwRT6d6IAPwGTlT6tO1iBApulQGCA2sG7yn_BzUKItrnLrWykCbDheQBJrb1MUGHgGfihOY07XfnCeU2CWCZM0kD6VbyC46MJ4123456-",
  },
};
export const completeMultipartUploadExamplePayload: {
  data: CompleteMultipartUploadCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "GD4Y1XMZ6MFV1234",
      extendedRequestId:
        "Ego8CAUdYnt2THhZmBLnbfmTPY0HR8zA9rEMkSg+OB0t/uldGkuBlI6UF9X+123456=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    ServerSideEncryption: "AES256",
    Bucket: "bucket-name",
    ETag: '"d96cf49f8c439501eb19c4728712345-1"',
    Key: "image.jpg",
    Location: "https://bucketname.s3.us-east-2.amazonaws.com/image.jpg",
  },
};
