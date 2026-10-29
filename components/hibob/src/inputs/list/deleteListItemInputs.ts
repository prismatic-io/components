import { connection } from "../common";
import { itemId, listName } from "./common";

export const deleteListItemInputs = {
  connection,
  listName: {
    ...listName,
    comments: "The name of the list containing the item to delete.",
  },
  itemId: {
    ...itemId,
    comments: "The ID of the list item to delete.",
  },
};
