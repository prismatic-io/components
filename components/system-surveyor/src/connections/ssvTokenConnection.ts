import { connection } from "@prismatic-io/spectral";
import { BASE_URL } from "../constants";

export const ssvTokenConnection = connection({
  key: "ssvTokenConnection",
  display: {
    label: "Basic Authentication",
    description: "Authenticate using email and password.",
  },
  inputs: {
    baseUrl: {
      label: "Base URL",
      placeholder: "https://openapi.systemsurveyor.com",
      type: "string",
      required: true,
      shown: true,
      default: "https://openapi.systemsurveyor.com",
      model: BASE_URL,
      comments: "The base URL for the System Surveyor API environment.",
    },
    email: {
      label: "Email",
      placeholder: "Enter email address",
      type: "string",
      required: true,
      shown: true,
      comments: "The email address used to authenticate with System Surveyor.",
    },
    password: {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      required: true,
      shown: true,
      comments: "The password for the System Surveyor account.",
    },
  },
});
