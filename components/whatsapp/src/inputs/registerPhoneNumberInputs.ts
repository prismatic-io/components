import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../utils";
import { connection } from "./general";
import { COUNTRY_CODES_MODEL } from "../constants";

const phoneNumberId = input({
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
    "Set this to your 6-digit two-step verification PIN if enabled. If not, set a new 6-digit PIN.",
  type: "string",
  required: true,
  placeholder: "A 6-digit number",
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
  placeholder: "A 2-letter ISO 3166 country code",
  model: COUNTRY_CODES_MODEL,
  clean: cleanStringInput,
});

export const registerPhoneNumberInputs = {
  connection,
  phoneNumberId,
  pin,
  dataLocalizationRegion,
};
