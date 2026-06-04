import { input, util } from "@prismatic-io/spectral";
import { connectionInput, limitInput, offsetInput } from "./common";

const suiteQLInput = input({
  label: "SuiteQL Payload",
  type: "code",
  language: "plaintext",
  required: true,
  comments:
    "SuiteQL query string to execute. See [Executing SuiteQL Queries](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_157909186990.html) for details.",
  placeholder: "Enter SuiteQL query",
  clean: util.types.toString,
  default: "SELECT email, COUNT(*) as count FROM transaction GROUP BY email",
});

const keyInput = input({
  label: "Key Field",
  type: "string",
  required: true,
  example: "id",
  placeholder: "Enter key field name",
  comments:
    "The field name from returned items to use as the key for the picklist.",
  clean: util.types.toString,
});

const labelInput = input({
  label: "Label Field",
  type: "string",
  required: true,
  example: "email",
  placeholder: "Enter label field name",
  comments:
    "The field name from returned items to use as the label for the picklist.",
  clean: util.types.toString,
});





export const suiteQLQueryInputs = {
  connection: connectionInput,
  limitInput,
  offsetInput,
  suiteQLInput,
};

export const selectSuiteQlInputs = {
  connection: connectionInput,
  query: suiteQLInput,
  key: keyInput,
  label: labelInput,
  limit: limitInput,
  offset: offsetInput,
};
