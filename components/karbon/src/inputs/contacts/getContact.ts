import { input, util } from "@prismatic-io/spectral";
import { connection } from "../shared";
import { contactkey } from "./shared";

const expandBusinessCards = input({
  label: "Expand Business Cards",
  comments: "Whether to return the Business Card associated with the Contact.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export default {
  connection,
  contactkey: input({
    ...contactkey,
    comments: `${contactkey.comments} to get the Contact for.`,
  }),
  expandBusinessCards,
};
