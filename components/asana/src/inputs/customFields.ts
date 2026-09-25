import { CUSTOM_FIELD_OPT_FIELDS } from "../constants";
import {
  connectionInput,
  fieldId,
  optFields,
  pagination,
  workspaceId,
} from "./common";
export const getCustomFieldInputs = {
  asanaConnection: connectionInput,
  fieldId,
  optFields: { ...optFields, default: CUSTOM_FIELD_OPT_FIELDS },
};
export const listCustomFieldsInputs = {
  asanaConnection: connectionInput,
  workspaceId,
  optFields: { ...optFields, default: CUSTOM_FIELD_OPT_FIELDS },
  pagination,
};
