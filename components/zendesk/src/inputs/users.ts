import { structuredObjectInput } from "@prismatic-io/spectral";
import { cleanString, convertBooleanInputIntoUpdateInput } from "../util";
import {
  connectionInput,
  isModerator,
  isVerified,
  organizationId,
  userAlias,
  userDetails,
  userEmail,
  userExternalIdInput,
  userId,
  userName,
  userNotes,
  userPhone,
  userQueryInput,
  userRole,
  userTimeZone,
} from "./common";
export const createUserInputs = {
  userName,
  userEmail,
  accountSettings: structuredObjectInput({
    label: "Account Settings",
    comments:
      "Role, moderator permission, and verification state for the record.",
    inputs: { userRole, isModerator, isVerified },
  }),
  userPhone,
  externalId: userExternalIdInput,
  profileDetails: structuredObjectInput({
    label: "Profile Details",
    comments: "Alias, notes, and other descriptive attributes for the record.",
    inputs: { userAlias, userNotes, userDetails },
  }),
  organizationId,
  zendeskConnection: connectionInput,
};
export const deleteUserInputs = {
  userId,
  zendeskConnection: connectionInput,
};
export const listUsersInputs = {
  zendeskConnection: connectionInput,
};
export const searchUsersInputs = {
  externalId: {
    ...userExternalIdInput,
    comments:
      "The external_id parameter does not support the search syntax. It only accepts ids.",
  },
  query: userQueryInput,
  zendeskConnection: connectionInput,
};
export const showUserInputs = {
  userId,
  zendeskConnection: connectionInput,
};
export const updateUserInputs = {
  userId: { ...userId, required: true },
  accountSettings: structuredObjectInput({
    label: "Account Settings",
    comments:
      "Role, moderator permission, and verification state for the record.",
    inputs: {
      userRole,
      isModerator: convertBooleanInputIntoUpdateInput(isModerator),
      isVerified: convertBooleanInputIntoUpdateInput(isVerified),
    },
  }),
  contactInfo: structuredObjectInput({
    label: "Name & Contact Information",
    comments: "Name, email, phone, and other contact channel details.",
    inputs: {
      userName: { ...userName, required: false, clean: cleanString },
      userEmail: { ...userEmail, required: false, clean: cleanString },
      userPhone,
    },
  }),
  externalId: userExternalIdInput,
  profileDetails: structuredObjectInput({
    label: "Profile Details",
    comments: "Alias, notes, and other descriptive attributes for the record.",
    inputs: { userAlias, userNotes, userDetails, userTimeZone },
  }),
  organizationId,
  zendeskConnection: connectionInput,
};
