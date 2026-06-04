import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
import { additionalFields } from "../common";

const serviceRequestDocumentationComments =
  "See [Freshservice API documentation](https://api.freshservice.com/#service_request) for more information.";

export const serviceRequestAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${serviceRequestDocumentationComments}`,
});

export const displayId = input({
  label: "Display ID",
  comments: "The unique identifier for the service catalog item to request.",
  type: "string",
  required: true,
  example: "1",
  placeholder: "Enter display ID",
  clean: util.types.toString,
});

export const quantity = input({
  label: "Quantity",
  comments: "The number of items to include in the service request.",
  type: "string",
  required: true,
  example: "1",
  placeholder: "Enter quantity",
  clean: util.types.toNumber,
});

export const requestedFor = input({
  label: "Requested For",
  comments:
    "The email address of the person on whose behalf the service request is created.",
  type: "string",
  required: false,
  example: "tom@outerspace.com",
  placeholder: "Enter email of the requester",
  clean: cleanStringInput,
});

export const email = input({
  label: "Email",
  comments:
    "The email address of the requester. If omitted, the request is created on behalf of the authenticated agent.",
  type: "string",
  required: false,
  example: "tom@outerspace.com",
  placeholder: "Enter requester email",
  clean: cleanStringInput,
});
