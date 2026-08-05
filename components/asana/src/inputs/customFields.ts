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
  optFields: { ...optFields, default: CUSTOM_FIELD_OPT_FIELDS },
  pagination,
  workspaceId,
};
export const selectCustomFieldInputs = {
  connection: connectionInput,
  workspaceId: { ...workspaceId, dataSource: undefined },
};
