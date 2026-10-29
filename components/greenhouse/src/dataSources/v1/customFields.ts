import { dataSource, type Element, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { customFieldsV1DataSourceExamplePayload } from "../../examplePayloads/v1/dataSources";
import { connectionInput, version } from "../../inputs";
import type { CustomFieldDataSources } from "../../types";

export const customFields = dataSource({
  display: {
    label: "Fetch Custom Fields (Harvest v1/v2)",
    description: "Fetches an array of custom field names.",
  },
  inputs: {
    connection: connectionInput,
    version,
    fieldType: input({
      label: "Field Type",
      type: "string",
      required: true,
      model: [
        {
          label: "Offer",
          value: "offer",
        },
        {
          label: "Candidate",
          value: "candidate",
        },
        {
          label: "Application",
          value: "application",
        },
        {
          label: "Job",
          value: "job",
        },
        {
          label: "Rejection Question",
          value: "rejection_question",
        },
        {
          label: "Referral Question",
          value: "referral_question",
        },
        {
          label: "User Attribute",
          value: "user_attribute",
        },
      ],
    }),
  },
  perform: async (_context, { connection, version, fieldType }) => {
    const client = createClient(connection, version);
    const { data } = await client.get<CustomFieldDataSources[]>(
      `/custom_fields/${fieldType}`,
    );
    const result = data.map<Element>((customField) => ({
      label: customField.name,
      key: customField.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: customFieldsV1DataSourceExamplePayload,
});
