import { input, util } from "@prismatic-io/spectral";

const microsoftEntraId = input({
  label: "Microsoft Entra Id",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter audit log ID",
  comments:
    "The unique identifier for the Microsoft Entra audit log item to retrieve.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectDirectoryAudit",
});

export const getMicrosoftEntraInputs = {
  microsoftEntraId,
};
