export const listUsersResponse = [
  {
    email2: "__USER_EMAIL_2__",
    salesrepId: "",
    name: "David",
    id: "00000000-0000-0000-0000000000000000",
    active: 1,
    isSSOOnly: false,
    username: "__USER_USERNAME__",
    email: "__USER_EMAIL__",
    profileId: "00000000-0000-0000-0000000000000000",
    groups: [
      {
        name: "Bynder",
        id: "00000000-0000-0000-0000000000000000",
      },
      {
        name: "Product",
        id: "00000000-0000-0000-0000000000000000",
      },
    ],
  },
  {
    email2: "__USER_EMAIL_2__",
    salesrepId: "",
    name: "Jake",
    id: "00000000-0000-0000-0000000000000001",
    active: 1,
    isSSOOnly: true,
    username: "__USER_USERNAME__",
    email: "__USER_EMAIL__",
    profileId: "00000000-0000-0000-0000000000000000",
    groups: [
      {
        name: "Bynder",
        id: "00000000-0000-0000-0000000000000000",
      },
    ],
  },
];

export const getUserResponse = {
  phoneNumber: "+00 123456789",
  profileId: "00000000-0000-0000-0000000000000000",
  lastLogin: "2017-03-10T15:42:03Z",
  department: "Development",
  job: "Developer",
  state: "",
  firstname: "John",
  city: "Amsterdam",
  infix: "",
  timeZone: "Africa/Lusaka",
  username: "user123",
  email: "john.doe@xample.com",
  persisted: true,
  legalEntity: "",
  county: "",
  postalCode: "",
  language: "en_GB",
  country: "Netherlands",
  costCenter: "",
  groups: [
    {
      name: "Bynder",
      id: "00000000-0000-0000-0000000000000000",
    },
    {
      name: "Product",
      id: "00000000-0000-0000-0000000000000000",
    },
  ],
  lastname: "Doe",
  cellphoneNumber: "",
  employeeNumber: "",
  departmentCode: "",
  gender: "U",
  id: "00000000-0000-0000-0000000000000000",
  companyName: "Bynder",
  active: true,
  isSSOOnly: false,
  address: "",
  terms:
    "Digital Asset Management System Terms and Conditions <br/>\n<br/>\n  Overview<br/><br/>\n  All assets are free to use as long as these terms and conditions and license rules are followed.\nAll assets can not be used in paid advertising without the permission of Bynder.<br/><br/>",
};

export const createUserResponse = {
  id: "00000000-0000-0000-0000000000000000",
  username: "user123",
};

export const getSecurityProfileResponse = {
  name: "Internal Limited user",
  id: "00000000-0000-0000-0000000000000001",
  roles: ["MEDIADOWNLOAD", "SHARING", "MEDIAOVERVIEW", "MEDIAHIGHRES"],
};

export const listSecurityProfilesResponse = [
  getSecurityProfileResponse,
  {
    name: "Content/Brand Manager",
    id: "00000000-0000-0000-0000000000000000",
    roles: ["PUBLICCOLLECTIONS", "GROUPSHARING", "COLLECTIONS"],
  },
];

export const getAssetResponse = {
  dateModified: "2017-03-09T12:09:29Z",
  propertyOptions: [
    "00000000-0000-0000-0000000000000000",
    "00000000-0000-0000-0000000000000001",
  ],
  type: "image",
  brandId: "00000000-0000-0000-0000000000000000",
  fileSize: 3895890,
  id: "00000000-0000-0000-0000000000000000",
  height: 3301,
  description: "Beautiful grassland picture",
  idHash: "02c3c00b6388a63f",
  name: "Grassland",
  tags: ["2014", "25249181"],
  orientation: "landscape",
  width: 4951,
  datePublished: "2017-03-07T14:28:56Z",
  copyright: "",
  extension: ["jpeg"],
  userCreated: "John Doe",
  dateCreated: "2017-03-07T14:28:57Z",
  archive: 0,
  property_limitedrights: "Specific rights",
  watermarked: 0,
  limited: 0,
  isPublic: 0,
  thumbnails: {
    mini: "___URL_TO_BYNDER_CDN___",
    webimage: "___URL_TO_BYNDER_CDN___",
    thul: "___URL_TO_BYNDER_CDN___",
  },
  transformBaseUrl:
    "https://example.bynder.com/transform/01234567-89ab-cdef-0123-456789abcdef/AssetName",
};

