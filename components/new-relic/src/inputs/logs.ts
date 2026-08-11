import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connectionInput, timestamp } from "./common";
const jsonMessage = input({
  label: "Message",
  type: "string",
  example:
    '{"service-name": "my-service", "user": {"id": 123, "name": "alice"}}',
  placeholder: "Enter log message as JSON",
  required: false,
  comments: "A JSON string containing the message of logs to send.",
  clean: toOptionalString,
});
const codeMessage = input({
  label: "Message",
  type: "code",
  required: true,
  example: JSON.stringify(
    {
      timestamp: 1562767499238,
      message: {
        "service-name": "my-service",
        user: { id: 123, name: "alice" },
      },
      "service-name": "my-service",
      user: {
        id: 123,
        name: "alice",
      },
    },
    null,
    2,
  ),
  language: "json",
  comments: "A JSON object containing the message of logs to send.",
  clean: util.types.toObject,
});
export const sendLogsInputs = {
  jsonMessage,
  timestamp,
  newRelicConnection: connectionInput,
};
export const sendDetailedLogsInputs = {
  codeMessage,
  newRelicConnection: connectionInput,
};
