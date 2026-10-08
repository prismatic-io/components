import { input, util } from "@prismatic-io/spectral";
import { brokers, clientId, connection } from "./common";
export const topic = input({
  label: "Topic",
  type: "string",
  required: true,
  example: "myTopic",
  comments:
    "A Topic is a category/feed name to which records are stored and published.",
  dataSource: "selectTopic",
  placeholder: "Enter topic name",
  clean: util.types.toString,
});
export const listTopicsInputs = { connection, clientId, brokers };
