export const sortByAttribute = <T>(items: T[], key: keyof T): T[] =>
  items.sort((a, b) => (a[key] < b[key] ? -1 : 1));
