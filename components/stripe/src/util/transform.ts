export const equalArrays = (a: unknown[], b: unknown[]) => {
  return a.length === b.length && a.every((value, index) => value === b[index]);
};
export const equalUnorderedArrays = (
  a: readonly unknown[],
  b: readonly unknown[],
) => {
  return equalArrays([...a].sort(), [...b].sort());
};
