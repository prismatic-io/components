import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { connection } from "./common";
import {
  CODE_METHODS_MODEL,
  COUNTRY_CODES_MODEL,
  LANGUAGES_MODEL,
} from "../constants";

const registerPhoneNumberId = input({
  label: "Phone Number ID",
  comments: "The ID of the phone number to register.",
  type: "string",
  required: true,
  placeholder: "Enter a Phone Number ID",
  example: "912345678912345",
  clean: util.types.toString,
});

const pin = input({
  label: "PIN",
  comments:
    "The 6-digit two-step verification PIN. If two-step verification is enabled, provide the existing PIN; otherwise set a new 6-digit PIN.",
  type: "string",
  required: true,
  placeholder: "Enter a 6-digit PIN",
  example: "123456",
  clean: util.types.toString,
});

const dataLocalizationRegion = input({
  label: "Data Localization Region",
  comments:
    "Enables local storage for the business phone number. Specify the country for data-at-rest storage.",
  type: "string",
  required: false,
  example: "IN",
  placeholder: "Select a country",
  model: COUNTRY_CODES_MODEL,
  clean: cleanStringInput,
});

const verifyPhoneNumberId = input({
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
  comments: "The two-character language code for the verification message.",
  default: "en",
  placeholder: "Select the language",
  type: "string",
  required: true,
  model: LANGUAGES_MODEL,
  clean: util.types.toString,
});

export const registerPhoneNumberInputs = {
  connection,
  phoneNumberId: registerPhoneNumberId,
  pin,
  dataLocalizationRegion,
};

export const requestVerificationCodeInputs = {
  connection,
  phoneNumberId: verifyPhoneNumberId,
  codeMethod,
  language,
};
