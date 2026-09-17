import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { additionalFields, connection } from "./common";
const serviceRequestDocumentationComments =
  "See [Freshservice API documentation](https://api.freshservice.com/#service_request) for more information.";
const serviceRequestAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${serviceRequestDocumentationComments}`,
});
const displayId = input({
  label: "Service Item Display ID",
  comments: "The unique identifier for the service catalog item to request.",
  type: "string",
  required: true,
  example: "1",
  placeholder: "Enter display ID",
  clean: util.types.toString,
});
const quantity = input({
  label: "Quantity",
  comments: "The number of items to include in the service request.",
  type: "string",
  required: true,
  example: "1",
  placeholder: "Enter quantity",
  clean: util.types.toNumber,
});
const requestedFor = input({
  label: "Requested For",
  comments:
    "The email address of the person on whose behalf the service request is created.",
  type: "string",
  required: false,
  example: "tom@outerspace.com",
  placeholder: "Enter email of the requester",
  clean: cleanStringInput,
});
const email = input({
  label: "Email",
  comments:
    "The email address of the requester. If omitted, the request is created on behalf of the authenticated agent.",
  type: "string",
  required: false,
  example: "tom@outerspace.com",
  placeholder: "Enter requester email",
  clean: cleanStringInput,
});
export const createServiceRequestInputs = {
  connection,
  displayId,
  quantity,
  email,
  requestedFor,
  serviceRequestAdditionalFields,
};
