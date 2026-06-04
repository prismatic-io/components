import { action } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { getEntitiesMetaDataExamplePayload } from "../../examplePayloads";
import { getEntitiesMetaDataInputs } from "../../inputs";

export const getEntitiesMetaData = action({
  display: {
    label: "Get Entities Metadata",
    description:
      "Retrieves a configurable subset of Dynamics 365 CRM entity types and their attributes.",
  },
  inputs: getEntitiesMetaDataInputs,
  examplePayload: getEntitiesMetaDataExamplePayload,
  perform: async (
    context,
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

    const client = await createCrmClient(connection, context.debug.enabled);

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
    const mappedObjects = objects.map(async (record) => {
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

      const fullObject = {
        object: { key: record.MetadataId, label: record?.SchemaName },
        defaultSelected: defaultSelectedSet.has(record.SchemaName),
        fields: remappedAttrs,
      };
      return fullObject;
    });
    return {
      data: await Promise.all(mappedObjects),
    };
  },
});
