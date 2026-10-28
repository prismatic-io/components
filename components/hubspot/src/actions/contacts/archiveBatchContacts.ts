import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { archiveBatchContactsExamplePayload } from "../../examplePayloads";
import { archiveBatchContactsInputs } from "../../inputs";
import { getArrayOfObjectsWithKey } from "../../util";
import { hubspotPaths } from "../../constants";
export const archiveBatchContacts = action({
  display: {
    label: "Archive Batch Contacts",
    description: "Archive a batch of contacts by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { contactIds, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const payload = { inputs: getArrayOfObjectsWithKey(contactIds, "id") };
    const { data } = await client.post(
      hubspotPaths.objects("contacts", "/batch/archive"),
      payload,
    );
    return {
      data,
    };
  },
  inputs: archiveBatchContactsInputs,
  examplePerform: async () => ({
    data: archiveBatchContactsExamplePayload.data,
  }),
  examplePayload: archiveBatchContactsExamplePayload,
});
