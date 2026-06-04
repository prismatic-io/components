import { onPremConnection } from "@prismatic-io/spectral";

export const basic = onPremConnection({
  key: "basic",
  display: {
    label: "Basic Authentication",
    description: "Authenticate using username and password",
  },
  inputs: {
    username: {
      label: "Username",
      placeholder: "Enter username",
      type: "string",
      example: "john.doe",
      required: false,
      shown: true,
      comments: "The username for FTP authentication.",
    },
    password: {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      example: "p@s$W0Rd",
      required: false,
      shown: true,
      comments: "The password for FTP authentication.",
    },
    host: {
      label: "Host",
      placeholder: "Enter host address",
      type: "string",
      required: true,
      comments:
        "The address of the FTP server. This should be an IP address or hostname.",
      example: "ftp.example.com",
      onPremControlled: true,
    },
    port: {
      label: "Port",
      placeholder: "Enter port number",
      default: "21",
      required: true,
      comments:
        "The port of the FTP server. Default is 21 for FTP or 990 for implicit FTPS.",
      type: "string",
      example: "21",
      onPremControlled: true,
    },
    secure: {
      label: "Secure",
      placeholder: "Enter true, false, or implicit",
      default: "false",
      required: true,
      comments:
        "Whether to use FTPS over TLS. Set to 'true' for explicit FTPS, 'false' for plain FTP, or 'implicit' for legacy implicit FTPS.",
      type: "string",
      example: "false",
    },
    ignoreSslErrors: {
      label: "Ignore SSL Errors",
      default: "false",
      required: true,
      comments:
        "When true, ignores SSL certificate validation errors such as self-signed certificates.",
      type: "boolean",
    },
  },
});

export default [basic];
