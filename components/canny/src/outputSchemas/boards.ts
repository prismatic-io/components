import { boardListItemSchema, boardSchema } from "./shared";
export const listBoardsOutputSchema = {
  type: "object" as const,
  properties: {
    boards: { type: "array", items: boardListItemSchema },
  },
  required: ["boards"],
};
export const retrieveBoardOutputSchema = boardSchema;
