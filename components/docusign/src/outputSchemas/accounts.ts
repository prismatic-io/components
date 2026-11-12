import {
  accountInformationSchema,
  accountSettingsInformationSchema,
  newAccountSummarySchema,
} from "./definitions";

export const getAccountOutputSchema = accountInformationSchema;

export const createAccountOutputSchema = newAccountSummarySchema;

export const listAccountSettingsOutputSchema = accountSettingsInformationSchema;
