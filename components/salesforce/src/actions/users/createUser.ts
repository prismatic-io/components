import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { createUserInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a Salesforce user.",
  },
  perform: async (
    context,
    {
      version,
      fieldValues,
      dynamicValues,
      profile,
      userName,
      lastName,
      firstName,
      email,
      alias,
      timeZone,
      connection,
    },
  ) => {
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        fieldValues,
        dynamicValues,
        profile,
        userName,
        lastName,
        firstName,
        email,
        alias,
        timeZone,
      });
    }
    const salesforceClient = await createSalesforceClient(connection, version);

    const profileResponse = await salesforceClient.sobject("Profile").findOne({ Name: profile });
    if (!profileResponse?.Id) {
      throw new Error(`Unable to find Profile matching "${profile}"`);
    }

    const command = salesforceClient.sobject("User").create({
      profileId: profileResponse.Id,
      FirstName: firstName,
      LastName: lastName,
      UserName: userName,
      Email: email,
      Alias: alias,
      EmailEncodingKey: "UTF-8",
      TimeZoneSidKey: timeZone,
      LocaleSidKey: "en_US",
      LanguageLocaleKey: "en_US",
      ...dynamicValues,
      ...fieldValues,
    });

    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  inputs: createUserInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
