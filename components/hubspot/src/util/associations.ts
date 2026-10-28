import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { hubspotPaths } from "../constants";
import type {
  AssociationSpec,
  AssociationTarget,
  AssociationTypeDefinition,
} from "../types";
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
export const resultsOf = (data: unknown): unknown[] =>
  isRecord(data) && Array.isArray(data.results) ? data.results : [];
export const resolveAssociationSpec = async (
  client: HttpClient,
  fromObjectType: string,
  toObjectType: string,
  associateType: string,
): Promise<AssociationSpec> => {
  const wanted = associateType.trim();
  const { data } = await client.get(
    hubspotPaths.associations(fromObjectType, toObjectType, "/labels"),
  );
  const types = resultsOf(data) as AssociationTypeDefinition[];
  const match = /^\d+$/.test(wanted)
    ? types.find(({ typeId }) => typeId === Number(wanted))
    : wanted &&
      types.find(
        ({ label }) =>
          typeof label === "string" &&
          label.trim().toLowerCase() === wanted.toLowerCase(),
      );
  if (!match) {
    throw new Error(
      `Unable to find an association type matching "${associateType}" between "${fromObjectType}" and "${toObjectType}". Provide a numeric association type ID from the List Association Types action.`,
    );
  }
  return {
    associationCategory: match.category,
    associationTypeId: match.typeId,
  };
};
export const mapAssociationTypes = (data: unknown): unknown => ({
  ...(isRecord(data) ? data : {}),
  results: (resultsOf(data) as AssociationTypeDefinition[]).map(
    ({ category, typeId, label }) => ({
      id: String(typeId),
      name: label ?? String(typeId),
      category,
      typeId,
      label: label ?? null,
    }),
  ),
});
export const mapReadAssociations = (data: unknown): unknown => ({
  ...(isRecord(data) ? data : {}),
  results: resultsOf(data).map((result) => {
    const item = isRecord(result) ? result : {};
    const targets = Array.isArray(item.to) ? item.to : [];
    return {
      ...item,
      to: targets.flatMap((target) => {
        const { toObjectId, associationTypes = [] } =
          target as AssociationTarget;
        if (associationTypes.length === 0) {
          return [{ id: toObjectId, toObjectId, associationTypes }];
        }
        return associationTypes.map((associationType) => ({
          id: toObjectId,
          type: associationType.label || String(associationType.typeId),
          toObjectId,
          associationTypes: [associationType],
        }));
      }),
    };
  }),
});
export const mapCreatedAssociations = (
  data: unknown,
  associateType: string,
): unknown => ({
  ...(isRecord(data) ? data : {}),
  results: resultsOf(data).map((result) => {
    const pair = isRecord(result) ? result : {};
    return {
      from: { id: pair.fromObjectId },
      to: { id: pair.toObjectId },
      type: associateType,
      ...pair,
    };
  }),
});
