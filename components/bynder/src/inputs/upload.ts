import { input, util } from "@prismatic-io/spectral";
import { initialiseUploadResponse } from "../examplePayloads";
import { cleanCodeInput, cleanNumber, cleanString } from "../util";

export const multipartParams = input({
  label: "Multipart Parameters",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The parameters for the multipart upload. Use all fields from the response of the initialise upload call.",
  example: JSON.stringify(initialiseUploadResponse.multipart_params, null, 2),
  placeholder: "Enter multipart parameters as JSON",
  clean: cleanCodeInput,
});

export const file = input({
  label: "File",
  type: "data",
  required: true,
  comments: "The file or chunk of the file to be uploaded.",
  placeholder: "File from previous step",
  clean: util.types.toData,
});

export const chunks = input({
  label: "Chunks",
  type: "string",
  required: true,
  comments: "The total number of chunks the file is split into for upload.",
  example: "1",
  placeholder: "Enter total chunk count",
  clean: cleanNumber,
});

export const chunk = input({
  label: "Chunk",
  type: "string",
  required: true,
  comments: "The chunk index number being uploaded (indexing starts from 1).",
  example: "1",
  placeholder: "Enter chunk index number",
  clean: cleanNumber,
});

export const uploadURL = input({
  label: "Upload URL",
  type: "string",
  required: true,
  comments:
    "The Amazon S3 upload endpoint URL received from calling the Get Closest Amazon S3 Upload Endpoint action.",
  example: "https://bynder-public-eu-central-1.s3.amazonaws.com/",
  placeholder: "Enter Amazon S3 upload URL",
  clean: cleanString,
});

export const targetid = input({
  label: "Target ID",
  type: "string",
  required: true,
  comments: "The target ID returned by the initialise upload call.",
  example: "final/00000000-0000-0000-0000000000000000/Logo.png",
  placeholder: "Enter target ID",
  clean: cleanString,
});

export const items = input({
  label: "Items",
  type: "string",
  required: true,
  comments:
    "Comma-separated import IDs of a finalized file, as returned by the finalize call.",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "Enter import IDs (comma-separated)",
  clean: cleanString,
});
