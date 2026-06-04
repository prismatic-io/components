import { input } from "@prismatic-io/spectral";
import { bodyFields } from "../general";
import { groupId } from "../mobileApps/general";
import {
  assignedLabels,
  description,
  displayName,
  mailNickname,
  visibility,
} from "./general";
import { cleanBooleanStringInput } from "../../util";

export const updateGroupInputs = {
  groupId: {
    ...groupId,
    comments: "The ID of the group update.",
  },
  displayName: {
    ...displayName,
    required: false,
  },
  mailNickname: {
    ...mailNickname,
    required: false,
  },
  securityEnabled: input({
    label: "Security Enabled",
    type: "string",
    comments:
      "Set to true for mail-enabled groups. If Not Set the input will not be included in the request.",
    required: false,
    model: [
      {
        label: "True",
        value: "true",
      },
      {
        label: "False",
        value: "false",
      },
      {
        label: "Not Set",
        value: "",
      },
    ],
    default: "",
    clean: cleanBooleanStringInput,
  }),
  description,
  assignedLabels,
  visibility,
  bodyFields,
};
