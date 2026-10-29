import { onPremConnection } from "@prismatic-io/spectral";

export const ldapConnection = onPremConnection({
  key: "ldapConnection",
  display: {
    label: "LDAP",
    description: "Authenticate using username and password",
  },
  inputs: {
    url: {
      label: "URL",
      placeholder: "Enter LDAP server URL",
      example: "ldap://ldap.example.com",
      type: "string",
      required: false,
      comments:
        "The LDAP server URL. Required when not using the on-prem connection.",
    },
    dn: {
      label: "DN",
      type: "string",
      required: true,
      comments: "The Distinguished Name used to bind to the LDAP server.",
      placeholder: "Enter DN (e.g., cn=John Doe,ou=Users,dc=example,dc=com)",
      example: "cn=John Doe,ou=Users,dc=example,dc=com",
    },
    password: {
      label: "Password",
      type: "password",
      required: true,
      comments: "The password used to authenticate the DN.",
      placeholder: "Enter password",
    },
    certificate: {
      label: "Certificate",
      type: "text",
      required: false,
      comments:
        "The certificate to use for the connection if required by the LDAP server.",
      example: "-----BEGIN CERTIFICATE-----\nMIIC0DCCAbigAwIBAgIJA...",
      placeholder: "Enter certificate",
    },
    useOnPremLdaps: {
      label: "Use on-prem LDAPS",
      type: "boolean",
      required: false,
      comments:
        "When true, uses LDAPS for the connection to the private LDAP server.",
    },
    host: {
      label: "Host",
      comments:
        "The host of the on-prem service. This input will be hidden from customers",
      type: "string",
      required: false,
      shown: false,
      onPremControlled: true,
    },
    port: {
      label: "Port",
      comments:
        "The port of the on-prem service. This input will be hidden from customers",
      type: "string",
      required: false,
      shown: false,
      onPremControlled: true,
    },
  },
});

export default [ldapConnection];
