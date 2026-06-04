import { input } from "@prismatic-io/spectral";
import { personalContactPayload } from "../exampleInputs";
import { cleanObject, cleanString } from "../util";
import { connection } from "./common";
import { aoid } from "./workers";


export const personalContact = input({
  label: "Personal Contact",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The personal contact data structure. [View data dictionary](https://developers.adp.com/build/guides/product-integration-guides/personal-contacts-api-guide-for-adp-workforce-now/chapter/3#data-dictionary) for all available fields.",
  example: JSON.stringify(personalContactPayload, null, 2),
  clean: cleanObject,
});

export const personalContactId = input({
  label: "Personal Contact ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the personal contact.",
  placeholder: "Enter Personal Contact ID",
  example: "G3STHDEHFMJ3BY3N",
  clean: cleanString,
  dataSource: "selectPersonalContact",
});


export const updatePersonalContactInputs = {
  connection,
  aoid,
  personalContactId,
  personalContact,
};
