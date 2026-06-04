import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput } from "../../../util";
import { CREATE_OFFICE_SUITE_APP_SPECIFIC_PROPERTIES_EXAMPLE } from "../../../constants";

const odataTypeApp = input({
  label: "OData App Type",
  comments:
    "The OData type of the app to create (e.g., #microsoft.graph.officeSuiteApp, #microsoft.graph.win32LobApp). This depends on the platform of the app. [Learn more](https://learn.microsoft.com/en-us/graph/api/intune-apps-officesuiteapp-create?view=graph-rest-beta)",
  type: "string",
  placeholder: "Enter OData type",
  example: "#microsoft.graph.officeSuiteApp",
  required: true,
  clean: cleanStringInput,
});

const displayName = input({
  label: "Display Name",
  comments:
    "The name for the app. This name will be visible in the Intune apps list and to users in the Company Portal.",
  type: "string",
  placeholder: "Enter app name",
  example: "Office Suite App",
  required: true,
  clean: cleanStringInput,
});

const description = input({
  label: "Description",
  comments:
    "A description of the app that helps users understand what it is and what they can do with it. This description will be visible in Company Portal.",
  type: "string",
  placeholder: "Enter app description",
  example: "This is an Office Suite app.",
  required: true,
  clean: cleanStringInput,
});

const publisher = input({
  label: "Publisher",
  comments:
    "The name of the developer or company that distributes the app. This information will be visible to users in Company Portal.",
  type: "string",
  placeholder: "Enter publisher name",
  example: "Microsoft",
  required: false,
  clean: cleanStringInput,
});

const largeIconType = input({
  label: "Icon Image Type",
  comments:
    "The MIME type of the app icon image (e.g., image/png, image/jpeg). This field is required if the Icon Image Data is provided.",
  type: "string",
  placeholder: "Enter icon image type",
  example: "image/png",
  required: false,
  clean: cleanStringInput,
});

const largeIconValue = input({
  label: "Icon Image Data",
  comments:
    "The base64-encoded image data for the app icon. This field is required if the Icon Image Type is provided.",
  type: "string",
  placeholder: "Enter base64-encoded image data",
  example: "dmFsdWU=",
  required: false,
  clean: cleanStringInput,
});

const isFeatured = input({
  label: "Is Featured",
  comments:
    "When true, displays this as a featured app in the Company Portal. Featured apps are prominently placed so users can quickly access them.",
  type: "boolean",
  required: true,
  default: "false",
  clean: util.types.toBool,
});

const privacyInformationUrl = input({
  label: "Privacy Information URL",
  comments:
    "A link to the app's privacy policy and terms. This URL will be visible to users in Company Portal.",
  type: "string",
  placeholder: "Enter privacy information URL",
  example: "https://example.com/privacy",
  required: false,
  clean: cleanStringInput,
});

const informationUrl = input({
  label: "Information URL",
  comments:
    "A link to a website or documentation with more information about the app. This URL will be visible to users in Company Portal.",
  type: "string",
  placeholder: "Enter information URL",
  example: "https://example.com/info",
  required: false,
  clean: cleanStringInput,
});

const owner = input({
  label: "Owner",
  comments:
    "The name of the person in your organization who manages licensing or is the point-of-contact for this app. This name will be visible in the admin center.",
  type: "string",
  placeholder: "Enter owner name",
  example: "John Doe",
  required: false,
  clean: cleanStringInput,
});

const developer = input({
  label: "Developer",
  comments:
    "The name of the company or individual that developed the app. This information will be visible in the admin center.",
  type: "string",
  placeholder: "Enter developer name",
  example: "Microsoft",
  required: false,
  clean: cleanStringInput,
});

const notes = input({
  label: "Notes",
  comments:
    "Additional notes about the app for documentation purposes. Notes will be visible in the admin center.",
  type: "string",
  placeholder: "Enter notes",
  example: "This app is used by the sales team.",
  required: false,
  clean: cleanStringInput,
});

const specificPlatformProperties = input({
  label: "Specific Platform Properties",
  comments:
    "The specific properties for the app to be created, generic properties like '@odata.type', 'displayName', 'description', etc. are alredy covered by the other inputs. This input should be a JSON object with the specific properties for the app to be created. Check the Microsoft Graph API documentation for the correct properties for the app type you are creating. Documentation for an Office Suite app can be found here https://learn.microsoft.com/en-us/graph/api/intune-apps-officesuiteapp-create?view=graph-rest-beta",
  type: "code",
  language: "json",
  example: CREATE_OFFICE_SUITE_APP_SPECIFIC_PROPERTIES_EXAMPLE,
  required: true,
  clean: cleanCodeInput,
});

export default {
  odataTypeApp,
  displayName,
  description,
  publisher,
  largeIconType,
  largeIconValue,
  isFeatured,
  privacyInformationUrl,
  informationUrl,
  owner,
  developer,
  notes,
  specificPlatformProperties,
};
