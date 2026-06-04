import {
  type OnPremConnectionDefinition,
  onPremConnection,
} from "@prismatic-io/spectral";

const commonInputs = {
  username: {
    label: "Username",
    placeholder: "Enter username",
    type: "string",
    required: true,
    comments: "The username for SFTP authentication.",
    example: "john.doe",
  },
  host: {
    label: "Host",
    placeholder: "Enter host",
    type: "string",
    required: true,
    comments:
      "The address of the SFTP server. This should be either an IP address or hostname.",
    example: "sftp.example.com",
    onPremControlled: true,
  },
  port: {
    label: "Port",
    placeholder: "Enter port",
    default: "22",
    required: true,
    comments: "The port of the SFTP server.",
    type: "string",
    example: "2222",
    onPremControlled: true,
  },
  timeout: {
    label: "Timeout",
    placeholder: "Enter timeout",
    required: false,
    comments: "How long the client will await a request.",
    type: "string",
    default: "3000",
    example: "4000",
  },
  enableUnsecureServerHostKeyAlgorithms: {
    label: "Enable Unsecure Server Host Key Algorithms",
    comments:
      "When true, unsecure server host key algorithms will be added to the connection.",
    required: false,
    type: "boolean",
  },
  enableUnsecureCiphers: {
    label: "Enable Unsecure Ciphers",
    comments: "When true, CBC ciphers will be added to the connection.",
    required: false,
    type: "boolean",
  },
  customServerHostKeyAlgorithms: {
    label: "Custom Server Host Key Algorithms",
    comments:
      "A comma-separated list of custom server host key algorithms. Overrides the default server host key algorithms. Algorithm order matters. Advanced setting.",
    placeholder: "Enter algorithms",
    example: ["ssh-rsa", "ssh-dss"].join(", "),
    required: false,
    type: "string",
  },
  customCiphers: {
    label: "Custom Ciphers",
    comments:
      "A comma-separated list of custom ciphers. Overrides the default ciphers. Cipher order matters. Advanced setting.",
    placeholder: "Enter ciphers",
    example: ["aes128-ctr", "aes192-ctr", "aes256-ctr"].join(", "),
    required: false,
    type: "string",
  },
} as OnPremConnectionDefinition["inputs"];

export const basic = onPremConnection({
  key: "basic",
  display: {
    label: "Basic Authentication",
    description: "Authenticate using username and password",
  },
  inputs: {
    password: {
      label: "Password",
      comments: "The password for SFTP authentication.",
      placeholder: "Enter password",
      type: "password",
      required: true,
      example: "p@s$W0Rd",
    },
    ...commonInputs,
  },
});

export const privateKey = onPremConnection({
  key: "privateKey",
  display: {
    label: "Private Key",
    description: "Authenticate using SSH private key",
  },
  inputs: {
    privateKey: {
      label: "Private Key",
      comments: "The SSH private key for authentication.",
      placeholder: "Enter private key",
      type: "text",
      required: true,
      example: "-----BEGIN OPENSSH PRIVATE KEY-----\nabc123...",
    },
    passphrase: {
      label: "Key Passphrase",
      comments: "The passphrase for the private key. Leave blank if none.",
      placeholder: "Enter passphrase",
      type: "password",
      required: false,
      example: "p@s$PHr@$3",
    },
    password: {
      label: "Password",
      comments:
        "Though uncommon, some SFTP servers that use private keys may also require a password. Leave blank if none.",
      placeholder: "Enter password",
      type: "password",
      required: false,
      example: "p@s$W0Rd",
    },
    ...commonInputs,
  },
});

export default [basic, privateKey];
