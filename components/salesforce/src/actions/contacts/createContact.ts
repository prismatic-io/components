import { action, outputSchema } from "@prismatic-io/spectral";
import { createRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { createContactInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";
export const createContact = action({
  display: {
    label: "Create Contact",
    description: "Create a Salesforce contact.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      version,
      email,
      dynamicValues,
      fieldValues,
      nameAndContact = {},
      mailingAddress = {},
      billingAddress = {},
      additionalFields = {},
      connection,
    },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const payload = {
      ...(nameAndContact.firstName && { FirstName: nameAndContact.firstName }),
      ...(nameAndContact.lastName && { LastName: nameAndContact.lastName }),
      ...(additionalFields.assistant && {
        AssistantName: additionalFields.assistant,
      }),
      ...(additionalFields.assistantPhone && {
        AssistantPhone: additionalFields.assistantPhone,
      }),
      ...(additionalFields.title && { Title: additionalFields.title }),
      ...(email && { Email: email }),
      ...(nameAndContact.phone && { Phone: nameAndContact.phone }),
      ...(nameAndContact.mobile && { MobilePhone: nameAndContact.mobile }),
      ...(nameAndContact.fax && { Fax: nameAndContact.fax }),
      ...(nameAndContact.birthdate && {
        Birthdate: new Date(nameAndContact.birthdate),
      }),
      ...(additionalFields.department && {
        Department: additionalFields.department,
      }),
      ...(additionalFields.description && {
        description: additionalFields.description,
      }),
      ...(billingAddress.billingCity && {
        OtherCity: billingAddress.billingCity,
      }),
      ...(billingAddress.billingCountry && {
        OtherCountry: billingAddress.billingCountry,
      }),
      ...(billingAddress.billingPostalCode && {
        OtherPostalCode: billingAddress.billingPostalCode,
      }),
      ...(billingAddress.billingState && {
        OtherState: billingAddress.billingState,
      }),
      ...(billingAddress.billingStreet && {
        OtherStreet: billingAddress.billingStreet,
      }),
      ...(mailingAddress.city && { MailingCity: mailingAddress.city }),
      ...(mailingAddress.country && { MailingCountry: mailingAddress.country }),
      ...(mailingAddress.postalCode && {
        MailingPostalCode: mailingAddress.postalCode,
      }),
      ...(mailingAddress.state && { MailingState: mailingAddress.state }),
      ...(mailingAddress.street && { MailingStreet: mailingAddress.street }),
      ...dynamicValues,
      ...fieldValues,
    };
    const command = salesforceClient.sobject("Contact").create(payload);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => genericCreateUpdateExamplePayload,
  inputs: createContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
