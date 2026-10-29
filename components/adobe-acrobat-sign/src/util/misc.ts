export const filterAndSort = (
  items: { label: string; key: string }[],
  searchQuery: string | undefined,
) => {
  return items
    .filter((item) =>
      searchQuery
        ? item.label.toLowerCase().includes(searchQuery.toLowerCase())
        : true,
    )
    .sort((a, b) => a.label.localeCompare(b.label));
};
