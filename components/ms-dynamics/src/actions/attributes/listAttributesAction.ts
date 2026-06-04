import { action, util } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { listAttributesActionExamplePayload } from "../../examplePayloads";
import { listAttributesActionInputs } from "../../inputs";

export const listAttributesAction = action({
  display: {
    label: "List Attributes",
    description: "Lists all attributes for a specific entity in the Dynamics 365 CRM instance.",
  },
  inputs: listAttributesActionInputs,
  examplePayload: listAttributesActionExamplePayload,
  perform: async (context, { connection, entityId, attributeType, includeDetails }) => {
    const client = await createCrmClient(connection, context.debug.enabled);

    const selectFields = [
      "LogicalName",
      "DisplayName",
      "AttributeType",
      "Description",
      "IsCustomAttribute",
      "IsPrimaryId",
      "IsPrimaryName",
      "RequiredLevel",
      "IsValidForRead",
      "IsValidForCreate",
      "IsValidForUpdate",
    ];

    if (includeDetails) {
      selectFields.push("SchemaName", "IsSecured", "IsAuditEnabled", "IsValidForAdvancedFind");
    }

    const response = await client.retrieveAttributes({
      entityKey: util.types.toString(entityId),
      castType: util.types.toString(attributeType),
      select: selectFields,
    });

    const attributes = response.value
      .filter((attr) => attr.DisplayName?.UserLocalizedLabel?.Label)
      .sort((a, b) => (a.LogicalName || "").localeCompare(b.LogicalName || ""))
      .map((attribute) => {
        const baseAttribute = {
          logicalName: attribute.LogicalName,
          displayName: attribute.DisplayName?.UserLocalizedLabel?.Label,
          attributeType: attribute.AttributeType,
          description: attribute.Description?.UserLocalizedLabel?.Label,
          isCustomAttribute: attribute.IsCustomAttribute,
          isPrimaryId: attribute.IsPrimaryId,
          isPrimaryName: attribute.IsPrimaryName,
          requiredLevel: attribute.RequiredLevel?.Value,
          isValidForRead: attribute.IsValidForRead,
          isValidForCreate: attribute.IsValidForCreate,
          isValidForUpdate: attribute.IsValidForUpdate,
        };

        if (includeDetails) {
          return {
            ...baseAttribute,
            schemaName: attribute.SchemaName,
            isSecured: attribute.IsSecured,
            isAuditEnabled: attribute.IsAuditEnabled,
            isValidForAdvancedFind: attribute.IsValidForAdvancedFind,
          };
        }

        return baseAttribute;
      });

    
    const attributesByType = attributes.reduce(
      (acc, attr) => {
        const type = attr.attributeType || "Unknown";
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      data: {
        entityId: util.types.toString(entityId),
        attributes,
        totalCount: attributes.length,
        customAttributesCount: attributes.filter((a) => a.isCustomAttribute).length,
        systemAttributesCount: attributes.filter((a) => !a.isCustomAttribute).length,
        attributesByType,
        primaryIdAttribute: attributes.find((a) => a.isPrimaryId)?.logicalName,
        primaryNameAttribute: attributes.find((a) => a.isPrimaryName)?.logicalName,
      },
    };
  },
});
