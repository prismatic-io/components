import { input, util } from "@prismatic-io/spectral";

export const appSecret = input({
  label: "App Secret",
  type: "password",
  required: true,
  comments: "The secret key used to validate webhook signatures from HiBob.",
  example: "wh_secret_abc123def456",
  placeholder: "Enter app secret",
  clean: util.types.toString,
});