export const listAssetsResponse = [
  getAssetResponse,
  {
    dateModified: "2015-07-28T10:46:59Z",
    propertyOptions: [
      "00000000-0000-0000-0000000000000000",
      "00000000-0000-0000-0000000000000001",
    ],
    type: "video",
    brandId: "00000000-0000-0000-0000000000000000",
    fileSize: 63973541,
    id: "00000000-0000-0000-0000000000000001",
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
      "___URL_TO_BYNDER_CDN___.webm",
      "___URL_TO_BYNDER_CDN___.mp4",
    ],
    thumbnails: {
      mini: "___URL_TO_BYNDER_CDN___",
      webimage: "___URL_TO_BYNDER_CDN___",
      "67E391FA": "___URL_TO_BYNDER_CDN___",
      thul: "___URL_TO_BYNDER_CDN___",
    },
    isPublic: 1,
    original: "___URL_TO_BYNDER_CDN___",
    transformBaseUrl:
      "https://example.bynder.com/transform/01234567-89ab-cdef-0123-456789abcdef/AssetName",
  },
];

export const genericUpdateResponse = {
  message: "Accepted",
  statuscode: 202,
};

export const genericCreateResponse = {
  message: "Created",
  statuscode: 201,
};

export const getClosestS3EndpointResponse =
  "https://bynder-public-eu-central-1.s3.amazonaws.com/";

