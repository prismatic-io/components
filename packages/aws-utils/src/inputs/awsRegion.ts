import { input, util } from "@prismatic-io/spectral";

export const awsRegion = input({
  label: "AWS Region",
  placeholder: "AWS Region",
  type: "string",
  required: false,
  comments:
    "AWS provides services in multiple regions, like us-west-2 or eu-west-1.",
  example: "us-east-1",
  dataSource: "selectRegion",
  clean: util.types.toString,
});
