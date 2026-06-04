import { input, util } from "@prismatic-io/spectral";
import { connection, description, fetchAll, limit, name, offset } from "./common";
import { columns } from "./datasets";

export const streamId = input({
  label: "Stream ID",
  comments: "The ID of the Stream of data being imported into a DataSet.",
  type: "string",
  required: true,
  placeholder: "Enter Stream ID",
  example: "67890",
  dataSource: "streams",
  clean: util.types.toString,
});

export const executionId = input({
  label: "Execution ID",
  comments:
    "The unique identifier for the Stream execution. If not provided, the current Stream execution will be aborted.",
  type: "string",
  required: true,
  placeholder: "Enter Execution ID",
  example: "12345",
  dataSource: "selectStreamExecution",
  clean: util.types.toString,
});

export const partId = input({
  label: "Part ID",
  comments:
    "The ID of the data part being used to upload a subset of data within the Stream execution.",
  type: "string",
  required: true,
  placeholder: "Enter Part ID",
  example: "1",
  clean: util.types.toString,
});

export const dataSet = input({
  label: "DataSet Object",
  comments: "The DataSet object associated with this Stream.",
  type: "string",
  collection: "valuelist",
  required: true,
  placeholder: "Enter DataSet fields",
  example: '["id", "name", "description"]',
  clean: (stringsArray: unknown) =>
    (Array.isArray(stringsArray) ? stringsArray : []).map((string: string) =>
      util.types.toString(string),
    ),
});

export const updateMethod = input({
  label: "Update Method",
  type: "string",
  required: false,
  default: "",
  comments: "The data import behavior.",
  placeholder: "Select update method",
  model: [
    { label: "", value: "" },
    {
      label: "APPEND",
      value: "APPEND",
    },
    {
      label: "REPLACE",
      value: "REPLACE",
    },
  ],
  clean: util.types.toString,
});

export const updateMethodString = input({
  label: "Update Method",
  type: "string",
  required: true,
  comments: "The data import behavior.",
  placeholder: "Enter update method",
  example: "REPLACE",
  clean: util.types.toString,
});

export const updateMethodBody = input({
  label: "Update Method Body",
  type: "code",
  language: "json",
  required: false,
  comments: "The update method configuration.",
  example: JSON.stringify(
    {
      updateMethod: "REPLACE",
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

export const fields = input({
  label: "Fields",
  type: "string",
  required: false,
  comments:
    "The fields to include in the response: all, id, dataset, updateMethod, createdAt, or modifiedAt.",
  placeholder: "Enter fields",
  example: "all",
  clean: util.types.toString,
});

export const qualifiers = input({
  label: "Qualifiers",
  type: "string",
  required: true,
  comments:
    "The search qualifier expression to filter streams (e.g., dataSource.id or dataSource.owner.id).",
  placeholder: "Enter qualifiers",
  example: "dataSource.id:123",
  clean: util.types.toString,
});

export const abortStreamExecutionInputs = {
  connection,
  streamId,
  executionId,
};

export const commitStreamExecutionInputs = {
  connection,
  streamId,
  executionId: input({
    ...executionId,
    comments: "The ID of the Stream execution within the Stream",
  }),
};

export const createStreamInputs = {
  connection,
  dataSet,
  updateMethod,
  name,
  description: input({
    ...description,
    required: false,
    comments: "A summary of the stream DataSet contents and purpose.",
  }),
  columns: input({
    ...columns,
    required: false,
    comments:
      "The column schema definition for the stream DataSet, specified as a JSON array of column objects.",
  }),
  updateMethodBody: input({
    ...updateMethod,
    required: false,
    comments: "Update method for body.",
  }),
};

export const createStreamExecutionInputs = {
  connection,
  streamId: input({
    ...streamId,
    required: true,
    comments: "The ID of the Stream.",
  }),
};

export const deleteStreamInputs = {
  connection,
  streamId: input({
    ...streamId,
    required: true,
    comments: "The ID of the Stream to delete.",
  }),
};

export const getStreamInputs = {
  connection,
  streamId: input({
    ...streamId,
    required: true,
    comments: "The id of the stream.",
  }),
  fields,
};

export const getStreamExecutionInputs = {
  connection,
  streamId: input({
    ...streamId,
    required: true,
    comments: "The ID of the Stream of data being imported into a DataSet.",
  }),
  executionId: input({
    ...executionId,
    required: true,
    comments: "The ID of the Stream execution within the Stream.",
  }),
};

export const listStreamExecutionInputs = {
  connection,
  fetchAll,
  streamId: input({
    ...streamId,
    required: true,
    comments: "The ID of the Stream",
  }),
  limit: input({
    ...limit,
    required: false,
    comments:
      "The amount of Stream to return in the list. The default is 50 and the maximum is 500.",
  }),
  offset: input({
    ...offset,
    required: false,
    comments:
      "The offset of the Stream ID to begin list of users within the response.",
  }),
};

export const listStreamsInputs = {
  connection,
  fetchAll,
  limit: input({
    ...limit,
    required: false,
    comments:
      "The amount of Stream to return in the list. The default is 50 and the maximum is 500.",
  }),
  offset: input({
    ...offset,
    required: false,
    comments:
      "The offset of the Stream ID to begin list of users within the response.",
  }),
};

export const searchStreamInputs = {
  connection,
  qualifiers,
  fields,
};

export const updateStreamInputs = {
  connection,
  streamId: input({
    ...streamId,
    required: true,
    comments: "The ID of the stream to update.",
  }),
  updateMethodString,
  updateMethodBody,
};

export const uploadDataPartInputs = {
  connection,
  streamId,
  executionId: input({
    ...executionId,
    required: true,
    comments: "The ID of the Stream execution within the Stream.",
  }),
  partId,
};
