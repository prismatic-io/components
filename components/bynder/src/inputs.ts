import { input, util } from "@prismatic-io/spectral";
import { METAPROPERTY_TYPES, ORDER_STATUSES } from "./constants";
import { initialiseUploadResponse } from "./examplePayloads";
import type { OrderStatus } from "./types";
import {
  cleanCodeInput,
  cleanKeyValueListInput,
  cleanNumber,
  cleanString,
  cleanValueListInput,
} from "./util";

export { debugRequest } from "@prismatic-io/spectral/dist/clients/http/inputs";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const id = input({
  label: "ID",
  type: "string",
  required: true,
  comments: "The ID of the resource to retrieve",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "00000000-0000-0000-0000000000000000",
  clean: cleanString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "Whether to fetch all results. If true, limit and page parameters are ignored.",
  default: "true",
  clean: util.types.toBool,
});

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments: "The page number to retrieve",
  example: "1",
  placeholder: "1",
  clean: cleanString,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments:
    "Maximum results to return. If limit is not provided, all results are returned.",
  example: "100",
  placeholder: "100",
  clean: cleanString,
});

export const includeInActive = input({
  label: "Include Inactive",
  type: "boolean",
  required: false,
  comments: "Whether to include inactive users in the list of results.",
  clean: util.types.toBool,
});

export const count = input({
  label: "Count",
  type: "boolean",
  required: false,
  comments:
    "Indicating whether or not the response should include count results. This parameter when passed as true overrides the total parameter.",
  clean: util.types.toBool,
});

export const total = input({
  label: "Total",
  type: "boolean",
  required: false,
  comments:
    "Indicating whether or not the response should include the total count of results.",
  clean: util.types.toBool,
});

export const username = input({
  label: "Username",
  type: "string",
  required: false,
  comments:
    "Username for login. If not defined it will take your email as username.",
  example: "user123",
  placeholder: "user123",
  clean: cleanString,
});

export const password = input({
  label: "Password",
  type: "string",
  required: true,
  comments: "Password for login.",
  example: "password",
  placeholder: "password",
  clean: cleanString,
});

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  comments: "Email address for login.",
  example: "test@test.com",
  placeholder: "test@test.com",
  clean: cleanString,
});

export const profileId = input({
  label: "Profile ID",
  type: "string",
  required: true,
  comments:
    "Security profile id for determining the user's rights. Can be retrieved by using the Retrieve security profiles call.",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "00000000-0000-0000-0000000000000000",
  clean: cleanString,
});

export const firstname = input({
  label: "First Name",
  type: "string",
  required: true,
  comments: "First name of the user.",
  example: "John",
  placeholder: "John",
  clean: cleanString,
});

export const lastname = input({
  label: "Last Name",
  type: "string",
  required: true,
  comments: "Last name of the user.",
  example: "Doe",
  placeholder: "Doe",
  clean: cleanString,
});

export const bodyData = input({
  label: "Data",
  type: "code",
  language: "json",
  required: false,
  comments: "Extra fields to be included in the request. Must be valid JSON.",
  example: JSON.stringify(
    {
      active: 1,
      job: "Developer",
      department: "Development",
      phoneNumber: "+00 123456789",
    },
    null,
    2,
  ),
  clean: cleanCodeInput,
});

export const extraParams = input({
  label: "Extra Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Extra parameters to be included in the request.",
  clean: cleanKeyValueListInput,
});

export const versions = input({
  label: "Versions",
  type: "boolean",
  required: false,
  comments:
    "Include information about the different asset media items including versions.",
  clean: util.types.toBool,
});

export const stats = input({
  label: "Stats",
  type: "boolean",
  required: false,
  comments: "Include information about views and downloads.",
  clean: util.types.toBool,
});

export const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments:
    "Name of the asset, beware the asset will have no name when this is empty.",
  example: "Asset Name",
  placeholder: "Asset Name",
  clean: cleanString,
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "Asset description.",
  example: "Extended asset description",
  placeholder: "Extended asset description",
  clean: cleanString,
});

export const copyright = input({
  label: "Copyright",
  type: "string",
  required: false,
  comments: "Copyright information of the asset.",
  example: "Copyright (c) Example corp",
  placeholder: "Copyright (c) Example corp",
  clean: cleanString,
});

export const metapropertyId = input({
  label: "Metaproperty ID",
  type: "string",
  required: true,
  comments: "Id of the metaproperty from which you want to add options.",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "00000000-0000-0000-0000000000000000",
  clean: cleanString,
});

export const metapropertyOptionsIds = input({
  label: "Metaproperty Options IDs",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "List of metaproperty option ids you want to add to the asset.",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "00000000-0000-0000-0000000000000000",
  clean: cleanValueListInput,
});

export const multipartParams = input({
  label: "Multipart Parameters",
  type: "code",
  language: "json",
  required: true,
  comments:
    "Parameters for the multipart upload. Use all the fields from the response of the initialise upload call.",
  example: JSON.stringify(initialiseUploadResponse.multipart_params, null, 2),
  clean: cleanCodeInput,
});

export const file = input({
  label: "File",
  type: "string",
  required: true,
  comments: "File or chunk of the file to be uploaded.",
  clean: util.types.toData,
});

export const chunks = input({
  label: "Chunks",
  type: "string",
  required: true,
  comments: "Total number of chunks.",
  clean: cleanNumber,
});

export const chunk = input({
  label: "Chunk",
  type: "string",
  required: true,
  comments: "Chunk index number (indexing starts from 1).",
  clean: cleanNumber,
});

