import { input, util } from "@prismatic-io/spectral";
import { connection, organizationId } from "./common";

const securityId = input({
  label: "Security ID",
  type: "string",
  comments: "The unique identifier for the security contact.",
  example: "srdfsguf8325yusf24",
  placeholder: "Enter security ID",
  required: true,
  clean: util.types.toString,
});

export const getOrganizationInputs = {
  connection,
  organizationId,
};

export const listOrganizationsInputs = {
  connection,
};

export const updateOrganizationInputs = {
  connection,
  organizationId,
  securityId,
};
