import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connection, organizationId, spaceId } from "./common";
const spaceName = input({
  label: "Space Name",
  type: "string",
  comments: "The display name for the space.",
  example: "My Space",
  placeholder: "Enter space name",
  required: true,
  clean: util.types.toString,
});
const defaultLocale = input({
  label: "Default Locale",
  type: "string",
  comments:
    "The locale code (such as en-US) to set as the space's default locale.",
  example: "en",
  placeholder: "Enter locale code",
  required: false,
  clean: toOptionalString,
});
export const createSpaceInputs = {
  connection,
  organizationId,
  name: spaceName,
  defaultLocale,
};
export const deleteSpaceInputs = {
  connection,
  spaceId,
};
export const getSpaceInputs = {
  connection,
  spaceId,
};
export const listSpacesInputs = {
  connection,
};
export const updateSpaceInputs = {
  connection,
  spaceId,
  spaceName,
};