export const uploadURL = input({
  label: "Upload URL",
  type: "string",
  required: true,
  comments:
    "Amazon upload endpoint received from calling Get closest AmazonS3 upload endpoint.",
  example: "https://bynder-public-eu-central-1.s3.amazonaws.com/",
  placeholder: "https://bynder-public-eu-central-1.s3.amazonaws.com/",
  clean: cleanString,
});

export const targetid = input({
  label: "Target ID",
  type: "string",
  required: true,
  comments: "The targetid that was returned by the initialize call.",
  example: "final/00000000-0000-0000-0000000000000000/Logo.png",
  placeholder: "final/00000000-0000-0000-0000000000000000/Logo.png",
  clean: cleanString,
});

export const items = input({
  label: "Items",
  type: "string",
  required: true,
  comments:
    "Comma-separated import id's of a finalized file, as returned by the finalize call.",
  example: "000000000-0000-0000-0000000000000000",
  placeholder: "000000000-0000-0000-0000000000000000",
  clean: cleanString,
});

export const hash = input({
  label: "Hash",
  type: "boolean",
  required: false,
  comments: "Indicates whether or not to treat the itemId as a hashed item id",
  clean: util.types.toBool,
});

export const isPublic = input({
  label: "Is Public",
  type: "boolean",
  required: false,
  comments: "Indicates whether or not to treat the itemId as a hashed item id",
  clean: util.types.toBool,
  default: "true",
});

export const collectionOptions = input({
  label: "Collection Options",
  type: "string",
  required: true,
  comments: "Recipient rights.",
  model: [
    {
      label: "View",
      value: "view",
    },
    {
      label: "Edit",
      value: "edit",
    },
  ],
  clean: cleanString,
});

export const recipients = input({
  label: "Recipients",
  type: "string",
  required: false,
  comments:
    "Comma-separated email addresses of recipients. Mandatory if groups or profiles are empty.",
  example: "user1@bynder.com,user2@bynder.com",
  placeholder: "user1@bynder.com,user2@bynder.com",
  clean: cleanString,
});

export const groups = input({
  label: "Groups",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of group ids. Mandatory if recipients or profiles are empty.",
  example: "000000000-0000-0000-0000000000000000",
  placeholder: "000000000-0000-0000-0000000000000000",
  clean: cleanString,
});

export const profiles = input({
  label: "Profiles",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of profile ids. Mandatory if recipients or groups are empty.",
  example: "000000000-0000-0000-0000000000000000",
  placeholder: "000000000-0000-0000-0000000000000000",
  clean: cleanString,
});

export const key = input({
  label: "Key",
  type: "string",
  required: true,
  comments: "4 character key representing the campaign",
  example: "excp",
  placeholder: "excp",
  clean: cleanString,
});

export const responsibleId = input({
  label: "Responsible ID",
  type: "string",
  required: true,
  comments: "Id of the user responsible for the campaign",
  example: "00000000-0000-0000-0000-000000000000",
  placeholder: "00000000-0000-0000-0000-000000000000",
  clean: cleanString,
});

export const orderStatus = input({
  label: "Order Status",
  type: "string",
  required: false,
  comments: "Status of the order",
  model: ORDER_STATUSES.map((value) => ({
    label: value,
    value,
  })),
  clean: (value: unknown) => cleanString(value) as OrderStatus,
});

export const messsage = input({
  label: "Message",
  type: "string",
  required: false,
  comments: "A message",
  example: "Order has been delivered",
  placeholder: "Order has been delivered",
  clean: cleanString,
});

export const trackingnumber = input({
  label: "Tracking Number",
  type: "string",
  required: false,
  comments: "Link to trackingnumber",
  example: "trackingnumber",
  placeholder: "trackingnumber",
  clean: cleanString,
});

export const io = input({
  label: "IO",
  type: "string",
  required: false,
  comments:
    "The operation(s) performed on the image before it's served to the client. It's possible to specify this parameter several times to have several operations applied.",
  example: "transform:crop,width:100,height:200",
  placeholder: "transform:crop,width:100,height:200",
  clean: cleanString,
});

export const focuspoint = input({
  label: "Focus Point",
  type: "string",
  required: false,
  comments:
    "Focus point as a x,y coordinate (with values between 0 - 1). This will serve as the center point for the image operations.",
  example: "0.5,0.25",
  placeholder: "0.5,0.25",
  clean: cleanString,
});

export const format = input({
  label: "Format",
  type: "string",
  required: false,
  comments:
    "Format of the served image. This can either be jpg or png and it will overwrite the default webP.",
  example: "jpg",
  placeholder: "jpg",
  clean: cleanString,
});

export const quality = input({
  label: "Format",
  type: "string",
  required: false,
  comments:
    "Image quality, ranging from 1 - 100 (has no effect when format is set to 'png').",
  example: "75",
  placeholder: "75",
  clean: cleanString,
});

export const type = input({
  label: "Type",
  type: "string",
  required: false,
  comments:
    "List of asset types. Filters the count results by asset type. It only makes sense to be defined if the count parameter was set to true.",
  collection: "valuelist",
  model: METAPROPERTY_TYPES.map((value) => ({
    label: value,
    value,
  })),
  clean: cleanValueListInput,
});

export const options = input({
  label: "Format",
  type: "boolean",
  required: false,
  comments:
    "Indicates whether or not the response should include the metaproperty options of each metaproperty.",
  clean: util.types.toBool,
});

export const ids = input({
  label: "IDs",
  type: "string",
  required: false,
  comments:
    "List of metaproperty ids. Will return a metaproperty for each existing id.",
  collection: "valuelist",
  clean: cleanValueListInput,
});
