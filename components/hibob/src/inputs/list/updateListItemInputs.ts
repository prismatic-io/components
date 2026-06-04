import { cleanStringInput } from "../../util";
import { connection } from "../common";
import { itemId, itemName, listName, parentId } from "./common";

export const updateListItemInputs = {
  connection,
  listName: {
    ...listName,
    comments: "The name of the list containing the item to update.",
  },
  itemId: {
    ...itemId,
    comments: "The ID of the list item to update.",
  },
  itemName: {
    ...itemName,
    required: false,
    comments: "The new name for the list item.",
    example: "Human Resources Department",
    placeholder: "Enter new item name",
    clean: cleanStringInput,
  },
  parentId: {
    ...parentId,
    comments: "The ID of the new hierarchy parent node.",
    example: "1234",
  },
};
