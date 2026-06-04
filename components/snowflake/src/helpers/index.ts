export const cleanSqlString = (sql: string): string => sql.replace(/[\r\n]+/g, " ").trim();
