import { util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { connectionInput, spaceId } from "./common";
export const selectSpacesInputs = {
  connectionInput,
  sortByName: {
    label: "Sort by Name",
    comments: "When true, sorts the spaces by name.",
    type: "boolean" as const,
    required: false,
    default: "false",
    clean: util.types.toBool,
  },
};
export const selectPagesInputs = {
  connectionInput,
  spaceId: {
    ...spaceId,
    dataSource: undefined,
    comments: "The space ID to list pages from.",
    required: false,
    clean: cleanStringInput,
  },
};
export const selectAttachmentsInputs = {
  connectionInput,
};
