import { input } from "@prismatic-io/spectral";
import { connectionInput } from "./common";
import { cleanString } from "../util";

const term = input({
  label: "Term",
  type: "string",
  clean: cleanString,
  comments: "An optional search term matched against the currency's name and/or code.",
  example: "USD",
  placeholder: "Enter currency name or code",
});

export const getCurrenciesInputs = {
  connection: connectionInput,
  term,
};
