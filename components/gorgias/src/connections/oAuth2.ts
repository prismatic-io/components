import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { oAuth2Inputs } from "../inputs/connections";

export const oAuth2 = oauth2Connection({
  key: "gorgias-oauth2",
  display: {
    label: "Gorgias OAuth 2.0",
    description:
      "Connection to Gorgias using OAuth 2.0. Using OAuth2 is mandatory for public applications.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: oAuth2Inputs,
});
