import { input } from "@prismatic-io/spectral";
import { connection, webinarKey } from "../general";
import { toOptionalBoolean } from "../../utils";
import { MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS } from "../../constants";

export const sendCancellationEmail = input({
  label: "Send Cancellation Email",
  comments:
    "Indicates whether cancellation notice emails should be sent. " +
    "Default behavior is false.",
  type: "string",
  model: MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
  required: false,
  clean: toOptionalBoolean,
});

export const deleteAll = input({
  label: "Delete All",
  comments:
    "Specifies whether all scheduled sessions should be deleted" +
    " if the webinar is part of a series. Default behavior is true.",
  type: "string",
  model: MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
  required: false,
  default: "false",
  clean: toOptionalBoolean,
});

export const deleteWebinarInputs = {
  connection,

  webinarKey,
  sendCancellationEmail,
  deleteAll,
};
