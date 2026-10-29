import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDocumentsExamplePayload } from "../../examplePayloads";
import {
  category_id,
  connectionInput,
  employee_id,
  fetchAll,
} from "../../inputs";
import { fetchAllRecords } from "../../util";

export const listDocuments = action({
  display: {
    label: "List Documents",
    description: "View all documents for company",
  },
  inputs: {
    connectionInput,
    category_id,
    employee_id: {
      ...employee_id,
      comments: "Optional id of employee to filter documents.",
      required: false,
    },
    fetchAll,
  },
  perform: async (
    context,
    { connectionInput, fetchAll, category_id, employee_id },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const params = {
      category_id: category_id || undefined,
      employee_id: employee_id || undefined,
    };

    if (fetchAll) {
      const data = await fetchAllRecords(client, "/documents", params);
      return { data };
    }

    const { data } = await client.get("/documents", { params });
    return { data };
  },
  examplePayload: listDocumentsExamplePayload,
});
