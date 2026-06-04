import { groupId } from "../mobileApps/general";

export const deleteGroupInputs = {
  groupId: {
    ...groupId,
    comments: "The ID of the group delete.",
  },
};
