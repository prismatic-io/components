export const reduceConditionsArrayIntoObject = (
  conditions: Record<string, boolean>[] | undefined,
) => {
  if (!conditions || Object.keys(conditions).length === 0) return undefined;

  return conditions.reduce(
    (acc, condition) => Object.assign(condition, acc),
    {},
  );
};
