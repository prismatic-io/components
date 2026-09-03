export const PAGE_QUERY =
  "SELECT * FROM ${table:name} WHERE ${cursorField:name} > ${cursor} ORDER BY ${cursorField:name} ASC LIMIT ${limit}";
export const REMAINDER_QUERY =
  "SELECT * FROM ${table:name} WHERE ${cursorField:name} > ${cursor} ORDER BY ${cursorField:name} ASC";
export const MAX_CURSOR_QUERY =
  "SELECT MAX(${cursorField:name}) AS cursor FROM ${table:name}";
