import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createCrmClient } from "../client";
import { selectAttributeInputs } from "../inputs";

export const selectAttribute = dataSource({
  display: {
    label: "Select Attribute",
    description:
      "Selects from all attributes for a specific entity in the Dynamics 365 CRM instance.",
  },
  dataSourceType: "picklist",
  inputs: selectAttributeInputs,
  perform: async (_context, { connection, entityId }) => {
    const client = await createCrmClient(connection, false);

    const selectFields = ["LogicalName", "DisplayName", "MetadataId"];

    const response = await client.retrieveAttributes({
      entityKey: util.types.toString(entityId),
      select: selectFields,
    });

    const result = response.value
      .filter((attr) => attr.DisplayName?.UserLocalizedLabel?.Label)
      .sort((a, b) => (a.LogicalName || "").localeCompare(b.LogicalName || ""))
      .map(
        (attribute): Element => ({
          label: attribute.DisplayName.UserLocalizedLabel.Label,
          key: attribute.MetadataId,
        })
      );

    return { result };
  },
});
