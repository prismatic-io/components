import { action } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { listEntitiesActionExamplePayload } from "../../examplePayloads";
import { listEntitiesActionInputs } from "../../inputs";

export const listEntitiesAction = action({
  display: {
    label: "List Entities",
    description:
      "Lists all available entities in the Dynamics 365 CRM instance with detailed metadata.",
  },
  inputs: listEntitiesActionInputs,
  examplePayload: listEntitiesActionExamplePayload,
  perform: async (context, { connection, includeCustom, includeOnlyTopLevel, includeDetails }) => {
    const client = await createCrmClient(connection, context.debug.enabled);

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

    const entities = filteredEntities
      .sort((a, b) => (a.SchemaName || "").localeCompare(b.SchemaName || ""))
      .map((entity) => {
        const baseEntity = {
          entityId: entity.MetadataId,
          logicalName: entity.LogicalName,
          schemaName: entity.SchemaName,
          displayName: entity.DisplayName?.UserLocalizedLabel?.Label || entity.SchemaName,
          pluralDisplayName: entity.DisplayCollectionName?.UserLocalizedLabel?.Label,
          isCustomEntity: entity.IsCustomEntity,
          isChildEntity: entity.IsChildEntity,
        };

        if (includeDetails) {
          return {
            ...baseEntity,
            description: entity.Description?.UserLocalizedLabel?.Label,
            ownershipType: entity.OwnershipType,
            isActivity: entity.IsActivity,
            isBusinessProcessEnabled: entity.IsBusinessProcessEnabled,
            isValidForAdvancedFind: entity.IsValidForAdvancedFind,
            isValidForQueue: entity.IsValidForQueue,
            entityColor: entity.EntityColor,
            iconLargeName: entity.IconLargeName,
            iconMediumName: entity.IconMediumName,
            iconSmallName: entity.IconSmallName,
          };
        }

        return baseEntity;
      });

    return {
      data: {
        entities,
        totalCount: entities.length,
        customEntitiesCount: entities.filter((e) => e.isCustomEntity).length,
        systemEntitiesCount: entities.filter((e) => !e.isCustomEntity).length,
      },
    };
  },
});
