import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  ADDITIONAL_FIELDS_PROFILE_MODEL,
  FIELDS_PROFILE_MODEL,
} from "../constants";
import { connection, fields } from "./common";
import { cleanArrayCodeInput, cleanCodeInput, cleanStringInput } from "../util";
export const fieldsProfile = input({ ...fields, model: FIELDS_PROFILE_MODEL });
export const additionalFieldsProfile = input({
  ...fields,
  label: "Additional Profile Fields",
  comments:
    "Request additional fields not included by default in the response.",
  model: ADDITIONAL_FIELDS_PROFILE_MODEL,
});
const profileId = input({
  label: "Profile ID",
  comments: "Unique identifier for the profile.",
  type: "string",
  example: "01J18FVB5H8XR1X9AXEQFVRW7A",
  placeholder: "Enter a profile ID",
  required: true,
  dataSource: "selectProfile",
  clean: util.types.toString,
});
export const listProfileInputs = {
  connection,
  fieldsProfile,
  additionalFieldsProfile,
};
const email = input({
  label: "Email",
  comments: "The primary email address used to reach this profile.",
  type: "string",
  example: "sarah.mason@klaviyo-demo.com",
  placeholder: "Enter an email address",
  required: false,
  clean: cleanStringInput,
});
const phoneNumber = input({
  label: "Phone Number",
  comments: "Individual's phone number in E.164 format.",
  type: "string",
  example: "+15005550006",
  placeholder: "Enter a phone number",
  required: false,
  clean: cleanStringInput,
});
const externalId = input({
  label: "External ID",
  comments:
    "A unique identifier used by customers to associate Klaviyo profiles with profiles in an external system, such as a point-of-sale system. Format varies based on the external system.",
  type: "string",
  example: "12345",
  placeholder: "Enter an external ID",
  required: false,
  clean: cleanStringInput,
});
const firstName = input({
  label: "First Name",
  comments: "The given name of the profile contact.",
  type: "string",
  example: "Sarah",
  placeholder: "Enter a first name",
  required: false,
  clean: cleanStringInput,
});
const lastName = input({
  label: "Last Name",
  comments: "The family name of the profile contact.",
  type: "string",
  example: "Mason",
  placeholder: "Enter a last name",
  required: false,
  clean: cleanStringInput,
});
const organization = input({
  label: "Organization",
  comments:
    "Name of the company or organization within the company for whom the individual works",
  type: "string",
  example: "Example Corporation",
  placeholder: "Enter an organization name",
  required: false,
  clean: cleanStringInput,
});
const title = input({
  label: "Title",
  comments: "The job title or role at the individual's organization.",
  type: "string",
  example: "Regional Manager",
  placeholder: "Enter a job title",
  required: false,
  clean: cleanStringInput,
});
const image = input({
  label: "Image",
  comments: "URL pointing to the location of a profile image.",
  type: "string",
  example: "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
  placeholder: "Enter a profile image URL",
  required: false,
  clean: cleanStringInput,
});
const location = input({
  label: "Location",
  comments: "Location information for the profile.",
  type: "code",
  language: "json",
  example: JSON.stringify(
    {
      address1: "89 E 42nd St",
      address2: "1st floor",
      city: "New York",
      country: "United States",
      latitude: "40.7128",
      longitude: "74.0060",
      region: "NY",
      zip: "10017",
      timezone: "America/New_York",
      ip: "127.0.0.1",
    },
    null,
    2,
  ),
  required: false,
  clean: (value) => cleanCodeInput(value, "Location"),
});
const properties = input({
  label: "Properties",
  comments:
    "An object containing key/value pairs for any custom properties assigned to this profile.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      newKey: "New Value",
    },
    null,
    2,
  ),
  clean: (value) => cleanCodeInput(value, "Event Properties"),
});
const contactInfo = structuredObjectInput({
  label: "Contact Information",
  required: false,
  comments: "Email, phone, and other contact channel details.",
  inputs: { email, phoneNumber, firstName, lastName },
});
const profileFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes External ID, Organization, Title, Image, Location, and Properties.",
  inputs: { externalId, organization, title, image, location, properties },
});
export const createProfileInputs = {
  connection,
  contactInfo,
  profileFields,
};
export const getProfileInputs = {
  connection,
  profileId,
  fieldsProfile,
  additionalFieldsProfile,
};
export const updateProfileInputs = {
  connection,
  profileId,
  contactInfo,
  profileFields,
};
const subscribeProfiles = input({
  label: "Profiles",
  comments: "Array of profiles to subscribe.",
  type: "code",
  language: "json",
  example: JSON.stringify(
    [
      {
        type: "profile",
        id: "01GDDKASAP8TKDDA2GRZDSVP4H",
        attributes: {
          email: "matt-kemp@klaviyo-demo.com",
          phoneNumber: "+15005550006",
          subscriptions: {
            email: { marketing: { consent: "SUBSCRIBED" } },
            sms: { marketing: { consent: "SUBSCRIBED" } },
          },
        },
      },
    ],
    null,
    2,
  ),
  required: true,
  clean: (value) => cleanArrayCodeInput(value, "Profiles"),
});
export const subscribeProfilesInputs = {
  connection,
  subscribeProfiles,
};
const unsubscribeProfiles = input({
  label: "Profiles",
  comments: "Array of profiles to unsubscribe.",
  type: "code",
  language: "json",
  example: JSON.stringify(
    [
      {
        type: "profile",
        attributes: {
          email: "matt-kemp@klaviyo-demo.com",
          phoneNumber: "+15005550006",
        },
      },
    ],
    null,
    2,
  ),
  required: true,
  clean: (value) => cleanArrayCodeInput(value, "Profiles"),
});
export const unsubscribeProfilesInputs = {
  connection,
  unsubscribeProfiles,
};
