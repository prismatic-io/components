import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { createContactInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const createContact = action({
  display: {
    label: "Create Contact",
    description: "Create a Salesforce contact.",
  },
  perform: async (
    context,
    {
      email,
      version,
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
      ...(firstName && { FirstName: firstName }),
      ...(lastName && { LastName: lastName }),
      ...(assistant && { AssistantName: assistant }),
      ...(assistantPhone && { AssistantPhone: assistantPhone }),
      ...(title && { Title: title }),
      ...(email && { Email: email }),
      ...(phone && { Phone: phone }),
      ...(mobile && { MobilePhone: mobile }),
      ...(fax && { Fax: fax }),
      ...(birthdate && { Birthdate: new Date(birthdate) }),
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

    const command = salesforceClient.sobject("Contact").create(payload);
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  inputs: createContactInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
