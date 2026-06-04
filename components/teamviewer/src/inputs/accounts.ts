import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { defaultInputs } from "./general";

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  comments: "The email address associated with your TeamViewer account.",
  example: "test@test.com",
  placeholder: "test@test.com",
  clean: util.types.toString,
});

export const name = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The name of the account holder.",
  example: "John Doe",
  placeholder: "John Doe",
  clean: util.types.toString,
});

export const password = input({
  label: "Password",
  type: "password",
  required: true,
  comments: "The password associated with your TeamViewer account.",
  example: "password",
  placeholder: "password",
  clean: util.types.toString,
});

export const language = input({
  label: "Language",
  type: "string",
  required: true,
  comments: "The language of the account holder.",
  example: "en",
  placeholder: "en",
  clean: util.types.toString,
});

export const clientId = input({
  label: "Client ID",
  type: "string",
  required: true,
  comments: "The client ID associated with your TeamViewer account.",
  example: "123456",
  placeholder: "123456",
  clean: util.types.toString,
});

export const clientSecret = input({
  label: "Client Secret",
  type: "password",
  required: true,
  comments: "The client secret associated with your TeamViewer account.",
  example: "yourclientsecret",
  placeholder: "yourclientsecret",
  clean: util.types.toString,
});

export const createAccountInputs = {
  email,
  name,
  password,
  language,
  client_id: clientId,
  client_secret: clientSecret,
  ...defaultInputs,
};

export const oldPassword = input({
  label: "Old Password",
  type: "password",
  required: false,
  comments: "The current password associated with your TeamViewer account.",
  example: "password",
  placeholder: "password",
  clean: cleanString,
});

export const emailLanguage = input({
  label: "Email Language",
  type: "string",
  required: false,
  comments: "The language of the account holder.",
  example: "en",
  placeholder: "en",
  clean: cleanString,
});

export const updateAccountInputs = {
  email: {
    ...email,
    required: false,
    clean: cleanString,
  },
  name: {
    ...name,
    required: false,
    clean: cleanString,
  },
  password: {
    ...password,
    required: false,
    clean: cleanString,
  },
  oldpassword: oldPassword,
  email_language: emailLanguage,
  ...defaultInputs,
};
