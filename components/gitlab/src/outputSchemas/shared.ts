type Schema = Record<string, unknown>;
export const str = { type: "string" };
export const num = { type: "number" };
export const bool = { type: "boolean" };
export const nullableStr = { type: ["string", "null"] };
export const nullableNum = { type: ["number", "null"] };
export const nullableBool = { type: ["boolean", "null"] };
export const strArray = { type: "array" as const, items: str };
export const obj = (properties: Record<string, Schema>) => ({
  type: "object" as const,
  properties,
  required: [] as string[],
  additionalProperties: true,
});
export const nullable = (schema: ReturnType<typeof obj>) => ({
  ...schema,
  type: ["object", "null"],
});
export const list = (items: Schema) => ({ type: "array" as const, items });
export const strEnum = (...values: string[]) => ({
  type: "string",
  enum: values,
});
export const visibilityEnum = strEnum("private", "internal", "public");
export const userSchema = obj({
  id: num,
  username: str,
  name: str,
  state: str,
  locked: bool,
  avatar_url: nullableStr,
  web_url: str,
  public_email: nullableStr,
});
export const referencesSchema = obj({ short: str, relative: str, full: str });
export const deletedSchema = {
  ...obj({ success: bool, message: str }),
  required: ["success", "message"],
};
