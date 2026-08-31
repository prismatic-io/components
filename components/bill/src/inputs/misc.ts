import { input, util } from "@prismatic-io/spectral";
import { connection } from "./shared";
import { ApiUrls } from "../enums/apiUrls";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
export const generateMfaChallengeIdInputs = {
  connection,
};
const { debugRequest, ...httpInputsWithoutDebug } = httpClientInputs;
export const rawRequestInputs = {
  connection,
  ...httpInputsWithoutDebug,
  url: {
    ...httpClientInputs.url,
    comments: `Input the path only (/Login.json), The base URL is already included (${ApiUrls.Production}). For example, to connect to ${ApiUrls.Production}/Login.json, only /Login.json is entered in this field.`,
    example: "/Login.json",
  },
};
const challengeId = input({
  label: "Challenge ID",
  type: "string",
  required: true,
  example: "!b-KXe8pBDp1vFgjczlN7hRq2wYmT9sVdD4pLxZ8kGfBc3JeWa",
  placeholder: "Enter challenge ID",
  comments:
    "The challenge ID received from the 'Generate an MFA challenge ID' action.",
  clean: util.types.toString,
});
const token = input({
  label: "Code Token",
  type: "string",
  example: "987123",
  placeholder: "Enter MFA code token",
  required: true,
  comments: "The MFA code token received at the user's device.",
  clean: util.types.toString,
});
const sessionId = input({
  label: "Session ID",
  type: "string",
  required: true,
  placeholder: "Enter session ID",
  comments:
    "The session ID received from the 'Generate an MFA challenge ID' action.",
  clean: util.types.toString,
});
export const mfaAuthenticateInputs = {
  connection,
  challengeId,
  token,
  sessionId,
};
