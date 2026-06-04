






export const getClosestS3EndpointResponse =
  "https://bynder-public-eu-central-1.s3.amazonaws.com/";

export const initialiseUploadResponse = {
  s3file: {
    uploadid: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
    targetid: "final/B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901/image.jpeg",
  },
  s3_filename: "pluploads/api/B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901/image.jpeg",
  target_key: "pluploads/api/B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901/image.jpeg",
  multipart_params: {
    acl: "private",
    success_action_status: "201",
    "Content-Type": "image/*",
    key: "pluploads/api/B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901/image.jpeg",
    Policy: "AWS_S3_POLICY",
    "X-Amz-Signature": "AWS_S3_SIGNATURE",
    "x-amz-credential": "AWS_S3_AUTH",
    "x-amz-algorithm": "AWS4-HMAC-SHA256",
    "x-amz-date": "20160216T100755Z",
  },
};

export const registerUploadedChunkResponse = {
  status: "ok",
};

export const finaliseCompleteUploadResponse = {
  output: "final/C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012/",
  batchId: "D4E5F6A7-B8C9-0123-D4E5F6A7B8C90123",
  file: {
    bucket: "bynder-public-eu-central-1",
    path: "final/C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012/IMG_1874.JPG",
    type: "s3",
  },
  filename: "final/C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012/IMG_1874.JPG",
  importId: "E5F6A7B8-C9D0-1234-E5F6A7B8C9D01234",
  locationType: "s3",
  success: 1,
};

export const finaliseCompleteUploadAndSaveAsNewAssetResponse = {
  itemId: "F6A7B8C9-D0E1-2345-F6A7B8C9D0E12345",
};

export const retrievePollStateResponse = {
  itemsDone: ["A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890"],
  itemsFailed: [],
  itemsRejected: [],
};

export const saveAsNewAssetResponse = {
  accessRequestId: "B2C3D4E5-F6A7-8901-B2C3D4E5F6A78901",
  mediaid: "C3D4E5F6-A7B8-9012-C3D4E5F6A7B89012",
  batchId: "D4E5F6A7-B8C9-0123-D4E5F6A7B8C90123",
  success: true,
  mediaitems: [
    {
      original: "final/B2C3D4E5-F6A7-8901-B2C3D4E5F6A78901/image.jpg",
      destination:
        "https://d2csxpduxe849s.cloudfront.net/media/example/original/image.jpg",
    },
    {
      original: "final/B2C3D4E5-F6A7-8901-B2C3D4E5F6A78901/thul-image.jpg",
      destination:
        "https://d2csxpduxe849s.cloudfront.net/media/example/thul/image.jpg",
    },
    {
      original: "final/B2C3D4E5-F6A7-8901-B2C3D4E5F6A78901/mini-image.jpg",
      destination:
        "https://d2csxpduxe849s.cloudfront.net/media/example/mini/image.jpg",
    },
  ],
};

export const uploadChunkResponse = {
  PostResponse: {
    Location: [
      "https://bynder-public-us-east-1.s3.amazonaws.com/pluploads%2FA1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890%2Fbrand-logo.pdf",
    ],
    Bucket: ["bynder-public-us-east-1"],
    Key: ["pluploads/A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890/brand-logo.pdf"],
    ETag: ['"1c32d785398e3a7eaab0e9b876903cc6"'],
  },
  filename:
    "api_uploads/B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901/C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012/Logo.png/p5",
};
