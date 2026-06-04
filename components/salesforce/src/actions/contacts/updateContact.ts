import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { updateContactInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const updateContact = action({
  display: {
    label: "Update Contact",
    description: "Update an existing contact record.",
  },
  perform: async (
    context,
    {
      version,
      recordId,
      email,
      dynamicValues,
      fieldValues,
      phone,
      firstName,
      lastName,
      department,
      birthdate,
      fax,
      title,
      mobile,
      assistant,
      assistantPhone,
      description,
      billingCity,
      billingPostalCode,
      billingState,
      billingStreet,
      billingCountry,
      street,
      state,
      country,
      city,
      postalCode,
      connection,
    },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);

    const payload = {
      ...(recordId && { Id: recordId }),
      ...(firstName && { FirstName: firstName }),
      ...(lastName && { LastName: lastName }),
      ...(assistant && { AssistantName: assistant }),
      ...(assistantPhone && { AssistantPhone: assistantPhone }),
      ...(title && { Title: title }),
      ...(email && { Email: email }),
      ...(phone && { Phone: phone }),
      ...(mobile && { MobilePhone: mobile }),
      ...(fax && { Fax: fax }),
      ...(birthdate && {
        Birthdate: new Date(birthdate),
      }),
      ...(department && { Department: department }),
      ...(description && { description: description }),
      ...(billingCity && { OtherCity: billingCity }),
      ...(billingCountry && { OtherCountry: billingCountry }),
      ...(billingPostalCode && { OtherPostalCode: billingPostalCode }),
      ...(billingState && { OtherState: billingState }),
      ...(billingStreet && { OtherStreet: billingStreet }),
      ...(city && { MailingCity: city }),
      ...(country && { MailingCountry: country }),
      ...(postalCode && { MailingPostalCode: postalCode }),
      ...(state && { MailingState: state }),
      ...(street && { MailingStreet: street }),
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
  inputs: updateContactInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
