
export const sortByLabel = <T extends { label: string }>(items: T[]): T[] =>
  items.sort((a, b) => a.label.localeCompare(b.label));
