import { dataSource, type Element } from "@prismatic-io/spectral";
import { createCrmClient } from "../client";
import { getEntitiesMetaDataDataSourceInputs } from "../inputs";

export const getEntitiesMetaData = dataSource({
  display: {
    label: "Select Entity Objects",
    description:
      "Returns a configurable subset of Dynamics 365 CRM entity types and their attributes for object selection.",
  },
  inputs: getEntitiesMetaDataDataSourceInputs,
  perform: async (
    _context,
    {
      connection,
      defaultSelectedRecordTypes,
      recordTypeFilter,
      includeAllCustomRecordTypes,
      includeOnlyTopLevelRecordTypes,
    }
  ) => {
    const defaultSelectedSet = new Set(defaultSelectedRecordTypes);
    const includedTypesSet = new Set(recordTypeFilter);

    const client = await createCrmClient(connection, false);

    const { value } = await client.retrieveEntities();

    const objects = value.filter(({ SchemaName, IsCustomEntity, IsChildEntity }) => {
      if (includedTypesSet.size > 0) {
        
        return includedTypesSet.has((SchemaName as string).trim().toLowerCase());
      }

      if (includeAllCustomRecordTypes && IsCustomEntity) {
        
        return true;
      }

      if (includeOnlyTopLevelRecordTypes && IsChildEntity) {
        
        return false;
      }

      return true;
    });

    const mappedObjects = [];
    
    for (const record of objects) {
      const attributes = (
        await client.retrieveAttributes({
          entityKey: record?.MetadataId,
          select: ["LogicalName", "DisplayName"],
        })
      ).value;

      const remappedAttrs = attributes.map((attribute) => ({
        key: attribute.LogicalName,
        label: attribute.DisplayName?.UserLocalizedLabel?.Label,
      }));

      mappedObjects.push({
        object: { key: record.MetadataId, label: record.SchemaName },
        defaultSelected: defaultSelectedSet.has(record.SchemaName),
        fields: remappedAttrs as Element[],
      });
    }

    return { result: mappedObjects };
  },
  dataSourceType: "objectSelection",
});
