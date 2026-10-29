import { input, util } from "@prismatic-io/spectral";

export const collectId = input({
  label: "Collect ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the collect.",
  example: "r84963704502935",
  placeholder: "Enter collect ID",
  clean: util.types.toString,
});