export const initialiseUploadResponse = {
  s3file: {
    uploadid: "UPLOAD_ID",
    targetid: "final/00000000-0000-0000-0000-000000000000/image.jpeg",
  },
  s3_filename: "pluploads/api/00000000-0000-0000-0000-000000000000/image.jpeg",
  target_key: "pluploads/api/00000000-0000-0000-0000-000000000000/image.jpeg",
  multipart_params: {
    acl: "private",
    success_action_status: "201",
    "Content-Type": "image/*",
    key: "pluploads/api/00000000-0000-0000-0000-000000000000/image.jpeg",
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
  output: "final/2ba07d00-586a-4a44-b13c-c58598cfe828/",
  batchId: "00000000-0000-0000-0000000000000000",
  file: {
    bucket: "BUCKET",
    path: "final/2ba07d00-586a-4a44-b13c-c58598cfe828/IMG_1874.JPG",
    type: "s3",
  },
  filename: "final/2ba07d00-586a-4a44-b13c-c58598cfe828/IMG_1874.JPG",
  importId: "000000000-0000-0000-0000000000000000",
  locationType: "s3",
  success: 1,
};

export const finaliseCompleteUploadAndSaveAsNewAssetResponse = {
  itemId: "21F24BCF-DD76-4FE3-9B7C5936A2FA958C",
};

export const retrievePollStateResponse = {
  itemsDone: ["00000000-0000-0000-0000000000000000"],
  itemsFailed: [],
  itemsRejected: [],
};

export const saveAsNewAssetResponse = {
  accessRequestId: "00000000-0000-0000-0000000000000000",
  mediaid: "00000000-0000-0000-0000000000000000",
  batchId: "00000000-0000-0000-0000000000000000",
  success: true,
  mediaitems: [
    {
      original: "final/00000000-0000-0000-0000000000000000/image.jpg",
      destination: "___URL_TO_BYNDER_CDN___",
    },
    {
      original: "final/00000000-0000-0000-0000000000000000/thul-image.jpg",
      destination: "___URL_TO_BYNDER_CDN___",
    },
    {
      original: "final/00000000-0000-0000-0000000000000000/mini-image.jpg",
      destination: "___URL_TO_BYNDER_CDN___",
    },
  ],
};

export const downloadSpecificAssetItemResponse = {
  disclaimer:
    "<p>1. The photographs and video in the mediabank are to be used by anyone and everyone.</p>",
  s3_file: "___TEMPORARY_DOWNLOAD_URL___",
};

export const getCollectionResponse = {
  userId: "48817BA7-2FC3-4A43-918761514D322C15",
  dateModified: "March, 08 2017 14:17:37 +0000",
  filename: "collection_1",
  dateCreated: "March, 01 2017 10:49:12 +0000",
  collectionCount: 2,
  id: "00B627BB-8054-44C0-A343FCF40BC790CD",
  name: "Collection 1",
  cover: {
    thumbnail: "___URL_TO_BYNDER_CDN___",
    thumbnails: [
      "___URL_TO_BYNDER_CDN___",
      "___URL_TO_BYNDER_CDN___",
      "___URL_TO_BYNDER_CDN___",
    ],
    large: "___URL_TO_BYNDER_CDN___",
  },
  user: {
    id: "48817BA7-2FC3-4A43-918761514D322C15",
    name: "John Doe",
  },
  description: "Collection 1 with various assets.",
  IsPublic: 1,
};

export const listCollectionsResponse = {
  collections: [
    getCollectionResponse,
    {
      userId: "80E53210-5BB0-4BF9-907F917D457801BB",
      dateModified: "March, 10 2017 07:57:18 +0000",
      filename: "collection_2",
      dateCreated: "October, 30 2014 13:54:00 +0000",
      collectionCount: 4,
      id: "050960F7-98B3-461D-B967F4B84D3A3866",
      name: "Collection 2",
      cover: {
        thumbnail: "___URL_TO_BYNDER_CDN___",
        thumbnails: [
          "___URL_TO_BYNDER_CDN___",
          "___URL_TO_BYNDER_CDN___",
          "___URL_TO_BYNDER_CDN___",
        ],
        large: "___URL_TO_BYNDER_CDN___",
      },
      user: {
        id: "80E53210-5BB0-4BF9-907F917D457801BB",
        name: "Jane Doe",
      },
      description: "Collection 2 with various assets.",
      IsPublic: 0,
    },
  ],
  count: 151,
};

export const getAccountInformationResponse = {
  availableLanguages: [
    "nl_NL",
    "en_GB",
    "en_US",
    "fr_FR",
    "de_DE",
    "it_IT",
    "es_ES",
    "pl_PL",
  ],
  defaultLanguage: "en_US",
  name: "Bynder",
  timeZone: "Europe/Amsterdam",
  isOpenImageBank: false,
};

export const listCampaignsResponse = [
  {
    dateStart: "2017-02-01T00:00:00+00:00",
    description: "Campaign example",
    responsibleID: "00000000-0000-0000-0000-000000000000",
    dateModified: "2017-01-10T07:43:12+00:00",
    dateCreated: "2017-01-10T07:43:12+00:00",
    ID: "00000000-0000-0000-0000-000000000000",
    deadline: "2017-03-03T00:00:00",
    createdByID: "00000000-0000-0000-0000-000000000000",
    accountID: "00000000-0000-0000-0000-000000000000",
    presetID: "00000000-0000-0000-0000-000000000000",
    closed: false,
    key: "excp",
    name: "Example campaign",
    thumbnailURL:
      "https://bynder-public-eu-central-1.s3.eu-central-1.amazonaws.com:443/workflow/campaign/988BBB04-F0E2-4A28-B5F892890849BAFE/FEE78434-649A-449B-A62A1C6C6D59CAC3/500x500.jpg",
    campaignMetaproperties: "00000000-0000-0000-0000-000000000000",
  },
  {
    dateStart: "2017-02-01T00:00:00+00:00",
    description: "Campaign example",
    responsibleID: "00000000-0000-0000-0000-000000000000",
    dateModified: "2017-01-10T07:43:12+00:00",
    dateCreated: "2017-01-10T07:43:12+00:00",
    ID: "00000000-0000-0000-0000-000000000000",
    deadline: "2017-03-03T00:00:00",
    createdByID: "00000000-0000-0000-0000-000000000000",
    accountID: "00000000-0000-0000-0000-000000000000",
    presetID: "00000000-0000-0000-0000-000000000000",
    closed: false,
    key: "excp",
    name: "Example campaign",
    thumbnailURL:
      "https://bynder-public-eu-central-1.s3.eu-central-1.amazonaws.com:443/workflow/campaign/988BBB04-F0E2-4A28-B5F892890849BAFE/FEE78434-649A-449B-A62A1C6C6D59CAC3/500x500.jpg",
    campaignMetaproperties: "00000000-0000-0000-0000-000000000000",
  },
];

export const getCampaignResponse = {
  dateStart: "2017-02-01T00:00:00+00:00",
  description: "Campaign example",
  responsibleID: "00000000-0000-0000-0000-000000000000",
  dateModified: "2017-01-10T07:43:12+00:00",
  dateCreated: "2017-01-10T07:43:12+00:00",
  ID: "00000000-0000-0000-0000-000000000000",
  presetID: "00000000-0000-0000-0000-000000000000",
  deadline: "2017-03-03T00:00:00",
  createdByID: "00000000-0000-0000-0000-000000000000",
  accountID: "00000000-0000-0000-0000-000000000000",
  closed: false,
  key: "excp",
  name: "Example campaign",
  thumbnailURL:
    "https://bynder-public-eu-central-1.s3.eu-central-1.amazonaws.com:443/workflow/campaign/988BBB04-F0E2-4A28-B5F892890849BAFE/FEE78434-649A-449B-A62A1C6C6D59CAC3/500x500.jpg",
  campaignMetaproperties: "00000000-0000-0000-0000-000000000000",
};

export const createCampaignResponse = {
  name: "Example campaign",
  key: "excp",
  description: "Campaign example",
  dateStart: "2015-01-01T00:00:00",
  deadline: "2015-09-04T00:00:00",
  responsibleID: "00000000-0000-0000-0000-000000000000",
  campaignMetaproperties: "00000000-0000-0000-0000-000000000000",
};

export const getJobResponse = {
  job_stages: [
    {
      position: 1,
      status: "Approved",
      id: "00000000-0000-0000-0000-000000000000",
    },
    {
      position: 2,
      status: "Active",
      id: "00000000-0000-0000-0000-000000000000",
    },
    {
      position: 3,
      status: "Idle",
      id: "00000000-0000-0000-0000-000000000000",
    },
  ],
  dateModified: "2017-03-30T11:43:19+00:00",
  presetID: null,
  createdByID: "00000000-0000-0000-0000-000000000000",
  job_next_stage: {
    position: 3,
    status: "Idle",
    id: "00000000-0000-0000-0000-000000000000",
  },
  id: "00000000-0000-0000-0000-000000000000",
  description: "",
  accountableID: "00000000-0000-0000-0000-000000000000",
  basedOnPreset: false,
  dateCreated: "2017-03-30T11:42:30+00:00",
  job_active_stage: {
    position: 2,
    status: "Active",
    id: "00000000-0000-0000-0000-000000000000",
  },
  deadline: null,
  name: "Test API",
  campaignID: "00000000-0000-0000-0000-000000000000",
  job_previous_stage: {
    position: 1,
    status: "Approved",
    id: "00000000-0000-0000-0000-000000000000",
  },
};

export const listJobsResponse = [
  {
    job_stages: [
      {
        position: 1,
        status: "Approved",
        id: "00000000-0000-0000-0000-000000000000",
      },
      {
        position: 2,
        status: "Active",
        id: "00000000-0000-0000-0000-000000000000",
      },
      {
        position: 3,
        status: "Idle",
        id: "00000000-0000-0000-0000-000000000000",
      },
    ],
    dateModified: "2017-03-30T11:43:19+00:00",
    presetID: null,
    jobMetaproperties: {
      "00000000-0000-0000-0000-000000000000": "City",
    },
    createdByID: "00000000-0000-0000-0000-000000000000",
    job_next_stage: {
      position: 3,
      status: "Idle",
      id: "00000000-0000-0000-0000-000000000000",
    },
    id: "00000000-0000-0000-0000-000000000000",
    description: "",
    accountableID: "00000000-0000-0000-0000-000000000000",
    basedOnPreset: false,
    dateCreated: "2017-03-30T11:42:30+00:00",
    job_active_stage: {
      position: 2,
      status: "Active",
      id: "00000000-0000-0000-0000-000000000000",
    },
    deadline: null,
    name: "Test API",
    campaignID: "00000000-0000-0000-0000-000000000000",
    job_previous_stage: {
      position: 1,
      status: "Approved",
      id: "00000000-0000-0000-0000-000000000000",
    },
  },
  getJobResponse,
];

export const getMediaOfJobResponse = [
  {
    original_url: "https://url.to.file/original.png",
    filename: "filename.png",
    orientation: "square",
    status: "AwaitingApproval",
    dateCreated: "2021-05-12T08:48:01+00:00",
    dateModified: "2021-05-12T08:51:22+00:00",
    responsible_name: "John Doe",
    version: 1,
    uploader_name: "John Doe",
    versionParentID: null,
    id: "00000000-0000-0000-0000-000000000000",
    previews: [
      {
        type: "thumbnail",
        url: "https://url.to.file/preview.png",
      },
      {
        type: "preview",
        url: "https://url.to.file/preview.png",
      },
      {
        type: "activity",
        url: "https://url.to.file/preview.png",
      },
    ],
    sub_versions: [
      {
        original_url: "https://url.to.file/original.png",
        filename: "filename.png",
        orientation: "square",
        status: "AwaitingApproval",
        dateCreated: "2021-05-13T08:48:01+00:00",
        dateModified: "2021-05-13T08:51:22+00:00",
        responsible_name: "John Doe",
        version: 2,
        uploader_name: "John Doe",
        versionParentID: "00000000-0000-0000-0000-000000000000",
        id: "00000000-0000-0000-0000-000000000000",
        previews: [
          {
            type: "thumbnail",
            url: "https://url.to.file/preview.png",
          },
          {
            type: "preview",
            url: "https://url.to.file/preview.png",
          },
          {
            type: "activity",
            url: "https://url.to.file/preview.png",
          },
        ],
        sub_versions: [],
      },
    ],
  },
];

export const updateJobResponse = {
  status: "Created",
  job_id: "00000000-0000-0000-0000-000000000000",
};

export const createJobResponse = {
  name: "Job Example",
  description: "Job Description",
  deadline: "2018-09-29",
  campaignID: "00000000-0000-0000-0000-000000000000",
  accountableID: "00000000-0000-0000-0000-000000000000",
  presetID: "00000000-0000-0000-0000-000000000000",
  jobMetaproperties: {
    "00000000-0000-0000-0000-000000000000":
      "00000000-0000-0000-0000-000000000000",
  },
  stages: [
    {
      description: "Awesome description",
      preset_stage_id: "00000000-0000-0000-0000-000000000000",
      name: "Review ",
      responsibleID: "00000000-0000-0000-0000-000000000000",
      deadline: "2018-09-29",
    },
    {
      description: "Stage description",
      preset_stage_id: "00000000-0000-0000-0000-000000000000",
      name: "Approval",
      responsibleGroupID: "00000000-0000-0000-0000-000000000000",
      deadline: "2018-09-29",
    },
  ],
};

export const listOrdersResponse = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    order_ref: "NA13334",
    net_price: 0,
    date_created: "2018-10-25T14:26:01+00:00",
    username: "john.doe@bynder.com",
    account_name: "Bynder",
    order_status: "In production",
    currency_symbol: "8364",
  },
  {
    id: "00000000-0000-0000-0000-000000000000",
    order_ref: "US12774",
    net_price: 79,
    date_created: "2018-09-10T12:12:21+00:00",
    username: "john.doe@bynder.com",
    account_name: "Bynder",
    order_status: "Waiting for approval",
    currency_symbol: "36",
  },
];

