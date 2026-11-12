import {
  accountSignatureSchema,
  accountSignaturesInformationSchema,
  userSignatureSchema,
} from "./definitions";

export const createAccountSignatureOutputSchema =
  accountSignaturesInformationSchema;

export const getAccountSignatureOutputSchema = accountSignatureSchema;

export const updateAccountSignatureOutputSchema = accountSignatureSchema;

export const updateAccountSignatureImageOutputSchema = accountSignatureSchema;

export const getRecipientSignatureOutputSchema = userSignatureSchema;
