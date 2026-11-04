import type { UserError } from "../types";

const searchUserErrors = (obj: unknown): UserError[] | null => {
  if (obj && typeof obj === "object") {
    const node = obj as Record<string, unknown>;
    if (node.userErrors) {
      return node.userErrors as UserError[];
    }
    for (const key in node) {
      const result = searchUserErrors(node[key]);
      if (result) return result;
    }
  }
  return null;
};

export const gqlErrorsCheck = (response: unknown): void => {
  const userErrors = searchUserErrors(response);
  if (userErrors && userErrors.length > 0) {
    throw new Error(userErrors.map((error) => error.message).join(", "));
  }
};