export const getOrderInfoResponse = {
  id: "00000000-0000-0000-0000000000000000",
  dateCreated: "2015-06-01T08:36:18Z",
  status: "IN_PRODUCTION",
  orderReference: "NL0456",
};

export const getOrderResponse = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    orderId: "00000000-0000-0000-0000-000000000000",
    product: {
      id: "00000000-0000-0000-0000-000000000000",
      name: "Train the trainer product",
      description: "This is such a nice product!",
      isFeatured: false,
      product_number: "999999999",
      supplier_number: null,
      size_height: 1,
      size_width: 1,
      size_depth: 1,
      weight: 1,
      min_quantity: 1,
      max_quantity: 10,
      default_quantity: 1,
      datecreated: "2016-08-10T12:14:16+00:00",
      isActive: true,
      product_type: "print",
      product_package: "unit",
      countries: null,
      sku: "1",
      step: 1,
      display_length_unit: "cm",
      isFree: false,
      pages: null,
      language: null,
      supplier_version_specifier: null,
      isShipping: false,
    },
    referenceId: "999999999",
    name: "Train the trainer product",
    description: "",
    itemPrice: 0.2333,
    quantity: 3,
    supplier: null,
    customerReference: null,
    metaproperties: null,
  },
];

export const listBrandsResponse = [
  {
    image: "___URL_TO_BYNDER_CDN___",
    name: "Bynder Brand Portal",
    id: "00000000-0000-0000-0000000000000000",
    description: "",
    subBrands: [
      {
        id: "00000000-0000-0000-0000000000000000",
        description: "",
        name: "Sub Portal One",
        image: "",
      },
      {
        id: "00000000-0000-0000-0000000000000001",
        description: "",
        name: "Sub Portal Two",
        image: "",
      },
    ],
  },
  {
    image: "___URL_TO_BYNDER_CDN___",
    name: "Byndy Brand Portal",
    id: "00000000-0000-0000-0000000000000001",
    description: "",
    subBrands: [],
  },
];

