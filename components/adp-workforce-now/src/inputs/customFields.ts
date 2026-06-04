import { input } from "@prismatic-io/spectral";
import { customTypesModel } from "../constants";
import { customFieldGroupPayload } from "../exampleInputs";
import { cleanObject, cleanString } from "../util";
import { connection } from "./common";


export const customFieldTypes = input({
  label: "Custom Field Types",
  type: "string",
  model: customTypesModel,
  required: true,
  default: "",
  comments: "The type of custom field to create.",
  placeholder: "Select custom field type",
  clean: cleanString,
});

export const customFieldGroup = input({
  label: "Custom Field Group",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The custom field group data structure. [View API documentation](https://developers.adp.com/build/api-explorer/hcm-offrg-wfn/hcm-offrg-wfn-hr-workers-person-custom-data-management-v2-workers-person-custom-data-management?operation=POST%2Fevents%2Fhr%2Fv1%2Fworker.person.custom-field.code.change) for all available fields.",
  example: JSON.stringify(customFieldGroupPayload, null, 2),
  clean: cleanObject,
});

export const itemId = input({
  label: "Item ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the item to update.",
  placeholder: "Enter Item ID",
  example: "33646745_1",
  clean: cleanString,
});


export const createCustomFieldInputs = {
  connection,
  customFieldTypes,
  customFieldGroup,
};

export const updateCustomFieldInputs = {
  connection,
  itemId,
  customFieldGroup,
};
