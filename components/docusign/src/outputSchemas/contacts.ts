import {
  contactGetResponseSchema,
  contactUpdateResponseSchema,
} from "./definitions";

export const getContactOutputSchema = contactGetResponseSchema;

export const createContactOutputSchema = contactUpdateResponseSchema;

export const updateContactOutputSchema = contactUpdateResponseSchema;

export const deleteContactOutputSchema = contactUpdateResponseSchema;
