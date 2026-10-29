import { dataSource, type Element, input, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { CUSTOM_FIELD_TYPE_MODEL } from "../../constants";
import { customFieldsV3DataSourceExamplePayload } from "../../examplePayloads/v3/dataSources";
import { connectionOnlyInputs } from "../../inputs/v3/common";
import type { V3CustomField } from "../../types";
import { fetchAllV3 } from "../../util/v3";

export const customFieldsV3 = dataSource({
  display: {
    label: "Fetch Custom Fields",
    description: "Fetches an array of custom field names.",
  },
  inputs: {
    ...connectionOnlyInputs,
    fieldType: input({
      label: "Field Type",
      type: "string",
      required: true,
      model: CUSTOM_FIELD_TYPE_MODEL,
      clean: util.types.toString,
    }),
  },
  perform: async (_context, { connection, fieldType }) => {
    const client = createV3Client(connection);
    const data = await fetchAllV3<V3CustomField>(client, "/custom_fields", {
      field_type: fieldType,
    });
    const result = data.map<Element>((customField) => ({
      label: customField.name,
      key: customField.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: customFieldsV3DataSourceExamplePayload,
});
