import { input, util } from "@prismatic-io/spectral";
import { stringOrUndefinedCleaner } from "../util";
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
  comments: "The default locale code for the space.",
  example: "en",
  placeholder: "Enter locale code",
  required: false,
  clean: stringOrUndefinedCleaner,
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
  spaceName: {
    ...spaceName,
    comments: "The updated name for the space.",
  },
};
