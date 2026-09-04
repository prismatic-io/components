import { type ActionLogger, util } from "@prismatic-io/spectral";
import type {
  AdditionalAttributeCreateVo,
  CategoryAttributeDefinitionVo,
} from "../types";
import { getRecordString, isRecord } from "./typeGuards";
export const MULTI_SELECT_DELIMITER = "Ɖ";
export const parseArenaAttributeValue = (
  value: unknown,
  attributeDef?: CategoryAttributeDefinitionVo,
): unknown => {
  if (!attributeDef || value === null || value === undefined) {
    return value;
  }
  const { fieldType, multiSelect } = attributeDef;
  if (multiSelect && typeof value === "string") {
    if (value.includes(MULTI_SELECT_DELIMITER)) {
      return value
        .split(MULTI_SELECT_DELIMITER)
        .map((v) => v.trim())
        .filter((v) => v !== "");
    }
    return [value.trim()].filter((v) => v !== "");
  }
  if (["NUMBER", "POSITIVE_DOUBLE", "COST"].includes(fieldType)) {
    if (typeof value === "number") {
      return value;
    }
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number.parseFloat(value.trim());
      return Number.isNaN(parsed) ? value : parsed;
    }
  }
  if (["INTEGER", "POSITIVE_INTEGER"].includes(fieldType)) {
    if (typeof value === "number") {
      return Math.floor(value);
    }
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number.parseInt(value.trim(), 10);
      return Number.isNaN(parsed) ? value : parsed;
    }
  }
  if (fieldType === "BOOLEAN") {
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      const lowerValue = value.toLowerCase().trim();
      if (["true", "1", "yes", "on"].includes(lowerValue)) {
        return true;
      }
      if (["false", "0", "no", "off"].includes(lowerValue)) {
        return false;
      }
    }
  }
  return value;
};
export interface AdditionalAttributeInputs {
  additionalAttributeJson?: unknown;
  additionalAttributes?: unknown;
  attributeDefinitions?: unknown;
}
const indexDefinitionsByApiName = (
  attributeDefinitions: unknown,
): Map<string, CategoryAttributeDefinitionVo> => {
  const byApiName = new Map<string, CategoryAttributeDefinitionVo>();
  if (!Array.isArray(attributeDefinitions)) {
    return byApiName;
  }
  for (const definition of attributeDefinitions as CategoryAttributeDefinitionVo[]) {
    byApiName.set(definition.apiName, definition);
  }
  return byApiName;
};
export interface AttributeTraceContext {
  logger: ActionLogger;
  debug: {
    enabled: boolean;
  };
}
export const resolveAdditionalAttributes = (
  {
    additionalAttributeJson,
    additionalAttributes,
    attributeDefinitions,
  }: AdditionalAttributeInputs,
  context: AttributeTraceContext,
): AdditionalAttributeCreateVo[] | undefined => {
  if (additionalAttributeJson) {
    if (Array.isArray(additionalAttributeJson)) {
      return additionalAttributeJson as AdditionalAttributeCreateVo[];
    }
    if (isRecord(additionalAttributeJson)) {
      return [
        additionalAttributeJson as unknown as AdditionalAttributeCreateVo,
      ];
    }
    return undefined;
  }
  if (!Array.isArray(additionalAttributes)) {
    return undefined;
  }
  const definitionsByApiName = indexDefinitionsByApiName(attributeDefinitions);
  const resolved = (additionalAttributes as unknown[]).flatMap((attribute) => {
    const apiName = getRecordString(attribute, "key")?.trim();
    if (!apiName) {
      return [];
    }
    const rawValue = isRecord(attribute) ? attribute.value : undefined;
    if (rawValue === null || rawValue === undefined) {
      return [];
    }
    if (util.types.isString(rawValue) && rawValue.trim() === "") {
      return [];
    }
    const definition = definitionsByApiName.get(apiName);
    const value = parseArenaAttributeValue(rawValue, definition);
    if (context.debug.enabled) {
      context.logger.debug("Processing attribute", {
        apiName,
        valueType: typeof value,
        isArray: Array.isArray(value),
        fieldType: definition?.fieldType,
        multiSelect: definition?.multiSelect,
        hasDefinition: Boolean(definition),
      });
    }
    return [{ guid: apiName, value }];
  });
  return resolved.length > 0 ? resolved : undefined;
};
