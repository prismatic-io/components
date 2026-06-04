import { input, util } from "@prismatic-io/spectral";
import { connection } from "./generalInputs";

const modelId = input({
  label: "Model ID",
  type: "string",
  required: true,
  comments: "The ID of the model to retrieve.",
  example: "grok-3-fast-beta",
  placeholder: "grok-3-fast-beta",
  dataSource: "selectModel",
  clean: util.types.toString,
});

export const getModelInputs = {
  connection,
  modelId,
};
