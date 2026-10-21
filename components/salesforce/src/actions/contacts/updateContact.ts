import { action, outputSchema } from "@prismatic-io/spectral";
import { updateRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { updateContactInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";
export const updateContact = action({
  display: {
    label: "Update Contact",
    description: "Update an existing contact record.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      version,
      recordId,
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
      ...(recordId && { Id: recordId }),
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
    if (context.debug.enabled) {
      context.logger.debug("Payload", payload);
    }
    const command = salesforceClient.sobject("Contact").update(payload);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => genericCreateUpdateExamplePayload,
  inputs: updateContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
