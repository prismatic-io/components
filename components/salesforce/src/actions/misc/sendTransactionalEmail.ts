import { action, util } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { sendTransactionalEmailInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";

export const sendTransactionalEmail = action({
  display: {
    label: "Send Transactional Email",
    description: "Send a transactional email message to a single recipient via Salesforce.",
  },
  inputs: sendTransactionalEmailInputs,
  perform: async (
    context,
    {
      messageKey,
      definitionKey,
      recipientContactKey,
      recipientEmail,
      recipientAttributes,
      connection,
      version,
    },
  ) => {
    const salesforceHttpClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );

    const requestBody = {
      definitionKey,
      recipient: {
        contactKey: recipientContactKey,
        to: recipientEmail,
        attributes: recipientAttributes.length
          ? util.types.keyValPairListToObject(recipientAttributes)
          : undefined,
      },
    };

    const response = await salesforceHttpClient.post(
      `/messaging/v1/email/messages/${messageKey}`,
      requestBody,
    );
    return {
      data: response.data,
    };
  },
  examplePayload: genericCreateUpdateExamplePayload,
});
