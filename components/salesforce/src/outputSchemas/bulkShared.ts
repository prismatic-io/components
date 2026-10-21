export const columnDelimiterSchema = {
  type: "string",
  enum: ["BACKQUOTE", "CARET", "COMMA", "PIPE", "SEMICOLON", "TAB"],
};
export const lineEndingSchema = { type: "string", enum: ["LF", "CRLF"] };
export const apiVersionSchema = { type: ["string", "number"] };
