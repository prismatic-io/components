import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const getContactsStreamInputs = {
  connection,
  position: input({
    label: "Position",
    comments:
      "The client position in the Firehose stream. Possible values: top, tail, or a position string from a previous API response.",
    placeholder: "Enter stream position",
    example: "top",
    type: "string",
    required: true,
    clean: util.types.toString,
  }),
  limit: input({
    label: "Limit",
    comments: "The maximum number of events to return in a single response.",
    placeholder: "Enter limit",
    example: "100",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};
