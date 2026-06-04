import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput } from "../../../util";
import { UPDATE_OFFICE_SUITE_APP_SPECIFIC_PROPERTIES_EXAMPLE } from "../../../constants";

const mobileAppId = input({
  label: "Mobile App ID",
  comments: "The ID of the app to update.",
  placeholder: "Enter mobile app ID",
  example: "e0741df2-bae3-4649-9599-c47026da1234",
  type: "string",
  required: true,
  dataSource: "selectMobileApp",
  clean: cleanStringInput,
});

const odataTypeApp = input({
  label: "OData App Type",
  comments:
    "The type of app to update. This depends on the platform of the app. Check the Microsoft Graph API documentation for the correct type. Documentation for an Office Suite app can be found here https://learn.microsoft.com/en-us/graph/api/intune-apps-officesuiteapp-update?view=graph-rest-beta",
  type: "string",
  placeholder: "#microsoft.graph.officeSuiteApp",
  example: "#microsoft.graph.officeSuiteApp",
  required: true,
  clean: cleanStringInput,
});

const displayName = input({
  label: "Display Name",
  comments:
    "Update the name for the app. This name will be visible in the Intune apps list and to users in the Company Portal.​",
  type: "string",
  placeholder: "Office Suite App",
  example: "Office Suite App",
  required: false,
  clean: cleanStringInput,
});

const description = input({
  label: "Description",
  comments:
    "Update the description to help your device users understand what the app is and/or what they can do in the app. This comments will be visible to them in Company Portal.",
  type: "string",
  placeholder: "This is an Office Suite app.",
  example: "This is an Office Suite app.",
  required: false,
  clean: cleanStringInput,
});

const publisher = input({
  label: "Publisher",
  comments:
    "Update the name of the developer or company that distributes the app. This information will be visible to users in Company Portal.",
  type: "string",
  placeholder: "Microsoft",
  example: "Microsoft",
  required: false,
  clean: cleanStringInput,
});

const largeIconType = input({
  label: "Icon Image Type",
  comments:
    "Update the type of the Icon image. This field is required if the Icon Image Data is provided.",
  type: "string",
  placeholder: "image/png",
  example: "image/png",
  required: false,
  clean: cleanStringInput,
});

const largeIconValue = input({
  label: "Icon Image Data",
  comments:
    "Update the base64 encoded image data for the Icon image. This field is required if the Icon Image Type is provided.",
  type: "string",
  placeholder: "dmFsdWU=",
  example: "dmFsdWU=",
  required: false,
  clean: cleanStringInput,
});

const isFeatured = input({
  label: "Is Featured",
  comments:
    "Update whether the app is featured. Featured apps are displayed prominently in the Company Portal.​",
  type: "boolean",
  required: true,
  default: "false",
  clean: util.types.toBool,
});

const privacyInformationUrl = input({
  label: "Privacy Information URL",
  comments:
    "Update the URL that links to the privacy information for the app. The privacy information URL will be visible to users in Company Portal.​",
  type: "string",
  placeholder: "https://example.com/privacyInformationUrl/",
  example: "https://example.com/privacyInformationUrl/",
  required: false,
  clean: cleanStringInput,
});

const informationUrl = input({
  label: "Information URL",
  comments:
    "Update the URL that links to more information about the app. This URL will be visible to users in Company Portal.​",
  type: "string",
  placeholder: "https://example.com/informationUrl/",
  example: "https://example.com/informationUrl/",
  required: false,
  clean: cleanStringInput,
});

const owner = input({
  label: "Owner",
  comments:
    "Update the name of the person or company that owns the app. This information will be visible to people signed into the admin center.​",
  type: "string",
  placeholder: "John Doe",
  example: "John Doe",
  required: false,
  clean: cleanStringInput,
});

const developer = input({
  label: "Developer",
  comments:
    "Update the developer of the app. This information will be visible to users in Company Portal.​",
  type: "string",
  placeholder: "Microsoft",
  example: "Microsoft",
  required: false,
  clean: cleanStringInput,
});

const notes = input({
  label: "Notes",
  comments:
    "Update any notes about the app. This information will be visible to people signed into the admin center.​",
  type: "string",
  placeholder: "An example note.",
  example: "An example note.",
  required: false,
  clean: cleanStringInput,
});

const specificPlatformProperties = input({
  label: "Specific Platform Properties",
  comments:
    "The specific properties for the app to be updated, generic properties like '@odata.type', 'displayName', 'description', etc. are alredy covered by the other inputs. This input should be a JSON object with the specific properties for the app to be updated. Check the Microsoft Graph API documentation for the correct properties for the app type you are updating. Documentation for an Office Suite app can be found here https://learn.microsoft.com/en-us/graph/api/intune-apps-officesuiteapp-update?view=graph-rest-beta",
  type: "code",
  language: "json",
  example: UPDATE_OFFICE_SUITE_APP_SPECIFIC_PROPERTIES_EXAMPLE,
  required: false,
  clean: cleanCodeInput,
});

export default {
  mobileAppId,
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
