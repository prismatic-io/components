import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClickUpClient as createClient } from "../client";
import { customFieldOptionsExamplePayload } from "../examplePayloads";
import { customFieldOptionsInputs } from "../inputs";
import type { CustomField, GetAccessibleCustomFieldsResponse } from "../types";
export const customFieldOptions = dataSource({
  display: {
    label: "Select Custom Field Option",
    description: "Select an option from a given custom field.",
  },
  perform: async (_context, { listId, connection, fieldName }) => {
    const client = createClient(connection);
    const { data } = await client.get<GetAccessibleCustomFieldsResponse>(
      `/list/${listId}/field`,
    );
    const field = data.fields.find((field) => field.name === fieldName);
    if (!field) {
      throw new Error("Unable to find custom field options");
    }
    const options = (field?.type_config?.options || []).map<Element>(
      (option) => {
        return { label: option.name, key: option.id };
      },
    );
    return { result: options };
  },
  inputs: customFieldOptionsInputs,
  examplePayload: customFieldOptionsExamplePayload,
  dataSourceType: "picklist",
});
