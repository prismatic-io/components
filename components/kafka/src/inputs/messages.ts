import { input } from "@prismatic-io/spectral";
import { asKeyValueList } from "../utils";
import { brokers, clientId, connection } from "./common";
import { topic } from "./topics";
const messages = input({
  label: "Messages",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  comments:
    "The messages to publish. Each entry's value is sent as the message body; keys are not used.",
  example: "Hello Kafka",
  placeholder: "Enter message content",
  clean: asKeyValueList,
});
export const publishMessagesInputs = {
  connection,
  clientId,
  brokers,
  topic,
  messages,
};
