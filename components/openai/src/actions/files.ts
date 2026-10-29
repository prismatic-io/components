import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  deleteFileExamplePayload,
  listFilesExamplePayload,
  retrieveFileExamplePayload,
  uploadFileExamplePayload,
} from "../examplePayloads";
import { connectionInput, timeout } from "../inputs";
import FormData from "form-data";

const uploadFile = action({
  display: {
    label: "Upload File",
    description:
      "Upload a file to OpenAI that can be used with various features",
  },
  inputs: {
    connection: connectionInput,
    file: input({
      label: "File",
      type: "data",
      required: true,
      comments: "The file to upload (binary data or base64 encoded)",
    }),
    filename: input({
      label: "Filename",
      type: "string",
      required: true,
      comments: "Name of the file including extension",
      example: "training_data.jsonl",
      clean: util.types.toString,
    }),
    purpose: input({
      label: "Purpose",
      type: "string",
      required: true,
      comments: "The intended purpose of the uploaded file",
      model: [
        { label: "Assistants", value: "assistants" },
        { label: "Vision", value: "vision" },
        { label: "Batch", value: "batch" },
        { label: "Fine-tune", value: "fine-tune" },
        {
          label: "User Data",
          value: "user_data",
        },
        {
          label: "Evals",
          value: "evals",
        },
      ],
      example: "assistants",
      clean: util.types.toString,
    }),
    timeout,
  },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      context.debug.enabled,
      params.timeout,
    );

    const formData = new FormData();

    formData.append(
      "file",
      util.types.isBufferDataPayload(params.file)
        ? params.file.data
        : params.file,
      params.filename,
    );
    formData.append("purpose", params.purpose);

    const { data } = await client.post("/v1/files", formData, {
      headers: formData.getHeaders(),
    });

    return { data };
  },
  examplePayload: uploadFileExamplePayload,
});

const listFiles = action({
  display: {
    label: "List Files",
    description: "List previously uploaded files",
  },
  inputs: {
    connection: connectionInput,
    purpose: input({
      label: "Purpose",
      type: "string",
      required: false,
      comments: "Filter files by purpose",
      model: [
        { label: "All", value: "" },
        { label: "Assistants", value: "assistants" },
        { label: "Vision", value: "vision" },
        { label: "Batch", value: "batch" },
        { label: "Fine-tune", value: "fine-tune" },
      ],
      clean: util.types.toString,
    }),
    timeout,
  },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      context.debug.enabled,
      params.timeout,
    );

    const queryParams: Record<string, string> = {};
    if (params.purpose) {
      queryParams.purpose = util.types.toString(params.purpose);
    }

    const { data } = await client.get("/v1/files", {
      params: queryParams,
    });

    return { data };
  },
  examplePayload: listFilesExamplePayload,
});

const retrieveFile = action({
  display: {
    label: "Retrieve File",
    description: "Retrieve information about a specific file",
  },
  inputs: {
    connection: connectionInput,
    fileId: input({
      label: "File ID",
      type: "string",
      required: true,
      comments: "The ID of the file to retrieve",
      example: "file-abc123",
      clean: util.types.toString,
      dataSource: "selectFile",
    }),
    timeout,
  },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      context.debug.enabled,
      params.timeout,
    );

    const { data } = await client.get(`/v1/files/${params.fileId}`);

    return { data };
  },
  examplePayload: retrieveFileExamplePayload,
});

const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Delete a previously uploaded file",
  },
  inputs: {
    connection: connectionInput,
    fileId: input({
      label: "File ID",
      type: "string",
      required: true,
      comments: "The ID of the file to delete",
      example: "file-abc123",
      clean: util.types.toString,
      dataSource: "selectFile",
    }),
    timeout,
  },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      context.debug.enabled,
      params.timeout,
    );

    const { data } = await client.delete(`/v1/files/${params.fileId}`);

    return { data };
  },
  examplePayload: deleteFileExamplePayload,
});

export default {
  uploadFile,
  listFiles,
  retrieveFile,
  deleteFile,
};
