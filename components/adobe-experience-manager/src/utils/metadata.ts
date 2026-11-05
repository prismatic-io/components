import type { MetadataPatchOperation } from "../types";

const toPointerSegment = (field: string): string => field.replace(/~/g, "~0").replace(/\//g, "~1");

export const buildMetadataPatch = (
  values: Record<string, string>,
  removals: string[],
): MetadataPatchOperation[] => {
  const operations: MetadataPatchOperation[] = [
    ...Object.entries(values).map(
      ([field, value]): MetadataPatchOperation => ({
        op: "add",
        path: `/${toPointerSegment(field)}`,
        value,
      }),
    ),
    ...removals.map(
      (field): MetadataPatchOperation => ({
        op: "remove",
        path: `/${toPointerSegment(field)}`,
      }),
    ),
  ];
  if (!operations.length) {
    throw new Error("Update Asset Metadata needs at least one metadata value or field to remove.");
  }
  return operations;
};
