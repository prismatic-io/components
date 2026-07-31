import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getContactsByEmailsExamplePayload } from "../../examplePayloads";
import { getContactsByEmailsInputs } from "../../inputs";
import { getContactsByEmailsOutputSchema } from "../../outputSchemas";
export const getContactsByEmails = action({
  display: {
    label: "Get Contacts by Emails",
    description: "Retrieves contacts by their email addresses.",
  },
  inputs: getContactsByEmailsInputs,
  perform: async (_context, { sendGridConnection, emails }) => {
    const client = createAuthorizedClient(sendGridConnection);
    let emailArray: string[];
    if (typeof emails === "string") {
      emailArray = emails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email);
    } else {
      throw new Error("Emails input must be a comma-separated string.");
    }
    if (!emailArray || emailArray.length === 0) {
      throw new Error("Please provide at least one email address.");
    }
    try {
      const [_response, body] = await client.request({
        method: "POST",
        url: `/${API_VERSION}/marketing/contacts/search/emails`,
        body: { emails: emailArray },
      });
      return { data: body };
    } catch (err) {
      const error = err as {
        response?: {
          body?: {
            errors: unknown;
          };
          statusCode?: number;
        };
        code?: string;
      };
      if (
        error.response?.body?.errors &&
        Array.isArray(error.response.body.errors)
      ) {
        const messages = error.response.body.errors
          .map(
            (e: { field: string; message: string }) =>
              `${e.field}: ${e.message}`,
          )
          .join(", ");
        throw new Error(
          `Failed to get contacts by emails: ${messages} (Status: ${error.code || error.response?.statusCode})`,
        );
      }
      throw new Error(
        `Failed to get contacts by emails: ${util.types.toString(error)} (Status: ${error.code || error.response?.statusCode})`,
      );
    }
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getContactsByEmailsOutputSchema,
  }),
  examplePayload: getContactsByEmailsExamplePayload,
});
