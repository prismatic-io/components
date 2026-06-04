import { onPremConnection } from "@prismatic-io/spectral";

export const smtpConnection = onPremConnection({
  key: "smtpConnection",
  display: {
    label: "SMTP Connection",
    description: "SMTP server information",
  },
  inputs: {
    host: {
      label: "Host",
      type: "string",
      example: "smtp.example.com",
      required: true,
      onPremControlled: true,
    },
    port: {
      label: "Port",
      type: "string",
      default: "587",
      required: true,
      comments:
        "Port 587 is often used for SMTP with TLS. Port 25 is disallowed for this connection, as unencrypted SMTP is insecure.",
      onPremControlled: true,
    },
    secure: {
      label: "Use TLS",
      type: "boolean",
      default: "true",
      comments: "Use TLS to secure the connection to the SMTP server.",
    },
    allowUnauthorized: {
      label: "Ignore Self-Signed Certificates",
      type: "boolean",
      required: false,
      default: "false",
      comments: "Ignores self-signed certificate errors.",
    },
    username: {
      label: "Username",
      type: "string",
      required: false,
    },
    password: {
      label: "Password",
      type: "password",
      required: false,
    },
  },
});
