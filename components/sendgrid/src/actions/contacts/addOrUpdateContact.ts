import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { API_VERSION } from "../../constants";
import { addOrUpdateContactExamplePayload } from "../../examplePayloads";
import { addOrUpdateContactInputs } from "../../inputs";
export const addOrUpdateContact = action({
  display: {
    label: "Add or Update Contact",
    description:
      "Adds or updates a contact. Can also be used to add contacts to a list.",
  },
  inputs: addOrUpdateContactInputs,
  perform: async (_context, { sendGridConnection, list_ids, contacts }) => {
    const client = createAuthorizedClient(sendGridConnection);
    const payload: {
      list_ids?: string[];
      contacts: unknown[];
    } = {
      contacts: contacts as unknown[],
    };
    if (list_ids && typeof list_ids === "string") {
      payload.list_ids = list_ids
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id);
    }
    const [_response, body] = await client.request({
      method: "PUT",
      url: `/${API_VERSION}/marketing/contacts`,
      body: payload,
    });
    return { data: body };
  },
  examplePayload: addOrUpdateContactExamplePayload,
});
