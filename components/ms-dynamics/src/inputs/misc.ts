import { input } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util/cleanInput";
import { connectionInput, fetchAll } from "./common";

const maxPageSizeInput = input({
  label: "Max Page Size",
  placeholder: "Enter max page size",
  type: "string",
  required: false,
  default: "5000",
  comments: "Maximum number of entities to return per page (1-5000).",
  example: "100",
  clean: toOptionalNumber,
});

const nextLinkInput = input({
  label: "Next Link",
  placeholder: "Enter @odata.nextLink URL",
  type: "string",
  required: false,
  comments: "The @odata.nextLink URL from a previous response to get the next page of results.",
  clean: toOptionalString,
});

export const getCurrentUserInputs = {
  connection: connectionInput,
};

export const listEntitiesInputs = {
  connection: connectionInput,
  maxPageSize: maxPageSizeInput,
  nextLink: nextLinkInput,
  fetchAll,
};
