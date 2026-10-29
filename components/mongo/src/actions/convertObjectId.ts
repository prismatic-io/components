import { action, input } from "@prismatic-io/spectral";
import { toMongoDBObjectId } from "../util";
import { convertObjectIdExamplePayload } from "../examplePayloads";

const convertObjectId = action({
  display: {
    label: "Convert Object ID",
    description:
      "The Object ID is a unique identifier for a document in a MongoDB collection. This action takes either a string ID or Object ID object, and returns both the ObjectID '_id' and stringified ID versions of the ID which can be used in subsequent actions.",
  },
  inputs: {
    objectId: input({
      label: "Object ID",
      type: "string",
      required: true,
      comments: "The ID to convert to an Object ID.",
      example: "5a9427648b0beebeb69579e7",
      clean: toMongoDBObjectId,
    }),
  },
  perform: async (context, params) => {
    return Promise.resolve({
      data: { _id: params.objectId, id: params.objectId.toString() },
    });
  },
  examplePayload: convertObjectIdExamplePayload,
});

export default convertObjectId;
