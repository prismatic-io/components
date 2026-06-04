import querystring from "node:querystring";
import { PassThrough } from "node:stream";
import type {
  AbortMultipartUploadCommandOutput,
  CompleteMultipartUploadCommandOutput,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { util, action, input, ActionContext } from "@prismatic-io/spectral";
import { awsRegion, dynamicAccessAllInputs } from "aws-utils";
import { v4 as uuidv4 } from "uuid";
import { createS3Client } from "../auth";
import { accessKeyInput, acl, bucket, fileContents, objectKey, tagging } from "../inputs";

interface UploadStreamExecutionState {
  uploadFinisher: Promise<CompleteMultipartUploadCommandOutput | AbortMultipartUploadCommandOutput>;
  fileStream: PassThrough;
}

const uploadIdInput = input({
  label: "Upload Stream ID",
  type: "string",
  required: true,
  comments:
    "The ID of the upload stream to write to. Generate this with the 'Create Stream' action.",
  clean: util.types.toString,
});

const createUploadStream = action({
  display: {
    label: "Upload Stream - Create Stream",
    description: "Create an upload stream to S3",
  },
  inputs: {
    awsRegion,
    accessKey: accessKeyInput,
    ...dynamicAccessAllInputs,
    objectKey,
    bucket,
    tagging,
    acl,
  },
  perform: async ({ executionState }, params) => {
    const s3 = await createS3Client({
      awsConnection: params.accessKey,
      awsRegion: params.awsRegion,
      dynamicAccessKeyId: params.dynamicAccessKeyId,
      dynamicSecretAccessKey: params.dynamicSecretAccessKey,
      dynamicSessionToken: params.dynamicSessionToken,
    });

    const tagsObj: Record<string, string> = {};
    for (const { key, value } of params.tagging || []) {
      tagsObj[key as string] = value as string;
    }
    const tags = querystring.encode(tagsObj);

    
    const uploadId = uuidv4();

    const fileStream = new PassThrough({ highWaterMark: 1024 * 1024 }); 

    
    
    const upload = new Upload({
      client: s3,
      params: {
        ACL: params.acl || null,
        Bucket: params.bucket,
        Key: params.objectKey,
        Body: fileStream,
        Tagging: tags,
      },
    });

    
    
    executionState[uploadId] = {
      uploadFinisher: upload.done(), 
      fileStream,
    };

    return { data: uploadId };
  },
  examplePayload: {
    data: "711B632B-C025-4E26-9E34-525822E3C0ED",
  },
});

const writeUploadStream = action({
  display: {
    label: "Upload Stream - Write Data",
    description: "Write to an upload stream",
  },
  inputs: {
    uploadId: uploadIdInput,
    fileContents,
  },
  perform: async ({ executionState }, params) => {
    const { fileStream } = executionState[params.uploadId] as UploadStreamExecutionState;

    await new Promise((resolve) => {
      
      
      if (!fileStream.write(params.fileContents.data)) {
        fileStream.once("drain", resolve);
      } else {
        resolve(true);
      }
    });

    return { data: null };
  },
});

const closeUploadStream = action({
  display: {
    label: "Upload Stream - Close Stream",
    description: "Close an upload stream",
  },
  inputs: {
    uploadId: uploadIdInput,
  },
  perform: async ({ executionState }, params) => {
    const { uploadFinisher, fileStream } = executionState[
      params.uploadId
    ] as UploadStreamExecutionState;
    fileStream.end();
    await uploadFinisher;
    return { data: null };
  },
});

export default { createUploadStream, writeUploadStream, closeUploadStream };
