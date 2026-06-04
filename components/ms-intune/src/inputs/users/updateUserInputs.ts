import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput } from "../../util";

const userId = input({
  label: "User Id",
  comments:
    "Unique identifier for the user to update. This can be the user's ID (UUID format) or userPrincipalName (email format).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter User ID or userPrincipalName",
  type: "string",
  required: true,
  clean: cleanStringInput,
});

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

const userPrincipalName = input({
  label: "User Principal Name",
  type: "string",
  required: false,
  comments:
    "The updated user principal name (username) for the user. This will be combined with the domain to create the full user principal name. Required if 'Domain' input is provided.",
  example: "john.doe",
  placeholder: "Enter username",
  clean: cleanStringInput,
});

const domain = input({
  label: "Domain",
  type: "string",
  required: false,
  comments:
    "The updated domain for the user. This must be an existing verified domain in your tenant. Use the 'List Domains' action to retrieve available domains. Required if 'User Principal Name' input is provided.",
  example: "contoso.onmicrosoft.com",
  placeholder: "Enter domain",
  clean: cleanStringInput,
});

const givenName = input({
  label: "First Name",
  type: "string",
  required: false,
  comments: "The updated first name of the user.",
  placeholder: "Enter first name",
  example: "John",
  clean: cleanStringInput,
});

const surname = input({
  label: "Last Name",
  type: "string",
  required: false,
  comments: "The updated last name of the user.",
  placeholder: "Enter last name",
  example: "Doe",
  clean: cleanStringInput,
});

const jobTitle = input({
  label: "Job Title",
  type: "string",
  required: false,
  comments: "The updated job title of the user.",
  placeholder: "Enter job title",
  example: "Software Engineer",
  clean: cleanStringInput,
});

const additionalProperties = input({
  label: "Additional Properties",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional properties to update that are not covered by the other inputs. This should be a JSON object and will be merged with the other inputs. You can get additional properties from the Microsoft Graph API documentation https://learn.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0#json-representation",
  clean: cleanCodeInput,
});

export default {
  userId,
  accountEnabled,
  displayName,
  userPrincipalName,
  domain,
  givenName,
  surname,
  jobTitle,
  additionalProperties,
};
