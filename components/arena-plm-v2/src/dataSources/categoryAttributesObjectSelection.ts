import { dataSource } from "@prismatic-io/spectral";
import { createArenaClient } from "../client";
import { categoryAttributesObjectSelectionExamplePayload } from "../examplePayloads";
import { categoryAttributesObjectSelectionInputs } from "../inputs";
import type { CategoryAttributeDefinitionResultRep } from "../types";
import { handleArenaError } from "../util";
export const categoryAttributesObjectSelection = dataSource({
  display: {
    label: "Select Category Attributes",
    description:
      "Select category attributes with metadata fields and multi-select capability.",
  },
  dataSourceType: "objectSelection",
  inputs: categoryAttributesObjectSelectionInputs,
  perform: async (
    context,
    { connection, objectType, categoryGuid, includeInactive },
  ) => {
    const actionContext = "Get Category Attributes for Object Selection";
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Fetching category attributes from Arena", {
        objectType,
        categoryGuid,
        includeInactive,
      });
      const response = await client.get(
        `/settings/${objectType}/categories/${categoryGuid}/attributes`,
      );
      const responseData =
        response.data as CategoryAttributeDefinitionResultRep;
      const attributes = responseData.results || [];
      const filteredAttributes = includeInactive
        ? attributes
        : attributes.filter((attr) => attr.active);
      if (filteredAttributes.length === 0) {
        context.logger.warn(
          `No ${includeInactive ? "" : "active "}attributes found for category GUID: ${categoryGuid}`,
        );
      }
      const objects = filteredAttributes.map((attribute) => ({
        object: {
          key: attribute.guid,
          label: attribute.name || attribute.apiName,
        },
        fields: [
          { key: "guid", label: "GUID" },
          { key: "apiName", label: "API Name" },
          { key: "name", label: "Name" },
          { key: "fieldType", label: "Field Type" },
          { key: "required", label: "Required" },
          { key: "active", label: "Active" },
          { key: "custom", label: "Custom" },
          { key: "editable", label: "Editable" },
          { key: "description", label: "Description" },
        ],
      }));
      context.logger.info(
        `Successfully retrieved ${objects.length} category attributes for object selection`,
      );
      return {
        result: objects,
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, actionContext);
      throw error;
    }
  },
  examplePayload: categoryAttributesObjectSelectionExamplePayload,
});
