import { connection } from "../common";
import { itemName, listName, parentId } from "./common";

export const addListItemInputs = {
  connection,
  listName: {
    ...listName,
    comments: "The name of the list to add the item to.",
  },
  itemName: {
    ...itemName,
    comments: "The name of the new list item.",
  },
  parentId,
};
