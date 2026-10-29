import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

const to = input({
  label: "To",
  placeholder: "Enter recipient phone number",
  type: "string",
  required: true,
  comments: "The SMS recipient's phone number in E.164 format.",
  example: "5551234567",
  clean: util.types.toString,
});

const from = input({
  label: "From",
  placeholder: "Enter sender phone number",
  type: "string",
  required: true,
  comments: "The SMS sender's phone number in E.164 format.",
  example: "5555551234",
  clean: util.types.toString,
});

const message = input({
  label: "Message",
  placeholder: "Enter message body",
  type: "string",
  required: true,
  comments: "The text content of the SMS message to send.",
  example: "Hello from Acme!",
  clean: util.types.toString,
});

const sid = input({
  label: "Message SID",
  placeholder: "Enter message SID",
  required: true,
  type: "string",
  comments: "The unique identifier for the SMS message.",
  example: "SMbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  dataSource: "selectMessage",
  clean: util.types.toString,
});

export const sendSMSInputs = {
  twilioConnection: connectionInput,
  to,
  from,
  message,
};

export const getSMSInputs = {
  twilioConnection: connectionInput,
  sid,
};

export const listMessagesInputs = {
  twilioConnection: connectionInput,
};
