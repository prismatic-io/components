import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { API_VERSION } from "../../constants";
import { initiateContactsImportExamplePayload } from "../../examplePayloads";
import { initiateContactsImportInputs } from "../../inputs";
export const initiateContactsImport = action({
  display: {
    label: "Initiate Contacts Import",
    description:
      "Initiates a CSV contact import. Returns a URL and headers for uploading the CSV file.",
  },
  inputs: initiateContactsImportInputs,
  perform: async (
    _context,
    { sendGridConnection, list_ids, field_mappings, is_compressed },
  ) => {
    const client = createAuthorizedClient(sendGridConnection);
    const payload: {
      list_ids?: string[];
      file_type: "csv";
      field_mappings: (string | null)[];
    } = {
      file_type: "csv",
      field_mappings,
    };
    if (list_ids && typeof list_ids === "string") {
      payload.list_ids = list_ids
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id);
      if (payload.list_ids.length === 0) delete payload.list_ids;
    }
    const [_response, body] = await client.request({
      method: "PUT",
      url: `/${API_VERSION}/marketing/contacts/imports`,
      body: payload,
      headers: is_compressed ? { "Content-Encoding": "gzip" } : undefined,
    });
    return { data: body };
  },
  examplePayload: initiateContactsImportExamplePayload,
});
