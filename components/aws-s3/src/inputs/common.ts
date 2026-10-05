import { input, util } from "@prismatic-io/spectral";
import { cleanString, toKeyValuePairList, toObjectCannedACL } from "../utils";
export const objectKey = input({
  label: "Object Key",
  placeholder: "Enter object key",
  type: "string",
  required: true,
  comments:
    "An object in S3 is a file that is saved in a 'bucket'. This represents the object's key (file path). Do not include a leading /.",
  example: "path/to/file.txt",
  clean: util.types.toString,
});
export const fileContents = input({
  label: "File Contents",
  placeholder: "Output data from previous step or string content",
  type: "data",
  required: true,
  comments:
    "The contents to write to the object. Accepts text strings or binary data (images, PDFs, etc.) from previous steps.",
  example: "My File Contents",
  clean: util.types.toData,
});
export const bucket = input({
  label: "Bucket Name",
  placeholder: "Enter bucket name",
  type: "string",
  required: true,
  comments:
    "An Amazon S3 'bucket' is a container where files are stored. Buckets can be created from within the AWS console. Bucket names contain only letters, numbers, and dashes.",
  example: "my-s3-bucket-abc123",
  dataSource: "selectBucket",
  clean: util.types.toString,
});
export const tagging = input({
  label: "Object Tags",
  placeholder: "Enter tag value",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Key-value pairs to tag the object for filtering and organization. For more information, see [S3 Object Tagging](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html).",
  example: "Environment, Production",
  clean: toKeyValuePairList,
});
export const accessKeyInput = input({
  label: "Connection",
  type: "connection",
  required: false,
  comments:
    "The AWS S3 connection to use for authentication. Access keys provide programmatic access to AWS resources. [Learn more](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).",
});
export const acl = input({
  label: "ACL Permissions",
  comments:
    "Canned ACL permissions to apply to the object. For more information, see [S3 Canned ACLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl).",
  type: "string",
  model: [
    { label: "BUCKET DEFAULT", value: "" },
    { label: "authenticated-read", value: "authenticated-read" },
    { label: "aws-exec-read", value: "aws-exec-read" },
    {
      label: "bucket-owner-full-control",
      value: "bucket-owner-full-control",
    },
    { label: "bucket-owner-read", value: "bucket-owner-read" },
    { label: "private", value: "private" },
    { label: "public-read", value: "public-read" },
    { label: "public-read-write", value: "public-read-write" },
  ],
  default: "",
  clean: toObjectCannedACL,
});
export const expirationSeconds = input({
  label: "Expiration Seconds",
  type: "string",
  required: true,
  default: "3600",
  placeholder: "Enter seconds (e.g., 3600 for 1 hour)",
  comments:
    "Number of seconds until the presigned URL expires. Default is 3600 (1 hour).",
  clean: util.types.toInt,
});
export const versionId = input({
  label: "Version ID",
  type: "string",
  required: false,
  placeholder: "Enter version ID",
  example: "AMn71WZYnWqbvfy0unBOdtaBC.DRiN_r",
  comments:
    "The version ID of the object to apply the retention configuration to.",
  clean: cleanString,
});
