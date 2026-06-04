import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput } from "../../util";

const accountEnabled = input({
  label: "Account Enabled",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "When true, enables the user account. When false, the account is disabled and the user cannot sign in.",
  clean: util.types.toBool,
});

const displayName = input({
  label: "Display Name",
  type: "string",
  required: true,
  comments: "The display name of the user.",
  placeholder: "Enter display name",
  example: "John Doe",
  clean: cleanStringInput,
});

const forceChangePasswordNextSignIn = input({
  label: "Force Change Password Next Sign In",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "When true, forces the user to change their password on next sign in.",
  clean: util.types.toBool,
});

const password = input({
  label: "Password",
  type: "password",
  required: true,
  comments:
    "The password for the user account. Must meet your organization's password complexity requirements.",
  placeholder: "Enter password",
  clean: cleanStringInput,
});

const userPrincipalName = input({
  label: "User Principal Name",
  type: "string",
  required: true,
  comments:
    "The user principal name (username) for the user. This will be combined with the domain to create the full user principal name (e.g., john.doe@contoso.com).",
  example: "john.doe",
  placeholder: "Enter username",
  clean: cleanStringInput,
});

const domain = input({
  label: "Domain",
  type: "string",
  required: true,
  comments:
    "The domain for the user. This must be an existing verified domain in your tenant. Use the 'List Domains' action to retrieve available domains.",
  example: "contoso.onmicrosoft.com",
  placeholder: "Enter domain",
  clean: cleanStringInput,
});

const additionalProperties = input({
  label: "Additional Properties",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional properties that are not covered by the other inputs. This should be a JSON object and will be merged with the other inputs. You can get additional properties from the Microsoft Graph API documentation https://learn.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0#json-representation",
  clean: cleanCodeInput,
});

export default {
  accountEnabled,
  displayName,
  forceChangePasswordNextSignIn,
  password,
  userPrincipalName,
  domain,
  additionalProperties,
};