export const uploadChunkResponse = {
  PostResponse: {
    Location: [
      "https://bynder-public-us-east-1.s3.amazonaws.com/pluploads%2Fa9db39d8-ff60-4292-b189-97f81213bb69%2FpdfValue.pdf",
    ],
    Bucket: ["bynder-public-us-east-1"],
    Key: ["pluploads/a9db39d8-ff60-4292-b189-97f81213bb69/pdfValue.pdf"],
    ETag: ['"1c32d785398e3a7eaab0e9b876903cc6"'],
  },
  filename:
    "api_uploads/00000000-0000-0000-0000000000000000/00000000-0000-0000-0000000000000000/Logo.png/p5",
};

export const listMetapropertiesResponse = {
  Colours: {
    isMultiselect: 0,
    isMultifilter: 0,
    isRequired: 0,
    isMainfilter: 1,
    isFilterable: 1,
    isApiField: 1,
    isDisplayField: 0,
    isDrilldown: 0,
    isEditable: 1,
    name: "colours",
    label: "Colours",
    zindex: 16,
    id: "00000000-0000-0000-0000000000000000",
    type: "sidebar",
    showInListView: 1,
    showInGridView: 0,
    showInDuplicateView: 0,
    useDependencies: 0,
    options: [
      {
        displayLabel: "Yellow",
        date: "February, 15 2017 14:54:58 +0000",
        pregeneratedZipFileSize: 0,
        linkedOptionIds: [],
        isSelectable: 1,
        zindex: 1,
        product_suffix: "",
        name: "yellow",
        id: "00000000-0000-0000-0000000000000000",
        active: 1,
        label: "Yellow",
        labels: {
          nl_NL: "Geel",
          en_US: "Yellow",
        },
        descriptions: {},
        description: "",
        hideByDefault: 0,
        image: "___URL_TO_BYNDER_CDN___",
      },
      {
        displayLabel: "Red",
        date: "February, 15 2017 15:50:55 +0000",
        pregeneratedZipFileSize: 0,
        linkedOptionIds: [],
        isSelectable: 1,
        zindex: 1,
        product_suffix: "",
        name: "red",
        id: "00000000-0000-0000-0000000000000001",
        active: 1,
        label: "Red",
        labels: {
          nl_NL: "Rood",
          en_US: "Red",
        },
        descriptions: {},
        description: "",
        hideByDefault: 0,
        image: "___URL_TO_BYNDER_CDN___",
      },
    ],
  },
  Bob_button: {
    isMultiselect: 0,
    isMultifilter: 0,
    isRequired: 0,
    isMainfilter: 1,
    isFilterable: 1,
    isApiField: 1,
    isDisplayField: 0,
    isDrilldown: 0,
    isEditable: 1,
    name: "Bob_button",
    label: "Bob_button",
    zindex: 2,
    id: "00000000-0000-0000-0000000000000001",
    type: "button",
    showInListView: 1,
    showInGridView: 0,
    showInDuplicateView: 0,
    useDependencies: 0,
    options: [],
  },
};

export const getJobPresetResponse = {
  preset: {
    ID: "00000000-0000-0000-0000-000000000000",
    name: "API name",
    wf_uuid: "00000000-0000-0000-0000-000000000000",
    ftp_settings: {},
    presetstages: [
      {
        description: "",
        ID: "00000000-0000-0000-0000-000000000000",
        name: "Revision Stage ",
        position: 1,
        editableBy: "all",
        restrictToGroupID: null,
        type: "download",
        responsibleID: null,
        responsibleGroupID: null,
      },
    ],
  },
};

export const selectCampaignResponse = [
  {
    key: "123",
    label: "Campaign Name (ID: 123)",
  },
];

export const selectCollectionResponse = [
  {
    key: "123",
    label: "Collection Name (ID: 123)",
  },
];

export const selectJobResponse = [
  {
    key: "123",
    label: "Job Name (ID: 123)",
  },
];
