import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getListByIdExamplePayload } from "../../examplePayloads";
import { getListByIdInputs } from "../../inputs";
export const getListById = action({
  display: {
    label: "Get List by ID",
    description: "Retrieves a specific contact list by its ID.",
  },
  inputs: getListByIdInputs,
  perform: async (
    _context,
    { sendGridConnection, list_id, contact_sample },
  ) => {
    const client = createAuthorizedClient(sendGridConnection);
    const [_response, body] = await client.request({
      method: "GET",
      url: `/${API_VERSION}/marketing/lists/${list_id}`,
      qs: contact_sample ? { contact_sample: true } : undefined,
    });
    return { data: body };
  },
  examplePayload: getListByIdExamplePayload,
});
