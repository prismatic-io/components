






export const getAssetResponse = {
  dateModified: "2017-03-09T12:09:29Z",
  propertyOptions: [
    "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
    "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
  ],
  type: "image",
  brandId: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
  fileSize: 3895890,
  id: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
  height: 3301,
  description: "Beautiful grassland picture",
  idHash: "02c3c00b6388a63f",
  name: "Grassland",
  tags: ["2014", "nature"],
  orientation: "landscape",
  width: 4951,
  datePublished: "2017-03-07T14:28:56Z",
  copyright: "",
  extension: ["jpeg"],
  userCreated: "Jane Smith",
  dateCreated: "2017-03-07T14:28:57Z",
  archive: 0,
  property_limitedrights: "Specific rights",
  watermarked: 0,
  limited: 0,
  isPublic: 0,
  thumbnails: {
    mini: "https://d2csxpduxe849s.cloudfront.net/media/example/mini/grassland.jpg",
    webimage:
      "https://d2csxpduxe849s.cloudfront.net/media/example/webimage/grassland.jpg",
    thul: "https://d2csxpduxe849s.cloudfront.net/media/example/thul/grassland.jpg",
  },
  transformBaseUrl:
    "https://example.bynder.com/transform/D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123/Grassland",
};

export const listAssetsResponse = [
  getAssetResponse,
  {
    dateModified: "2015-07-28T10:46:59Z",
    propertyOptions: [
      "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
      "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
    ],
    type: "video",
    brandId: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
    fileSize: 63973541,
    id: "E5F6A7B8-C9D0-1234-E5F6-A7B8C9D01234",
    height: 0,
    description: "",
    idHash: "536f140e0ba62e46",
    name: "App Instruction Video",
    tags: ["tutorial videos", "tutorial", "video"],
    orientation: "landscape",
    width: 0,
    datePublished: "2015-07-23T10:46:00Z",
    copyright: "",
    extension: ["mp4"],
    userCreated: "",
    dateCreated: "2015-07-23T17:20:19Z",
    archive: 0,
    property_assettype: ["video"],
    watermarked: 0,
    limited: 1,
    videoPreviewURLs: [
      "https://d2csxpduxe849s.cloudfront.net/media/example/video/app-instruction.webm",
      "https://d2csxpduxe849s.cloudfront.net/media/example/video/app-instruction.mp4",
    ],
    thumbnails: {
      mini: "https://d2csxpduxe849s.cloudfront.net/media/example/mini/app-instruction.jpg",
      webimage:
        "https://d2csxpduxe849s.cloudfront.net/media/example/webimage/app-instruction.jpg",
      "67E391FA":
        "https://d2csxpduxe849s.cloudfront.net/media/example/67E391FA/app-instruction.jpg",
      thul: "https://d2csxpduxe849s.cloudfront.net/media/example/thul/app-instruction.jpg",
    },
    isPublic: 1,
    original:
      "https://d2csxpduxe849s.cloudfront.net/media/example/original/app-instruction.mp4",
    transformBaseUrl:
      "https://example.bynder.com/transform/E5F6A7B8-C9D0-1234-E5F6-A7B8C9D01234/AppInstructionVideo",
  },
];

export const downloadSpecificAssetItemResponse = {
  disclaimer:
    "<p>1. The photographs and video in the mediabank are to be used by anyone and everyone.</p>",
  s3_file:
    "https://bynder-public-us-east-1.s3.amazonaws.com/temp/download-token/asset.jpg",
};

export const genericUpdateResponse = {
  message: "Accepted",
  statuscode: 202,
};

export const genericCreateResponse = {
  message: "Created",
  statuscode: 201,
};
