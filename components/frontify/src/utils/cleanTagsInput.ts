export const cleanTagsInput = (
  tags: unknown,
): Record<string, string>[] | undefined => {
  if (Array.isArray(tags)) {
    const tagObjects = tags.map((tag) => {
      return { value: tag };
    });
    return tagObjects.length > 0 ? tagObjects : undefined;
  }
  return undefined;
};
