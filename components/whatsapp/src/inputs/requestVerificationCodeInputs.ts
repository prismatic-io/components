import { input, util } from "@prismatic-io/spectral";
import { connection } from "./general";
import { CODE_METHODS_MODEL, LANGUAGES_MODEL } from "../constants";

const phoneNumberId = input({
  label: "Phone Number ID to Verify",
  comments: "The ID of the phone number to verify.",
  type: "string",
  placeholder: "Enter a phone number ID",
  required: true,
  example: "912345678912345",
  clean: util.types.toString,
});

const codeMethod = input({
  label: "Code Method",
  comments: "The method to use to send the verification code.",
  placeholder: "Select the code method",
  type: "string",
  required: true,
  model: CODE_METHODS_MODEL,
  example: "SMS",
  clean: util.types.toString,
});

const language = input({
  label: "Language",
  comments: "The language's two-character language code code.",
  default: "en",
  placeholder: "Select the language",
  type: "string",
  required: true,
  model: LANGUAGES_MODEL,
  clean: util.types.toString,
});

export const requestVerificationCodeInputs = {
  connection,
  phoneNumberId,
  codeMethod,
  language,
};
