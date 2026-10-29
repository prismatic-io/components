import { type KeyValuePair, util } from "@prismatic-io/spectral";

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanOptionalNumber = (value: unknown): number | undefined =>
  value === undefined || value === null || value === ""
    ? undefined
    : util.types.toNumber(value);

export const cleanStringList = (value: unknown): string[] | undefined => {
  if (!value) return undefined;
  const values = Array.isArray(value) ? value : [value];
  const list = values
    .map((entry) => util.types.toString(entry))
    .filter(Boolean);
  return list.length ? list : undefined;
};

export const cleanCategoryLabels = (
  value: unknown,
): Record<string, string> | undefined => {
  const labels = util.types.keyValPairListToObject<string>(
    (value as KeyValuePair[] | undefined) ?? [],
    util.types.toString,
  );
  return Object.keys(labels).length ? labels : undefined;
};

export const cleanChecklistItems = (
  value: unknown,
): { title: string; isChecked: boolean }[] | undefined => {
  const items = ((value as KeyValuePair[] | undefined) ?? []).map(
    ({ key, value: checked }) => ({
      title: util.types.toString(key),
      isChecked: util.types.toBool(checked),
    }),
  );
  return items.length ? items : undefined;
};

export const cleanReferences = (
  value: unknown,
): { url: string; alias: string }[] | undefined => {
  const references = ((value as KeyValuePair[] | undefined) ?? []).map(
    ({ key, value: alias }) => ({
      url: util.types.toString(key),
      alias: util.types.toString(alias),
    }),
  );
  return references.length ? references : undefined;
};
