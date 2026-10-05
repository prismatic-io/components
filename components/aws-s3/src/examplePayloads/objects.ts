import type {
  CopyObjectCommandOutput,
  DeleteObjectCommandOutput,
  DeleteObjectsCommandOutput,
  GetObjectAttributesCommandOutput,
  HeadObjectCommandOutput,
  PutObjectCommandOutput,
} from "@aws-sdk/client-s3";
export const headObjectExamplePayload: {
  data: HeadObjectCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "2GNCNQ9QYJF91H2H3",
      extendedRequestId:
        "20td2yhMFyFEFYm7Wh+P+qr8DDva152du5KA+JFU7ZRuHWLFZZxdLCOVfnMF41K2BYQ/12345=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    AcceptRanges: "bytes",
    LastModified: new Date("2021-08-25T20:00:00.000Z"),
    ContentLength: 65338,
    ETag: '"266b7131485849fcefe583dcce654321"',
    VersionId: "0Ec_RdbYOEQ1Un2HllBJbGG758RS3UuZ",
    ContentType: "image/jpeg",
    ServerSideEncryption: "AES256",
    Metadata: {},
  },
};
export const deleteObjectsExamplePayload: {
  data: DeleteObjectsCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "FAQAVT",
      extendedRequestId: "T/nk6UtPuVs11K6ji59C8phr==",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    Deleted: [
      {
        Key: "file.csv",
      },
      {
        Key: "audio.mp3",
      },
    ],
  },
};
export const getObjectAttributesExamplePayload: {
  data: GetObjectAttributesCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "0AJN29JBC3D5BNB6",
      extendedRequestId:
        "sVW4/xKq7DkMI8kgvbJUNWbzzZ9H6GKqyVocDm3uE4y7dZ6GmZcFrIC9MPGDjSNXMMn8CtLO8Vy0SxOcNOwl2A==",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    LastModified: new Date("2024-03-08T22:20:41.000Z"),
    VersionId: "0Ec_RdbYOEQ1Un2HllBJbGG758RS3UuZ",
    ObjectSize: 515400,
  },
};
export const copyObjectExamplePayload: {
  data: CopyObjectCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "C4KXHZ9F2QQEM123",
      extendedRequestId:
        "8pTnwvKfHXQyoNr3xJ2mZcVbLdE9qASgWx4RfUo6hP1cB0iYkMz5T7uV+123456=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    CopyObjectResult: {
      ETag: '"9a0364b9e99bb480dd25e1f0284c8555"',
      LastModified: new Date("2024-03-11T23:47:51.000Z"),
    },
  },
};
export const deleteObjectExamplePayload: {
  data: DeleteObjectCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 204,
      requestId: "FAQAVT3H2JB1234",
      extendedRequestId:
        "0D9BDVoAGoHqu3dIW4WHmaO4kkiWecrbf0yLRMe/JmUfX7N/12345=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    DeleteMarker: true,
    VersionId:
      "3/L4kqtJlcpXroDTDmJ+rmSpXd3dIbrHY+MTRCxf3vjVBH40Nr8X8gdRQBpUMLUo",
    RequestCharged: "requester",
  },
};
export const getObjectExamplePayload = {
  data: Buffer.from("Example File Contents"),
  contentType: "application/octet",
};
export const listObjectsExamplePayload: {
  data: string[];
} = {
  data: [
    "invoices/2024-01-15.pdf",
    "images/logo.png",
    "backups/database-dump.sql",
  ],
};
export const putObjectExamplePayload: {
  data: PutObjectCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "R8N3F7QZ9KXWM123",
      extendedRequestId:
        "P59zKeH2C4Jz3VAC1I+12345Gty4d4gyl9JYQmc4udM6bCB6w/MEg8AKKWUuBH1x0EU2dufwkw=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    ETag: '"9a0364b9e99bb480dd25e1f0284c8555"',
    VersionId:
      "3sL4kqtJlcpXroDTDmJ+rmSpXd3dIbrHY+MTRCxf3vjVBH40Nr8X8gdRQBpUMLUo",
  },
};
export const generatePresignedUrlExamplePayload: {
  data: string;
} = {
  data: "https://my-bucket.s3.us-east-2.amazonaws.com/my-file.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256...",
};
