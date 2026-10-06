import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClickUpClient as createClient } from "../client";
import { customFieldsExamplePayload } from "../examplePayloads";
import { customFieldsInputs } from "../inputs";
import type { GetAccessibleCustomFieldsResponse } from "../types";
export const customFields = dataSource({
  display: {
    label: "Select Custom Field",
    description: "Select a custom field from a list.",
  },
  perform: async (_context, { listId, connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<GetAccessibleCustomFieldsResponse>(
      `/list/${listId}/field`,
    );
    const options = data.fields.map<Element>((field) => {
      return { label: field.name, key: field.id };
    });
    return { result: options };
  },
  inputs: customFieldsInputs,
  examplePayload: customFieldsExamplePayload,
  dataSourceType: "picklist",
});
