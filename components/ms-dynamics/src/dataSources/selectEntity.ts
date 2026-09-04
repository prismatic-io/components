import { dataSource, type Element } from "@prismatic-io/spectral";
import { createCrmClient } from "../client";
import { selectEntityExamplePayload } from "../examplePayloads";
import { selectEntityInputs } from "../inputs";
export const selectEntity = dataSource({
  display: {
    label: "Select Entity",
    description:
      "Selects from all available entities in the Dynamics 365 CRM instance.",
  },
  dataSourceType: "picklist",
  examplePayload: selectEntityExamplePayload,
  inputs: selectEntityInputs,
  perform: async (
    _context,
    { connection, includeCustom, includeOnlyTopLevel },
  ) => {
    const client = await createCrmClient(connection, false);
    const { value } = await client.retrieveEntities();
    const filteredEntities = value.filter((entity) => {
      if (!includeCustom && entity.IsCustomEntity) {
        return false;
      }
      if (includeOnlyTopLevel && entity.IsChildEntity) {
        return false;
      }
      return true;
    });
    const result = filteredEntities
      .sort((a, b) => (a.SchemaName || "").localeCompare(b.SchemaName || ""))
      .map(
        (entity): Element => ({
          label:
            entity.DisplayName?.UserLocalizedLabel?.Label || entity.SchemaName,
          key: entity.MetadataId,
        }),
      );
    return { result };
  },
});
