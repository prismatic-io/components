import { bodyFields } from "../general";
import {
  assignedLabels,
  description,
  displayName,
  mailEnabled,
  mailNickname,
  securityEnabled,
  visibility,
} from "./general";

export const createGroupInputs = {
  displayName,
  mailNickname,
  securityEnabled,
  mailEnabled,
  description,
  assignedLabels,
  visibility,
  bodyFields,
};
